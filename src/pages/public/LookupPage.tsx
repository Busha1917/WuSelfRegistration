import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { publicService } from '@/mocks/services';
import type { LookupResult } from '@/types';
import StatusBadge from '@/components/shared/StatusBadge';

export default function LookupPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const r = await publicService.lookupStudent(query);
      setResult(r);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSample = (name: string) => {
    setQuery(name);
    setLoading(true);
    publicService.lookupStudent(name).then((r) => {
      setResult(r);
      setSearched(true);
      setLoading(false);
    });
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] font-sans pb-24">
      {/* ─── AAU Navy Hero Banner ─── */}
      <section className="relative bg-[#00486E] text-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
            alt="Student Verification"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002B40] via-[#00486E]/95 to-[#00486E]/90" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-300 mb-4">
            <Link to="/" className="hover:text-white transition-colors">{t('portal.nav.home', 'Home')}</Link>
            <span>/</span>
            <span className="text-[#66C2FF]">{t('portal.lookupPage.breadcrumb', 'Admission Status Lookup')}</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#002B40] text-gray-200 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>{t('portal.lookupPage.badge', '2026/2027 Admissions Verification Active')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            {t('portal.lookupPage.title', 'Student Admission & Placement Lookup')}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mt-3 max-w-2xl mx-auto leading-relaxed">
            {t('portal.lookupPage.desc', 'Verify your admission acceptance, assigned campus, study modality, and classroom cohort section using your official student name or application ID.')}
          </p>
        </div>
      </section>

      {/* ─── Search Container ─── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-sm border border-gray-200 shadow-xl p-6 sm:p-10">
          <div className="mb-6">
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-1">
              {t('portal.lookupPage.database', 'INSTITUTIONAL REGISTRATION DATABASE')}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#00486E]">
              {t('portal.lookupPage.verifyTitle', 'Verify Your Admission Status')}
            </h2>
            <div className="flex items-center gap-1 mt-2 mb-2">
              <div className="h-1 w-8 bg-[#D9251D]" />
              <div className="h-1 w-14 bg-[#0073AA]" />
            </div>
            <p className="text-xs text-gray-500">
              {t('portal.lookupPage.instructions', 'Enter full student legal name (e.g. Alemayehu Bezabeh) or your assigned ID code.')}
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('portal.lookupPage.searchPlaceholder', 'e.g., Alemayehu Bezabeh or stu-001')}
                required
                className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0073AA] focus:border-[#0073AA] transition-colors"
              />
              <span className="absolute left-3.5 top-3.5 text-gray-400">🔍</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold px-8 py-3.5 rounded text-sm uppercase tracking-wider transition-all shadow hover:shadow-md disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>{t('portal.lookupPage.verifying', 'Verifying...')}</span>
                </span>
              ) : (
                <>
                  <span>{t('portal.lookupPage.searchBtn', 'Verify Status')}</span>
                  <span className="text-xs">↗</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Test Pills */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 flex-wrap">
            <span className="font-semibold text-gray-700">{t('portal.lookupPage.quickSamples', 'Quick Samples:')}</span>
            {['Alemayehu Bezabeh', 'Bikila Tadesse', 'Chala Gemeda'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => handleQuickSample(sample)}
                className="bg-gray-100 hover:bg-[#EBF3F8] hover:text-[#0073AA] border border-gray-200 px-2.5 py-1 rounded text-[11px] font-medium transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>

          {/* ─── Search Results Card ─── */}
          {searched && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              {result?.found && result.student ? (
                <div className="bg-[#FAFBFD] border-2 border-[#0073AA]/30 rounded-sm p-6 sm:p-8 shadow-sm">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00486E] bg-white p-0.5 shadow-sm shrink-0">
                        <img src="/logo1.png" alt="Wollega University" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9251D]">
                          {t('portal.lookupPage.recordTitle', 'OFFICIAL VERIFICATION RECORD')}
                        </span>
                        <h3 className="text-xl font-bold font-heading text-[#00486E]">
                          {result.student.name}
                        </h3>
                        <div className="text-xs text-gray-500 font-mono">
                          {t('portal.lookupPage.ref', 'Ref')}: {query.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div>
                      <StatusBadge status={result.student.status} />
                    </div>
                  </div>

                  {/* Placement Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 text-xs sm:text-sm border-b border-gray-200">
                    <div className="p-3 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block text-[11px] uppercase font-semibold">
                        {t('portal.lookupPage.campusPlacement', 'Campus Placement')}
                      </span>
                      <span className="font-bold text-[#00486E] text-base capitalize">{result.student.campus} Campus</span>
                    </div>

                    <div className="p-3 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block text-[11px] uppercase font-semibold">
                        {t('portal.lookupPage.degreeProgram', 'Degree Program')}
                      </span>
                      <span className="font-bold text-[#00486E] text-base">{result.student.program}</span>
                    </div>

                    <div className="p-3 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block text-[11px] uppercase font-semibold">
                        {t('portal.lookupPage.classSection', 'Class Section / Cohort')}
                      </span>
                      <span className="font-bold text-[#0073AA] text-base">
                        {result.student.section || t('portal.lookupPage.pendingSection', 'Pending Section Allocation')}
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded border border-gray-100">
                      <span className="text-gray-400 block text-[11px] uppercase font-semibold">
                        {t('portal.lookupPage.admissionModality', 'Admission Modality')}
                      </span>
                      <span className="font-bold text-gray-800 text-base">
                        {t('portal.lookupPage.undergradRegular', 'Undergraduate Regular')}
                      </span>
                    </div>
                  </div>

                  {/* Next Step Action CTA */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-500">
                      {t('portal.lookupPage.recordNote', '* Bring printed copy or screenshot of this record to registrar office.')}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        to="/login"
                        className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-sm transition-all"
                      >
                        {t('portal.lookupPage.signInPortal', 'Sign In to Student Portal ↗')}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-l-4 border-[#D9251D] p-5 rounded-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <h4 className="text-sm font-bold text-[#D9251D]">
                        {t('portal.lookupPage.notFoundTitle', 'Application Record Not Found')}
                      </h4>
                      <p className="text-xs text-red-700 mt-1">
                        {t('portal.lookupPage.notFoundDesc', 'No admission record matched your query. If you submitted an application recently, review may take up to 3 business days. Please contact the registrar at registrar@wu.edu.et.')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
