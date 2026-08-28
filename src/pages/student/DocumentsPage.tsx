import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card, { CardTitle } from '@/components/ui/Card';

interface DocItem { id: string; name: string; status: 'uploaded' | 'pending' | 'verified' | 'rejected'; fileName?: string; }

export default function DocumentsPage() {
  const { t } = useTranslation();
  const [docs] = useState<DocItem[]>([
    { id: '1', name: 'Passport Photo', status: 'verified', fileName: 'photo.jpg' },
    { id: '2', name: 'High School Transcript', status: 'uploaded', fileName: 'transcript.pdf' },
    { id: '3', name: 'National ID Copy', status: 'pending' },
    { id: '4', name: 'Birth Certificate', status: 'rejected', fileName: 'birth_cert.pdf' },
  ]);

  const statusColors: Record<string, string> = {
    verified: 'bg-success-light text-success',
    uploaded: 'bg-wu-blue-50 text-wu-blue-700',
    pending: 'bg-warning-light text-warning',
    rejected: 'bg-danger-light text-danger',
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.documents.title')}</h1>
      <Card>
        <CardTitle>{t('student.documents.upload')}</CardTitle>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-4 hover:border-wu-maroon transition-colors">
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" id="doc-upload" />
          <label htmlFor="doc-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📎</div>
            <p className="text-sm text-neutral">{t('student.documents.dragDrop')}</p>
          </label>
        </div>
      </Card>
      <Card>
        <CardTitle>Uploaded Documents</CardTitle>
        <div className="divide-y mt-3">
          {docs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span>📄</span>
                <div>
                  <p className="text-sm font-medium text-wu-ink">{doc.name}</p>
                  {doc.fileName && <p className="text-xs text-neutral">{doc.fileName}</p>}
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[doc.status]}`}>
                {t(`student.documents.${doc.status}`)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
