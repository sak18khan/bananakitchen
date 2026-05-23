import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  limit, 
  runTransaction,
  writeBatch,
  increment,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { SEED_COMBOS } from './seed';

export interface Combo {
  id: string;
  text: string;
  category: 'Sweet Chaos' | 'Savoury Crimes' | 'Fusion Experiments' | 'Absolute Chaos';
  scheduledDate: string; // YYYY-MM-DD IST
  isActive: boolean;
  votes: {
    banana: number;
    not: number;
  };
  submittedBy: 'admin' | 'user';
  createdAt: any;
}

export interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: any;
}

export interface PendingCombo {
  id: string;
  text: string;
  category: string;
  submittedAt: any;
  ipHash: string;
}

export interface LeaderboardEntry {
  username: string;
  streak: number;
  updatedAt: any;
  isCurrentUser?: boolean;
}

// Baseline date for mock combo sequence (May 24, 2026)
const BASE_DATE_STR = "2026-05-24";

function getComboIndexForDate(dateStr: string): number {
  const base = new Date(`${BASE_DATE_STR}T00:00:00+05:30`);
  const target = new Date(`${dateStr}T00:00:00+05:30`);
  
  if (isNaN(target.getTime())) {
    return 0;
  }
  
  const diffTime = target.getTime() - base.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Modulo of negative numbers in JS can be tricky, so adjust it
  const index = ((diffDays % SEED_COMBOS.length) + SEED_COMBOS.length) % SEED_COMBOS.length;
  return index;
}

function generateMockComboForDate(dateStr: string): Combo {
  const index = getComboIndexForDate(dateStr);
  const seed = SEED_COMBOS[index];
  
  // We can overlay local votes if we are on client side
  let localBananaVotes = 0;
  let localNotVotes = 0;
  if (typeof window !== 'undefined') {
    const localVotes = localStorage.getItem(`bk_mock_votes_${dateStr}`);
    if (localVotes) {
      const parsed = JSON.parse(localVotes);
      localBananaVotes = parsed.banana || 0;
      localNotVotes = parsed.not || 0;
    }
  }

  return {
    id: `mock_${dateStr}`,
    text: seed.text,
    category: seed.category,
    scheduledDate: dateStr,
    isActive: true,
    votes: {
      banana: seed.bananaVotes + localBananaVotes,
      not: seed.notVotes + localNotVotes,
    },
    submittedBy: 'admin',
    createdAt: new Date(),
  };
}

// ----------------------------------------------------
// PUBLIC DATABASE APIs
// ----------------------------------------------------

/**
 * Fetch the active combo for the given IST date string (YYYY-MM-DD)
 */
export async function getTodayCombo(dateStr: string): Promise<Combo | null> {
  if (!isFirebaseConfigured) {
    return generateMockComboForDate(dateStr);
  }

  try {
    const q = query(
      collection(db, 'combos'), 
      where('scheduledDate', '==', dateStr),
      where('isActive', '==', true),
      limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) {
      // Fallback to generating one from seed if none is configured in Firestore for today
      return generateMockComboForDate(dateStr);
    }
    const firstDoc = snap.docs[0];
    return { id: firstDoc.id, ...firstDoc.data() } as Combo;
  } catch (err) {
    console.error('Error fetching today combo from Firestore:', err);
    return generateMockComboForDate(dateStr);
  }
}

/**
 * Cast a vote for a combo
 */
export async function voteCombo(
  comboId: string, 
  voteType: 'banana' | 'not', 
  fingerprint: string, 
  dateStr: string
): Promise<{ success: boolean; votes: { banana: number; not: number } }> {
  // Always update local storage first for immediate client feedback
  if (typeof window !== 'undefined') {
    localStorage.setItem(`bk_voted_${dateStr}`, voteType);
  }

  if (!isFirebaseConfigured) {
    // In mock mode, we update votes in localStorage
    let localVotes = { banana: 0, not: 0 };
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`bk_mock_votes_${dateStr}`);
      if (saved) {
        localVotes = JSON.parse(saved);
      }
      localVotes[voteType] += 1;
      localStorage.setItem(`bk_mock_votes_${dateStr}`, JSON.stringify(localVotes));
    }
    const currentCombo = generateMockComboForDate(dateStr);
    return { success: true, votes: currentCombo.votes };
  }

  try {
    const comboRef = doc(db, 'combos', comboId);
    const voteRef = doc(db, 'votes', dateStr, 'fingerprints', fingerprint);
    
    // Perform transaction to prevent double voting and keep counts exact
    const result = await runTransaction(db, async (transaction) => {
      const voteDoc = await transaction.get(voteRef);
      if (voteDoc.exists()) {
        throw new Error('Already voted');
      }
      
      const comboDoc = await transaction.get(comboRef);
      if (!comboDoc.exists()) {
        throw new Error('Combo does not exist');
      }

      const comboData = comboDoc.data() as Combo;
      const newVotes = {
        banana: comboData.votes.banana + (voteType === 'banana' ? 1 : 0),
        not: comboData.votes.not + (voteType === 'not' ? 1 : 0),
      };

      transaction.set(voteRef, {
        vote: voteType,
        timestamp: serverTimestamp()
      });

      transaction.update(comboRef, {
        [`votes.${voteType}`]: increment(1)
      });

      return newVotes;
    });

    return { success: true, votes: result };
  } catch (err: any) {
    console.error('Error recording vote in Firestore:', err);
    // Even if transaction fails because they voted already, we return the current votes
    const currentCombo = await getComboDetails(comboId);
    return { success: false, votes: currentCombo ? currentCombo.votes : { banana: 0, not: 0 } };
  }
}

