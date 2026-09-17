import React from 'react';

interface MetricItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface DashboardHeroProps {
  badge: string;
  title: string;
  description?: string | React.ReactNode;
  stats?: MetricItem[];
  actions?: React.ReactNode;
  accentColor?: 'blue' | 'red' | 'green' | 'purple';
  children?: React.ReactNode;
  compact?: boolean;
}

export default function DashboardHero({
  badge,
  title,
  description,
  stats,
  actions,
  accentColor = 'blue',
  children,
  compact = false,
}: DashboardHeroProps) {
  const pulseColors = {
    blue: 'bg-[#66C2FF]',
    red: 'bg-[#D9251D]',
    green: 'bg-[#10B981]',
    purple: 'bg-[#A78BFA]',
  };

  const hasStats = stats && stats.length > 0;

  return (
    <div className={`relative bg-[#00486E] text-white rounded-sm ${compact || !hasStats ? 'p-5 sm:p-7' : 'p-6 sm:p-8 lg:p-10'} mb-8 overflow-hidden shadow-md`}>
      {/* Background Image & AAU Navy Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image1.jpg"
          alt="Wallaga University Campus"
          className="w-full h-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002B40] via-[#00486E]/95 to-[#00486E]/90" />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className={`relative z-10 flex flex-col ${hasStats ? 'lg:flex-row lg:items-center lg:justify-between gap-6' : 'gap-4'}`}>
        <div className={hasStats ? 'max-w-3xl' : 'max-w-4xl'}>
          <div className="inline-flex items-center gap-2 bg-[#002B40] text-gray-200 border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <span className={`w-2 h-2 rounded-full animate-pulse ${pulseColors[accentColor]}`} />
            <span>{badge}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight">
            {title}
          </h1>

          {description && (
            typeof description === 'string' ? (
              <p className="text-xs sm:text-sm text-gray-200 mt-2 leading-relaxed max-w-3xl">
                {description}
              </p>
            ) : (
              description
            )
          )}

          {children}

          {actions && <div className="mt-5 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>

        {stats && stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/15 lg:pl-8">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-[#002B40]/70 border border-white/10 rounded px-3 sm:px-4 py-3 text-center min-w-[95px] sm:min-w-[115px]"
              >
                <div className={`text-lg sm:text-xl md:text-2xl font-black ${s.highlight ? 'text-[#10B981]' : 'text-white'}`}>
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-[11px] text-gray-300 uppercase tracking-wider font-medium mt-0.5 whitespace-nowrap">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
