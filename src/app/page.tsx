import { getISTDateString } from '@/lib/timezone';
import { getTodayCombo } from '@/lib/db';
import HomeClient from './HomeClient';

// Ensure the page is dynamically rendered every request to get the correct IST date
export const dynamic = 'force-dynamic';

export default async function Page() {
  const dateStr = getISTDateString();
  const todayCombo = await getTodayCombo(dateStr);

  if (!todayCombo) {
    // Should never happen due to the mock fallback in getTodayCombo, but just in case
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-white border-4 border-banana-dark rounded-3xl shadow-[6px_6px_0px_#1A1A1A]">
        <span className="text-4xl mb-4">😰</span>
        <h1 className="text-2xl font-black text-banana-dark mb-2">No Combo Found!</h1>
        <p className="text-stone-500 font-bold">The kitchen is currently locked. Check back in a bit!</p>
      </div>
    );
  }

  return <HomeClient todayCombo={todayCombo} todayDateStr={dateStr} />;
}
