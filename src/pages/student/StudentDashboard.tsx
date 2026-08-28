import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { applicationService, notificationService } from '@/mocks/services';
import type { Application, Notification } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatCard from '@/components/shared/StatCard';
import StatusBadge from '@/components/shared/StatusBadge';

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

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">
        {t('student.dashboard.welcome', { name: user?.fullName?.split(' ')[0] })}
      </h1>

      {/* Status card */}
      {application ? (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">{t('student.dashboard.applicationStatus')}</p>
              <StatusBadge status={application.status} />
            </div>
            <Link to="/student/status">
              <Button variant="ghost" size="sm">View Details →</Button>
            </Link>
          </div>
          {application.status === 'draft' && (
            <p className="mt-3 text-sm text-wu-gold-700">{t('student.dashboard.draftExists')}</p>
          )}
        </Card>
      ) : (
        <Card>
          <p className="text-sm text-neutral mb-3">{t('student.dashboard.noApplication')}</p>
          <Link to="/student/application">
            <Button>{t('student.dashboard.startApplication')}</Button>
          </Link>
        </Card>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('student.dashboard.quickActions')} value="Quick" icon={<span>⚡</span>} color="bg-wu-gold" />
        <Link to="/student/documents">
          <StatCard title={t('student.dashboard.uploadDocuments')} value="📄" icon={<span>📄</span>} color="bg-wu-blue" />
        </Link>
        <Link to="/student/id-card">
          <StatCard title={t('student.dashboard.viewIdCard')} value="🪪" icon={<span>🪪</span>} color="bg-success" />
        </Link>
        <Link to="/student/re-registration">
          <StatCard title={t('student.dashboard.semesterReReg')} value="🔄" icon={<span>🔄</span>} color="bg-wu-maroon" />
        </Link>
      </div>

      {/* Notifications */}
      <Card>
        <CardTitle>{t('student.dashboard.recentNotifications')}</CardTitle>
        {notifications.length === 0 ? (
          <p className="text-sm text-neutral">No notifications yet.</p>
        ) : (
          <div className="divide-y mt-3">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${n.type === 'success' ? 'bg-success' : n.type === 'warning' ? 'bg-warning' : 'bg-wu-blue'}`} />
                  <span className="text-sm font-medium text-wu-ink">{n.title}</span>
                  {!n.read && <span className="text-[10px] bg-wu-maroon text-white px-1.5 py-0.5 rounded-full">NEW</span>}
                </div>
                <p className="text-xs text-neutral ml-4">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
