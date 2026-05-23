import { getISTDateString } from '@/lib/timezone';
import { getTodayCombo, getPendingSubmissions } from '@/lib/db';
import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminPage(props: PageProps) {
  const searchParams = await props.searchParams; // Asynchronous in Next.js 15/16!
  const key = searchParams.key;

  const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || 'banana_secret';

  if (!key || key !== ADMIN_KEY) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-white border-4 border-banana-dark rounded-3xl shadow-[6px_6px_0px_#1A1A1A] select-none">
        <span className="text-4xl mb-4">🚫</span>
        <h1 className="text-2xl font-black text-banana-dark mb-2">Unauthorized!</h1>
        <p className="text-stone-500 font-bold leading-relaxed text-sm">
          The inspection drawer is locked. You don&rsquo;t have the golden key to the Banana Kitchen!
        </p>
      </div>
    );
  }

  const todayDateStr = getISTDateString();
  const todayCombo = await getTodayCombo(todayDateStr);
  const pendingSubmissions = await getPendingSubmissions();

  return (
    <AdminClient
      secretKey={key}
      todayCombo={todayCombo}
      pendingSubmissions={pendingSubmissions}
      todayDateStr={todayDateStr}
    />
  );
}
