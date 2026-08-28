import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { publicService } from '@/mocks/services';
import type { Campus, Program } from '@/types';
import Card from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';
import StatusBadge from '@/components/shared/StatusBadge';

export default function ConfigPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('campuses');
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    publicService.getCampuses().then(setCampuses);
    publicService.getPrograms().then(setPrograms);
  }, []);

  const tabs = [
    { id: 'campuses', label: t('admin.config.campuses') },
    { id: 'programs', label: t('admin.config.programs') },
    { id: 'documents', label: t('admin.config.documentRequirements') },
    { id: 'idcard', label: t('admin.config.idCardTemplate') },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('admin.config.title')}</h1>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'campuses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campuses.map((c) => (
            <Card key={c.id}>
              <h3 className="font-heading font-semibold text-wu-ink">{c.name}</h3>
              <p className="text-xs text-neutral mt-1">📍 {c.location}</p>
              <p className="text-xs text-neutral mt-1">{c.description}</p>
              <p className="text-xs text-wu-maroon mt-2">{programs.filter((p) => p.campusId === c.id).length} programs</p>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'programs' && (
        <Card>
          <div className="divide-y">
            {programs.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-wu-ink">{p.name}</p>
                  <p className="text-xs text-neutral">{p.department} • {p.duration} • {p.campusId}</p>
                </div>
                <div className="flex gap-1">
                  {p.admissionTypes.map((at) => (
                    <span key={at} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{at}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card>
          <p className="text-sm text-neutral">Document requirements are configured per program. Students must upload all required documents before submitting their application.</p>
          <div className="mt-4 space-y-2">
            {['Passport Photo', 'High School Transcript', 'National ID Copy', 'Birth Certificate', 'Health Certificate'].map((doc) => (
              <div key={doc} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm">{doc}</span>
                <StatusBadge status="active" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'idcard' && (
        <Card>
          <p className="text-sm text-neutral mb-4">Configure the ID card template layout and design.</p>
          <div className="bg-gray-50 rounded-lg p-6 max-w-md">
            <div className="bg-white border rounded-lg p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-20 h-24 bg-gray-100 rounded flex items-center justify-center text-xs">Photo</div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                  <div className="h-2 bg-gray-100 rounded w-2/3" />
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-[10px]">QR</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
