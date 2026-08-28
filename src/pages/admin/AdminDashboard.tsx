import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applicationService, adminService } from '@/mocks/services';
import type { RegistrationStats, User } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';
import StatCard from '@/components/shared/StatCard';
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
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('admin.dashboard.title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={t('admin.dashboard.totalUsers')} value={users.length} icon={<span>👥</span>} color="bg-wu-maroon" />
        <StatCard title={t('admin.dashboard.totalApplications')} value={stats?.total || 0} icon={<span>📝</span>} color="bg-wu-blue" />
        <StatCard title={t('admin.dashboard.totalImports')} value={0} icon={<span>📥</span>} color="bg-wu-gold" />
        <StatCard title={t('admin.dashboard.systemHealth')} value="OK" icon={<span>💚</span>} color="bg-success" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Applications by Campus</CardTitle>
          <div className="space-y-3 mt-4">
            {stats?.byCampus.map((c) => (
              <div key={c.campusId} className="flex items-center justify-between">
                <span className="text-sm capitalize">{c.campusId}</span>
                <span className="text-sm font-medium">{c.count}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle>Recent Users</CardTitle>
          <div className="space-y-2 mt-4">
            {users.slice(0, 5).map((u) => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{u.fullName}</span>
                  <span className="text-neutral ml-2">({u.role})</span>
                </div>
                <StatusBadge status={u.isActive ? 'active' : 'inactive'} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
