import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { placementService } from '@/mocks/services';
import type { StudentPlacement } from '@/types';
import Card from '@/components/ui/Card';

export default function PlacementPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [placement, setPlacement] = useState<StudentPlacement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      placementService.getStudentPlacement(user.id).then((p) => {
        setPlacement(p);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <div className="animate-pulse text-neutral">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.placement.title')}</h1>
      {placement ? (
        <Card>
          <div className="bg-success-light rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏫</span>
              <div>
                <p className="text-sm text-neutral">Class Section</p>
                <p className="font-heading font-bold text-wu-ink text-lg">{placement.classSection?.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-neutral">{t('student.placement.lectureHall')}:</span> <span className="font-medium">{placement.classSection?.lectureHall}</span></div>
              <div><span className="text-neutral">Capacity:</span> <span className="font-medium">{placement.classSection?.currentEnrollment}/{placement.classSection?.capacity}</span></div>
            </div>
            {placement.publishedAt && (
              <p className="text-xs text-neutral mt-4">{t('student.placement.publishedOn', { date: new Date(placement.publishedAt).toLocaleDateString() })}</p>
            )}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🏫</div>
            <p className="text-neutral">{t('student.placement.notAvailable')}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
