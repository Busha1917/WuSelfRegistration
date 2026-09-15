import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { idCardService } from '@/mocks/services';
import type { IdCard } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import { useToast } from '@/components/ui/Toast';

export default function IdCardPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [idCard, setIdCard] = useState<IdCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  useEffect(() => {
    if (user) {
      idCardService.getStudentIdCard(user.id).then((card) => {
        setIdCard(card);
        setLoading(false);
      });
    }
  }, [user]);

  const handleDownload = () => {
    addToast('Official Wallaga University ID Card PDF generated and downloaded.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="flex items-center gap-3 text-sm text-[#00486E] font-bold">
          <svg className="animate-spin h-5 w-5 text-[#0073AA]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Retrieving Official Digital ID Card...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="SECURITY VALIDATED DIGITAL CREDENTIAL"
        title={t('student.idCard.title', 'Student Identification Card')}
        description="Official biometric student ID card with encrypted QR code verification, Senate registrar watermark, and campus RFID credential compatibility."
        stats={[
          { label: 'Card Status', value: 'Active', highlight: true },
          { label: 'Security', value: 'Encrypted' },
          { label: 'Expiry', value: idCard?.validUntil || '2030' },
        ]}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Toggle Front / Back View */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCardSide('front')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${cardSide === 'front'
                ? 'bg-[#0073AA] text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
          >
            Front Side (Identity)
          </button>
          <button
            onClick={() => setCardSide('back')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${cardSide === 'back'
                ? 'bg-[#0073AA] text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
          >
            Back Side (Terms & Barcode)
          </button>
        </div>

        {/* Realistic AAU Identity Card Canvas */}
        <div className="flex justify-center">
          <div className="w-full max-w-xl aspect-[1.586/1] bg-white rounded-2xl shadow-xl border-2 border-[#00486E] overflow-hidden relative flex flex-col justify-between select-none">
            {/* Background Watermark Pattern */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #00486E 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {cardSide === 'front' ? (
              <>
                {/* ─── Front Side ─── */}
                {/* Header Strip with AAU Burgundy Accent and Navy Bar */}
                <div className="bg-[#00486E] text-white p-3.5 sm:p-4 border-b-2 border-[#D9251D] flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-white/50 shadow-sm shrink-0">
                      <img src="/logo1.png" alt="Wallaga University" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs font-semibold text-[#66C2FF] font-heading leading-tight">
                        ወለጋ ዩኒቨርሲቲ
                      </div>
                      <div className="text-sm sm:text-base font-extrabold tracking-tight font-heading leading-tight text-white">
                        Wallaga UNIVERSITY
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-gray-200 tracking-wider uppercase font-semibold">
                        STUDENT IDENTITY CARD • የተማሪ መታወቂያ
                      </div>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold bg-[#D9251D] text-white px-2 py-0.5 rounded-xs uppercase tracking-wider shrink-0 shadow-xs">
                    UNDERGRAD
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-4 sm:p-6 flex-1 flex gap-4 sm:gap-6 relative z-10 items-center">
                  {/* Photo Frame */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-24 sm:w-28 h-32 sm:h-36 rounded-lg overflow-hidden border-2 border-[#0073AA] shadow-md bg-gray-100 relative">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-[#10B981] text-white text-[8px] font-black px-1 rounded shadow">
                        VERIFIED
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 font-bold mt-1">
                      WU-SSRS-2026
                    </span>
                  </div>

                  {/* Metadata fields */}
                  <div className="flex-1 min-w-0 space-y-1.5 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold block">Full Legal Name / ሙሉ ስም</span>
                      <span className="text-sm sm:text-base font-extrabold text-[#00486E] font-heading block truncate">
                        {idCard?.fullName || user?.fullName || 'Alemayehu Bezabeh'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
                      <div>
                        <span className="text-[9px] text-gray-400 uppercase font-semibold block">Student ID / መታወቂያ ቁጥር</span>
                        <span className="font-bold text-[#D9251D] font-mono sm:text-sm">
                          {idCard?.cardNumber || 'WU/14022/19'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 uppercase font-semibold block">Assigned Campus / ካምፓስ</span>
                        <span className="font-bold text-[#00486E] capitalize truncate block">
                          {idCard?.campus || 'Nekemte Main'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
                      <div>
                        <span className="text-[9px] text-gray-400 uppercase font-semibold block">Department / የትምህርት ዘርፍ</span>
                        <span className="font-bold text-gray-800 truncate block">
                          {idCard?.program || 'Software Engineering'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 uppercase font-semibold block">Valid Until / የሚያበቃበት</span>
                        <span className="font-bold text-gray-800 block font-mono">
                          {idCard?.validUntil || '30/06/2030'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Cryptographic QR */}
                  <div className="hidden sm:flex flex-col items-center justify-center shrink-0 p-2 bg-gray-50 rounded border border-gray-200">
                    <div className="w-16 h-16 bg-white p-1 rounded border border-gray-200 flex items-center justify-center">
                      <div className="w-full h-full bg-[#00486E] rounded-xs flex items-center justify-center text-white text-[9px] font-black text-center leading-none">
                        WU<br />SECURE<br />QR
                      </div>
                    </div>
                    <span className="text-[8px] text-gray-400 font-mono mt-1">SCAN AUTH</span>
                  </div>
                </div>

                {/* Bottom Signature & Hologram Bar */}
                <div className="bg-[#FAFBFD] px-4 py-2 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="font-mono text-gray-600">Chip ID: ETH-WU-8891-2026</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif italic font-bold text-[#00486E]">Registrar Directorate Signature</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* ─── Back Side ─── */}
                <div className="bg-[#002B40] text-white p-3 border-b-2 border-[#D9251D] flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wider uppercase">TERMS OF USE & UNIVERSITY REGULATIONS</span>
                  <span className="text-[10px] text-gray-300">Wallaga UNIVERSITY</span>
                </div>

                <div className="p-6 text-xs text-gray-600 leading-relaxed space-y-2 relative z-10 flex-1 flex flex-col justify-between">
                  <ol className="list-decimal pl-4 space-y-1.5 text-[11px]">
                    <li>This card is the property of Wallaga University and must be returned upon graduation or withdrawal.</li>
                    <li>The cardholder is required to produce this card upon request by university security, library, or exam supervisors.</li>
                    <li>Loss of this card must be reported immediately to the Office of the Registrar in Nekemte Main Campus.</li>
                    <li>Unauthorized transfer, alteration, or falsification of this card is strictly punishable under university bylaws.</li>
                  </ol>

                  {/* Simulated Barcode */}
                  <div className="pt-4 border-t border-gray-200 flex flex-col items-center">
                    <div className="h-10 w-64 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_4px,#000_4px,#000_7px,transparent_7px,transparent_9px)]" />
                    <span className="font-mono text-[10px] text-gray-500 mt-1">
                      * {idCard?.cardNumber || 'WU-14022-19-ETH'} *
                    </span>
                  </div>
                </div>

                <div className="bg-gray-100 p-2.5 text-center text-[10px] text-gray-500 border-t border-gray-200">
                  Registrar Hotline: +251-571-11-04-00 • Email: registrar@wu.edu.et • Nekemte, Ethiopia
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleDownload}
            className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded shadow transition-all flex items-center gap-2"
          >
            <span>Download Official ID Card PDF</span>
            <span>⬇</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-gray-50 text-[#00486E] border border-gray-300 text-xs font-bold uppercase tracking-wider py-3 px-6 rounded shadow-xs transition-all flex items-center gap-2"
          >
            <span>Print High-Resolution Card</span>
            <span>🖨</span>
          </button>
        </div>
      </div>
    </div>
  );
}
