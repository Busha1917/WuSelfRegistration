import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { applicationService, semesterService } from '@/mocks/services';
import type { RegistrationStats } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatCard from '@/components/shared/StatCard';

export default function RegistrarDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [semStats, setSemStats] = useState<RegistrationStats | null>(null);

  useEffect(() => {
    applicationService.getStats().then(setStats);
    semesterService.getStats().then(setSemStats);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('registrar.dashboard.title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('registrar.dashboard.pendingFirstTime')} value={stats?.pending || 0} icon={<span>📋</span>} color="bg-wu-gold" />
        <StatCard title={t('registrar.dashboard.pendingSemester')} value={semStats?.pending || 0} icon={<span>🔄</span>} color="bg-wu-blue" />
        <StatCard title={t('registrar.dashboard.todayProcessed')} value={0} icon={<span>✅</span>} color="bg-success" />
        <StatCard title={t('registrar.dashboard.totalApproved')} value={stats?.approved || 0} icon={<span>🎉</span>} color="bg-wu-maroon" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle>First-time Application Queue</CardTitle>
          <p className="text-sm text-neutral mt-2">{stats?.pending || 0} applications waiting for review</p>
          <Link to="/registrar/queue"><Button variant="ghost" size="sm" className="mt-3">Open Queue →</Button></Link>
        </Card>
        <Card>
          <CardTitle>Semester Re-registration Queue</CardTitle>
          <p className="text-sm text-neutral mt-2">{semStats?.pending || 0} re-registrations pending</p>
          <Link to="/registrar/semester-queue"><Button variant="ghost" size="sm" className="mt-3">Open Queue →</Button></Link>
        </Card>
      </div>

      {stats && (
        <Card>
          <CardTitle>Applications by Status</CardTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg"><p className="text-2xl font-bold text-wu-ink">{stats.submitted}</p><p className="text-xs text-neutral">Submitted</p></div>
            <div className="text-center p-3 bg-gray-50 rounded-lg"><p className="text-2xl font-bold text-wu-ink">{stats.underReview}</p><p className="text-xs text-neutral">Under Review</p></div>
            <div className="text-center p-3 bg-success-light rounded-lg"><p className="text-2xl font-bold text-success">{stats.approved}</p><p className="text-xs text-neutral">Approved</p></div>
            <div className="text-center p-3 bg-danger-light rounded-lg"><p className="text-2xl font-bold text-danger">{stats.rejected}</p><p className="text-xs text-neutral">Rejected</p></div>
          </div>
        </Card>
      )}
    </div>
  );
}
