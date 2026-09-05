import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FaqItem {
  category: string;
  qEn: string;
  qAm: string;
  qOm: string;
  aEn: string;
  aAm: string;
  aOm: string;
}

const faqs: FaqItem[] = [
  {
    category: 'admissions',
    qEn: 'How do I apply for new student admission at Wollega University?',
    qAm: 'በወለጋ ዩኒቨርሲቲ ለአዲስ ተማሪዎች መግቢያ እንዴት ማመልከት እችላለሁ?',
    qOm: 'Yuunivarsiitii Wallaggaatti seensa barattoota haaraatiif akkamittiin iyyadha?',
    aEn: 'To apply, navigate to the portal registration page, enter your personal identity details, select your preferred campus (Nekemte, Shambu, or Gimbi) and your chosen degree program. After creating your account, upload your academic certificates and submit. You can monitor your application status in real-time from your applicant dashboard.',
    aAm: 'ለማመልከት ወደ ፖርታል ምዝገባ ገጽ ይሂዱ፣ የግል መረጃዎን ያስገቡ፣ የሚመርጡትን ካምፓስ (ነቀምቴ፣ ሻምቡ ወይም ጊምቢ) እና የትምህርት ፕሮግራምዎን ይምረጡ። አካውንት ከፈጠሩ በኋላ የትምህርት ማስረጃዎችዎን በመጫን ያስገቡ። የማመልከቻዎን ሁኔታ ከተማሪ ዳሽቦርድዎ መከታተል ይችላሉ።',
    aOm: 'Iyyachuuf, fuula galmee poortaalii deemaa, odeeffannoo dhuunfaa galchaa, citaawaa filattan (Naqamtee, Shaambuu, ykn Gimbii) fi sagantaa digrii keessan filadhaa. Akkaawuntii uumuu booda, sanadoota barnootaa fe\'aatii galchaa. Haala iyyannoo keessanii daashboordii keessanirraa hordofuu dandeessu.',
  },
  {
    category: 'documents',
    qEn: 'What official documents are required for freshmen self-registration?',
    qAm: 'ለአዲስ ገቢ ተማሪዎች ራስ-ምዝገባ ምን ዓይነት ይፋዊ ሰነዶች ያስፈልጋሉ?',
    qOm: 'Ofiin galmee barattoota haaraatiif sanadoonni eeggaman maal fa\'i?',
    aEn: 'Required documentation includes: (1) Official Grade 12 National Educational Assessment examination result certificate, (2) Grade 9-12 secondary school student transcripts, (3) Recent passport-style photograph with white background, and (4) Kebele identification card or valid national ID. Scans must be clear and legible in PDF or JPG format.',
    aAm: 'የሚያስፈልጉ ሰነዶች፡ (1) ይፋዊ የ12ኛ ክፍል የብሔራዊ ፈተና ውጤት ሰርተፍኬት፣ (2) ከ9-12ኛ ክፍል የተማሪዎች ትራንስክሪፕት፣ (3) ነጭ ጀርባ ያለው የቅርብ ጊዜ ፓስፖርት መጠን ፎቶ፣ እና (4) የቀበሌ መታወቂያ ወይም ህጋዊ ብሔራዊ መታወቂያ። ሰነዶች በPDF ወይም JPG ቅርጸት ጥራት ያላቸው መሆን አለባቸው።',
    aOm: 'Sanadoota barbaachisan: (1) Sertifikeettii qabxii qormaata biyyoolessaa kutaa 12ffaa, (2) Tiraanskiriptii kutaa 9-12ffaa, (3) Suuraa paaspoortii dhiyoo duubbee adii qabu, fi (4) Waraqaa eenyummaa gandaa ykn biyyoolessaa. Sanadoonni bifa PDF ykn JPG qulqullinaan fe\'amuu qabu.',
  },
  {
    category: 'admissions',
    qEn: 'Can I apply for multiple study modalities or academic choices?',
    qAm: 'ለበርካታ የትምህርት አማራጮች ወይም የትምህርት ፕሮግራሞች ማመልከት እችላለሁ?',
    qOm: 'Gosa barnootaa adda addaatiif iyyachuu nan danda\'aa?',
    aEn: 'Yes. During the online application process, you can indicate a primary choice and alternate choices across Regular Undergraduate, Continuing Weekend, Evening Night, or Summer Kiremt modalities.',
    aAm: 'አዎ። በመስመር ላይ ማመልከቻ ሂደት ወቅት በመደበኛ፣ በሳምንት መጨረሻ፣ በማታ ወይም በክረምት ፕሮግራሞች መካከል የመጀመሪያ እና ተለዋጭ ምርጫዎችን መግለጽ ይችላሉ።',
    aOm: 'Eeyyee. Yeroo iyyannoo toora interneetii, filannoo jalqabaa fi filannoowwan biroo Idilee, Wiik-endii, Galgalaa, yookiin Ganna keessaa agarsiisuu dandeessu.',
  },
  {
    category: 'idcard',
    qEn: 'How is classroom section and campus placement determined?',
    qAm: 'የክፍል ሴክሽን እና የካምፓስ ምደባ እንዴት ይወሰናል?',
    qOm: 'Ramaddiin kutaa barnootaa fi citaawaa akkamitti murtaa\'a?',
    aEn: 'Placement is conducted automatically by the Office of the Registrar based on academic merit, ministry quota allocations, and campus department capacity. Once approved, your assigned campus and lecture hall section (e.g. Section 01, Computer Science) are posted directly on your portal dashboard.',
    aAm: 'ምደባው በትምህርት ውጤት፣ በሚኒስቴሩ ኮታ እና በካምፓሶች የመቀበል አቅም ላይ ተመስርቶ በሬጅስትራር ጽህፈት ቤት በራስ-ሰር ይከናወናል። አንዴ ከጸደቀ የተመደቡበት ካምፓስ እና የክፍል ሴክሽን በፖርታል ዳሽቦርድዎ ላይ ይለጠፋል።',
    aOm: 'Ramaddiin bu\'aa qormaataa, kootti ministeeraa fi dandeettii koolleejjii irratti hundaa\'uun Biiroo Reejistiraaraatiin ofiin raawwatama. Erga mirkanaa\'ee booda, citaawaan fi kutaan keessan daashboordii poortaalii irratti maxxanfama.',
  },
  {
    category: 'idcard',
    qEn: 'When and how do I receive my official Wollega University student ID card?',
    qAm: 'ይፋዊ የወለጋ ዩኒቨርሲቲ የተማሪ መታወቂያዬን መቼ እና እንዴት እቀበላለሁ?',
    qOm: 'Kaardii eenyummaa barattummaa koo yoomiifi akkamittiin argadha?',
    aEn: 'Your digital student ID card is generated immediately upon registrar document approval. You can view, download, and print your verified digital ID card with secure QR code directly from the ID Card section of your student dashboard.',
    aAm: 'የዲጂታል ተማሪ መታወቂያዎ የሬጅስትራር ሰነድ ማረጋገጫ እንደተጠናቀቀ ወዲያውኑ ይዘጋጃል። የተረጋገጠውን ዲጂታል መታወቂያ ከተማሪ ዳሽቦርድዎ በቀጥታ ማየት፣ ማውረድ እና ማተም ይችላሉ።',
    aOm: 'Kaardiin eenyummaa dijitaalaa keessan akkuma sanadoonni reejistiraaraan mirkanaa\'aniin battalumatti qophaa\'a. Daashboordii keessanirraa kallattiin ilaaluu, buufachuu fi maxxanfachuun ni danda\'ama.',
  },
  {
    category: 'admissions',
    qEn: 'What happens if my application has missing or unclear documents?',
    qAm: 'ማመልከቻዬ ያልተሟሉ ወይም ግልጽ ያልሆኑ ሰነዶች ቢኖሩት ምን ይሆናል?',
    qOm: 'Yoo iyyannoon koo sanadoota hir\'uu qabaate maaltu ta\'a?',
    aEn: 'If your application is marked as rejected or incomplete, you will receive an explanatory circular from the reviewing registrar detailing the required correction. You can re-upload corrected documents and resubmit without starting over.',
    aAm: 'ማመልከቻዎ ያልተሟላ ከሆነ፣ ከሬጅስትራሩ ማብራሪያ ይደርስዎታል። ማመልከቻውን እንደገና ከመጀመሪያው መጀመር ሳያስፈልግዎት የተስተካከሉ ሰነዶችን እንደገና መጫን ይችላሉ።',
    aOm: 'Iyyannoon keessan hir\'uu yoo ta\'e, reejistiraara irraa beeksisni isin qaqqaba. Jalqabaa eegaluu osoo hin barbaachisin sanadoota sirreeffaman irra deebitanii fe\'uu dandeessu.',
  },
  {
    category: 'rereg',
    qEn: 'How do senior students complete semester re-registration?',
    qAm: 'ነባር ተማሪዎች የሴሚስተር ዳግም ምዝገባን እንዴት ያጠናቅቃሉ?',
    qOm: 'Barattoonni duraan turan haaromsa galmee akkamitti xumuru?',
    aEn: 'Senior students sign in with their university credentials, navigate to the Semester Re-Registration tab, confirm their course module selections for the new academic semester, and submit for academic advisor approval.',
    aAm: 'ነባር ተማሪዎች በዩኒቨርሲቲ መለያቸው በመግባት ወደ ሴሚስተር ዳግም ምዝገባ ክፍል በመሄድ ለአዲሱ ሴሚስተር የኮርስ ምርጫቸውን ያረጋግጣሉ እንዲሁም ለአማካሪ ማረጋገጫ ያስገባሉ።',
    aOm: 'Barattoonni duraan turan herrega isaaniitiin seenuun, gara kutaa Haaromsa Galmee Semisteeraatti imaluun kourseewwan semisteera haaraa mirkaneessanii gorsaadhaaf dhiyeessu.',
  },
  {
    category: 'documents',
    qEn: 'Who should I contact if I encounter technical issues during registration?',
    qAm: 'በምዝገባ ወቅት ቴክኒካዊ ችግሮች ካጋጠሙኝ ማን ማነጋገር አለብኝ?',
    qOm: 'Yeroo galmee rakkoon teeknikaa yoo na mudate eenyuun qunnamuu qaba?',
    aEn: 'You can reach the Wollega University Registrar ICT Helpdesk at registrar@wu.edu.et or via the student hotline at +251-571-11-04-00. You may also visit the Registrar Service Wing in Administration Building Room 104 at the Nekemte Main Campus.',
    aAm: 'የወለጋ ዩኒቨርሲቲ ሬጅስትራር አይሲቲ ድጋፍን በ registrar@wu.edu.et ወይም በስልክ ቁጥር +251-571-11-04-00 ማግኘት ይችላሉ። እንዲሁም በነቀምቴ ዋናው ግቢ አስተዳደር ህንፃ ቢሮ ቁጥር 104 መጎብኘት ይችላሉ።',
    aOm: 'Gargaarsa ICT Reejistiraara Yuunivarsiitii Wallaggaa registrar@wu.edu.et yookiin sarara bilbilaa +251-571-11-04-00 irratti qunnamuu dandeessu. Akkasumas Citaawaa Naqamtee Gamoo Bulchiinsaa Kutaa 104 daawwachuu dandeessu.',
  },
];

