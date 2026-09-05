import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/shared/SectionHeader';

export default function RegistrationSteps() {
  const { t } = useTranslation();

  const steps = [
    {
      step: '01',
      title: t('portal.steps.step1Title', '1. Create Portal Account'),
      desc: t(
        'portal.steps.step1Desc',
        'Sign up using your official student admission number, national exam credentials, and email.'
      ),
      link: '/register',
      linkText: t('portal.nav.beginRegistration', 'Create Account'),
    },
    {
      step: '02',
      title: t('portal.steps.step2Title', '2. Verify Details & Uploads'),
      desc: t(
        'portal.steps.step2Desc',
        'Review pre-loaded Grade 12 results, upload ID photograph, and confirm personal contact information.'
      ),
      link: '/login',
      linkText: t('portal.nav.portalLogin', 'Upload Scans'),
    },
    {
      step: '03',
      title: t('portal.steps.step3Title', '3. Choose Stream & Campus'),
      desc: t(
        'portal.steps.step3Desc',
        'Select available freshman cohort streams across Nekemte, Shambu, or Gimbi campuses.'
      ),
      link: '/lookup',
      linkText: t('portal.campusesPage.checkPlacement', 'Check Status'),
    },
    {
      step: '04',
      title: t('portal.steps.step4Title', '4. Receive Digital ID & Schedule'),
      desc: t(
        'portal.steps.step4Desc',
        'Instantly download your validated digital student ID card, class schedule, and reporting instructions.'
      ),
      link: '/login',
      linkText: t('portal.nav.portalLogin', 'View ID Card'),
    },
  ];

  return (
    <section className="py-20 bg-[#F4F6F8] border-y border-gray-200">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          category={t('portal.steps.category', 'HOW TO ENROLL')}
          title={t('portal.steps.title', 'Four-Step Digital Self-Registration Workflow')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-white p-8 rounded-sm border border-gray-200 hover:border-[#0073AA] transition-all hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-[#00486E] font-heading group-hover:text-[#0073AA] transition-colors">
                    {item.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#EBF3F8] text-[#0073AA] flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#00486E] group-hover:text-[#0073AA] transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0073AA] group-hover:text-[#005C8A] uppercase tracking-wider"
                >
                  <span>{item.linkText}</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
