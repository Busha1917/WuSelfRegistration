import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { applicationService, notificationService } from '@/mocks/services';
import type { Application, Notification } from '@/types';
import StatusBadge from '@/components/shared/StatusBadge';
import DashboardHero from '@/components/shared/DashboardHero';

export default function StudentDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [application, setApplication] = useState<Application | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;
    applicationService.getApplicationByStudentId(user.id).then(setApplication);
    notificationService.getNotifications(user.id).then(setNotifications);
  }, [user]);

  const quickActions = [
    {
      title: t('nav.applications', 'Application Form'),
      subtitle: t('student.dashboard.applicationStatus', 'Review & edit personal credentials'),
      icon: '📝',
      path: '/student/application',
      color: 'border-l-4 border-l-[#0073AA]',
      badge: application?.status || 'Draft',
    },
    {
      title: t('nav.documents', 'Upload Documents'),
      subtitle: t('student.dashboard.uploadDocuments', 'Grade 12 certificate, transcripts & ID photo'),
      icon: '📄',
      path: '/student/documents',
      color: 'border-l-4 border-l-[#10B981]',
      badge: 'Verified',
    },
    {
      title: t('nav.idCard', 'Digital Student ID'),
      subtitle: t('student.dashboard.viewIdCard', 'Download secure QR-coded student credential'),
      icon: '🪪',
      path: '/student/id-card',
      color: 'border-l-4 border-l-[#D9251D]',
      badge: 'Available',
    },
    {
      title: t('nav.placement', 'Class & Dorm Placement'),
      subtitle: t('student.dashboard.semesterReReg', 'Lecture hall section and dormitory allocation'),
      icon: '🏫',
      path: '/student/placement',
      color: 'border-l-4 border-l-[#6D28D9]',
      badge: 'Published',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ─── AAU Navy Hero ─── */}
      <DashboardHero
        badge="STUDENT SELF-SERVICE PORTAL • AY 2026/2027"
        title={`Welcome, ${user?.fullName || 'Student'}`}
        description="Access your admission verification, uploaded certificate clearances, classroom cohort assignment, and semester enrollment from your personal academic dashboard."
        stats={[
          { label: 'Campus', value: 'Nekemte' },
          { label: 'Semester', value: 'Sem I' },
          { label: 'Status', value: 'Enrolled', highlight: true },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/student/status"
              className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all inline-flex items-center gap-1.5"
            >
              <span>{t('nav.status', 'Track Admission Status')}</span>
              <span>↗</span>
            </Link>
            <Link
              to="/student/id-card"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all inline-flex items-center gap-1.5"
            >
              <span>🪪</span>
              <span>{t('nav.idCard', 'View ID Card')}</span>
            </Link>
          </div>
        }
      />

      {/* ─── Registration Progress Workflow Bar ─── */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
              ADMISSION ENROLLMENT WORKFLOW
            </span>
            <h3 className="text-lg font-bold font-heading text-[#00486E]">
              Current Registration Progress
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Application Status:</span>
            <StatusBadge status={application?.status || 'approved'} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Portal Signup', desc: 'Account verified with Grade 12 ID', done: true },
            { step: '02', title: 'Document Verification', desc: 'National exam certificates reviewed', done: true },
            { step: '03', title: 'Campus Placement', desc: 'Assigned to Nekemte Main Campus', done: true },
            { step: '04', title: 'Semester Enrollment', desc: 'Course schedule confirmed for Sem I', done: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded border transition-all ${
                item.done
                  ? 'bg-[#FAFBFD] border-[#0073AA]/30 text-gray-800'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black font-mono text-[#0073AA]">{item.step}</span>
                <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#00486E] mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 4 Actionable Cards Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickActions.map((action, idx) => (
          <Link
            key={idx}
            to={action.path}
            className={`bg-white rounded-sm border border-gray-200 hover:border-[#0073AA] p-5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between ${action.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{action.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  {action.badge}
                </span>
              </div>
              <h4 className="text-base font-bold font-heading text-[#00486E] group-hover:text-[#0073AA] transition-colors mb-1">
                {action.title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {action.subtitle}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0073AA]">
              <span>Open Section</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── Bottom 2-Column Section: Academic Placement & Notifications ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Academic Placement Summary */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-sm p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider block">
                ACADEMIC PROFILE RECORD
              </span>
              <h3 className="text-lg font-bold font-heading text-[#00486E]">
                Assigned Program & Cohort Details
              </h3>
            </div>
            <Link to="/student/placement" className="text-xs font-bold text-[#0073AA] hover:underline">
              Full Details →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-[#FAFBFD] rounded border border-gray-100">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Assigned Campus</span>
              <span className="text-sm font-bold text-[#00486E]">Nekemte Main Campus</span>
            </div>
            <div className="p-3.5 bg-[#FAFBFD] rounded border border-gray-100">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">College / Faculty</span>
              <span className="text-sm font-bold text-[#00486E]">College of Engineering & Tech</span>
            </div>
            <div className="p-3.5 bg-[#FAFBFD] rounded border border-gray-100">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Degree Program</span>
              <span className="text-sm font-bold text-[#0073AA]">B.Sc. Software Engineering</span>
            </div>
            <div className="p-3.5 bg-[#FAFBFD] rounded border border-gray-100">
              <span className="text-gray-400 block text-[10px] uppercase font-semibold">Lecture Section</span>
              <span className="text-sm font-bold text-gray-800">Section 01 (LH-A102)</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
            <span>Advisor: Dr. Gemechu Desta (Room 204)</span>
            <span className="text-emerald-700 font-semibold">● Senate Approved Matriculation</span>
          </div>
        </div>

        {/* Right: Notifications Feed */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
                  REGISTRAR BULLETINS
                </span>
                <h3 className="text-lg font-bold font-heading text-[#00486E]">
                  Recent Notifications
                </h3>
              </div>
              <span className="text-xs font-bold text-gray-400">
                {notifications.length} Updates
              </span>
            </div>

            {notifications.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">No new notifications from the registrar office.</p>
            ) : (
              <div className="space-y-3">
                {notifications.slice(0, 4).map((n) => (
                  <div key={n.id} className="p-3 bg-[#FAFBFD] hover:bg-gray-100 rounded border border-gray-100 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-[#00486E] truncate">{n.title}</span>
                      {!n.read && (
                        <span className="text-[9px] bg-[#D9251D] text-white px-1.5 py-0.2 rounded font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 text-center">
            <Link to="/student/status" className="text-xs font-bold text-[#0073AA] hover:underline">
              View All Status Circulars →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
