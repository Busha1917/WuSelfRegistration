import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { semesterService } from '@/mocks/services';
import type { RegistrationStats } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';

export default function SemesterStats() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<RegistrationStats | null>(null);

  useEffect(() => {
    semesterService.getStats().then(setStats);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('management.semester.title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-neutral">{t('management.semester.registered')}</p>
          <p className="text-3xl font-bold text-success mt-1">{stats?.approved || 0}</p>
        </Card>
        <Card>
          <p className="text-xs text-neutral">{t('management.semester.pending')}</p>
          <p className="text-3xl font-bold text-wu-gold mt-1">{stats?.pending || 0}</p>
        </Card>
        <Card>
          <p className="text-xs text-neutral">{t('management.semester.rejected')}</p>
          <p className="text-3xl font-bold text-danger mt-1">{stats?.rejected || 0}</p>
        </Card>
      </div>

      <Card>
        <CardTitle>Semester Re-registration by Campus</CardTitle>
        <div className="divide-y mt-4">
          {stats?.byCampus.map((c) => (
            <div key={c.campusId} className="flex items-center justify-between py-3">
              <span className="text-sm capitalize font-medium">{c.campusId} Campus</span>
              <div className="flex items-center gap-3">
                <div className="w-40 bg-gray-200 rounded-full h-2">
                  <div className="bg-wu-maroon h-2 rounded-full" style={{ width: `${(c.count / (stats.total || 1)) * 100}%` }} />
                </div>
                <span className="text-sm font-medium w-8 text-right">{c.count}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
