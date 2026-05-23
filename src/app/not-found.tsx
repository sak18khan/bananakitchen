import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white border-4 border-banana-dark rounded-3xl shadow-[6px_6px_0px_#1A1A1A] select-none">
      <span className="text-5xl mb-4 animate-bounce inline-block">🍌</span>
      <h1 className="text-3xl font-black text-banana-dark mb-4 leading-tight">
        404 — PEEL OFF!
      </h1>
      <p className="text-stone-500 font-extrabold text-sm md:text-base leading-relaxed mb-8 px-2">
        This combo doesn&rsquo;t exist. <br />
        <span className="text-banana-red font-black">But your life choices might.</span>
      </p>
      <Link
        href="/"
        className="bg-banana-yellow hover:bg-[#ffe169] text-banana-dark border-3 border-banana-dark font-black text-sm py-3 px-6 rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1A1A1A] transition-all cursor-pointer"
      >
        GO BACK HOME
      </Link>
    </div>
  );
}
