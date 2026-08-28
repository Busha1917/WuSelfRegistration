import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applicationService } from '@/mocks/services';
import type { RegistrationStats } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';
import StatCard from '@/components/shared/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#8C0F2A', '#EDC935', '#5D9ADB'];

export default function ManagementDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<RegistrationStats | null>(null);

  useEffect(() => {
    applicationService.getStats().then(setStats);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('management.dashboard.title')}</h1>
        <span className="text-xs bg-warning-light text-warning px-3 py-1 rounded-full font-medium">{t('management.dashboard.readOnly')}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title={t('management.dashboard.totalApplications')} value={stats?.total || 0} icon={<span>📝</span>} color="bg-wu-blue" />
        <StatCard title={t('management.dashboard.approved')} value={stats?.approved || 0} icon={<span>✅</span>} color="bg-success" />
        <StatCard title={t('management.dashboard.rejected')} value={stats?.rejected || 0} icon={<span>❌</span>} color="bg-danger" />
        <StatCard title={t('management.dashboard.pending')} value={stats?.pending || 0} icon={<span>⏳</span>} color="bg-wu-gold" />
        <StatCard title={t('management.dashboard.underReview')} value={stats?.underReview || 0} icon={<span>🔍</span>} color="bg-wu-maroon" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle>{t('management.dashboard.byCampus')}</CardTitle>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats?.byCampus || []} dataKey="count" nameKey="campusId" cx="50%" cy="50%" outerRadius={80} label={({ name, value }: any) => `${name}: ${value}`}>
                  {(stats?.byCampus || []).map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardTitle>{t('management.dashboard.byMonth')}</CardTitle>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.byMonth || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8C0F2A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {stats && stats.byProgram.length > 0 && (
        <Card>
          <CardTitle>{t('management.dashboard.byProgram')}</CardTitle>
          <div className="divide-y mt-4">
            {stats.byProgram.map((p) => (
              <div key={p.programId} className="flex items-center justify-between py-2">
                <span className="text-sm">{p.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-wu-maroon h-2 rounded-full" style={{ width: `${(p.count / (stats.total || 1)) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{p.count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
