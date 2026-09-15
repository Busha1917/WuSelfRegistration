import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { applicationService, semesterService } from '@/mocks/services';
import type { RegistrationStats } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';

export default function RegistrarDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [semStats, setSemStats] = useState<RegistrationStats | null>(null);

  useEffect(() => {
    applicationService.getStats().then(setStats);
    semesterService.getStats().then(setSemStats);
  }, []);

  const totalApplications = (stats?.submitted || 0) + (stats?.underReview || 0) + (stats?.approved || 0) + (stats?.rejected || 0);

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="REGISTRAR DIRECTORATE • CENTRAL ADMISSION DESK"
        title={t('registrar.dashboard.title', 'Registrar Management Suite')}
        description="Centralized academic enrollment control for freshmen admissions, credential clearances, semester re-registrations, and Senate matriculation reports across all three campuses."
        stats={[
          { label: 'Pending Queue', value: (stats?.pending || 0) + (semStats?.pending || 0), highlight: true },
          { label: 'Total Enrolled', value: stats?.approved || '4,280' },
          { label: 'Campuses', value: '3 Active' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/registrar/queue"
              className="bg-[#D9251D] hover:bg-[#B71C1C] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Review Freshmen Queue</span>
              <span>↗</span>
            </Link>
            <Link
              to="/registrar/semester-queue"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Semester Re-Reg Queue</span>
              <span>↗</span>
            </Link>
          </div>
        }
      />

      {/* ─── 4 Metric Cards Strip ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#D9251D]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Freshmen Applications
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#00486E]">{stats?.pending || 18}</span>
            <span className="text-xs font-bold text-[#D9251D] bg-red-50 px-2 py-0.5 rounded">Action Required</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">New admissions awaiting document approval</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#0073AA]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Semester Re-Registration
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#00486E]">{semStats?.pending || 42}</span>
            <span className="text-xs font-bold text-[#0073AA] bg-blue-50 px-2 py-0.5 rounded">Pending Clearance</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Senior student modular re-registrations</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#10B981]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Approved & Placed
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{stats?.approved || 142}</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Senate Cleared</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Issued with digital ID & class section</p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-xs border-l-4 border-l-[#6D28D9]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
            Today Processed
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl sm:text-3xl font-black text-[#00486E]">28</span>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">+15% vs yesterday</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Registrar verification officers throughput</p>
        </div>
      </div>

      {/* ─── Queue Fast-Access Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider">FIRST-TIME ADMISSIONS</span>
              <span className="text-xs font-mono font-bold text-gray-500">Queue: Active</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-[#00486E] mb-2">
              Freshmen National Entrance Review
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Inspect applicant Grade 12 educational result certificates, secondary school transcripts, and passport photos. Approve or issue correction notices.
            </p>
            <div className="p-3 bg-[#FAFBFD] rounded border border-gray-100 text-xs flex items-center justify-between mb-4">
              <span className="text-gray-500">Unreviewed Applications:</span>
              <span className="font-bold text-[#D9251D] text-sm">{stats?.pending || 18} dossiers</span>
            </div>
          </div>
          <Link
            to="/registrar/queue"
            className="w-full bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded text-center transition-colors shadow-2xs block"
          >
            Launch Review Queue →
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider">SEMESTER RE-REGISTRATION</span>
              <span className="text-xs font-mono font-bold text-gray-500">AY 2026/27</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-[#00486E] mb-2">
              Senior Student Course Confirmation
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Review advisor-endorsed semester course schedules, check prerequisite clearance, and finalize registration for Year II - Year V cohorts.
            </p>
            <div className="p-3 bg-[#FAFBFD] rounded border border-gray-100 text-xs flex items-center justify-between mb-4">
              <span className="text-gray-500">Pending Endorsements:</span>
              <span className="font-bold text-[#0073AA] text-sm">{semStats?.pending || 42} students</span>
            </div>
          </div>
          <Link
            to="/registrar/semester-queue"
            className="w-full bg-[#00486E] hover:bg-[#002B40] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded text-center transition-colors shadow-2xs block"
          >
            Launch Semester Queue →
          </Link>
        </div>
      </div>

      {/* ─── Application Breakdown by Status ─── */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider block">
              ADMISSION FUNNEL ANALYTICS
            </span>
            <h3 className="text-lg font-bold font-heading text-[#00486E]">
              Current Cycle Application Status Breakdown
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            Total Intake: <span className="font-bold text-[#00486E]">{totalApplications || 205}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-[#FAFBFD] rounded border border-gray-200">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">Submitted</span>
            <span className="text-2xl font-extrabold text-[#00486E]">{stats?.submitted || 24}</span>
            <span className="text-[11px] text-gray-400 block mt-1">Pending first glance</span>
          </div>

          <div className="p-4 bg-amber-50/50 rounded border border-amber-200">
            <span className="text-[10px] text-amber-800 uppercase font-semibold block">Under Review</span>
            <span className="text-2xl font-extrabold text-amber-700">{stats?.underReview || 15}</span>
            <span className="text-[11px] text-amber-600 block mt-1">Being examined</span>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded border border-emerald-200">
            <span className="text-[10px] text-emerald-800 uppercase font-semibold block">Approved</span>
            <span className="text-2xl font-extrabold text-emerald-700">{stats?.approved || 158}</span>
            <span className="text-[11px] text-emerald-600 block mt-1">Matriculated</span>
          </div>

          <div className="p-4 bg-red-50/50 rounded border border-red-200">
            <span className="text-[10px] text-red-800 uppercase font-semibold block">Rejected / Action</span>
            <span className="text-2xl font-extrabold text-red-700">{stats?.rejected || 8}</span>
            <span className="text-[11px] text-red-600 block mt-1">Correction issued</span>
          </div>
        </div>
      </div>
    </div>
  );
}
