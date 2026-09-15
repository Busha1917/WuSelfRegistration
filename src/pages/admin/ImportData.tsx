import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import DashboardHero from '@/components/shared/DashboardHero';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';

interface BatchHistoryItem {
  id: string;
  batchCode: string;
  fileName: string;
  campus: string;
  modality: string;
  createdRecords: number;
  flaggedRecords: number;
  timestamp: string;
  status: 'completed' | 'verified';
}

const mockHistory: BatchHistoryItem[] = [
  {
    id: 'b-1',
    batchCode: 'MOE-WU-2026-NKT-01',
    fileName: 'MOE_Grade12_Placements_Nekemte_Regular.xlsx',
    campus: 'Nekemte (Main)',
    modality: 'Regular',
    createdRecords: 1240,
    flaggedRecords: 14,
    timestamp: '2026-08-28 14:32',
    status: 'completed',
  },
  {
    id: 'b-2',
    batchCode: 'MOE-WU-2026-SHM-01',
    fileName: 'MOE_Candidate_List_Shambu_Regular.csv',
    campus: 'Shambu',
    modality: 'Regular',
    createdRecords: 540,
    flaggedRecords: 5,
    timestamp: '2026-08-25 11:15',
    status: 'completed',
  },
  {
    id: 'b-3',
    batchCode: 'MOE-WU-2026-GMB-01',
    fileName: 'MOE_Gimbi_HealthSciences_Intake.xlsx',
    campus: 'Gimbi',
    modality: 'Regular',
    createdRecords: 480,
    flaggedRecords: 8,
    timestamp: '2026-08-22 09:45',
    status: 'verified',
  },
];

