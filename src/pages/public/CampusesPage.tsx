import { useTranslation } from 'react-i18next';
import { publicService } from '@/mocks/services';
import { useEffect, useState } from 'react';
import type { Campus } from '@/types';
import Card from '@/components/ui/Card';

export default function CampusesPage() {
  const { t } = useTranslation();
  const [campuses, setCampuses] = useState<Campus[]>([]);

  useEffect(() => {
    publicService.getCampuses().then(setCampuses);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold text-wu-ink mb-2">{t('public.campuses.title')}</h1>
      <p className="text-neutral mb-8">Three campuses serving students across the Wollega zone.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campuses.map((campus) => (
          <Card key={campus.id}>
            <div className="w-12 h-12 bg-wu-maroon/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">🏫</span>
            </div>
            <h3 className="font-heading font-semibold text-wu-ink mb-1">{campus.name}</h3>
            <p className="text-sm text-wu-maroon font-medium mb-2">📍 {campus.location}</p>
            <p className="text-sm text-neutral">{campus.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
