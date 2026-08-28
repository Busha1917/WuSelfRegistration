import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { placementService } from '@/mocks/services';
import type { ClassSection, CampusId } from '@/types';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { useToast } from '@/components/ui/Toast';

export default function PlacementMgmt() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [sections, setSections] = useState<ClassSection[]>([]);
  const [campusFilter, setCampusFilter] = useState<string>('');
  useEffect(() => {
    placementService.getClassSections(campusFilter as CampusId || undefined).then(setSections);
  }, [campusFilter]);

  const handlePublish = async (campusId: CampusId) => {
    await placementService.publishPlacements(campusId);
    addToast(`Placements for ${campusId} campus published`, 'success');
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('registrar.placement.title')}</h1>

      <div className="flex items-center gap-3">
        <Select value={campusFilter} onChange={(e) => setCampusFilter(e.target.value)}
          options={[{ value: '', label: 'All Campuses' }, { value: 'main', label: 'Main' }, { value: 'shambu', label: 'Shambu' }, { value: 'gimbi', label: 'Gimbi' }]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading font-semibold text-wu-ink">{s.name}</h3>
                <p className="text-xs text-neutral mt-1">{s.lectureHall}</p>
                <p className="text-xs text-neutral">Program: {s.programId} • Campus: {s.campusId}</p>
              </div>
              <span className="text-xs text-neutral bg-gray-100 px-2 py-1 rounded">Intake {s.intakeYear}</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-neutral mb-1">
                <span>Enrollment</span>
                <span>{s.currentEnrollment}/{s.capacity}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-wu-maroon h-2 rounded-full" style={{ width: `${(s.currentEnrollment / s.capacity) * 100}%` }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardTitle>Publish Placements</CardTitle>
        <p className="text-sm text-neutral mt-2">Publish all placements for a campus to make them visible to students.</p>
        <div className="flex gap-3 mt-4">
          {(['main', 'shambu', 'gimbi'] as CampusId[]).map((c) => (
            <Button key={c} variant="outline" size="sm" onClick={() => handlePublish(c)}>Publish {c}</Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
