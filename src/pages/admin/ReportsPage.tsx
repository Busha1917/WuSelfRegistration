import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applicationService } from '@/mocks/services';
import type { RegistrationStats } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#8C0F2A', '#EDC935', '#5D9ADB', '#16A34A', '#D97706'];

export default function ReportsPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [campusFilter, setCampusFilter] = useState('');

  useEffect(() => {
    applicationService.getStats(campusFilter ? { campusId: campusFilter as any } : undefined).then(setStats);
  }, [campusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('admin.reports.title')}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">{t('admin.reports.exportPdf')}</Button>
          <Button variant="outline" size="sm">{t('admin.reports.exportExcel')}</Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Select value={campusFilter} onChange={(e) => setCampusFilter(e.target.value)}
          options={[{ value: '', label: 'All Campuses' }, { value: 'main', label: 'Main' }, { value: 'shambu', label: 'Shambu' }, { value: 'gimbi', label: 'Gimbi' }]} />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats?.total || 0, color: 'text-wu-ink' },
          { label: 'Submitted', value: stats?.submitted || 0, color: 'text-wu-blue-700' },
          { label: 'Under Review', value: stats?.underReview || 0, color: 'text-wu-gold-700' },
          { label: 'Approved', value: stats?.approved || 0, color: 'text-success' },
          { label: 'Rejected', value: stats?.rejected || 0, color: 'text-danger' },
        ].map((s) => (
          <Card key={s.label}>
            <p className="text-xs text-neutral">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Monthly Trend</CardTitle>
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

        <Card>
          <CardTitle>By Campus</CardTitle>
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
      </div>

      {stats && stats.byProgram.length > 0 && (
        <Card>
          <CardTitle>By Program</CardTitle>
          <div className="divide-y mt-4">
            {stats.byProgram.map((p) => (
              <div key={p.programId} className="flex items-center justify-between py-2">
                <span className="text-sm">{p.name}</span>
                <span className="text-sm font-medium">{p.count}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
