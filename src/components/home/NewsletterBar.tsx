import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function NewsletterBar() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    addToast('Thank you for subscribing to Wallaga University admission circulars!', 'success');
    setEmail('');
  };

  return (
    <section className="bg-[#002B40] text-white py-14 border-t-2 border-[#0073AA]">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
            STAY INFORMED
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Subscribe to Admission Bulletins & Senate Notices
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
            Receive instant email updates on registration dates, entrance exams, dorm allocations, and graduation announcements.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            required
            className="px-4 py-3 bg-white/10 border border-white/20 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3E0] min-w-[280px]"
          />
          <button
            type="submit"
            className="bg-[#D9251D] hover:bg-[#B71C1C] text-white font-bold px-6 py-3 rounded text-sm uppercase tracking-wider transition-colors shrink-0 shadow"
          >
            Subscribe ↗
          </button>
        </form>
      </div>
    </section>
  );
}
