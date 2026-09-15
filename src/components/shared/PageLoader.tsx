import { useEffect, useState } from 'react';

interface PageLoaderProps {
  show: boolean;
  message?: string;
}

export default function PageLoader({ show, message = 'Loading page...' }: PageLoaderProps) {
  const [rendered, setRendered] = useState(show);

  useEffect(() => {
    if (show) {
      setRendered(true);
    } else {
      const timer = setTimeout(() => setRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!rendered && !show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-300 font-sans ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      role="status"
      aria-live="polite"
    >
      {/* Top Animated Progress Line (AAU Gradient) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden z-[10000]">
        <div className="h-full bg-gradient-to-r from-[#D9251D] via-[#0073AA] to-[#00486E] animate-pulse" />
      </div>

      <div className="flex flex-col items-center gap-4 text-center px-4">
        {/* Glowing Logo with Dual AAU Spinner Ring */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer dual-accent spinning ring */}
          <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-[#D9251D] border-r-[#0073AA] border-b-[#00486E] animate-spin" />

          {/* Centered illuminated university emblem */}
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-md bg-white border-2 border-gray-100 p-0.5">
            <img
              src="/logo1.png"
              alt="Wallaga University"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* University Brand Lockup */}
        <div className="space-y-0.5">
          <div className="text-xs font-bold text-[#00486E] font-heading">ወለጋ ዩኒቨርሲቲ</div>
          <div className="text-base font-extrabold text-[#D9251D] tracking-tight">Wallaga UNIVERSITY</div>
          <div className="text-[11px] text-gray-500 font-medium tracking-wide">
            Student Self-Registration System (WU-SSRS)
          </div>
        </div>

        {/* Animated Loading Indicator & Message */}
        <div className="flex items-center gap-2 pt-2">
          <div className="w-2 h-2 rounded-full bg-[#0073AA] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#D9251D] animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#00486E] animate-bounce" style={{ animationDelay: '300ms' }} />
          <span className="text-xs font-semibold text-gray-600 ml-1">{message}</span>
        </div>
      </div>
    </div>
  );
}
