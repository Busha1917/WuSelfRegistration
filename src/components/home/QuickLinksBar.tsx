import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function QuickLinksBar() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('portal.quickLinks.freshmen', 'Freshmen Registration'), to: '/register' },
    { label: t('portal.hero.slide3BtnPrimary', 'Check Admission Status'), to: '/lookup' },
    { label: t('portal.nav.calendar', 'Academic Calendar'), to: '/calendar' },
    { label: t('portal.quickLinks.dorm', 'Campus Placement'), to: '/lookup' },
    { label: t('portal.hero.slide3BtnSecondary', 'Registrar Helpdesk'), to: '/faq' },
  ];

  return (
    <section className="bg-white py-6 border-b border-gray-200">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#00486E] uppercase tracking-wider shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#D9251D]" />
          <span>{t('portal.impact.badge', 'Quick Links')} :</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 justify-center md:justify-end">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm hover:shadow flex items-center gap-1.5"
            >
              <span>{item.label}</span>
              <span className="text-[10px]">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
