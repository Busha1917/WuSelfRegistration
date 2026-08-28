import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { semesterService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ReRegistrationPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [status, setStatus] = useState<'idle' | 'submitted' | 'loading'>('idle');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await semesterService.submitReRegistration(user.id);
      setStatus('submitted');
      addToast('Re-registration submitted successfully', 'success');
    } catch {
      addToast('Failed to submit re-registration', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.reRegistration.title')}</h1>
      <Card>
        <div className="bg-success-light rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-success">📢 {t('student.reRegistration.banner')}</p>
          <p className="text-xs text-success/70 mt-1">{t('student.reRegistration.description')}</p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-neutral">{t('student.reRegistration.program')}:</span><span className="font-medium">Computer Science</span></div>
          <div className="flex justify-between"><span className="text-neutral">{t('student.reRegistration.year')}:</span><span className="font-medium">2024/2025</span></div>
          <div className="flex justify-between"><span className="text-neutral">{t('student.reRegistration.semester')}:</span><span className="font-medium">Semester 2</span></div>
        </div>
        <p className="text-xs text-neutral mt-4 italic">{t('student.reRegistration.note')}</p>
        <div className="mt-6">
          {status === 'submitted' ? (
            <div className="flex items-center gap-2 text-success font-medium">
              <span>✅</span> Re-registration confirmed!
            </div>
          ) : (
            <Button onClick={handleConfirm} loading={loading}>{t('student.reRegistration.confirm')}</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
