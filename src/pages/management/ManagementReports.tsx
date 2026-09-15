import { useTranslation } from 'react-i18next';
import DashboardHero from '@/components/shared/DashboardHero';
import { useToast } from '@/components/ui/Toast';

interface ReportSpec {
  id: string;
  title: string;
  category: string;
  desc: string;
  frequency: string;
  pages: string;
  formats: ('PDF' | 'XLSX' | 'CSV')[];
}

const reportsList: ReportSpec[] = [
  {
    id: 'rep-01',
    title: 'Statutory Annual Admissions & Matriculation Digest',
    category: 'Ministry of Education Compliance',
    desc: 'Official certified digest of all incoming undergraduate candidates, validated entrance scores, and final campus assignments submitted to FDRE Ministry of Education.',
    frequency: 'Annual / Per Semester',
    pages: '48 Pages',
    formats: ['PDF', 'XLSX'],
  },
  {
    id: 'rep-02',
    title: 'Multi-Campus Capacity & Infrastructure Utilization',
    category: 'Institutional Planning',
    desc: 'Comparative analysis of classroom occupancy, dorm capacity, and faculty-to-student ratios across Nekemte, Shambu, and Gimbi campuses.',
    frequency: 'Quarterly',
    pages: '32 Pages',
    formats: ['PDF', 'XLSX'],
  },
  {
    id: 'rep-03',
    title: 'Curriculum Program Demand & Merit Cutoff Trends',
    category: 'Academic Quality Assurance',
    desc: 'Empirical data on student program preferences, competitive entrance exam cutoffs, and faculty quota fill rates for STEM and Social Sciences.',
    frequency: 'Per Admission Cycle',
    pages: '24 Pages',
    formats: ['PDF', 'CSV'],
  },
  {
    id: 'rep-04',
    title: 'Semester Re-Registration & Progression Velocity',
    category: 'Registrar Telemetry',
    desc: 'Continuing student clearance statistics, modular credit allocations, transfer requests, and academic probation indicators.',
    frequency: 'Bi-Annual',
    pages: '18 Pages',
    formats: ['PDF', 'XLSX'],
  },
  {
    id: 'rep-05',
    title: 'Institutional Gender & Regional Diversity Matrix',
    category: 'Governance & Equity',
    desc: 'Detailed breakdown of candidate representations across all regional states of Ethiopia, demographic affirmative action results, and gender parity metrics.',
    frequency: 'Annual',
    pages: '36 Pages',
    formats: ['PDF', 'XLSX', 'CSV'],
  },
  {
    id: 'rep-06',
    title: 'Dormitory & Residential Hall Allocation Audit',
    category: 'Student Welfare & Support',
    desc: 'Bed-space occupancy reports, building-level residential rosters, and cafeteria meal card issuance registries.',
    frequency: 'Per Semester',
    pages: '16 Pages',
    formats: ['PDF', 'XLSX'],
  },
];

export default function ManagementReports() {
  const { t } = useTranslation();
  const { addToast } = useToast();

  const handleDownload = (title: string, format: string) => {
    addToast(`Compiling and downloading "${title}" in ${format} format...`, 'info');
    setTimeout(() => {
      addToast(`Downloaded "${title}" successfully.`, 'success');
    }, 1200);
  };

  const handleExportAll = () => {
    addToast('Compiling University Senate Complete Executive Intelligence Bundle (ZIP)...', 'info');
    setTimeout(() => {
      addToast('Executive Intelligence Bundle ready for download.', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="Wallaga UNIVERSITY SENATE • STRATEGIC DATA REPOSITORY"
        title={t('management.reports.title', 'Executive Intelligence & Institutional Reports')}
        description="Official certified statistical reports repository for the University President, Senate Council, Ministry of Education, and Higher Education Quality Assurance Agency."
        stats={[
          { label: 'Catalogued Reports', value: '6 Master Dossiers' },
          { label: 'Certification', value: 'Senate Sealed', highlight: true },
          { label: 'Academic Period', value: 'AY 2026 / 2027' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportAll}
              className="bg-[#D9251D] hover:bg-[#B51E17] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Download Executive Bundle (ZIP)</span>
              <span>📦</span>
            </button>
            <button
              onClick={() => addToast('Automated distribution list scheduled for Senate meeting.', 'success')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Schedule Email Dispatch</span>
              <span>✉️</span>
            </button>
          </div>
        }
      />

      {/* ─── Reports Catalog Grid ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              Accredited Senate Reporting Catalog
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Certified documents compliant with FDRE Higher Education Proclamation standards
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded">
            {t('management.reports.readOnly', 'Executive Read-Only Access')}
          </span>
        </div>

        <div className="p-6 divide-y divide-gray-200 space-y-6">
          {reportsList.map((report, idx) => (
            <div
              key={report.id}
              className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${idx !== 0 ? 'pt-6' : ''
                }`}
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#0073AA] px-2 py-0.5 rounded border border-blue-100">
                    {report.category}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    • {report.frequency} • {report.pages}
                  </span>
                </div>
                <h4 className="text-base font-black text-[#00486E] hover:text-[#0073AA] transition-colors cursor-pointer">
                  {report.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">{report.desc}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {report.formats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => handleDownload(report.title, fmt)}
                    className="bg-[#F8F9FA] hover:bg-[#00486E] text-gray-700 hover:text-white border border-gray-300 text-xs font-bold px-3.5 py-2 rounded transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{fmt}</span>
                    <span className="text-[11px]">⬇</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
