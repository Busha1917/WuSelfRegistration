import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { applicationService } from '@/mocks/services';
import type { RegistrationStats } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import { useToast } from '@/components/ui/Toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const AAU_COLORS = ['#00486E', '#0073AA', '#D9251D', '#16A34A', '#D97706'];

export default function ManagementDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [stats, setStats] = useState<RegistrationStats | null>(null);

  useEffect(() => {
    applicationService.getStats().then(setStats);
  }, []);

  const handleSenateReport = () => {
    addToast('Generating Executive Senate Briefing Dossier...', 'info');
    setTimeout(() => {
      addToast('Executive Briefing Dossier downloaded.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="EXECUTIVE SENATE PORTAL • AY 2026/2027"
        title={`Welcome, ${user?.fullName || 'Executive Leadership'}`}
        description="High-level governance intelligence console for the University President, Academic Vice President, and Senate Deans."
        stats={[
          { label: 'Campus', value: '3 Active' },
          { label: 'Applications', value: stats?.total || 205 },
          { label: 'Enrollment', value: '84.6%', highlight: true },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSenateReport}
              className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Download Senate Briefing</span>
              <span>📄</span>
            </button>
            <button
              onClick={() => addToast('Campus capacity audit refreshed.', 'info')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Refresh Telemetry</span>
              <span>🔄</span>
            </button>
          </div>
        }
      />

      {/* ─── 5 Metric Cards ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#00486E]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            {t('management.dashboard.totalApplications', 'Total Dossiers')}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#00486E]">
              {stats?.total || 205}
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">All Campuses</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">AY 2026/2027 Admissions</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#16A34A]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            {t('management.dashboard.approved', 'Approved & Matriculated')}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-green-700">
              {stats?.approved || 85}
            </span>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">Placed</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Sections & dorms assigned</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#D9251D]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            {t('management.dashboard.rejected', 'Flagged / Notices')}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-red-700">
              {stats?.rejected || 10}
            </span>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">Corrections</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Dossier discrepancies</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#D97706]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            {t('management.dashboard.pending', 'Awaiting Review')}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-700">
              {stats?.pending || 68}
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">In Queue</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Vetting in progress</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#0073AA]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            {t('management.dashboard.underReview', 'Desk Evaluation')}
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#0073AA]">
              {stats?.underReview || 42}
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Officers</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Registrar committee</p>
        </div>
      </div>

      {/* ─── Strategic Visual Analytics ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campus Distribution Pie */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
          <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              {t('management.dashboard.byCampus', 'Institutional Quota Distribution by Campus')}
            </h3>
            <span className="text-xs font-bold text-gray-400">Nekemte • Shambu • Gimbi</span>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.byCampus || []}
                    dataKey="count"
                    nameKey="campusId"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {(stats?.byCampus || []).map((_, idx) => (
                      <Cell key={idx} fill={AAU_COLORS[idx % AAU_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#002B40',
                      borderRadius: 4,
                      color: '#ffffff',
                      fontSize: 12,
                      border: 'none',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Trend Bar */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
          <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              {t('management.dashboard.byMonth', 'Admissions Influx Velocity by Month')}
            </h3>
            <span className="text-xs font-bold text-gray-400">Intake Progression</span>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.byMonth || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#4B5563' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#4B5563' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#002B40',
                      borderRadius: 4,
                      color: '#ffffff',
                      fontSize: 12,
                      border: 'none',
                    }}
                  />
                  <Bar dataKey="count" fill="#00486E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Program Quota Demand ─── */}
      {stats && stats.byProgram.length > 0 && (
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
          <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              {t('management.dashboard.byProgram', 'Curricula Capacity & Demand Breakdown')}
            </h3>
            <span className="text-xs font-bold text-gray-400">Senate Approved Quotas</span>
          </div>

          <div className="p-6 divide-y divide-gray-100">
            {stats.byProgram.map((p) => {
              const pct = Math.round((p.count / (stats.total || 1)) * 100);
              return (
                <div key={p.programId} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#00486E]">{p.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-gray-800">{p.count} Enrolled</span>
                      <span className="text-[11px] font-bold text-gray-400">({pct}% of cohort)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#0073AA] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
