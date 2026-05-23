'use client';

import { useState } from 'react';
import { Comment } from '@/lib/db';
import { submitCommentAction } from '@/app/actions/actions';

interface CommentsSectionProps {
  comboId: string;
  initialComments: Comment[];
}

export default function CommentsSection({ comboId, initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
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
      setErrorMessage('Comment cannot be empty!');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitCommentAction(comboId, cleanText, name);
      if (res.success && res.comment) {
        // Form response date conversion
        const newComment: Comment = {
          ...res.comment,
          createdAt: new Date(res.comment.createdAt)
        };
        setComments((prev) => [newComment, ...prev]);
        setText('');
        setSuccessMessage('Comment added! Let it cook. 🍌');
      } else {
        setErrorMessage(res.message || 'Failed to submit comment.');
      }
    } catch (err) {
      console.error('Comment submission error:', err);
      setErrorMessage('Something went wrong. Try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 border-t-4 border-banana-dark pt-6 w-full">
      <h3 className="text-xl font-black text-banana-dark mb-4 flex items-center gap-1.5 select-none">
        <span>💬</span> CHATTER ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Your Name (defaults to Anonymous Banana Fan)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            maxLength={30}
            className="w-full bg-white border-3 border-banana-dark rounded-xl px-4 py-2 text-sm font-bold placeholder-stone-400 focus:outline-none focus:bg-stone-50 transition-colors"
          />
        </div>

        <div>
          <textarea
            placeholder="What's your verdict on this chaos? Be honest..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
            maxLength={200}
            rows={3}
            required
            className="w-full bg-white border-3 border-banana-dark rounded-xl px-4 py-2.5 text-sm font-bold placeholder-stone-400 focus:outline-none focus:bg-stone-50 transition-colors resize-none"
          />
          <div className="text-right text-[10px] font-bold text-stone-400 mt-1 select-none">
            {text.length}/200 chars
          </div>
        </div>

        {errorMessage && (
          <div className="bg-banana-red/10 border-2 border-banana-red text-banana-red rounded-xl p-3 text-xs font-bold">
            🚨 {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-banana-green/10 border-2 border-banana-green text-banana-green rounded-xl p-3 text-xs font-bold">
            🎉 {successMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-banana-yellow hover:bg-[#ffe169] text-banana-dark border-3 border-banana-dark font-black text-sm py-3 px-4 rounded-xl shadow-[3px_3px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1A1A1A] transition-all cursor-pointer flex justify-center items-center"
        >
          {isSubmitting ? 'POSTING...' : 'POST COMMENT'}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-stone-400 text-sm font-bold text-center py-4 italic select-none">
            No arguments yet. Be the first to start the food war! 🤺
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-stone-50 border-3 border-banana-dark rounded-xl p-4 shadow-[2px_2px_0px_#1A1A1A]"
            >
              <div className="flex justify-between items-center mb-2 select-none">
                <span className="text-xs font-black text-stone-700">
                  🤠 {comment.name}
                </span>
                <span className="text-[10px] font-bold text-stone-400">
                  {new Date(comment.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <p className="text-sm font-bold text-banana-dark leading-relaxed whitespace-pre-wrap">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
