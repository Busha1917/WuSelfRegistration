import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { publicService } from '@/mocks/services';
import type { LookupResult } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/shared/StatusBadge';

export default function LookupPage() {
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
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold text-wu-ink mb-2">{t('public.lookup.title')}</h1>
      <p className="text-neutral mb-8">{t('public.lookup.description')}</p>

      <Card>
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('public.lookup.searchPlaceholder')}
            />
          </div>
          <Button type="submit" loading={loading}>{t('public.lookup.search')}</Button>
        </form>

        {searched && (
          <div className="mt-6">
            {result?.found ? (
              <div className="bg-success-light rounded-lg p-4">
                <h3 className="font-heading font-semibold text-wu-ink mb-3">{t('public.lookup.resultTitle')}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-neutral">Name:</span> <span className="font-medium">{result.student?.name}</span></div>
                  <div><span className="text-neutral">Campus:</span> <span className="font-medium">{result.student?.campus}</span></div>
                  <div><span className="text-neutral">Program:</span> <span className="font-medium">{result.student?.program}</span></div>
                  {result.student?.section && <div><span className="text-neutral">Section:</span> <span className="font-medium">{result.student.section}</span></div>}
                  <div><span className="text-neutral">Status:</span> <StatusBadge status={result.student?.status || 'draft'} /></div>
                </div>
              </div>
            ) : (
              <div className="bg-danger-light rounded-lg p-4 text-sm text-danger">
                {t('public.lookup.notFound')}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
