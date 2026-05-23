'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitComboAction } from '@/app/actions/actions';

export default function SubmitPage() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Sweet Chaos');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanText = text.trim();
    if (!cleanText) {
      setErrorMessage('Please describe the food combination!');
      return;
    }

    if (cleanText.length > 80) {
      setErrorMessage('Keep it under 80 characters, chef!');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitComboAction(cleanText, category);
      if (res.success) {
        setSuccessMessage(res.message);
        setText('');
      } else {
        setErrorMessage(res.message);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Something went wrong. Try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <span>🍳</span> SUBMIT A COMBO
        </h1>
        <p className="text-stone-500 font-bold mt-2 text-xs md:text-sm">
          Got a bizarre combination? Send it to the inspection drawer.
        </p>
      </div>

      {/* Main Submission Form */}
      <div className="bg-white border-4 border-banana-dark rounded-3xl p-6 shadow-[6px_6px_0px_#1A1A1A]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-black text-banana-dark">
              Describe your food combo:
            </label>
            <textarea
              required
              disabled={isSubmitting}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Biryani + Chocolate Syrup + Pineapple"
              maxLength={80}
              rows={3}
              className="w-full bg-white border-3 border-banana-dark rounded-2xl px-4 py-3 text-base font-bold placeholder-stone-400 focus:outline-none focus:bg-stone-50 transition-colors resize-none"
            />
            <div className="text-right text-[10px] font-bold text-stone-400 select-none">
              {text.length}/80 characters
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-black text-banana-dark">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-white border-3 border-banana-dark rounded-2xl px-4 py-3 text-base font-bold text-banana-dark focus:outline-none focus:bg-stone-50 transition-colors cursor-pointer"
            >
              <option value="Sweet Chaos">Sweet Chaos 🍦</option>
              <option value="Savoury Crimes">Savoury Crimes 🌶️</option>
              <option value="Fusion Experiments">Fusion Experiments 🧪</option>
              <option value="Absolute Chaos">Absolute Chaos 🌋</option>
            </select>
          </div>

          {errorMessage && (
            <div className="bg-banana-red/10 border-2 border-banana-red text-banana-red rounded-2xl p-4 text-sm font-bold">
              🚨 {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="bg-banana-green/10 border-2 border-banana-green text-banana-green rounded-2xl p-4 text-sm font-bold">
              🎉 {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-banana-yellow hover:bg-[#ffe169] text-banana-dark border-4 border-banana-dark font-black text-base py-4 rounded-2xl shadow-[4px_4px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1A1A1A] transition-all cursor-pointer flex justify-center items-center"
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT COMBINATION'}
          </button>
        </form>
      </div>

      {/* ADSENSE_SLOT_3 */}
      <div className="w-full h-[150px] bg-stone-100 border-2 border-dashed border-stone-300 rounded-3xl flex items-center justify-center text-[10px] text-stone-400 font-bold select-none mt-8">
        {/* ADSENSE_SLOT_3 */}
        AD ADVERTISEMENT PLACEHOLDER
      </div>
    </div>
  );
}