/**
 * Check if the user has already voted today
 */
export async function checkIfVoted(dateStr: string, fingerprint: string): Promise<'banana' | 'not' | null> {
  // First check localStorage (works offline, instant)
  if (typeof window !== 'undefined') {
    const localVote = localStorage.getItem(`bk_voted_${dateStr}`);
    if (localVote === 'banana' || localVote === 'not') {
      return localVote;
    }
  }

  if (!isFirebaseConfigured || !fingerprint || fingerprint === 'ssr') {
    return null;
  }

  try {
    const voteRef = doc(db, 'votes', dateStr, 'fingerprints', fingerprint);
    const snap = await getDoc(voteRef);
    if (snap.exists()) {
      const data = snap.data();
      return data.vote as 'banana' | 'not';
    }
    return null;
  } catch (err) {
    console.error('Error checking vote in Firestore:', err);
    return null;
  }
}

/**
 * Fetch all past combos (scheduled dates before today)
 */
export async function getPastCombos(todayDateStr: string): Promise<Combo[]> {
  if (!isFirebaseConfigured) {
    // Generate a set of past combos (e.g. up to 10 days before today)
    const list: Combo[] = [];
    const base = new Date(`${todayDateStr}T00:00:00+05:30`);
    
    // Return last 20 days of combos
    for (let i = 1; i <= 20; i++) {
      const pastDate = new Date(base.getTime() - i * 24 * 3600 * 1000);
      const pastDateStr = pastDate.toISOString().split('T')[0];
      list.push(generateMockComboForDate(pastDateStr));
    }
    return list;
  }

  try {
    const q = query(
      collection(db, 'combos'),
      where('scheduledDate', '<', todayDateStr),
      where('isActive', '==', true),
      orderBy('scheduledDate', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Combo);
  } catch (err) {
    console.error('Error fetching past combos:', err);
    // Fallback to mock past list
    return getPastCombosMock(todayDateStr);
  }
}

function getPastCombosMock(todayDateStr: string): Combo[] {
  const list: Combo[] = [];
  const base = new Date(`${todayDateStr}T00:00:00+05:30`);
  for (let i = 1; i <= 20; i++) {
    const pastDate = new Date(base.getTime() - i * 24 * 3600 * 1000);
    const pastDateStr = pastDate.toISOString().split('T')[0];
    list.push(generateMockComboForDate(pastDateStr));
  }
  return list;
}

/**
 * Fetch specific combo details by ID
 */
export async function getComboDetails(comboId: string): Promise<Combo | null> {
  if (comboId.startsWith('mock_')) {
    const dateStr = comboId.replace('mock_', '');
    return generateMockComboForDate(dateStr);
  }

  if (!isFirebaseConfigured) {
    // Try parsing date from ID
    return generateMockComboForDate(BASE_DATE_STR);
  }

  try {
    const docRef = doc(db, 'combos', comboId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Combo;
    }
    return null;
  } catch (err) {
    console.error('Error fetching combo details:', err);
    return null;
  }
}

/**
 * Add a comment to a combo
 */
export async function addComment(
  comboId: string, 
  text: string, 
  name: string = "Anonymous Banana Fan", 
  ipHash: string
): Promise<Comment> {
  const newComment: Omit<Comment, 'id'> = {
    name: name.trim() || "Anonymous Banana Fan",
    text: text.trim(),
    createdAt: new Date()
  };

  if (!isFirebaseConfigured) {
    // Save locally
    if (typeof window !== 'undefined') {
      const localComments = localStorage.getItem(`bk_comments_${comboId}`) || '[]';
      const parsed = JSON.parse(localComments);
      const id = 'mock_comment_' + Math.random().toString(36).substring(2, 9);
      const commentWithId = { id, ...newComment, createdAt: new Date().toISOString() };
      parsed.push(commentWithId);
      localStorage.setItem(`bk_comments_${comboId}`, JSON.stringify(parsed));
      return commentWithId as Comment;
    }
    return { id: 'mock', ...newComment } as Comment;
  }

  try {
    const commentsColRef = collection(db, 'combos', comboId, 'comments');
    const docRef = await addDoc(commentsColRef, {
      ...newComment,
      createdAt: serverTimestamp(),
      ipHash
    });
    return { id: docRef.id, ...newComment } as Comment;
  } catch (err) {
    console.error('Error adding comment to Firestore:', err);
    throw err;
  }
}

/**
 * Get comments for a combo
 */
export async function getComments(comboId: string): Promise<Comment[]> {
  if (!isFirebaseConfigured) {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`bk_comments_${comboId}`);
      if (saved) {
        return JSON.parse(saved).map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt)
        }));
      }
    }
    return [];
  }

  try {
    const commentsColRef = collection(db, 'combos', comboId, 'comments');
    const q = query(commentsColRef, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        text: data.text,
        // Firebase Server Timestamp returns null immediately on insert sometimes, fallback to date
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
      } as Comment;
    });
  } catch (err) {
    console.error('Error fetching comments from Firestore:', err);
    return [];
  }
}

