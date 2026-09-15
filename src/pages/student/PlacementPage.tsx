import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { placementService } from '@/mocks/services';
import type { StudentPlacement } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';

export default function PlacementPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [placement, setPlacement] = useState<StudentPlacement | null>(null);

  useEffect(() => {
    if (user) {
      placementService.getStudentPlacement(user.id).then((p) => {
        setPlacement(p);
      });
    }
  }, [user]);

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="CAMPUS & DORMITORY ALLOCATION"
        title={t('student.placement.title', 'Class & Residential Placement')}
        description="Official academic cohort sectioning and on-campus residential hall allocation approved by the Wallaga University Registrar Directorate."
        stats={[
          { label: 'Campus', value: 'Nekemte' },
          { label: 'Section', value: 'Section 01', highlight: true },
          { label: 'Dorm Block', value: 'Block 04' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ─── Academic Class Cohort Card ─── */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider block">
                  ACADEMIC INSTRUCTION
                </span>
                <h3 className="text-lg font-bold font-heading text-[#00486E]">
                  Lecture Section Allocation
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Active Cohort
              </span>
            </div>

            <div className="p-4 bg-[#FAFBFD] rounded border border-gray-200 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-[#00486E] text-white text-xl flex items-center justify-center font-bold shrink-0">
                🏫
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold block">Cohort Identifier</span>
                <h4 className="text-lg font-extrabold text-[#00486E] font-heading">
                  {placement?.classSection?.name || 'Section 01 — Freshmen Tech'}
                </h4>
                <p className="text-xs text-gray-500 font-mono">Dept of Software Engineering</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Primary Lecture Hall</span>
                <span className="text-sm font-bold text-[#00486E]">
                  {placement?.classSection?.lectureHall || 'Hall A-102 (Tech Wing)'}
                </span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Section Capacity</span>
                <span className="text-sm font-bold text-gray-800">
                  {placement?.classSection?.currentEnrollment || 42} / {placement?.classSection?.capacity || 45} Students
                </span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Class Coordinator</span>
                <span className="text-sm font-bold text-gray-800">Dr. Gemechu Desta</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Commencement Date</span>
                <span className="text-sm font-bold text-[#D9251D]">Monday, Oct 19, 2026</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 text-xs text-gray-500 flex items-center justify-between">
            <span>* Bring digital ID card to entrance of Lecture Hall A-102</span>
            <span className="text-[#0073AA] font-bold">Nekemte Campus</span>
          </div>
        </div>

        {/* ─── Residential Hall (Dormitory) Card ─── */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
                  STUDENT HOUSING
                </span>
                <h3 className="text-lg font-bold font-heading text-[#00486E]">
                  Dormitory & Meal Allocation
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                Bed Assigned
              </span>
            </div>

            <div className="p-4 bg-[#FAFBFD] rounded border border-gray-200 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-[#D9251D] text-white text-xl flex items-center justify-center font-bold shrink-0">
                🛏️
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold block">Residence Hall</span>
                <h4 className="text-lg font-extrabold text-[#00486E] font-heading">
                  Block 04 • Room 212 • Bed C
                </h4>
                <p className="text-xs text-gray-500 font-mono">East Dormitory Quadrangle</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Assigned Dining Hall</span>
                <span className="text-sm font-bold text-[#00486E]">Central Dining Complex B</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Proctor Contact</span>
                <span className="text-sm font-bold text-gray-800">Umer Kemal (+251-571-11-28)</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Check-in Window</span>
                <span className="text-sm font-bold text-gray-800">Oct 05 – Oct 08, 2026</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">Key Deposit Status</span>
                <span className="text-sm font-bold text-emerald-700">Cleared (Free)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 text-xs text-gray-500 flex items-center justify-between">
            <span>* Present digital ID card to Block 04 proctor for room key</span>
            <span className="text-[#D9251D] font-bold">Main Campus Housing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
