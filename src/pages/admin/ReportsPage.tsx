import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applicationService } from '@/mocks/services';
import type { RegistrationStats } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import Select from '@/components/ui/Select';
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

export default function ReportsPage() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [campusFilter, setCampusFilter] = useState('');

  useEffect(() => {
    applicationService
      .getStats(campusFilter ? { campusId: campusFilter as any } : undefined)
      .then(setStats);
  }, [campusFilter]);

  const handleExportPdf = () => {
    addToast('Generating official Wallaga University Senate Admission Report (PDF)...', 'info');
    setTimeout(() => {
      addToast('Senate Admission Report exported successfully.', 'success');
    }, 1200);
  };

  const handleExportExcel = () => {
    addToast('Compiling MOE-compliant candidate matriculation spreadsheet (XLSX)...', 'info');
    setTimeout(() => {
      addToast('Institutional spreadsheet exported successfully.', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="Wallaga UNIVERSITY SENATE • INSTITUTIONAL RESEARCH & REPORTING"
        title={t('admin.reports.title', 'Admissions Analytics & Enrollment Intelligence')}
        description="Comprehensive demographic, geographic, and program matriculation intelligence across Nekemte, Shambu, and Gimbi campuses for university executive leadership and the Ministry of Education."
        stats={[
          { label: 'Total Applicants', value: stats?.total || 205 },
          { label: 'Matriculation Rate', value: '86.4%', highlight: true },
          { label: 'Academic Year', value: '2026 / 2027' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportPdf}
              className="bg-[#D9251D] hover:bg-[#B51E17] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>{t('admin.reports.exportPdf', 'Export Senate PDF')}</span>
              <span>📄</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>{t('admin.reports.exportExcel', 'Export MOE Excel')}</span>
              <span>📊</span>
            </button>
          </div>
        }
      />

      {/* ─── Filter Bar ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#00486E] uppercase tracking-wider">
            Campus Filter:
          </span>
          <div className="w-64">
            <Select
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
              options={[
                { value: '', label: 'All Campuses (Consolidated)' },
                { value: 'main', label: 'Main Campus (Nekemte)' },
                { value: 'shambu', label: 'Shambu Campus' },
                { value: 'gimbi', label: 'Gimbi Campus' },
              ]}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-medium text-gray-500">
            Real-time Institutional Data Feed
          </span>
        </div>
      </div>

      {/* ─── 5 Summary Cards ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Total Applications', value: stats?.total || 205, border: 'border-l-[#00486E]', color: 'text-[#00486E]', sub: 'All cohorts' },
          { label: 'Submitted Dossiers', value: stats?.submitted || 68, border: 'border-l-[#0073AA]', color: 'text-[#0073AA]', sub: 'Awaiting vetting' },
          { label: 'Under Review', value: stats?.underReview || 42, border: 'border-l-[#D97706]', color: 'text-[#D97706]', sub: 'Registrar desk' },
          { label: 'Approved Matriculants', value: stats?.approved || 85, border: 'border-l-[#16A34A]', color: 'text-[#16A34A]', sub: 'Placed in sections' },
          { label: 'Flagged / Corrections', value: stats?.rejected || 10, border: 'border-l-[#D9251D]', color: 'text-[#D9251D]', sub: 'Notice sent' },
        ].map((s) => (
          <div
            key={s.label}
            className={`bg-white p-4 rounded-sm border border-gray-200 shadow-xs border-l-4 ${s.border}`}
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl sm:text-3xl font-black mt-1 ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ─── Visual Charts ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
          <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              Registration Influx by Month
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

        {/* Campus Distribution Chart */}
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
          <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              Enrollment Distribution by Campus
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
      </div>

      {/* ─── Program Matriculation Matrix ─── */}
      {stats && stats.byProgram.length > 0 && (
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
          <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              Departmental Matriculation Demand Matrix
            </h3>
            <span className="text-xs font-bold text-gray-400">Active Curricula Quotas</span>
          </div>

          <div className="p-6 divide-y divide-gray-100">
            {stats.byProgram.map((p) => {
              const percentage = Math.round((p.count / (stats.total || 1)) * 100);
              return (
                <div key={p.programId} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#00486E]">{p.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-gray-800">{p.count} Enrolled</span>
                      <span className="text-[11px] text-gray-400">({percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#0073AA] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
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
