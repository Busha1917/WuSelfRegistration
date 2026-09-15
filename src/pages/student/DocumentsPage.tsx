import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardHero from '@/components/shared/DashboardHero';
import { useToast } from '@/components/ui/Toast';

interface DocItem {
  id: string;
  name: string;
  category: string;
  status: 'uploaded' | 'pending' | 'verified' | 'rejected';
  fileName?: string;
  size?: string;
  uploadedAt?: string;
  rejectionNote?: string;
}

export default function DocumentsPage() {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [docs, setDocs] = useState<DocItem[]>([
    {
      id: '1',
      name: 'Grade 12 National Assessment Examination Certificate',
      category: 'Academic Credentials',
      status: 'verified',
      fileName: 'Grade12_National_Certificate_2026.pdf',
      size: '1.8 MB',
      uploadedAt: 'Aug 28, 2026',
    },
    {
      id: '2',
      name: 'Secondary School Student Transcript (Grades 9-12)',
      category: 'Academic Credentials',
      status: 'verified',
      fileName: 'HighSchool_Transcript_Final.pdf',
      size: '2.4 MB',
      uploadedAt: 'Aug 28, 2026',
    },
    {
      id: '3',
      name: 'Recent Passport-Style Photograph (White Background)',
      category: 'Identity Documentation',
      status: 'verified',
      fileName: 'student_id_photo_3x4.jpg',
      size: '850 KB',
      uploadedAt: 'Aug 29, 2026',
    },
    {
      id: '4',
      name: 'Official Kebele or National Digital ID Card',
      category: 'Identity Documentation',
      status: 'pending',
      fileName: 'Kebele_ID_Scan.pdf',
      size: '1.2 MB',
      uploadedAt: 'Sep 01, 2026',
      rejectionNote: 'Image edges slightly truncated. Please upload a clear flat scan showing the seal.',
    },
  ]);

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        addToast(`Uploaded ${file.name} successfully. Placed in registrar verification queue.`, 'success');
        setDocs((prev) =>
          prev.map((d) =>
            d.id === '4'
              ? { ...d, fileName: file.name, status: 'uploaded', rejectionNote: undefined }
              : d
          )
        );
      }, 1000);
    }
  };

  const statusBadges = {
    verified: { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', label: 'Verified by Registrar' },
    uploaded: { bg: 'bg-blue-100 text-blue-800 border-blue-300', label: 'Under Verification' },
    pending: { bg: 'bg-amber-100 text-amber-800 border-amber-300', label: 'Correction Required' },
    rejected: { bg: 'bg-red-100 text-red-800 border-red-300', label: 'Rejected' },
  };

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="STUDENT ENROLLMENT DOCUMENTATION"
        title={t('student.documents.title', 'Academic Document Management')}
        description="Review and manage official academic certificates and identity documents required for Wallaga University admission clearance and degree matriculation."
        stats={[
          { label: 'Required', value: '4' },
          { label: 'Verified', value: '3', highlight: true },
          { label: 'Action Needed', value: '1' },
        ]}
      />

      {/* ─── Upload Dropzone ─── */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
              NEW DOCUMENT SUBMISSION
            </span>
            <h3 className="text-lg font-bold font-heading text-[#00486E]">
              {t('student.documents.upload', 'Upload Clearance Certificates')}
            </h3>
          </div>
          <span className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB each)</span>
        </div>

        <div className="border-2 border-dashed border-[#0073AA]/40 hover:border-[#0073AA] rounded-sm p-8 text-center bg-[#FAFBFD] transition-colors relative group">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            id="doc-upload"
            onChange={handleFileUpload}
          />
          <label htmlFor="doc-upload" className="cursor-pointer flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#EBF3F8] text-[#0073AA] flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform">
              📂
            </div>
            <p className="text-sm font-bold text-[#00486E] mb-1">
              Click to browse or drag and drop official document scans
            </p>
            <p className="text-xs text-gray-500">
              Clear, uncropped high-resolution scans with visible educational stamps
            </p>
            {uploading && (
              <div className="mt-3 text-xs font-bold text-[#0073AA] flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Processing and encrypting upload...</span>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* ─── Document Records List ─── */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#0073AA] uppercase tracking-wider block">
              OFFICIAL CLEARANCE ARCHIVE
            </span>
            <h3 className="text-lg font-bold font-heading text-[#00486E]">
              Submitted Credentials & Review Status
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-medium">4 of 4 Submitted</span>
        </div>

        <div className="space-y-4">
          {docs.map((doc) => {
            const badge = statusBadges[doc.status];
            return (
              <div
                key={doc.id}
                className="p-4 sm:p-5 rounded border border-gray-200 hover:border-[#0073AA] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAFBFD]"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded bg-[#00486E]/10 text-[#00486E] flex items-center justify-center text-lg font-bold shrink-0">
                    📄
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{doc.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#00486E]">{doc.name}</h4>
                    {doc.fileName && (
                      <p className="text-xs text-gray-500 font-mono mt-0.5">
                        {doc.fileName} • {doc.size} • Uploaded {doc.uploadedAt}
                      </p>
                    )}
                    {doc.rejectionNote && (
                      <div className="mt-2 text-xs bg-red-50 text-red-700 p-2 rounded border border-red-200 flex items-start gap-1.5">
                        <span className="font-bold shrink-0">⚠️ Registrar Note:</span>
                        <span>{doc.rejectionNote}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                    {badge.label}
                  </span>
                  <label
                    htmlFor="doc-upload"
                    className="cursor-pointer bg-white hover:bg-gray-100 text-[#00486E] border border-gray-300 text-xs font-semibold px-3 py-1.5 rounded transition-colors shadow-2xs"
                  >
                    Replace Scan
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
