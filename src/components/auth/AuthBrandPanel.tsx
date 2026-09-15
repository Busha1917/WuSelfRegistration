import React from 'react';
import { useTranslation } from 'react-i18next';

interface MetricItem {
  value: string;
  label: string;
  highlight?: boolean;
}

interface AuthBrandPanelProps {
  badgeText?: string;
  category?: string;
  title: string;
  description: string;
  metrics?: MetricItem[];
  children?: React.ReactNode;
  quote?: string;
  campuses?: string;
}

export default function AuthBrandPanel({
  badgeText,
  category,
  title,
  description,
  metrics,
  children,
  quote,
  campuses,
}: AuthBrandPanelProps) {
  const { t } = useTranslation();

  const finalBadge = badgeText || t('portal.authBrand.badge', 'Official University Academic Portal');
  const finalCategory = category !== undefined ? category : t('portal.authBrand.category', 'ACADEMIC SELF-SERVICE');
  const finalQuote = quote || t('portal.authBrand.quote', '"Seek Wisdom, Pursue Excellence and Empower Nations"');
  const finalCampuses = campuses || t('portal.authBrand.campuses', 'Nekemte • Shambu • Gimbi');

  return (
    <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-[#00486E] text-white flex-col justify-between p-12 xl:p-16 overflow-hidden">
      {/* Background Image with Dark Navy Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
          alt="Wallaga University Campus"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002B40] via-[#00486E]/95 to-[#00486E]/90" />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Top Header */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#002B40]/80 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-200 uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>{finalBadge}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white p-0.5 shrink-0">
            <img src="/logo1.png" alt="Wallaga University" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#66C2FF] font-heading">ወለጋ ዩኒቨርሲቲ</div>
            <div className="text-2xl font-extrabold text-[#D9251D] tracking-tight font-heading leading-tight bg-white px-2 py-0.5 rounded-sm inline-block">
              Wallaga UNIVERSITY
            </div>
            <div className="text-xs text-gray-300 font-medium tracking-wide mt-1">
              {t('portal.brand.subtitle', 'Student Self-Registration Portal (WU-SSRS)')}
            </div>
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 my-auto py-6 max-w-md">
        {finalCategory && (
          <p className="text-xs font-bold tracking-widest text-[#00A3E0] uppercase mb-2">
            {finalCategory}
          </p>
        )}
        <h2 className="text-2xl xl:text-3xl font-extrabold text-white font-heading leading-tight mb-3">
          {title}
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-8">
          {description}
        </p>

        {/* Custom content if any (e.g. Stepper) */}
        {children}

        {/* Default / Provided Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/15 text-center">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className={`text-lg font-black ${m.highlight ? 'text-[#10B981]' : 'text-white'}`}>
                  {m.value}
                </div>
                <div className="text-[11px] text-gray-300">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Note */}
      <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-gray-300">
        <span>* {finalQuote}</span>
        <span className="text-[#66C2FF]">{finalCampuses}</span>
      </div>
    </div>
  );
}
