import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { applicationService, adminService } from '@/mocks/services';
import type { RegistrationStats, User } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import StatusBadge from '@/components/shared/StatusBadge';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    applicationService.getStats().then(setStats);
    adminService.getUsers().then(setUsers);
  }, []);

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="INSTITUTIONAL ICT & INFRASTRUCTURE ADMINISTRATION"
        title={t('admin.dashboard.title', 'System Administrator Control Center')}
        description="Unified administration console for user access privileges, Ministry of Education batch data ingestion, security audit telemetry, and campus system configurations."
        stats={[
          { label: 'Total Users', value: users.length || '48' },
          { label: 'Applications', value: stats?.total || '205', highlight: true },
          { label: 'System Health', value: '100% OK' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/users"
              className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Manage User Directory</span>
              <span>↗</span>
            </Link>
            <Link
              to="/admin/import"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Import MOE Batch CSV</span>
              <span>📥</span>
            </Link>
          </div>
        }
      />

      {/* ─── 4 Metric Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#6D28D9]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Registered Users
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#00486E]">{users.length || 48}</span>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">All Roles</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Students, Registrars, Senate & Staff</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#0073AA]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Applications Recorded
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#00486E]">{stats?.total || 205}</span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">AY 2026/27</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Dossiers in institutional database</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#D9251D]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            MOE Ingestion Batches
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#00486E]">6 Batches</span>
            <span className="text-xs font-bold text-[#D9251D] bg-red-50 px-2 py-0.5 rounded">Synchronized</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">National examination authority sync</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#10B981]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            API & Server Uptime
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">99.98%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Operational</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Zero downtime across all 3 campuses</p>
        </div>
      </div>

      {/* ─── 2-Column Main Section: Campus Distributions & Recent Directory ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Campus Distribution */}
        <div className="lg:col-span-6 bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
                  REGIONAL INFRASTRUCTURE
                </span>
                <h3 className="text-lg font-bold font-heading text-[#00486E]">
                  Enrollment Distribution by Campus
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-gray-500">3 Campuses</span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Nekemte Main Campus', count: 128, pct: 62, color: 'bg-[#00486E]' },
                { name: 'Shambu Campus', count: 48, pct: 24, color: 'bg-[#0073AA]' },
                { name: 'Gimbi Campus', count: 29, pct: 14, color: 'bg-[#D9251D]' },
              ].map((c) => (
                <div key={c.name} className="space-y-1.5 p-3.5 bg-[#FAFBFD] rounded border border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#00486E]">{c.name}</span>
                    <span className="font-mono font-bold text-gray-700">{c.count} students ({c.pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className={`h-2 rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 text-xs text-gray-500 flex items-center justify-between">
            <span>Synchronized across Wallaga University high-speed backbone</span>
            <Link to="/admin/reports" className="text-[#0073AA] font-bold hover:underline">
              View Analytics Report →
            </Link>
          </div>
        </div>

        {/* Right: Recent Accounts */}
        <div className="lg:col-span-6 bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider block">
                  DIRECTORY TELEMETRY
                </span>
                <h3 className="text-lg font-bold font-heading text-[#00486E]">
                  Recent User Provisioning
                </h3>
              </div>
              <Link to="/admin/users" className="text-xs font-bold text-[#0073AA] hover:underline">
                View All Users →
              </Link>
            </div>

            <div className="space-y-2.5">
              {users.slice(0, 5).map((u) => (
                <div
                  key={u.id}
                  className="p-3 bg-[#FAFBFD] hover:bg-gray-100 rounded border border-gray-100 transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#00486E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {u.fullName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-[#00486E] block truncate">{u.fullName}</span>
                      <span className="text-[10px] text-gray-400 font-mono truncate block">{u.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {u.role}
                    </span>
                    <StatusBadge status={u.isActive ? 'active' : 'inactive'} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 text-xs text-center">
            <Link to="/admin/audit-log" className="text-xs font-bold text-[#0073AA] hover:underline">
              Inspect Security Audit Log →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
