import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { applicationService } from '@/mocks/services';
import type { Application } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/shared/StatusBadge';

export default function StatusPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (user) applicationService.getApplicationByStudentId(user.id).then(setApplication);
  }, [user]);

  const statusSteps = ['draft', 'submitted', 'under_review', 'approved'];
  const currentIdx = application ? statusSteps.indexOf(application.status) : -1;

  if (!application) {
    return (
      <div className="space-y-6">
        <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.status.title')}</h1>
        <Card>
          <p className="text-sm text-neutral">No application found. Start your application first.</p>
          <Link to="/student/application"><Button className="mt-3">Start Application</Button></Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.status.title')}</h1>
      <Card>
        <div className="flex items-center justify-between mb-6">
          <CardTitle>Current Status</CardTitle>
          <StatusBadge status={application.status} />
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {statusSteps.map((s, idx) => {
            const isComplete = idx <= currentIdx && application.status !== 'rejected';
            const isCurrent = idx === currentIdx;
            return (
              <div key={s} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${isComplete ? 'bg-success text-white' : 'bg-gray-200 text-neutral'}`}>
                    {isComplete ? '✓' : idx + 1}
                  </div>
                  {idx < statusSteps.length - 1 && <div className={`w-0.5 flex-1 min-h-[24px] ${isComplete ? 'bg-success' : 'bg-gray-200'}`} />}
                </div>
                <div className="pb-4">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-wu-maroon' : isComplete ? 'text-success' : 'text-neutral'}`}>
                    {t(`student.status.${s === 'under_review' ? 'underReview' : s}`)}
                  </p>
                  {isCurrent && application.status === 'approved' && (
                    <p className="text-sm text-success mt-1">{t('student.status.congratulations')}</p>
                  )}
                  {isCurrent && application.status === 'under_review' && (
                    <p className="text-sm text-neutral mt-1">{t('student.status.reviewInProgress')}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {application.status === 'rejected' && (
          <div className="bg-danger-light rounded-lg p-4 mt-4">
            <h4 className="font-medium text-danger mb-1">{t('student.status.rejected')}</h4>
            <p className="text-sm text-danger">{application.rejectionReason}</p>
            {application.resubmissionDeadline && (
              <p className="text-xs text-danger mt-2">{t('student.status.resubmitDeadline', { date: new Date(application.resubmissionDeadline).toLocaleDateString() })}</p>
            )}
            <Link to="/student/application">
              <Button variant="destructive" size="sm" className="mt-3">{t('student.status.resubmit')}</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