/**
 * Submit a food combination for review
 */
export async function submitCombo(text: string, category: string, ipHash: string): Promise<void> {
  const submission = {
    text: text.substring(0, 80),
    category,
    submittedAt: new Date(),
    ipHash
  };

  if (!isFirebaseConfigured) {
    if (typeof window !== 'undefined') {
      const pending = localStorage.getItem('bk_pending_submissions') || '[]';
      const parsed = JSON.parse(pending);
      parsed.push({ id: 'pending_' + Math.random().toString(36).substring(2, 9), ...submission });
      localStorage.setItem('bk_pending_submissions', JSON.stringify(parsed));
    }
    return;
  }

  try {
    await addDoc(collection(db, 'pending'), {
      text: submission.text,
      category: submission.category,
      submittedAt: serverTimestamp(),
      ipHash
    });
  } catch (err) {
    console.error('Error submitting combo to pending:', err);
    throw err;
  }
}

/**
 * Get weekly leaderboard entries
 */
export async function getLeaderboard(weekStartDate: string, currentFingerprint?: string): Promise<LeaderboardEntry[]> {
  if (!isFirebaseConfigured) {
    // Generate static mock leaderboard entries
    const mockUsers = [
      { username: "CurryFox_42", streak: 12 },
      { username: "MangoRebel_7", streak: 9 },
      { username: "SamosaNinja_23", streak: 8 },
      { username: "ChaiMonster_11", streak: 8 },
      { username: "DosaCowboy_99", streak: 7 },
      { username: "BiryaniKnight_5", streak: 6 },
      { username: "ChutneyCritic_14", streak: 5 },
      { username: "PapadPirate_8", streak: 4 },
      { username: "PohaSlayer_52", streak: 3 },
      { username: "SevStalker_17", streak: 3 }
    ];

    // If current user is in local storage, overlay them
    let userStreak = 0;
    let username = "Anonymous Banana Fan";
    if (typeof window !== 'undefined') {
      userStreak = Number(localStorage.getItem('bk_streak_count') || '0');
      username = localStorage.getItem('bk_username') || 'You';
    }

    const list: LeaderboardEntry[] = mockUsers.map(u => ({
      username: u.username,
      streak: u.streak,
      updatedAt: new Date(),
      isCurrentUser: u.username === username
    }));

    // If user has streak and is not already in list, insert them
    if (userStreak > 0 && !list.some(e => e.isCurrentUser)) {
      list.push({
        username,
        streak: userStreak,
        updatedAt: new Date(),
        isCurrentUser: true
      });
    }

    // Sort by streak desc
    return list.sort((a, b) => b.streak - a.streak).slice(0, 10);
  }

  try {
    const q = query(
      collection(db, 'leaderboards', weekStartDate, 'users'),
      orderBy('streak', 'desc'),
      limit(10)
    );
    const snap = await getDocs(q);
    const entries = snap.docs.map(doc => {
      const data = doc.data();
      return {
        username: data.username,
        streak: data.streak,
        updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(),
        isCurrentUser: doc.id === currentFingerprint
      } as LeaderboardEntry;
    });

    // Check if the current user is not in the top 10 but has a streak, so we can display them at the bottom
    if (currentFingerprint && currentFingerprint !== 'ssr' && !entries.some(e => e.isCurrentUser)) {
      const userRef = doc(db, 'leaderboards', weekStartDate, 'users', currentFingerprint);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const uData = userSnap.data();
        entries.push({
          username: uData.username,
          streak: uData.streak,
          updatedAt: uData.updatedAt instanceof Timestamp ? uData.updatedAt.toDate() : new Date(),
          isCurrentUser: true
        });
      }
    }

    return entries;
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    return [];
  }
}

