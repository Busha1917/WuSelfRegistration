import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { publicService } from '@/mocks/services';
import type { LookupResult } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import StatusBadge from '@/components/shared/StatusBadge';

export default function CouncilAssist() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const r = await publicService.lookupStudent(query);
    setResult(r);
    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('council.assist.title')}</h1>
      <p className="text-sm text-neutral">{t('council.assist.description')}</p>

      <Card>
        <CardTitle>Student Search</CardTitle>
        <form onSubmit={handleSearch} className="flex gap-3 mt-4">
          <div className="flex-1">
            <Input placeholder={t('council.assist.searchPlaceholder')} value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button type="submit" loading={loading}>{t('council.assist.search')}</Button>
        </form>

        {searched && (
          <div className="mt-6">
            {result?.found ? (
              <div className="bg-success-light rounded-lg p-5">
                <h3 className="font-heading font-semibold text-wu-ink mb-3">{t('council.assist.found')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-neutral">{t('council.assist.name')}</p>
                    <p className="text-sm font-medium text-wu-ink">{result.student?.name}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-neutral">{t('council.assist.campus')}</p>
                    <p className="text-sm font-medium text-wu-ink capitalize">{result.student?.campus}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-neutral">{t('council.assist.program')}</p>
                    <p className="text-sm font-medium text-wu-ink">{result.student?.program}</p>
                  </div>
                  {result.student?.section && (
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-neutral">{t('council.assist.section')}</p>
                      <p className="text-sm font-medium text-wu-ink">{result.student.section}</p>
                    </div>
                  )}
                  <div className="bg-white rounded-lg p-4 sm:col-span-2">
                    <p className="text-xs text-neutral">{t('council.assist.status')}</p>
                    <StatusBadge status={result.student?.status || 'draft'} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-danger-light rounded-lg p-4 text-sm text-danger">
                {t('council.assist.notFound')}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
