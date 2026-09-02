import { useEffect, useState } from 'react';

interface PageLoaderProps {
  show: boolean;
}

export default function PageLoader({ show }: PageLoaderProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-wu-cream transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Spinning logo */}
        <div className="relative w-20 h-20">
          <img
            src="/logo1.png"
            alt="Loading"
            className="w-20 h-20 rounded-full object-cover animate-spin-slow"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-wu-maroon border-r-wu-gold animate-spin" />
        </div>
        {/* Dots */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-wu-maroon rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2.5 h-2.5 bg-wu-maroon rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2.5 h-2.5 bg-wu-maroon rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-sm text-neutral font-medium">Loading...</p>
      </div>
    </div>
  );
}
