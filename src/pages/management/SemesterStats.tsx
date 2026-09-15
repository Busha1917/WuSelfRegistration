import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { semesterService } from '@/mocks/services';
import type { RegistrationStats } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import { useToast } from '@/components/ui/Toast';

export default function SemesterStats() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [stats, setStats] = useState<RegistrationStats | null>(null);

  useEffect(() => {
    semesterService.getStats().then(setStats);
  }, []);

  const cohortBreakdown = [
    { cohort: 'Year II (Sophomore)', registered: 580, pending: 24, rate: '96.0%', credits: '32 ECTS' },
    { cohort: 'Year III (Junior)', registered: 495, pending: 18, rate: '96.5%', credits: '30 ECTS' },
    { cohort: 'Year IV (Senior)', registered: 420, pending: 12, rate: '97.2%', credits: '28 ECTS' },
    { cohort: 'Year V (Engineering & Health)', registered: 310, pending: 8, rate: '97.5%', credits: '30 ECTS' },
    { cohort: 'Postgraduate (Masters & Ph.D.)', registered: 185, pending: 15, rate: '92.5%', credits: '24 ECTS' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="Wallaga UNIVERSITY SENATE • CONTINUING ENROLLMENT TELEMETRY"
        title={t('management.semester.title', 'Semester Re-Registration Statistics')}
        description="Comprehensive progression tracking for senior and returning undergraduate and postgraduate cohorts confirming modular coursework enrollment and departmental clearance."
        stats={[
          { label: 'Active Term', value: 'AY 2026/27 • Sem I' },
          { label: 'Clearance Rate', value: '96.2%', highlight: true },
          { label: 'Participating Campuses', value: 'Nekemte • Shambu • Gimbi' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => addToast('Official semester enrollment bulletin downloaded.', 'success')}
              className="bg-[#D9251D] hover:bg-[#B51E17] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Export Enrollment Bulletin</span>
              <span>📄</span>
            </button>
            <button
              onClick={() => addToast('Continuing cohort telemetry refreshed.', 'info')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Refresh Telemetry</span>
              <span>🔄</span>
            </button>
          </div>
        }
      />

      {/* ─── 3 High-Level Metric Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#16A34A]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            {t('management.semester.registered', 'Confirmed & Matriculated')}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-black text-green-700">{stats?.approved || 142}</span>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded">
              Active Enrolled
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Dormitory & course slip validated</p>
        </div>

        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#D97706]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            {t('management.semester.pending', 'Pending Departmental Approval')}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-black text-amber-700">{stats?.pending || 28}</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">
              In Review
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Awaiting academic advisor signature</p>
        </div>

        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#D9251D]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            {t('management.semester.rejected', 'Flagged / Holds Placed')}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-3xl font-black text-red-700">{stats?.rejected || 6}</span>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded">
              Requires Action
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Prerequisite / library clearance hold</p>
        </div>
      </div>

      {/* ─── Campus Distribution Progress ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
            Semester Re-Registration Distribution by Campus
          </h3>
          <span className="text-xs font-bold text-gray-400">Institutional Quota Tracking</span>
        </div>

        <div className="p-6 divide-y divide-gray-100">
          {stats?.byCampus.map((c) => {
            const pct = Math.round((c.count / (stats.total || 1)) * 100);
            return (
              <div key={c.campusId} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00486E]"></span>
                    <span className="text-sm font-bold text-[#00486E] capitalize">
                      {c.campusId === 'main' ? 'Nekemte Main Campus' : `${c.campusId} Campus`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-gray-800">{c.count} Students</span>
                    <span className="text-xs font-bold text-gray-400">({pct}% share)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#00486E] h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Senior Cohort Modular Breakdown Table ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
            Continuing Academic Cohort Telemetry
          </h3>
          <span className="text-xs font-bold text-gray-500">AY 2026/2027 Registration</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] text-[#00486E] uppercase font-black text-[11px] tracking-wider border-b border-gray-200">
                <th className="p-3.5">Academic Cohort Level</th>
                <th className="p-3.5 text-center">Registered Students</th>
                <th className="p-3.5 text-center">Pending Advisors</th>
                <th className="p-3.5 text-center">Clearance Velocity</th>
                <th className="p-3.5 text-right">Standard Modular Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cohortBreakdown.map((c, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-3.5 font-bold text-[#00486E]">{c.cohort}</td>
                  <td className="p-3.5 text-center font-black text-green-700">+{c.registered}</td>
                  <td className="p-3.5 text-center font-bold text-amber-600">{c.pending}</td>
                  <td className="p-3.5 text-center">
                    <span className="text-[10px] font-black bg-blue-50 text-[#0073AA] px-2 py-0.5 rounded">
                      {c.rate}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-gray-700">{c.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
