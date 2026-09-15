import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { placementService } from '@/mocks/services';
import type { ClassSection, CampusId } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import { useToast } from '@/components/ui/Toast';

export default function PlacementMgmt() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [sections, setSections] = useState<ClassSection[]>([]);
  const [campusFilter, setCampusFilter] = useState<string>('');

  useEffect(() => {
    placementService.getClassSections((campusFilter as CampusId) || undefined).then(setSections);
  }, [campusFilter]);

  const handlePublish = async (campusId: CampusId, campusName: string) => {
    await placementService.publishPlacements(campusId);
    addToast(`Placements for ${campusName} successfully published and visible on student dashboards.`, 'success');
  };

  const campusesList: { id: CampusId; name: string }[] = [
    { id: 'main', name: 'Nekemte Main Campus' },
    { id: 'shambu', name: 'Shambu Campus' },
    { id: 'gimbi', name: 'Gimbi Campus' },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="CAMPUS ENROLLMENT & COHORT CAPACITY"
        title={t('registrar.placement.title', 'Class Placement & Capacity Management')}
        description="Monitor lecture hall occupancy, configure classroom section cohorts across Nekemte, Shambu, and Gimbi, and publish finalized student allocations to portal dashboards."
        stats={[
          { label: 'Active Sections', value: sections.length || '12' },
          { label: 'Total Capacity', value: '540 Seats', highlight: true },
          { label: 'Campuses', value: '3 Active' },
        ]}
      />

      {/* ─── Campus Filter & Publish Section ─── */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
            LOCATION FILTER
          </span>
          <h3 className="text-base font-bold font-heading text-[#00486E]">
            Filter Sections by Campus
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {[
            { id: '', label: 'All Campuses' },
            { id: 'main', label: 'Nekemte Main' },
            { id: 'shambu', label: 'Shambu' },
            { id: 'gimbi', label: 'Gimbi' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCampusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                campusFilter === tab.id
                  ? 'bg-[#0073AA] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Sections Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((s) => {
          const occupancyRate = Math.round((s.currentEnrollment / s.capacity) * 100);
          return (
            <div
              key={s.id}
              className="bg-white border border-gray-200 hover:border-[#0073AA] rounded-sm p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9251D] bg-red-50 px-2 py-0.5 rounded">
                    Intake {s.intakeYear}
                  </span>
                  <span className="text-xs text-gray-500 font-mono capitalize">
                    {s.campusId === 'main' ? 'Nekemte Main' : s.campusId}
                  </span>
                </div>

                <h3 className="text-base font-bold font-heading text-[#00486E] mb-1">
                  {s.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
                  <span>📍</span>
                  <span>{s.lectureHall}</span>
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 bg-[#FAFBFD] p-3 rounded border border-gray-100 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Occupancy:</span>
                    <span className="font-bold text-[#00486E]">
                      {s.currentEnrollment} / {s.capacity} Students ({occupancyRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        occupancyRate >= 90 ? 'bg-[#D9251D]' : 'bg-[#0073AA]'
                      }`}
                      style={{ width: `${occupancyRate}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">Program:</span>
                <span className="font-bold text-gray-800">{s.programId}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Publish Section ─── */}
      <div className="bg-[#002B40] text-white p-6 sm:p-8 rounded-sm shadow-md border-l-4 border-[#D9251D] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#66C2FF] uppercase tracking-wider block mb-1">
            OFFICIAL SENATE PUBLICATION
          </span>
          <h3 className="text-xl font-bold font-heading">
            Publish Class & Section Placements
          </h3>
          <p className="text-xs text-gray-300 mt-1 max-w-xl">
            Click to release verified classroom sections and lecture hall timetables to candidate student dashboards across the university network.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {campusesList.map((c) => (
            <button
              key={c.id}
              onClick={() => handlePublish(c.id, c.name)}
              className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-colors shadow-2xs"
            >
              Publish {c.name.split(' ')[0]} ↗
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
