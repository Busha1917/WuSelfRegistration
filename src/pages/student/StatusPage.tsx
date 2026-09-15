import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { applicationService } from '@/mocks/services';
import type { Application } from '@/types';
import StatusBadge from '@/components/shared/StatusBadge';
import DashboardHero from '@/components/shared/DashboardHero';

export default function StatusPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (user) applicationService.getApplicationByStudentId(user.id).then(setApplication);
  }, [user]);

  const timelinePhases = [
    {
      title: 'Online Application Submission',
      date: 'August 24, 2026',
      desc: 'Applicant submitted official biodata, Grade 12 national exam credentials, and chosen degree programs.',
      done: true,
    },
    {
      title: 'Document & Certificate Verification',
      date: 'August 28, 2026',
      desc: 'Registrar verification team authenticated Grade 12 educational certificates against the national database.',
      done: true,
    },
    {
      title: 'Senate Quota & Campus Placement',
      date: 'September 01, 2026',
      desc: 'Candidate assigned to Nekemte Main Campus, College of Engineering & Technology (B.Sc. Software Engineering).',
      done: true,
    },
    {
      title: 'Official Matriculation Approval',
      date: 'September 03, 2026',
      desc: 'Formal university admission confirmed. Digital student ID card generated and class section allocated.',
      done: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="APPLICATION TRACKING & MILESTONES"
        title={t('student.status.title', 'Admission Verification Status')}
        description="Follow the real-time stage progression of your Wallaga University admission dossier, from initial document upload through Senate matriculation clearance."
        stats={[
          { label: 'Overall Status', value: 'Approved', highlight: true },
          { label: 'Reviewed By', value: 'Registrar' },
          { label: 'AY Cycle', value: '2026/27' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Timeline progression */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
                AUDIT AUDIT TRAIL
              </span>
              <h3 className="text-lg font-bold font-heading text-[#00486E]">
                Four-Stage Admission Lifecycle
              </h3>
            </div>
            <StatusBadge status={application?.status || 'approved'} />
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#0073AA]/30">
            {timelinePhases.map((phase, idx) => (
              <div key={idx} className="relative">
                {/* Checkmark circle */}
                <div className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full bg-[#0073AA] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs">
                  ✓
                </div>

                <div className="bg-[#FAFBFD] p-4 sm:p-5 rounded border border-gray-200 hover:border-[#0073AA] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="text-sm font-bold text-[#00486E]">{phase.title}</h4>
                    <span className="text-[11px] font-semibold text-gray-500 font-mono">{phase.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Key Details & Next Steps */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs">
            <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider block mb-1">
              ADMISSION SUMMARY
            </span>
            <h4 className="text-base font-bold font-heading text-[#00486E] mb-4">
              Verified Candidate Info
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Applicant Name:</span>
                <span className="font-bold text-gray-800">{user?.fullName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Application Ref:</span>
                <span className="font-bold text-[#00486E] font-mono">WU-2026-0412</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Campus:</span>
                <span className="font-bold text-[#00486E]">Nekemte Main</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Degree Program:</span>
                <span className="font-bold text-gray-800">Software Eng.</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Study Stream:</span>
                <span className="font-bold text-emerald-700">Regular Undergrad</span>
              </div>
            </div>
          </div>

          <div className="bg-[#002B40] text-white p-6 rounded-sm shadow-sm border-l-4 border-[#D9251D] space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#66C2FF] block">
              NEXT REQUIRED ACTION
            </span>
            <h4 className="text-base font-bold font-heading">
              Download ID & Report to Campus
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Your registration is fully confirmed. Please download and print your official Student ID Card and review your lecture hall schedule.
            </p>
            <div className="pt-2">
              <Link
                to="/student/id-card"
                className="w-full bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded text-center block transition-colors"
              >
                Go to ID Card ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
