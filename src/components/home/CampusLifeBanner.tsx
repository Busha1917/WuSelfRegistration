import { useTranslation } from 'react-i18next';

export default function CampusLifeBanner() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[440px] flex items-center bg-gray-900 overflow-hidden">
      <img
        src="/image2.jpg"
        alt="Wallaga University Campus Life"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10 py-16">
        <div className="max-w-xl bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-sm shadow-2xl border-l-4 border-[#0073AA]">
          <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-2">
            {t('portal.campusLife.tag', 'CAMPUS LIFE & STUDENT FACILITIES')}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading leading-tight mb-4">
            {t('portal.campusLife.title', 'A Supportive, Engaging Academic Community')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {t(
              'portal.campusLife.desc',
              'From modern university dormitories and dining halls to high-speed digital research libraries and student sports clubs, Wallaga University provides a complete ecosystem for intellectual and personal growth.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
