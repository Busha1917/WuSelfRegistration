import React from 'react';

interface SectionHeaderProps {
  category: string;
  title: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  category,
  title,
  action,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'sm:flex-row sm:items-end justify-between'
      } mb-12 ${className}`}
    >
      <div>
        <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-1">
          {category}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading">
          {title}
        </h2>
        {/* AAU Dual Accent Underline */}
        <div className={`flex items-center gap-1 mt-3 ${isCenter ? 'justify-center' : ''}`}>
          <div className="h-1 w-10 bg-[#D9251D]" />
          <div className="h-1 w-16 bg-[#0073AA]" />
        </div>
      </div>

      {action && <div className="mt-4 sm:mt-0">{action}</div>}
    </div>
  );
}
