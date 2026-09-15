import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { semesterService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import DashboardHero from '@/components/shared/DashboardHero';

export default function ReRegistrationPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [status, setStatus] = useState<'idle' | 'submitted' | 'loading'>('idle');
  const [loading, setLoading] = useState(false);

  const courses = [
    { code: 'CoSc2011', title: 'Data Structures and Algorithms', credits: 4, type: 'Core Compulsory' },
    { code: 'CoSc2021', title: 'Object Oriented Programming with Java', credits: 4, type: 'Core Compulsory' },
    { code: 'Math2031', title: 'Discrete Mathematics for Computing', credits: 3, type: 'Supportive' },
    { code: 'Eng2041', title: 'Technical Writing and Communication', credits: 2, type: 'General' },
    { code: 'CoSc2051', title: 'Computer Organization & Architecture', credits: 4, type: 'Core Compulsory' },
  ];

  const handleConfirm = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await semesterService.submitReRegistration(user.id);
      setStatus('submitted');
      addToast('Semester re-registration package submitted successfully to academic advisor.', 'success');
    } catch {
      addToast('Failed to submit re-registration. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="SEMESTER COURSE CONFIRMATION"
        title={t('student.reRegistration.title', 'Semester Re-Registration')}
        description="Verify your continuing enrollment for the upcoming semester, confirm your registered curriculum modules, and route to your department advisor for endorsement."
        stats={[
          { label: 'Term', value: 'Fall 2026' },
          { label: 'Total Credits', value: '17 ECTS' },
          { label: 'Period', value: 'Open', highlight: true },
        ]}
      />

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block">
              ACADEMIC YEAR 2026/2027
            </span>
            <h3 className="text-lg font-bold font-heading text-[#00486E]">
              Proposed Module Enrollment Schedule
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded">
            Program: B.Sc. Software Engineering
          </span>
        </div>

        {/* Modules Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#00486E] text-white uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5">Course Code</th>
                <th className="p-3.5">Course Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5 text-center">Credit Hours (ECTS)</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-[#FAFBFD]">
              {courses.map((c) => (
                <tr key={c.code} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#0073AA]">{c.code}</td>
                  <td className="p-3.5 font-bold text-[#00486E]">{c.title}</td>
                  <td className="p-3.5 text-gray-600">{c.type}</td>
                  <td className="p-3.5 text-center font-mono font-bold text-gray-800">{c.credits}</td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Pre-Approved
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 border-t border-gray-200 text-xs font-bold text-gray-800">
              <tr>
                <td colSpan={3} className="p-3.5 text-right uppercase tracking-wider">
                  Total Semester Credit Load:
                </td>
                <td className="p-3.5 text-center font-mono text-[#00486E] text-sm">17 ECTS</td>
                <td className="p-3.5" />
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="p-4 bg-blue-50 border-l-4 border-[#0073AA] rounded-xs text-xs text-blue-900 leading-relaxed">
          <p className="font-bold mb-0.5">ℹ️ Academic Advisor Notice:</p>
          <p>
            Submission locks course selections for Semester I. Course drops and adds are subject to registrar window from Oct 12 – Oct 14, 2026.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Student: <span className="font-bold text-[#00486E]">{user?.fullName}</span>
          </div>

          {status === 'submitted' ? (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 px-5 py-2.5 rounded text-xs font-bold">
              <span>✅</span>
              <span>Re-registration Successfully Submitted to Academic Advisor</span>
            </div>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded shadow transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Transmitting Registration...</span>
                </>
              ) : (
                <>
                  <span>Confirm Semester Re-Registration</span>
                  <span>↗</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
