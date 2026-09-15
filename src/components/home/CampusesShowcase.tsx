import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';

const campuses = [
  {
    name: 'Nekemte Main Campus',
    established: 'ESTABLISHED 2007',
    desc: 'The central administration and flagship campus hosting Technology, Health Sciences, Business, Social Sciences, and Law faculties.',
    image: '/image1.jpg',
    programs: '80+ Programs',
    students: '18,000+ Students',
    features: ['Central Referral Hospital', 'Innovation & STEM Hub', 'Modern Sports Complex'],
  },
  {
    name: 'Shambu Campus',
    established: 'ESTABLISHED 2011',
    desc: 'Specialized campus centered on Agriculture, Natural Resource Management, Veterinary Medicine, and Computational Sciences in Horro Guduru.',
    image: '/image5.jpg',
    programs: '25+ Programs',
    students: '6,000+ Students',
    features: ['Agri-Research Demonstration Farm', 'Veterinary Clinic', 'High-Speed Fiber Network'],
  },
  {
    name: 'Gimbi Campus',
    established: 'ESTABLISHED 2014',
    desc: 'Dynamic educational center specializing in Education, Behavioral Sciences, Mineral Resources, and Continuing Education in West Wallaga.',
    image: '/image4.jpg',
    programs: '20+ Programs',
    students: '4,500+ Students',
    features: ['Teacher Training Labs', 'Geological Specimen Center', 'Community Legal Aid Clinic'],
  },
];

import { useTranslation } from 'react-i18next';

export default function CampusesShowcase() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          category={t('portal.campusesShowcase.category', 'UNIVERSITY INFRASTRUCTURE')}
          title={t('portal.campusesShowcase.title', 'Explore Our Three Thriving Campuses')}
          action={
            <Link
              to="/campuses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0073AA] hover:text-[#005C8A] uppercase tracking-wider transition-colors"
            >
              <span>{t('portal.campusesShowcase.guide', 'Detailed Campus Guide ↗')}</span>
            </Link>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {campuses.map((c) => (
            <div
              key={c.name}
              className="border border-gray-200 hover:border-[#0073AA] rounded-sm overflow-hidden transition-all group shadow-sm hover:shadow-lg flex flex-col justify-between bg-white"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#002B40]/90 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded">
                    {c.established}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-[#00486E] group-hover:text-[#0073AA] transition-colors mb-2">
                    {c.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {c.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs mb-4">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">Curriculum</span>
                      <span className="font-bold text-[#00486E]">{c.programs}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">Enrollment</span>
                      <span className="font-bold text-[#00486E]">{c.students}</span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {c.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <span className="text-[#0073AA] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/campuses"
                  className="w-full bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider py-3 rounded flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>{t('portal.campusesShowcase.explore', 'Explore Campus Facilities ↗')}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
