import Link from 'next/link';
import { getISTDateString } from '@/lib/timezone';
import { getPastCombos } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ArchivePage() {
  const todayStr = getISTDateString();
  const pastCombos = await getPastCombos(todayStr);

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
        <h1 className="text-3xl font-black text-banana-dark select-none flex items-center justify-center gap-1.5">
          <span>🗄️</span> THE ARCHIVE
        </h1>
        <p className="text-stone-500 font-bold mt-2 text-xs md:text-sm">
          Past experiments and culinary crimes. No voting here.
        </p>
      </div>

      {pastCombos.length === 0 ? (
        <div className="bg-white border-4 border-banana-dark rounded-2xl p-6 text-center shadow-[4px_4px_0px_#1A1A1A]">
          <span className="text-3xl mb-2 inline-block">🫙</span>
          <p className="font-bold text-stone-500">The archive is currently empty. Check back tomorrow!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pastCombos.map((combo, index) => {
            const total = combo.votes.banana + combo.votes.not;
            const bananaPct = total > 0 ? Math.round((combo.votes.banana / total) * 100) : 50;
            const notPct = total > 0 ? Math.round((combo.votes.not / total) * 100) : 50;

            const isAcceptable = bananaPct >= 50;

            return (
              <div key={combo.id} className="contents">
                {/* Combo Card */}
                <Link
                  href={`/archive/${combo.id}`}
                  className="block bg-white border-4 border-banana-dark rounded-2xl p-5 shadow-[4px_4px_0px_#1A1A1A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[4px_4px_0px_#1A1A1A] transition-all"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] bg-stone-100 border-2 border-banana-dark font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider text-stone-600">
                      {combo.category}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400">
                      {combo.scheduledDate}
                    </span>
                  </div>

                  <h2 className="text-lg font-black text-banana-dark mb-4 leading-snug line-clamp-2">
                    &ldquo;{combo.text}&rdquo;
                  </h2>

                  <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                    <div className="flex gap-3 text-xs font-extrabold">
                      <span className="text-banana-green">🍌 {bananaPct}% acceptable</span>
                      <span className="text-banana-red">🚫 {notPct}% criminal</span>
                    </div>
                    <span className="text-[10px] font-bold text-stone-400">
                      💬 comments
                    </span>
                  </div>
                </Link>

                {/* ADSENSE_SLOT_2 (Render between every 6 cards) */}
                {(index + 1) % 6 === 0 && (
                  <div className="w-full h-[80px] bg-stone-100 border-2 border-dashed border-stone-300 rounded-xl flex items-center justify-center text-[10px] text-stone-400 font-bold select-none my-4">
                    {/* ADSENSE_SLOT_2 */}
                    AD ADVERTISEMENT PLACEHOLDER
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
