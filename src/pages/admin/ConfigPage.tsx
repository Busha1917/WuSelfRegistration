import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { publicService } from '@/mocks/services';
import type { Campus, Program } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import StatusBadge from '@/components/shared/StatusBadge';
import { useToast } from '@/components/ui/Toast';

export default function ConfigPage() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('campuses');
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    publicService.getCampuses().then(setCampuses);
    publicService.getPrograms().then(setPrograms);
  }, []);

  const tabs = [
    { id: 'campuses', label: t('admin.config.campuses', 'Campuses & Sites'), count: campuses.length || 3 },
    { id: 'programs', label: t('admin.config.programs', 'Academic Programs'), count: programs.length || 24 },
    { id: 'documents', label: t('admin.config.documentRequirements', 'Document Checklist'), count: 5 },
    { id: 'idcard', label: t('admin.config.idCardTemplate', 'Smart ID Template'), count: 'Biometric' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="Wallaga UNIVERSITY SENATE • INSTITUTIONAL GOVERNANCE"
        title={t('admin.config.title', 'Academic Structure & System Configuration')}
        description="Administer multi-campus parameters, academic colleges, curriculum degree programs, admissions document verification checklists, and cryptographic smart ID card templates."
        stats={[
          { label: 'Accredited Campuses', value: '3 Active Campuses' },
          { label: 'Degree Programs', value: `${programs.length || 24} Curricula`, highlight: true },
          { label: 'Biometric ID Engine', value: 'Active & Encrypted' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => addToast('System configuration snapshot exported.', 'success')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Export System Config</span>
              <span>💾</span>
            </button>
            <button
              onClick={() => addToast('Academic calendar sync initiated across all campuses.', 'info')}
              className="bg-[#0073AA] hover:bg-[#005B88] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Sync Campus Calendars</span>
              <span>🔄</span>
            </button>
          </div>
        }
      />

      {/* ─── Navigation Tabs ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-2 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 ${activeTab === tab.id
                ? 'bg-[#00486E] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100 hover:text-[#00486E]'
              }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-black ${activeTab === tab.id ? 'bg-[#D9251D] text-white' : 'bg-gray-200 text-gray-700'
                }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ─── TAB 1: CAMPUSES ─── */}
      {activeTab === 'campuses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campuses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden hover:shadow-md transition-shadow border-t-4 border-t-[#00486E]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0073AA] bg-blue-50 px-2 py-0.5 rounded">
                    Institutional Site
                  </span>
                  <StatusBadge status="active" />
                </div>
                <h3 className="text-lg font-black text-[#00486E]">{c.name}</h3>
                <p className="text-xs font-bold text-gray-500 mt-1 flex items-center gap-1">
                  <span>📍</span>
                  <span>{c.location}, Oromia Region, Ethiopia</span>
                </p>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                  {c.description}
                </p>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Curriculum Offerings:</span>
                  <span className="font-black text-[#D9251D] bg-red-50 px-2.5 py-0.5 rounded">
                    {programs.filter((p) => p.campusId === c.id).length || 8} Programs
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── TAB 2: PROGRAMS ─── */}
      {activeTab === 'programs' && (
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
          <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-[#00486E] uppercase tracking-wider">
              Accredited Curricula & Academic Programs ({programs.length})
            </h3>
            <button
              onClick={() => addToast('New program curriculum modal opened.', 'info')}
              className="bg-[#00486E] hover:bg-[#003652] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded shadow-xs"
            >
              + Add Program
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] text-[#00486E] uppercase font-black text-[11px] tracking-wider border-b border-gray-200">
                  <th className="p-3.5">Program Name & Code</th>
                  <th className="p-3.5">College / Department</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Campus Allocation</th>
                  <th className="p-3.5">Admissions Modality</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {programs.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-3.5 font-bold text-[#00486E]">{p.name}</td>
                    <td className="p-3.5 text-gray-700 font-medium">{p.department}</td>
                    <td className="p-3.5 font-mono text-gray-600">{p.duration}</td>
                    <td className="p-3.5">
                      <span className="font-bold uppercase text-[#0073AA] bg-blue-50 px-2 py-0.5 rounded text-[10px]">
                        {p.campusId}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.admissionTypes.map((at) => (
                          <span
                            key={at}
                            className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded uppercase"
                          >
                            {at}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <StatusBadge status="active" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 3: DOCUMENTS ─── */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-6 space-y-6">
          <div>
            <h3 className="text-base font-black text-[#00486E]">
              Admissions Document Verification Protocol
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Configure mandatory legal dossiers required by the University Senate for student matriculation.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { title: 'Grade 12 EHEEE Official Certificate', mandatory: true, accepted: 'PDF only (Signed)', max: '5 MB' },
              { title: 'Official High School Academic Transcript (Grades 9-12)', mandatory: true, accepted: 'PDF only', max: '10 MB' },
              { title: 'Ethiopian National Digital ID (Fayda) / Kebele ID', mandatory: true, accepted: 'PDF, JPG, PNG', max: '5 MB' },
              { title: 'Certified Medical Fitness & Health Certificate', mandatory: true, accepted: 'PDF or JPG', max: '5 MB' },
              { title: 'Official Passport Size Photograph (White Background)', mandatory: true, accepted: 'JPG, PNG', max: '2 MB' },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-wrap items-center justify-between p-4 bg-[#F8F9FA] rounded border border-gray-200 gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#00486E]">{doc.title}</span>
                    {doc.mandatory && (
                      <span className="text-[10px] font-black bg-red-100 text-red-800 px-2 py-0.5 rounded uppercase">
                        Mandatory
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Allowed: {doc.accepted} • Maximum file size: {doc.max}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded">
                    Active Checklist Item
                  </span>
                  <button
                    onClick={() => addToast(`Config updated for ${doc.title}`, 'info')}
                    className="text-xs font-bold text-[#0073AA] hover:underline"
                  >
                    Edit Rules
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: SMART ID CARD TEMPLATE ─── */}
      {activeTab === 'idcard' && (
        <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-6 space-y-6">
          <div>
            <h3 className="text-base font-black text-[#00486E]">
              Biometric Student ID Card Specification & Layout
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Preview and configure the official Wallaga University smart identity card generated upon matriculation approval.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Live Card Preview */}
            <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-300">
              <div className="bg-[#002B40] text-white p-3 text-center border-b-2 border-[#D9251D]">
                <div className="flex items-center justify-center gap-2">
                  <img src="/logo1.png" alt="WU" className="w-6 h-6 object-contain" />
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-wider">Wallaga University</h4>
                    <p className="text-[9px] text-gray-300">Student Identity Card</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-gray-100 rounded border border-gray-300 flex items-center justify-center text-xs text-gray-400 font-bold">
                    PHOTO
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-[#00486E]">Busha Tolessa</p>
                    <p className="text-[11px] text-gray-600">ID: WU/10492/16</p>
                    <p className="text-[11px] text-gray-600">Prog: Computer Science</p>
                    <p className="text-[11px] text-gray-600">Campus: Nekemte</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
                  <span>Expires: 2029-06-30</span>
                  <span className="font-mono font-bold text-[#00486E]">QR VALIDATED</span>
                </div>
              </div>
            </div>

            {/* Config Toggles */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded border border-gray-200">
                <h4 className="font-bold text-xs uppercase text-[#00486E] tracking-wider mb-2">
                  Security Features Enabled
                </h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>High-Density QR Code with Digital Registrar Signature</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Code 128 Library & Dormitory Barcode</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Institutional Holographic Seal Watermark</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Double-Sided Flip Layout with Emergency Contacts</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => addToast('Biometric ID template configuration saved.', 'success')}
                className="bg-[#00486E] hover:bg-[#003652] text-white text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded shadow-xs"
              >
                Save Template Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