/**
 * Update user's streak in the weekly leaderboard
 */
export async function updateLeaderboardStreak(
  fingerprint: string, 
  username: string, 
  streak: number, 
  weekStartDate: string
): Promise<void> {
  if (!isFirebaseConfigured || fingerprint === 'ssr') {
    return;
  }

  try {
    const userRef = doc(db, 'leaderboards', weekStartDate, 'users', fingerprint);
    await setDoc(userRef, {
      username,
      streak,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.error('Error updating leaderboard streak:', err);
  }
}

// ----------------------------------------------------
// ADMIN ONLY APIs
// ----------------------------------------------------

/**
 * Fetch all pending submissions (Admin only)
 */
export async function getPendingSubmissions(): Promise<PendingCombo[]> {
  if (!isFirebaseConfigured) {
    if (typeof window !== 'undefined') {
      const pending = localStorage.getItem('bk_pending_submissions') || '[]';
      return JSON.parse(pending).map((p: any) => ({
        ...p,
        submittedAt: new Date(p.submittedAt)
      }));
    }
    return [];
  }

  try {
    const q = query(collection(db, 'pending'), orderBy('submittedAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        category: data.category,
        submittedAt: data.submittedAt instanceof Timestamp ? data.submittedAt.toDate() : new Date(),
        ipHash: data.ipHash
      } as PendingCombo;
    });
  } catch (err) {
    console.error('Error fetching pending submissions:', err);
    return [];
  }
}

/**
 * Approve a pending submission (Admin only)
 */
export async function approveSubmission(submissionId: string, scheduledDate: string): Promise<void> {
  if (!isFirebaseConfigured) {
    if (typeof window !== 'undefined') {
      const pending = localStorage.getItem('bk_pending_submissions') || '[]';
      const parsed = JSON.parse(pending) as PendingCombo[];
      const approved = parsed.find(p => p.id === submissionId);
      if (approved) {
        // Remove from pending
        const filtered = parsed.filter(p => p.id !== submissionId);
        localStorage.setItem('bk_pending_submissions', JSON.stringify(filtered));
        
        // Save to mock database
        const localVotesKey = `bk_mock_votes_${scheduledDate}`;
        localStorage.setItem(localVotesKey, JSON.stringify({ banana: 0, not: 0 }));
      }
    }
    return;
  }

  try {
    const submissionRef = doc(db, 'pending', submissionId);
    const submissionSnap = await getDoc(submissionRef);
    if (!submissionSnap.exists()) {
      throw new Error('Submission not found');
    }

    const data = submissionSnap.data() as Omit<PendingCombo, 'id'>;

    // Write to combos
    const newComboRef = doc(collection(db, 'combos'));
    await setDoc(newComboRef, {
      text: data.text,
      category: data.category,
      scheduledDate,
      isActive: true,
      votes: { banana: 0, not: 0 },
      submittedBy: 'user',
      createdAt: serverTimestamp()
    });

    // Delete from pending
    await deleteDoc(submissionRef);
  } catch (err) {
    console.error('Error approving submission:', err);
    throw err;
  }
}

/**
 * Seeds the database starting from today
 */
export async function seedDatabase(startDateStr: string): Promise<void> {
  if (!isFirebaseConfigured) {
    // Already matches deterministic dates, nothing to do
    return;
  }

  try {
    const baseDate = new Date(`${startDateStr}T00:00:00+05:30`);
    const batch = writeBatch(db);

    for (let i = 0; i < SEED_COMBOS.length; i++) {
      const combo = SEED_COMBOS[i];
      const scheduledDate = new Date(baseDate.getTime() + i * 24 * 3600 * 1000);
      const scheduledDateStr = scheduledDate.toISOString().split('T')[0];

      // Check if already exists for this date to prevent duplicate scheduling
      const q = query(collection(db, 'combos'), where('scheduledDate', '==', scheduledDateStr));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        const comboDocRef = doc(collection(db, 'combos'));
        batch.set(comboDocRef, {
          text: combo.text,
          category: combo.category,
          scheduledDate: scheduledDateStr,
          isActive: true,
          votes: {
            banana: combo.bananaVotes,
            not: combo.notVotes,
          },
          submittedBy: 'admin',
          createdAt: serverTimestamp()
        });
      }
    }

    await batch.commit();
  } catch (err) {
    console.error('Error seeding database:', err);
    throw err;
  }
}