export default function FaqPage() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const lang = i18n.language;

  const getFaqQ = (faq: FaqItem) => {
    if (lang === 'am') return faq.qAm;
    if (lang === 'om') return faq.qOm;
    return faq.qEn;
  };

  const getFaqA = (faq: FaqItem) => {
    if (lang === 'am') return faq.aAm;
    if (lang === 'om') return faq.aOm;
    return faq.aEn;
  };

  const faqCategories = [
    { id: 'all', label: t('portal.faqPage.allQuestions', 'All Questions') },
    { id: 'admissions', label: t('portal.faqPage.catAdmissions', 'Admissions & Applying') },
    { id: 'documents', label: t('portal.faqPage.catDocuments', 'Required Documents') },
    { id: 'idcard', label: t('portal.faqPage.catIdCard', 'Placement & Student ID') },
    { id: 'rereg', label: t('portal.faqPage.catReReg', 'Semester Re-Registration') },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const qText = getFaqQ(faq).toLowerCase();
    const aText = getFaqA(faq).toLowerCase();
    const sTerm = searchTerm.toLowerCase();
    const matchesSearch = qText.includes(sTerm) || aText.includes(sTerm);
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
            <Link to="/" className="hover:text-white transition-colors">{t('portal.nav.home', 'Home')}</Link>
            <span>/</span>
            <span className="text-[#66C2FF]">{t('portal.faqPage.breadcrumb', 'Frequently Asked Questions')}</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#002B40] text-gray-200 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>{t('portal.faqPage.badge', 'Student Helpdesk & Admissions Guidance')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            {t('portal.faqPage.title', 'Frequently Asked Questions')}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mt-3 max-w-2xl mx-auto leading-relaxed">
            {t('portal.faqPage.desc', 'Find immediate answers regarding admissions criteria, certificate submission, section allocation, digital ID generation, and semester re-registration.')}
          </p>

          {/* Search Box in Hero */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('portal.faqPage.searchPlaceholder', 'Search questions (e.g. ID card, documents, placement)...')}
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
                    {getFaqQ(faq)}
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
                    <p>{getFaqA(faq)}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-gray-200 p-12 text-center rounded">
            <p className="text-gray-500 text-sm">{t('portal.faqPage.noMatch', 'No questions matched your search query.')}</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-3 text-xs font-bold text-[#0073AA] hover:underline"
            >
              {t('portal.faqPage.resetFilters', 'Reset Filters')}
            </button>
          </div>
        )}

        {/* ─── Helpdesk Contact Card ─── */}
        <div className="bg-[#00486E] text-white p-8 rounded-sm shadow-lg mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0]">
              {t('portal.faqPage.stillHaveQuestions', 'STILL HAVE QUESTIONS?')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading">
              {t('portal.faqPage.helpdeskTitle', 'Our Admissions & Registrar Team is Here to Assist')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {t('portal.faqPage.helpdeskDesc', 'If your question isn\'t answered above, reach out directly to the Office of the Registrar or visit our desk at the Nekemte Main Campus.')}
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <a
              href="mailto:registrar@wu.edu.et"
              className="w-full bg-[#D9251D] hover:bg-[#B71C1C] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded text-center transition-colors shadow"
            >
              {t('portal.faqPage.emailAdmissions', 'Email Admissions ↗')}
            </a>
            <Link
              to="/lookup"
              className="w-full bg-white hover:bg-gray-100 text-[#00486E] text-xs font-bold uppercase tracking-wider py-3 px-4 rounded text-center transition-colors shadow"
            >
              {t('portal.faqPage.checkStatus', 'Check Application Status')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
