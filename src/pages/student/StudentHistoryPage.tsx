import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { semesterService } from '@/mocks/services';
import type { SemesterRegistration } from '@/types';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/shared/StatusBadge';

export default function StudentHistoryPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [registrations, setRegistrations] = useState<SemesterRegistration[]>([]);

  useEffect(() => {
    if (user) {
      semesterService.getRegistrations({ page: 1, pageSize: 50 }).then((res) =>
        setRegistrations(res.data.filter((r) => r.studentId === user.id))
      );
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.history.title')}</h1>
      {registrations.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-neutral">{t('student.history.noHistory')}</p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="divide-y">
            {registrations.map((reg) => (
              <div key={reg.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-wu-ink">{reg.academicYear} — {t('student.history.semester')} {reg.semester}</p>
                  <p className="text-xs text-neutral">{reg.programId} • {reg.campusId}</p>
                </div>
                <StatusBadge status={reg.status} />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
