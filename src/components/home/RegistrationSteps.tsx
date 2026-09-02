import { Link } from 'react-router-dom';
import SectionHeader from '@/components/shared/SectionHeader';

const steps = [
  {
    step: '01',
    title: 'Create Account & Apply',
    desc: 'Register online with your national ID or entrance exam number, enter your biodata, and choose your preferred study program.',
    link: '/register',
    linkText: 'Create Account',
  },
  {
    step: '02',
    title: 'Attach Credentials',
    desc: 'Upload clear scans of your Grade 12 national examination results, secondary school transcripts, and recent passport-style photograph.',
    link: '/login',
    linkText: 'Upload Scans',
  },
  {
    step: '03',
    title: 'Registrar Review & Section',
    desc: 'The university admissions office verifies your credentials and assigns you to your campus cohort and classroom section.',
    link: '/lookup',
    linkText: 'Check Status',
  },
  {
    step: '04',
    title: 'Digital ID & Class Enrollment',
    desc: 'Download your official Wollega University digital student ID card with verification QR code and report for freshman orientation.',
    link: '/login',
    linkText: 'View ID Card',
  },
];

export default function RegistrationSteps() {
  return (
    <section className="py-20 bg-[#F4F6F8] border-y border-gray-200">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          category="DIGITAL ADMISSIONS WORKFLOW"
          title="Four Steps to Complete Your Self-Registration"
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
