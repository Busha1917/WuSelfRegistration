import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'admissions', label: 'Admissions & Applying' },
  { id: 'documents', label: 'Required Documents' },
  { id: 'idcard', label: 'Placement & Student ID' },
  { id: 'rereg', label: 'Semester Re-Registration' },
];

const faqs = [
  {
    category: 'admissions',
    q: 'How do I apply for new student admission at Wollega University?',
    a: 'To apply, navigate to the portal registration page, enter your personal identity details, select your preferred campus (Nekemte, Shambu, or Gimbi) and your chosen degree program. After creating your account, upload your academic certificates and submit. You can monitor your application status in real-time from your applicant dashboard.',
  },
  {
    category: 'documents',
    q: 'What official documents are required for freshmen self-registration?',
    a: 'Required documentation includes: (1) Official Grade 12 National Educational Assessment examination result certificate, (2) Grade 9-12 secondary school student transcripts, (3) Recent passport-style photograph with white background, and (4) Kebele identification card or valid national ID. Scans must be clear and legible in PDF or JPG format.',
  },
  {
    category: 'admissions',
    q: 'Can I apply for multiple study modalities or academic choices?',
    a: 'Yes. During the online application process, you can indicate a primary choice and alternate choices across Regular Undergraduate, Continuing Weekend, Evening Night, or Summer Kiremt modalities.',
  },
  {
    category: 'idcard',
    q: 'How is classroom section and campus placement determined?',
    a: 'Placement is conducted automatically by the Office of the Registrar based on academic merit, ministry quota allocations, and campus department capacity. Once approved, your assigned campus and lecture hall section (e.g. Section 01, Computer Science) are posted directly on your portal dashboard.',
  },
  {
    category: 'idcard',
    q: 'When and how do I receive my official Wollega University student ID card?',
    a: 'Your digital student ID card is generated immediately upon registrar document approval. You can view, download, and print your verified digital ID card with secure QR code directly from the ID Card section of your student dashboard.',
  },
  {
    category: 'admissions',
    q: 'What happens if my application has missing or unclear documents?',
    a: 'If your application is marked as rejected or incomplete, you will receive an explanatory circular from the reviewing registrar detailing the required correction. You can re-upload corrected documents and resubmit without starting over.',
  },
  {
    category: 'rereg',
    q: 'How do senior students complete semester re-registration?',
    a: 'Senior students sign in with their university credentials, navigate to the Semester Re-Registration tab, confirm their course module selections for the new academic semester, and submit for academic advisor approval.',
  },
  {
    category: 'documents',
    q: 'Who should I contact if I encounter technical issues during registration?',
    a: 'You can reach the Wollega University Registrar ICT Helpdesk at registrar@wu.edu.et or via the student hotline at +251-571-11-04-00. You may also visit the Registrar Service Wing in Administration Building Room 104 at the Nekemte Main Campus.',
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] font-sans pb-24">
      {/* ─── AAU Navy Hero Banner ─── */}
      <section className="relative bg-[#00486E] text-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
            alt="FAQ Support"
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
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#66C2FF]">Frequently Asked Questions</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#002B40] text-gray-200 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Student Helpdesk & Admissions Guidance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mt-3 max-w-2xl mx-auto leading-relaxed">
            Find immediate answers regarding admissions criteria, certificate submission, section allocation, digital ID generation, and semester re-registration.
          </p>

          {/* Search Box in Hero */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions (e.g. ID card, documents, placement)..."
                className="w-full pl-11 pr-4 py-3.5 bg-white text-gray-800 rounded-full text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0073AA]"
              />
              <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category Filter Tabs ─── */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0073AA] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Accordion List ─── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-sm border transition-all overflow-hidden ${
                  isOpen ? 'border-[#0073AA] shadow-sm' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className={`text-sm sm:text-base font-bold font-heading ${
                    isOpen ? 'text-[#0073AA]' : 'text-[#00486E]'
                  }`}>
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
                      isOpen ? 'bg-[#0073AA] text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-gray-200 p-12 text-center rounded">
            <p className="text-gray-500 text-sm">No questions matched your search query.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs font-bold text-[#0073AA] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ─── Helpdesk Contact Card ─── */}
        <div className="bg-[#00486E] text-white p-8 rounded-sm shadow-lg mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
              STILL HAVE QUESTIONS?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading">
              Our Admissions & Registrar Team is Here to Assist
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              If your question isn't answered above, reach out directly to the Office of the Registrar or visit our desk at the Nekemte Main Campus.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <a
              href="mailto:registrar@wu.edu.et"
              className="w-full bg-[#D9251D] hover:bg-[#B71C1C] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded text-center transition-colors shadow"
            >
              Email Admissions ↗
            </a>
            <Link
              to="/lookup"
              className="w-full bg-white hover:bg-gray-100 text-[#00486E] text-xs font-bold uppercase tracking-wider py-3 px-4 rounded text-center transition-colors shadow"
            >
              Check Application Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
