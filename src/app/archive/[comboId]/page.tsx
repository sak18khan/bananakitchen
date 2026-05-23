import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getComboDetails, getComments } from '@/lib/db';
import CommentsSection from './CommentsSection';

interface PageProps {
  params: Promise<{ comboId: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { comboId } = await props.params;
  const combo = await getComboDetails(comboId);
  if (!combo) {
    return {
      title: 'Not Found — Banana Kitchen',
    };
  }

  const total = combo.votes.banana + combo.votes.not;
  const bananaPct = total > 0 ? Math.round((combo.votes.banana / total) * 100) : 50;

  return {
    title: `${combo.text} — Banana or Not? 🍌`,
    description: `${bananaPct}% of people think this is acceptable. What do you think?`,
    openGraph: {
      title: `${combo.text} — Banana or Not? 🍌`,
      description: `${bananaPct}% of people think this is acceptable. What do you think?`,
      url: `https://bananakitchen.in/archive/${comboId}`,
      siteName: 'Banana Kitchen',
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${combo.text} — Banana or Not? 🍌`,
      description: `${bananaPct}% of people think this is acceptable. What do you think?`,
    },
  };
}

export default async function ComboDetailPage(props: PageProps) {
  const { comboId } = await props.params;
  const combo = await getComboDetails(comboId);

  if (!combo) {
    notFound();
  }

  const comments = await getComments(comboId);

  const totalVotes = combo.votes.banana + combo.votes.not;
  const bananaPercent = totalVotes > 0 ? Math.round((combo.votes.banana / totalVotes) * 100) : 50;
  const notPercent = totalVotes > 0 ? Math.round((combo.votes.not / totalVotes) * 100) : 50;

  const isAcceptable = bananaPercent >= notPercent;

  return (
    <div className="flex flex-col flex-1 pb-12">
      {/* Back Button */}
      <Link 
        href="/archive"
        className="self-start text-stone-500 hover:text-banana-dark font-extrabold text-sm mb-6 flex items-center gap-1.5 hover:underline"
      >
        <span>←</span> BACK TO ARCHIVE
      </Link>

      {/* Main Details Card */}
      <div className="w-full bg-white border-4 border-banana-dark rounded-3xl p-6 shadow-[6px_6px_0px_#1A1A1A] select-none">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-stone-100 border-2 border-banana-dark text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {combo.category}
          </span>
          <span className="text-stone-500 text-xs font-bold">
            {combo.scheduledDate}
          </span>
        </div>

        <div className="text-center my-6">
          <h2 className="text-2xl md:text-3xl font-black text-banana-dark tracking-tight leading-snug">
            &ldquo;{combo.text}&rdquo;
          </h2>
        </div>

        <div className="space-y-4 border-t border-stone-100 pt-4">
          <div className="flex justify-between items-center text-xs font-extrabold text-stone-500">
            <span>VOTE BREAKDOWN</span>
            <span>👥 {totalVotes.toLocaleString()} total votes</span>
          </div>

          {/* Banana Bar */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-bold">
              <span>🍌 Banana (acceptable)</span>
              <span>{bananaPercent}%</span>
            </div>
            <div className="w-full bg-stone-100 border-2 border-banana-dark h-6 rounded-full overflow-hidden">
              <div 
                className="bg-banana-yellow h-full border-r-2 border-banana-dark"
                style={{ width: `${bananaPercent}%` }}
              />
            </div>
          </div>

          {/* Not Bar */}
          <div>
            <div className="flex justify-between items-center mb-1 text-sm font-bold">
              <span>🚫 Not (criminal)</span>
              <span>{notPercent}%</span>
            </div>
            <div className="w-full bg-stone-100 border-2 border-banana-dark h-6 rounded-full overflow-hidden">
              <div 
                className="bg-banana-red h-full border-r-2 border-banana-dark"
                style={{ width: `${notPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className="mt-6 text-center p-3 bg-stone-50 border-2 border-banana-dark rounded-2xl flex items-center justify-center gap-2">
          <span className="text-xl">{isAcceptable ? '🍌' : '🚫'}</span>
          <span className="font-black text-sm uppercase tracking-wider text-banana-dark">
            VERDICT: {isAcceptable ? 'CREATIVE & ACCEPTABLE' : 'CRIMINALLY CRIMINAL'}
          </span>
        </div>
      </div>

      {/* Comments Section */}
      <CommentsSection comboId={comboId} initialComments={comments} />
    </div>
  );
}
