import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { semesterService } from '@/mocks/services';
import type { SemesterRegistration } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import StatusBadge from '@/components/shared/StatusBadge';
import { useToast } from '@/components/ui/Toast';

export default function StudentHistoryPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [registrations, setRegistrations] = useState<SemesterRegistration[]>([]);

  useEffect(() => {
    if (user) {
      semesterService.getRegistrations({ page: 1, pageSize: 50 }).then((res) =>
        setRegistrations(res.data.filter((r) => r.studentId === user.id))
      );
    }
  }, [user]);

  const historyItems = [
    {
      term: 'Fall 2026 / 2027',
      semester: 'Semester I',
      credits: '17 ECTS',
      gpa: 'In Progress',
      campus: 'Nekemte Main Campus',
      status: 'active' as const,
      enrolledDate: 'August 28, 2026',
    },
    {
      term: 'Spring 2025 / 2026',
      semester: 'Semester II',
      credits: '18 ECTS',
      gpa: '3.78',
      campus: 'Nekemte Main Campus',
      status: 'approved' as const,
      enrolledDate: 'February 15, 2026',
    },
    {
      term: 'Fall 2025 / 2026',
      semester: 'Semester I',
      credits: '16 ECTS',
      gpa: '3.65',
      campus: 'Nekemte Main Campus',
      status: 'approved' as const,
      enrolledDate: 'October 10, 2025',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="STUDENT ACADEMIC DOSSIER"
        title={t('student.history.title', 'Registration History & Enrollment Archive')}
        description="Comprehensive historical log of past registered semesters, modular credits earned, grade point averages, and official Senate matriculation timestamps."
        stats={[
          { label: 'Completed Terms', value: registrations.length > 0 ? String(registrations.length) : '2' },
          { label: 'Cumulative GPA', value: '3.72', highlight: true },
          { label: 'Total ECTS', value: '51 ECTS' },
        ]}
      />

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
              TRANSCRIPT ARCHIVE
            </span>
            <h3 className="text-lg font-bold font-heading text-[#00486E]">
              Semester Registration History
            </h3>
          </div>
          <button
            onClick={() => addToast('Official student academic grade slip downloaded.', 'success')}
            className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded shadow-xs transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>Download Grade Slip PDF</span>
            <span>⬇</span>
          </button>
        </div>

        <div className="space-y-4">
          {historyItems.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded border border-gray-200 hover:border-[#0073AA] transition-all bg-[#FAFBFD] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#00486E] font-heading">{item.term}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-bold text-[#0073AA]">{item.semester}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {item.campus} • Registered on {item.enrolledDate}
                </p>
                <div className="flex items-center gap-4 text-xs pt-2">
                  <span>
                    Credit Load: <span className="font-bold text-gray-800">{item.credits}</span>
                  </span>
                  <span>
                    Semester GPA: <span className="font-bold text-[#D9251D]">{item.gpa}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