export default function ImportData() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [admissionType, setAdmissionType] = useState('regular');
  const [intakeYear, setIntakeYear] = useState('2026');
  const [intakeSemester, setIntakeSemester] = useState('1');
  const [campusId, setCampusId] = useState('main');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ created: number; flagged: number } | null>(null);
  const [history, setHistory] = useState<BatchHistoryItem[]>(mockHistory);

  const samplePreview = [
    { regNo: 'WU/MOE/2026/001', name: 'Busha Tolessa Gemechu', sex: 'M', score: 485, school: 'Nekemte Prep', program: 'Computer Science' },
    { regNo: 'WU/MOE/2026/002', name: 'Chaltu Dibaba Negash', sex: 'F', score: 472, school: 'Shambu Sec', program: 'Medicine' },
    { regNo: 'WU/MOE/2026/003', name: 'Tolera Bekele Hunde', sex: 'M', score: 450, school: 'Gimbi Comp', program: 'Civil Engineering' },
    { regNo: 'WU/MOE/2026/004', name: 'Hawwi Kebede Merga', sex: 'F', score: 461, school: 'Nekemte Prep', program: 'Electrical Eng.' },
  ];

  const handleImport = async () => {
    if (!file) {
      addToast('Please select a valid MOE spreadsheet or CSV file first.', 'warning');
      return;
    }
    setLoading(true);
    const fakeData = Array.from({ length: 45 }, (_, i) => ({
      name: `Student ${i + 1}`,
      email: `s${i + 1}@email.com`,
    }));
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
      const newBatch: BatchHistoryItem = {
        id: `b-${Date.now()}`,
        batchCode: `MOE-WU-2026-${campusId.toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
        fileName: file.name,
        campus: campusId === 'main' ? 'Nekemte (Main)' : campusId === 'shambu' ? 'Shambu' : 'Gimbi',
        modality: admissionType.toUpperCase(),
        createdRecords: res.created,
        flaggedRecords: res.flagged,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'completed',
      };
      setHistory([newBatch, ...history]);
      addToast(
        t('admin.import.success', { created: res.created, flagged: res.flagged }),
        'success'
      );
    } catch {
      addToast(t('admin.import.errors', 'Import errors found. Please fix and try again.'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="FDRE MINISTRY OF EDUCATION • INSTITUTIONAL DATA PIPELINE"
        title={t('admin.import.title', 'National Matriculation Batch Ingestion')}
        description="Bulk import verified student admission cohorts assigned by the Ministry of Education. Data is parsed, validated against national exam IDs, and partitioned across Nekemte, Shambu, and Gimbi campus registers."
        stats={[
          { label: 'Active Intake', value: 'AY 2026 / 2027' },
          { label: 'Total Ingested', value: '2,260 Candidates', highlight: true },
          { label: 'MOE Batch Format', value: 'Excel (.xlsx) / CSV' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => addToast('Official MOE placement schema template downloaded.', 'info')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Download Schema Template</span>
              <span>📄</span>
            </button>
            <button
              onClick={() => addToast('Audit validation engine is active.', 'success')}
              className="bg-[#0073AA] hover:bg-[#005B88] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Validate Existing Batches</span>
              <span>⚡</span>
            </button>
          </div>
        }
      />

      {/* ─── Ingestion Setup & Upload Form ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0073AA]"></span>
            <h2 className="text-base font-black text-[#00486E]">
              1. Ingestion Partition & Parameter Configuration
            </h2>
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Step 1 of 2
          </span>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Campus Partition"
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              options={[
                { value: 'main', label: 'Nekemte (Main Campus)' },
                { value: 'shambu', label: 'Shambu Campus' },
                { value: 'gimbi', label: 'Gimbi Campus' },
              ]}
            />
            <Select
              label="Admission Modality"
              value={admissionType}
              onChange={(e) => setAdmissionType(e.target.value)}
              options={[
                { value: 'regular', label: 'Regular (Govt. Sponsored)' },
                { value: 'weekend', label: 'Weekend Self-Sponsored' },
                { value: 'night', label: 'Evening / Night Shift' },
                { value: 'distance_summer', label: 'Distance & Summer' },
              ]}
            />
            <Input
              label="Intake Academic Year"
              type="number"
              value={intakeYear}
              onChange={(e) => setIntakeYear(e.target.value)}
            />
            <Select
              label="Academic Semester"
              value={intakeSemester}
              onChange={(e) => setIntakeSemester(e.target.value)}
              options={[
                { value: '1', label: 'Semester I' },
                { value: '2', label: 'Semester II' },
              ]}
            />
          </div>

          {/* Drag & Drop Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-10 text-center bg-gray-50/50 hover:bg-white hover:border-[#00486E] transition-all">
            <input
              type="file"
              accept=".xlsx,.csv"
              className="hidden"
              id="import-file"
              onChange={(e) => {
                const selected = e.target.files?.[0] || null;
                setFile(selected);
                if (selected) {
                  addToast(`Loaded ${selected.name} (${(selected.size / 1024).toFixed(1)} KB)`, 'info');
                }
              }}
            />
            <label htmlFor="import-file" className="cursor-pointer block">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-[#00486E] flex items-center justify-center text-3xl mx-auto mb-3">
                📥
              </div>
              <p className="text-sm font-bold text-[#00486E]">
                {file ? file.name : t('admin.import.uploadFile', 'Select MOE Candidate Roster File')}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t('admin.import.supportedFormats', 'Accepts Microsoft Excel (.xlsx) and Comma-Separated Values (.csv)')}
              </p>
              <span className="inline-block mt-4 bg-[#00486E] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-xs">
                {file ? 'Change File' : 'Browse Local Files'}
              </span>
            </label>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {file ? `Ready to parse ${file.name}` : 'Awaiting file selection...'}
            </p>
            <button
              onClick={handleImport}
              disabled={loading || !file}
              className={`text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded shadow-sm transition-all flex items-center gap-2 ${
                file && !loading
                  ? 'bg-[#D9251D] hover:bg-[#B51E17] text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{loading ? 'Processing Batch Ingestion...' : 'Execute Batch Ingestion'}</span>
              <span>🚀</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Result Notification Card ─── */}
      {result && (
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
            <h3 className="font-black text-[#00486E] text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span>Batch Ingestion Execution Report</span>
            </h3>
            <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded">
              Processed Successfully
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded text-center">
              <p className="text-3xl font-black text-green-700">{result.created}</p>
              <p className="text-xs font-bold text-green-800 uppercase tracking-wider mt-1">
                Student Records Created
              </p>
              <p className="text-[11px] text-green-600 mt-0.5">Matriculated into university registry</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded text-center">
              <p className="text-3xl font-black text-amber-700">{result.flagged}</p>
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-1">
                Discrepancies Flagged
              </p>
              <p className="text-[11px] text-amber-600 mt-0.5">Routed to Registrar manual queue</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded text-center">
              <p className="text-3xl font-black text-[#00486E]">100%</p>
              <p className="text-xs font-bold text-[#00486E] uppercase tracking-wider mt-1">
                Schema Integrity
              </p>
              <p className="text-[11px] text-blue-600 mt-0.5">EHEEE hashes validated</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Schema Preview Sample Table ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00486E]"></span>
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              Sample MOE Ingestion Schema Preview
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-500">Standard Column Mapping</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] text-[#00486E] uppercase font-black text-[11px] tracking-wider border-b border-gray-200">
                <th className="p-3">MOE Reg No</th>
                <th className="p-3">Candidate Full Name</th>
                <th className="p-3">Sex</th>
                <th className="p-3">EHEEE Score</th>
                <th className="p-3">Secondary School</th>
                <th className="p-3">Allocated Program</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {samplePreview.map((s, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                  <td className="p-3 font-mono text-[#0073AA] font-bold">{s.regNo}</td>
                  <td className="p-3 font-bold text-gray-800">{s.name}</td>
                  <td className="p-3 font-medium text-gray-600">{s.sex}</td>
                  <td className="p-3 font-black text-green-700">{s.score}</td>
                  <td className="p-3 text-gray-600">{s.school}</td>
                  <td className="p-3 font-medium text-[#00486E]">{s.program}</td>
                  <td className="p-3 text-right">
                    <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Historical Batch Log ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9251D]"></span>
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              {t('admin.import.importLog', 'Institutional Batch Ingestion History')}
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-400">Total Batches: {history.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F9FA] text-[#00486E] uppercase font-black text-[11px] tracking-wider border-b border-gray-200">
                <th className="p-3">Batch Code</th>
                <th className="p-3">Source File</th>
                <th className="p-3">Campus Target</th>
                <th className="p-3">Modality</th>
                <th className="p-3 text-center">Records Created</th>
                <th className="p-3 text-center">Flagged</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-[#00486E]">{b.batchCode}</td>
                  <td className="p-3 text-gray-700 font-medium">{b.fileName}</td>
                  <td className="p-3 font-bold text-gray-800">{b.campus}</td>
                  <td className="p-3 text-gray-600">{b.modality}</td>
                  <td className="p-3 text-center font-black text-green-700">+{b.createdRecords}</td>
                  <td className="p-3 text-center font-bold text-amber-600">{b.flaggedRecords}</td>
                  <td className="p-3 text-gray-500 font-mono text-[11px]">{b.timestamp}</td>
                  <td className="p-3 text-right">
                    <span className="text-[10px] font-bold bg-blue-50 text-[#00486E] border border-blue-200 px-2 py-0.5 rounded uppercase">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
