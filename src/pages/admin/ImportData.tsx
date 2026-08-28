import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';

export default function ImportData() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [admissionType, setAdmissionType] = useState('regular');
  const [intakeYear, setIntakeYear] = useState('2024');
  const [intakeSemester, setIntakeSemester] = useState('1');
  const [campusId, setCampusId] = useState('main');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ created: number; flagged: number } | null>(null);

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    const fakeData = Array.from({ length: 20 }, (_, i) => ({ name: `Student ${i + 1}`, email: `s${i + 1}@email.com` }));
    try {
      const res = await adminService.importData({
        fileName: file.name,
        data: fakeData,
        admissionType: admissionType as any,
        intakeYear: Number(intakeYear),
        intakeSemester: intakeSemester as '1' | '2',
        campusId: campusId as any,
      });
      setResult(res);
      addToast(t('admin.import.success', { created: res.created, flagged: res.flagged }), 'success');
    } catch {
      addToast(t('admin.import.errors'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('admin.import.title')}</h1>

      <Card>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-wu-maroon transition-colors">
          <input type="file" accept=".xlsx,.csv" className="hidden" id="import-file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <label htmlFor="import-file" className="cursor-pointer">
            <div className="text-4xl mb-2">📥</div>
            <p className="text-sm text-neutral">{file ? file.name : t('admin.import.uploadFile')}</p>
            <p className="text-xs text-neutral mt-1">{t('admin.import.supportedFormats')}</p>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4">
          <Select label="Admission Type" value={admissionType} onChange={(e) => setAdmissionType(e.target.value)}
            options={[{ value: 'regular', label: 'Regular' }, { value: 'weekend', label: 'Weekend' }, { value: 'night', label: 'Night' }]} />
          <Input label="Intake Year" type="number" value={intakeYear} onChange={(e) => setIntakeYear(e.target.value)} />
          <Select label="Semester" value={intakeSemester} onChange={(e) => setIntakeSemester(e.target.value)}
            options={[{ value: '1', label: 'Semester 1' }, { value: '2', label: 'Semester 2' }]} />
          <Select label="Campus" value={campusId} onChange={(e) => setCampusId(e.target.value)}
            options={[{ value: 'main', label: 'Main' }, { value: 'shambu', label: 'Shambu' }, { value: 'gimbi', label: 'Gimbi' }]} />
        </div>

        <Button onClick={handleImport} loading={loading} className="mt-4" disabled={!file}>
          {t('admin.import.import')}
        </Button>
      </Card>

      {result && (
        <Card>
          <CardTitle>Import Result</CardTitle>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-4 bg-success-light rounded-lg">
              <p className="text-3xl font-bold text-success">{result.created}</p>
              <p className="text-sm text-neutral">Records Created</p>
            </div>
            <div className="text-center p-4 bg-warning-light rounded-lg">
              <p className="text-3xl font-bold text-warning">{result.flagged}</p>
              <p className="text-sm text-neutral">Flagged</p>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <CardTitle>{t('admin.import.importLog')}</CardTitle>
        <p className="text-sm text-neutral mt-2">No import history yet.</p>
      </Card>
    </div>
  );
}
