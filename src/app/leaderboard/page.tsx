'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getLeaderboard, LeaderboardEntry } from '@/lib/db';
import { getFingerprintHash, getOrCreateUsername } from '@/lib/fingerprint';
import { getISTDateString, getISTWeekStartDateString } from '@/lib/timezone';

export default function LeaderboardPage() {
  const [currentWeekEntries, setCurrentWeekEntries] = useState<LeaderboardEntry[]>([]);
  const [prevWeekWinner, setPrevWeekWinner] = useState<string | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userStreak, setUserStreak] = useState(0);
  const [fingerprint, setFingerprint] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [weekStartDate, setWeekStartDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const currentWeekStart = getISTWeekStartDateString(today);
    setWeekStartDate(currentWeekStart);

    // Get previous week's Monday date
    const prevWeekMonday = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
    const prevWeekStart = getISTWeekStartDateString(prevWeekMonday);

    getFingerprintHash().then(async (hash) => {
      setFingerprint(hash);

      const savedStreak = Number(localStorage.getItem('bk_streak_count') || '0');
      setUserStreak(savedStreak);

      // Fetch current week
      const currentList = await getLeaderboard(currentWeekStart, hash);
      setCurrentWeekEntries(currentList);

      // Find user rank
      const index = currentList.findIndex(e => e.isCurrentUser);
      if (index !== -1) {
        setUserRank(index + 1);
      }

      // Fetch previous week to award badge
      const prevList = await getLeaderboard(prevWeekStart, hash);
      if (prevList.length > 0) {
        const winner = prevList[0];
        setPrevWeekWinner(winner.username);
        
        // If current user is the winner of previous week, award badge
        if (winner.isCurrentUser) {
          localStorage.setItem('bk_golden_banana_badge', 'true');
        } else {
          // If they are not the winner anymore, let them keep it if they won before?
          // The prompt says: "weekly top voters ... resets weekly, winner gets badge".
          // So let's update their badge state based on previous week's winner.
          // To be safe, they keep it for a week:
          if (localStorage.getItem('bk_last_won_week') === prevWeekStart) {
            localStorage.setItem('bk_golden_banana_badge', 'true');
          } else {
            localStorage.setItem('bk_golden_banana_badge', winner.isCurrentUser ? 'true' : 'false');
            if (winner.isCurrentUser) {
              localStorage.setItem('bk_last_won_week', prevWeekStart);
            }
          }
        }
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col flex-1 pb-12 select-none">
      {/* Back Button */}
      <Link 
        href="/"
        className="self-start text-stone-500 hover:text-banana-dark font-extrabold text-sm mb-6 flex items-center gap-1.5 hover:underline"
      >
        <span>←</span> BACK TO GAME
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-banana-dark flex items-center justify-center gap-1.5">
          <span>🏆</span> LEADERBOARD
        </h1>
        <p className="text-stone-500 font-bold mt-2 text-xs md:text-sm">
          Weekly top voters. Resets every Monday in IST.
        </p>
      </div>

      {/* Prev Week Winner Banner */}
      {prevWeekWinner && (
        <div className="bg-banana-yellow/20 border-4 border-banana-yellow rounded-2xl p-4 mb-6 text-center text-sm font-extrabold text-banana-dark flex items-center justify-center gap-2 shadow-[2px_2px_0px_#1A1A1A]">
          <span>👑</span> 
          <span>Last Week&rsquo;s Champion: <strong className="text-orange-600">{prevWeekWinner}</strong> (Awarded Golden Banana 🏆)</span>
        </div>
      )}

      {/* Leaderboard Table Container */}
      <div className="bg-white border-4 border-banana-dark rounded-3xl p-5 shadow-[6px_6px_0px_#1A1A1A] overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 space-y-3 font-bold text-stone-400">
            <span className="text-3xl animate-spin inline-block">🍌</span>
            <p>Peeling data...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-black text-stone-400 border-b-2 border-stone-100 pb-2 px-1">
              <span>USER</span>
              <span>STREAK</span>
            </div>

            <div className="space-y-2.5">
              {currentWeekEntries.length === 0 ? (
                <p className="text-center text-stone-400 font-bold py-6 italic">No active streaks this week yet. Be the first!</p>
              ) : (
                currentWeekEntries.map((entry, idx) => {
                  const rank = idx + 1;
                  let rankEmoji = '▫️';
                  if (rank === 1) rankEmoji = '🥇';
                  else if (rank === 2) rankEmoji = '🥈';
                  else if (rank === 3) rankEmoji = '🥉';

                  return (
                    <div
                      key={entry.username}
                      className={`flex justify-between items-center py-3 px-3.5 border-3 rounded-2xl transition-all ${
                        entry.isCurrentUser
                          ? 'bg-banana-yellow/30 border-banana-yellow shadow-[2px_2px_0px_#FFD93D]'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-extrabold text-stone-400 w-5 text-center">
                          {rank <= 3 ? rankEmoji : rank}
                        </span>
                        <span className={`text-sm font-black ${entry.isCurrentUser ? 'text-banana-dark' : 'text-stone-700'}`}>
                          {entry.username} {entry.isCurrentUser && ' (You)'}
                          {rank === 1 && ' 🏆'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 font-black text-sm">
                        <span className={idx === 0 ? 'pulse-flame inline-block' : ''}>🔥</span>
                        <span>{entry.streak} days</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Current User Stats Footer */}
            {userRank && (
              <div className="border-t-4 border-banana-dark pt-4 mt-2 flex justify-between items-center text-xs font-black text-stone-500 px-1">
                <span>YOUR RANK: #{userRank}</span>
                <span>YOUR STREAK: 🔥 {userStreak} days</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
