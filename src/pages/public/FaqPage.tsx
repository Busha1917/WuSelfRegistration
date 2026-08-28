import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const faqs = [
  { q: 'How do I apply for admission?', a: 'Create an account, fill out the application form, upload required documents, and submit. You can track your application status in real-time from your dashboard.' },
  { q: 'What documents do I need?', a: 'Required documents typically include: passport photo, high school transcript, national ID copy, and birth certificate. Specific programs may have additional requirements.' },
  { q: 'Can I apply to more than one program?', a: 'Yes, you can select a first choice and an optional second choice program during application.' },
  { q: 'How long does the review take?', a: 'Applications are typically reviewed within 2-4 weeks. You will receive notifications at each stage of the process.' },
  { q: 'What if my application is rejected?', a: 'You will receive a rejection reason and any required corrective actions. You can resubmit within the deadline provided.' },
  { q: 'How do I re-register for the next semester?', a: 'Log in to your dashboard and navigate to Semester Re-registration. Confirm your enrollment and ensure your fees are cleared.' },
  { q: 'When will I receive my student ID?', a: 'Your digital ID card is generated automatically after your application is approved. You can download or print it from the ID Card section.' },
  { q: 'How is class placement determined?', a: 'Class sections are assigned by the registrar based on program, capacity, and campus. You can view your placement after it is published.' },
];

export default function FaqPage() {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold text-wu-ink mb-2">{t('public.faq.title')}</h1>
      <p className="text-neutral mb-8">{t('public.faq.description')}</p>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span className="font-medium text-wu-ink text-sm pr-4">{faq.q}</span>
              <span className="text-neutral text-lg flex-shrink-0">{openIdx === idx ? '−' : '+'}</span>
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-4 text-sm text-neutral leading-relaxed">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
