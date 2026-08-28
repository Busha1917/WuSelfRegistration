import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { idCardService } from '@/mocks/services';
import type { IdCard } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function IdCardPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [idCard, setIdCard] = useState<IdCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      idCardService.getStudentIdCard(user.id).then((card) => {
        setIdCard(card);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <div className="animate-pulse text-neutral">Loading...</div>;

  if (!idCard) {
    return (
      <div className="space-y-6">
        <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.idCard.title')}</h1>
        <Card>
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🪪</div>
            <p className="text-neutral">{t('student.idCard.notAvailable')}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.idCard.title')}</h1>
      <Card className="max-w-lg">
        {/* ID Card preview */}
        <div className="bg-white border-2 border-wu-maroon rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-wu-maroon/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex gap-4 relative z-10">
            <div className="w-24 h-28 bg-gray-100 rounded-lg flex items-center justify-center border">
              <span className="text-3xl">👤</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="font-heading font-bold text-wu-ink text-lg">{idCard.fullName}</p>
              <p className="text-xs text-neutral">{t('student.idCard.studentId')}: <span className="font-medium text-wu-ink">{idCard.cardNumber}</span></p>
              <p className="text-xs text-neutral">{t('student.idCard.program')}: <span className="font-medium text-wu-ink">{idCard.program}</span></p>
              <p className="text-xs text-neutral">{t('student.idCard.campus')}: <span className="font-medium text-wu-ink">{idCard.campus}</span></p>
              <p className="text-xs text-neutral">{t('student.idCard.validUntil')}: <span className="font-medium text-wu-ink">{idCard.validUntil}</span></p>
            </div>
            <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-xs text-neutral">
              QR
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline">{t('student.idCard.download')}</Button>
          <Button variant="ghost">{t('student.idCard.print')}</Button>
        </div>
      </Card>
    </div>
  );
}
