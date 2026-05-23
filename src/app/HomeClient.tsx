'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Combo } from '@/lib/db';
import { voteCombo, checkIfVoted, updateLeaderboardStreak } from '@/lib/db';
import { getFingerprintHash, getOrCreateUsername } from '@/lib/fingerprint';
import { getSecondsUntilNextISTMidnight, getISTDateString, getISTWeekStartDateString } from '@/lib/timezone';

interface HomeClientProps {
  todayCombo: Combo;
  todayDateStr: string;
}

export default function HomeClient({ todayCombo, todayDateStr }: HomeClientProps) {
  const [votedType, setVotedType] = useState<'banana' | 'not' | null>(null);
  const [comboVotes, setComboVotes] = useState(todayCombo.votes);
  const [streak, setStreak] = useState(0);
  const [timeLeftStr, setTimeLeftStr] = useState('00:00:00');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [fingerprint, setFingerprint] = useState('');
  const [isVotingInProgress, setIsVotingInProgress] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Retrieve browser fingerprint
    getFingerprintHash().then((hash) => {
      setFingerprint(hash);
      
      // Check if voted in Firestore or localStorage
      checkIfVoted(todayDateStr, hash).then((existingVote) => {
        if (existingVote) {
          setVotedType(existingVote);
          setIsFlipped(true);
        }
      });
    });

    // Load streak from localStorage
    const savedStreak = Number(localStorage.getItem('bk_streak_count') || '0');
    // Verify if they voted yesterday or today to see if streak is active
    const lastVotedDate = localStorage.getItem('bk_last_voted_date');
    if (lastVotedDate) {
      if (lastVotedDate === todayDateStr) {
        setStreak(savedStreak);
      } else {
        // Calculate yesterday date string
        const today = new Date(`${todayDateStr}T00:00:00+05:30`);
        const yesterday = new Date(today.getTime() - 24 * 3600 * 1000);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (lastVotedDate === yesterdayStr) {
          setStreak(savedStreak);
        } else {
          // Streak broken
          setStreak(0);
          localStorage.setItem('bk_streak_count', '0');
        }
      }
    }

    // Tick-tock for countdown timer
    const tick = () => {
      const totalSeconds = getSecondsUntilNextISTMidnight();
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setTimeLeftStr(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [todayDateStr]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleVote = async (vote: 'banana' | 'not') => {
    if (isVotingInProgress || votedType) return;
    setIsVotingInProgress(true);

    try {
      // 1. Submit to Database
      const result = await voteCombo(todayCombo.id, vote, fingerprint, todayDateStr);
      setComboVotes(result.votes);
      setVotedType(vote);
      
      // 2. Log event to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'vote_cast', {
          combo_id: todayCombo.id,
          vote_type: vote,
        });
      }

      // 3. Update local streak
      const currentStreak = Number(localStorage.getItem('bk_streak_count') || '0');
      const lastVotedDate = localStorage.getItem('bk_last_voted_date');
      let newStreak = 1;

      if (lastVotedDate) {
        const today = new Date(`${todayDateStr}T00:00:00+05:30`);
        const yesterday = new Date(today.getTime() - 24 * 3600 * 1000);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastVotedDate === yesterdayStr) {
          newStreak = currentStreak + 1;
        } else if (lastVotedDate === todayDateStr) {
          newStreak = currentStreak || 1;
        }
      }

      localStorage.setItem('bk_streak_count', String(newStreak));
      localStorage.setItem('bk_last_voted_date', todayDateStr);
      setStreak(newStreak);

      // 4. Update Firestore Leaderboard
      const username = getOrCreateUsername();
      const weekStartDate = getISTWeekStartDateString();
      await updateLeaderboardStreak(fingerprint, username, newStreak, weekStartDate);

      // 5. Trigger CSS Card Flip
      setTimeout(() => {
        setIsFlipped(true);
      }, 100);

      showToast(`Verdict cast: ${vote === 'banana' ? '🍌 Acceptable' : '🚫 Criminal'}!`);
    } catch (err) {
      console.error('Voting error:', err);
      showToast('Voting failed. Try again!');
    } finally {
      setIsVotingInProgress(false);
    }
  };

  const handleShare = () => {
    const total = comboVotes.banana + comboVotes.not;
    const bananaPct = total > 0 ? Math.round((comboVotes.banana / total) * 100) : 50;
    const notPct = total > 0 ? Math.round((comboVotes.not / total) * 100) : 50;
    
    const isBanana = votedType === 'banana';
    const percentAgreed = isBanana ? bananaPct : notPct;
    
    const text = `🍌 Banana Kitchen — Today's Combo:\n"${todayCombo.text}"\n\nI voted: ${isBanana ? '🍌 BANANA (Acceptable)' : '🚫 NOT (Criminal)'}.\n${percentAgreed}% of people agreed with me.\n\nCan you do better? Vote now at https://bananakitchen.in`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Verdict copied! Send it to your group chats. 🍌');
      }).catch(() => {
        showToast('Clipboard blocked. Copy this text: ' + text);
      });
    } else {
      showToast('Sharing not supported on this browser.');
    }
  };

  // Calculations for display
  const totalVotes = comboVotes.banana + comboVotes.not;
  const bananaPercent = totalVotes > 0 ? Math.round((comboVotes.banana / totalVotes) * 100) : 50;
  const notPercent = totalVotes > 0 ? Math.round((comboVotes.not / totalVotes) * 100) : 50;

  const userAgreedWithMajority = 
    (bananaPercent > notPercent && votedType === 'banana') ||
    (notPercent > bananaPercent && votedType === 'not') ||
    (bananaPercent === notPercent);

  return (
    <div className="flex flex-col flex-1 items-center justify-center py-4 w-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-banana-dark select-none flex items-center justify-center gap-1">
          <span>🍌</span>
          <span className="bg-banana-yellow px-2 py-0.5 rounded-lg rotate-[-2deg] inline-block shadow-sm">
            BANANA
          </span>
          <span className="ml-1 text-2xl md:text-3xl font-extrabold text-stone-500">kitchen</span>
        </h1>
        <p className="text-stone-600 font-semibold mt-2 text-sm md:text-base italic">
          &ldquo;Is this a crime or just creative?&rdquo;
        </p>
      </div>

      {/* Main Card with 3D Flip */}
      <div className="w-full max-w-[420px] aspect-[4/5] perspective-1000 relative select-none">
        <div className={`w-full h-full preserve-3d flip-card-inner relative ${isFlipped ? 'flipped' : ''}`}>
          
          {/* Front Face: Voting Panel */}
          <div className="absolute inset-0 w-full h-full bg-white border-4 border-banana-dark rounded-3xl p-6 flex flex-col justify-between shadow-[6px_6px_0px_#1A1A1A] backface-hidden z-10">
            <div className="flex justify-between items-center">
              <span className="bg-stone-100 border-2 border-banana-dark text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {todayCombo.category}
              </span>
              <span className="text-stone-500 text-xs font-bold">
                {todayDateStr}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center text-center my-6">
              <h2 className="text-2xl md:text-3xl font-black text-banana-dark tracking-tight leading-snug px-2">
                &ldquo;{todayCombo.text}&rdquo;
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  onClick={() => handleVote('banana')}
                  disabled={isVotingInProgress || !isClient}
                  className="flex-1 bg-banana-yellow hover:bg-[#ffe169] text-banana-dark font-black text-lg md:text-xl py-4 rounded-2xl border-4 border-banana-dark shadow-[4px_4px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1A1A1A] transition-all flex flex-col items-center justify-center cursor-pointer btn-press"
                >
                  <span className="text-2xl mb-1">🍌</span>
                  <span>BANANA</span>
                  <span className="text-xs font-medium text-stone-700 mt-0.5">(acceptable)</span>
                </button>

                <button
                  onClick={() => handleVote('not')}
                  disabled={isVotingInProgress || !isClient}
                  className="flex-1 bg-white hover:bg-stone-50 text-banana-dark font-black text-lg md:text-xl py-4 rounded-2xl border-4 border-banana-dark shadow-[4px_4px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1A1A1A] transition-all flex flex-col items-center justify-center cursor-pointer btn-press"
                >
                  <span className="text-2xl mb-1">🚫</span>
                  <span>NOT</span>
                  <span className="text-xs font-medium text-stone-700 mt-0.5">(criminal)</span>
                </button>
              </div>
              <p className="text-[10px] text-stone-400 font-bold text-center mt-1 select-none">
                VOTE ONCE DAILY. DECISION IS FINAL.
              </p>
            </div>
          </div>

          {/* Back Face: Vote Results */}
          <div className="absolute inset-0 w-full h-full bg-white border-4 border-banana-dark rounded-3xl p-6 flex flex-col justify-between shadow-[6px_6px_0px_#1A1A1A] backface-hidden rotate-y-180 bg-radial-gradient">
            <div className="flex justify-between items-center">
              <span className="bg-stone-100 border-2 border-banana-dark text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                RESULTS
              </span>
              <span className="text-stone-500 text-xs font-bold flex items-center gap-1">
                👥 {totalVotes.toLocaleString()} votes
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center my-4 space-y-4">
              <h3 className="text-center font-bold text-stone-500 text-xs md:text-sm line-clamp-1">
                Verdict on &ldquo;{todayCombo.text}&rdquo;
              </h3>

              {/* Vote Percentage Visual Bars */}
              <div className="space-y-3">
                {/* Banana Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-1 text-sm font-bold">
                    <span className="flex items-center gap-1">🍌 Banana <span className="text-xs font-medium text-stone-500">(acceptable)</span></span>
                    <span>{bananaPercent}%</span>
                  </div>
                  <div className="w-full bg-stone-100 border-2 border-banana-dark h-7 rounded-full overflow-hidden">
                    <div 
                      className="bg-banana-yellow h-full border-r-2 border-banana-dark animate-fill-bar"
                      style={{ width: `${bananaPercent}%` }}
                    />
                  </div>
                </div>

                {/* Not Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-1 text-sm font-bold">
                    <span className="flex items-center gap-1">🚫 Not <span className="text-xs font-medium text-stone-500">(criminal)</span></span>
                    <span>{notPercent}%</span>
                  </div>
                  <div className="w-full bg-stone-100 border-2 border-banana-dark h-7 rounded-full overflow-hidden">
                    <div 
                      className="bg-banana-red h-full border-r-2 border-banana-dark animate-fill-bar"
                      style={{ width: `${notPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* User Agreement Message */}
              <div className="text-center py-2 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl">
                {votedType ? (
                  <p className="font-extrabold text-sm md:text-base text-banana-dark">
                    {userAgreedWithMajority ? (
                      <span>😎 You agreed with the majority!</span>
                    ) : (
                      <span>🌶️ You&rsquo;re a contrarian!</span>
                    )}
                  </p>
                ) : (
                  <p className="font-extrabold text-sm text-stone-500">
                    You already weighed in today! Come back tomorrow 🍌
                  </p>
                )}
              </div>
            </div>

            {/* share and metadata section */}
            <div className="space-y-3">
              <button
                onClick={handleShare}
                className="w-full bg-banana-dark text-white hover:bg-stone-800 font-extrabold text-sm py-3 px-4 rounded-xl shadow-[3px_3px_0px_#FFD93D] hover:shadow-[1px_1px_0px_#FFD93D] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span>📢</span> SHARE YOUR VERDICT
              </button>

              {/* ADSENSE_SLOT_1 */}
              <div className="w-full h-[50px] bg-stone-100 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center text-[10px] text-stone-400 font-bold select-none">
                {/* ADSENSE_SLOT_1 */}
                AD ADVERTISEMENT PLACEHOLDER
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-stone-500 border-t border-stone-100 pt-3">
                <div className="flex items-center gap-1">
                  <span className={`${streak >= 3 ? 'pulse-flame inline-block' : ''}`}>🔥</span>
                  <span>streak: {streak} days</span>
                </div>
                <div>
                  <span>next combo in: </span>
                  <span className="font-mono text-banana-dark bg-stone-100 px-1.5 py-0.5 rounded">{timeLeftStr}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Sub-options */}
      <div className="mt-8 flex gap-6 text-sm font-extrabold select-none">
        <Link 
          href="/archive" 
          className="text-stone-500 hover:text-banana-dark flex items-center gap-1 hover:underline decoration-banana-yellow decoration-4"
        >
          🗄️ PAST COMBOS
        </Link>
        <Link 
          href="/submit" 
          className="text-stone-500 hover:text-banana-dark flex items-center gap-1 hover:underline decoration-banana-yellow decoration-4"
        >
          🍳 SUBMIT COMBO
        </Link>
        <Link 
          href="/leaderboard" 
          className="text-stone-500 hover:text-banana-dark flex items-center gap-1 hover:underline decoration-banana-yellow decoration-4"
        >
          🏆 LEADERBOARD
        </Link>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-banana-dark text-white font-bold text-xs py-3 px-6 rounded-full shadow-lg border-2 border-banana-yellow flex items-center gap-2 animate-bounce z-50">
          <span>🍌</span> {toastMessage}
        </div>
      )}
    </div>
  );
}
