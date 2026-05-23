'use server';

import { headers } from 'next/headers';
import { createHash } from 'crypto';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  Timestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { 
  submitCombo as dbSubmitCombo, 
  addComment as dbAddComment, 
  approveSubmission as dbApproveSubmission,
  seedDatabase as dbSeedDatabase,
  getComments
} from '@/lib/db';

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || 'banana_secret';

// Basic profanity filter
const BLOCKED_WORDS = [
  'fuck', 'shit', 'asshole', 'bitch', 'crap', 'dick', 'bastard', 'whore',
  'chutiya', 'harami', 'saala', 'gaand', 'randi', 'bhosdike'
];

function containsProfanity(text: string): boolean {
  const normalized = text.toLowerCase();
  return BLOCKED_WORDS.some(word => {
    const regex = new RegExp(`\\b${word}\\b|${word}`, 'i');
    return regex.test(normalized);
  });
}

async function getHashedIp(): Promise<string> {
  const headersList = await headers(); // Asynchronous in Next.js 15/16!
  const ip = headersList.get('x-forwarded-for') || 
             headersList.get('x-real-ip') || 
             '127.0.0.1';
  // Take only the first IP if multiple exist (forwarded chain)
  const clientIp = ip.split(',')[0].trim();
  return createHash('sha256').update(clientIp).digest('hex');
}

/**
 * Action to submit a combo from a user
 */
export async function submitComboAction(text: string, category: string) {
  if (!text || text.length > 80) {
    return { success: false, message: 'Verdict must be under 80 characters!' };
  }

  const cleanText = text.trim();
  if (containsProfanity(cleanText)) {
    return { success: false, message: 'Keep it friendly! No foul language in the kitchen. 🍌' };
  }

  try {
    const ipHash = await getHashedIp();

    if (isFirebaseConfigured) {
      // Check if this IP has submitted a combo in the last 24 hours
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const q = query(
        collection(db, 'pending'),
        where('ipHash', '==', ipHash),
        where('submittedAt', '>=', Timestamp.fromDate(oneDayAgo))
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { 
          success: false, 
          message: 'You already submitted a combo today! Come back tomorrow. 🍌' 
        };
      }
    }

    await dbSubmitCombo(cleanText, category, ipHash);
    return { success: true, message: 'Combo submitted! It is in the inspection drawer. 🍌' };
  } catch (err) {
    console.error('Error in submitComboAction:', err);
    return { success: false, message: 'Failed to submit combo. Try again!' };
  }
}

/**
 * Action to submit a comment for a combo
 */
export async function submitCommentAction(comboId: string, text: string, name: string) {
  if (!text || text.trim().length === 0) {
    return { success: false, message: 'Comment cannot be empty!' };
  }
  if (text.length > 200) {
    return { success: false, message: 'Keep comments under 200 characters!' };
  }

  const cleanText = text.trim();
  const cleanName = (name || '').trim().substring(0, 30) || 'Anonymous Banana Fan';

  if (containsProfanity(cleanText) || containsProfanity(cleanName)) {
    return { success: false, message: 'Keep it clean! No kitchen violence. 🚫' };
  }

  try {
    const ipHash = await getHashedIp();

    if (isFirebaseConfigured) {
      // Enforce rate limit: 1 comment per IP per combo
      const commentsColRef = collection(db, 'combos', comboId, 'comments');
      const q = query(commentsColRef, where('ipHash', '==', ipHash));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return { 
          success: false, 
          message: "You've already commented on this combo! Let others cook. 🚫" 
        };
      }
    }

    const comment = await dbAddComment(comboId, cleanText, cleanName, ipHash);
    return { success: true, comment };
  } catch (err) {
    console.error('Error in submitCommentAction:', err);
    return { success: false, message: 'Failed to add comment.' };
  }
}

/**
 * Action to approve a combo (Admin only)
 */
export async function adminApproveAction(submissionId: string, scheduledDate: string, secretKey: string) {
  if (secretKey !== ADMIN_KEY) {
    return { success: false, message: 'Unauthorized key.' };
  }

  try {
    await dbApproveSubmission(submissionId, scheduledDate);
    return { success: true, message: 'Combo approved and scheduled!' };
  } catch (err) {
    console.error('Error in adminApproveAction:', err);
    return { success: false, message: 'Failed to approve combo.' };
  }
}

/**
 * Action to seed the database with seed combos starting from a date (Admin only)
 */
export async function seedCombosAction(startDateStr: string, secretKey: string) {
  if (secretKey !== ADMIN_KEY) {
    return { success: false, message: 'Unauthorized key.' };
  }

  try {
    await dbSeedDatabase(startDateStr);
    return { success: true, message: 'Combos seeded successfully!' };
  } catch (err) {
    console.error('Error in seedCombosAction:', err);
    return { success: false, message: 'Seeding failed.' };
  }
}
