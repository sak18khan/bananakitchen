'use client';

import { useState } from 'react';
import { Combo, PendingCombo } from '@/lib/db';
import { adminApproveAction, seedCombosAction } from '@/app/actions/actions';

interface AdminClientProps {
  secretKey: string;
  todayCombo: Combo | null;
  pendingSubmissions: PendingCombo[];
  todayDateStr: string;
}

export default function AdminClient({ 
  secretKey, 
  todayCombo, 
  pendingSubmissions,
  todayDateStr 
}: AdminClientProps) {
  const [pendingList, setPendingList] = useState<PendingCombo[]>(pendingSubmissions);
  const [scheduleDates, setScheduleDates] = useState<{ [id: string]: string }>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedDate, setSeedDate] = useState(todayDateStr);

  const handleApprove = async (id: string, text: string) => {
    const date = scheduleDates[id];
    if (!date) {
      alert('Please select a scheduled date for approval!');
      return;
    }

    setIsSubmitting(id);
    setStatusMessage(null);

    try {
      const res = await adminApproveAction(id, date, secretKey);
      if (res.success) {
        setPendingList((prev) => prev.filter((p) => p.id !== id));
        setStatusMessage(`Approved: "${text}" scheduled for ${date}!`);
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert('Approval failed.');
    } finally {
      setIsSubmitting(null);
    }
  };

  const handleSeed = async () => {
    if (!confirm(`Are you sure you want to seed the database starting from ${seedDate}?`)) {
      return;
    }

    setIsSeeding(true);
    setStatusMessage(null);

    try {
      const res = await seedCombosAction(seedDate, secretKey);
      setStatusMessage(res.message);
    } catch (err) {
      console.error(err);
      alert('Seeding failed.');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleDateChange = (id: string, val: string) => {
    setScheduleDates((prev) => ({ ...prev, [id]: val }));
  };

  // Vote percentages calculation
  const total = todayCombo ? (todayCombo.votes.banana + todayCombo.votes.not) : 0;
  const bananaPct = total > 0 ? Math.round((todayCombo!.votes.banana / total) * 100) : 50;
  const notPct = total > 0 ? Math.round((todayCombo!.votes.not / total) * 100) : 50;

  return (
    <div className="space-y-8 select-none">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-banana-dark flex items-center justify-center gap-1.5">
          <span>🕵️</span> ADMIN DRAWER
        </h1>
        <p className="text-stone-500 font-bold mt-2 text-xs md:text-sm">
          Locked admin panel. Manage pending submissions and schedules.
        </p>
      </div>

      {statusMessage && (
        <div className="bg-banana-yellow/30 border-3 border-banana-yellow rounded-2xl p-4 text-sm font-extrabold text-banana-dark text-center shadow-[2px_2px_0px_#1A1A1A]">
          📢 {statusMessage}
        </div>
      )}

      {/* Today's Status */}
      <div className="bg-white border-4 border-banana-dark rounded-3xl p-6 shadow-[6px_6px_0px_#1A1A1A]">
        <h2 className="text-lg font-black text-banana-dark mb-4 flex items-center gap-1.5 border-b-2 border-stone-100 pb-2">
          <span>📊</span> TODAY&rsquo;S VERDICT STATE
        </h2>
        {todayCombo ? (
          <div className="space-y-3 font-bold text-sm text-stone-600">
            <p>
              <span className="text-stone-400">Combo:</span> &ldquo;
              <strong className="text-banana-dark">{todayCombo.text}</strong>&rdquo;
            </p>
            <p>
              <span className="text-stone-400">Date:</span> {todayCombo.scheduledDate} (IST)
            </p>
            <p>
              <span className="text-stone-400">Total votes cast:</span> {total.toLocaleString()}
            </p>
            <div className="flex gap-4 text-xs font-black pt-1">
              <span className="text-banana-green">🍌 Banana: {todayCombo.votes.banana} ({bananaPct}%)</span>
              <span className="text-banana-red">🚫 Not: {todayCombo.votes.not} ({notPct}%)</span>
            </div>
          </div>
        ) : (
          <p className="text-stone-400 font-bold italic text-sm">No combo live today.</p>
        )}
      </div>

      {/* Seeding Drawer */}
      <div className="bg-white border-4 border-banana-dark rounded-3xl p-6 shadow-[6px_6px_0px_#1A1A1A]">
        <h2 className="text-lg font-black text-banana-dark mb-4 flex items-center gap-1.5 border-b-2 border-stone-100 pb-2">
          <span>🌱</span> SEED COMBO BANK
        </h2>
        <div className="space-y-4">
          <p className="text-xs text-stone-500 font-bold leading-relaxed">
            Loads the preset bank of 24 combos sequentially. Starting date determines the launch day scheduler.
          </p>
          <div className="flex gap-4 items-center">
            <input
              type="date"
              value={seedDate}
              onChange={(e) => setSeedDate(e.target.value)}
              className="flex-1 bg-stone-50 border-3 border-banana-dark rounded-xl px-3 py-2 text-sm font-bold focus:outline-none"
            />
            <button
              onClick={handleSeed}
              disabled={isSeeding}
              className="bg-banana-yellow hover:bg-[#ffe169] text-banana-dark border-3 border-banana-dark font-black text-xs py-2.5 px-4 rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1A1A1A] transition-all cursor-pointer"
            >
              {isSeeding ? 'SEEDING...' : 'RUN SEED'}
            </button>
          </div>
        </div>
      </div>

      {/* Pending Items Drawer */}
      <div className="bg-white border-4 border-banana-dark rounded-3xl p-6 shadow-[6px_6px_0px_#1A1A1A]">
        <h2 className="text-lg font-black text-banana-dark mb-4 flex items-center gap-1.5 border-b-2 border-stone-100 pb-2">
          <span>🍳</span> PENDING USER COMBOS ({pendingList.length})
        </h2>

        {pendingList.length === 0 ? (
          <p className="text-stone-400 font-bold italic text-sm text-center py-6">
            The inspection drawer is clean! No pending combo submissions. 🍌
          </p>
        ) : (
          <div className="space-y-6">
            {pendingList.map((item) => (
              <div 
                key={item.id} 
                className="border-3 border-banana-dark rounded-2xl p-4 space-y-4 bg-stone-50 shadow-[2px_2px_0px_#1A1A1A]"
              >
                <div className="flex justify-between items-center text-[10px] font-black text-stone-400">
                  <span className="bg-stone-200 border-2 border-banana-dark px-2 py-0.5 rounded text-stone-600">
                    {item.category}
                  </span>
                  <span>
                    Sub: {new Date(item.submittedAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="font-extrabold text-sm text-banana-dark leading-snug">
                  &ldquo;{item.text}&rdquo;
                </p>

                <div className="space-y-3 pt-2 border-t border-dashed border-stone-300">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-stone-500">
                      SCHEDULE DATE (YYYY-MM-DD IST):
                    </label>
                    <input
                      type="date"
                      required
                      value={scheduleDates[item.id] || ''}
                      onChange={(e) => handleDateChange(item.id, e.target.value)}
                      className="bg-white border-2 border-banana-dark rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handleApprove(item.id, item.text)}
                    disabled={isSubmitting === item.id}
                    className="w-full bg-banana-green hover:bg-[#5fc763] text-white border-3 border-banana-dark font-black text-xs py-2 px-3 rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1A1A1A] transition-all cursor-pointer flex justify-center items-center"
                  >
                    {isSubmitting === item.id ? 'APPROVING...' : 'APPROVE & SCHEDULE'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
