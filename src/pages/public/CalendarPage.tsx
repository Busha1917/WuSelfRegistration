import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CalendarEventData {
  id: number;
  semester: string;
  categoryKey: string;
  titleEn: string;
  titleAm: string;
  titleOm: string;
  monthEn: string;
  monthAm: string;
  monthOm: string;
  day: string;
  year: string;
  datesEn: string;
  datesAm: string;
  datesOm: string;
  statusKey: string;
  statusColor: string;
  descEn: string;
  descAm: string;
  descOm: string;
  locEn: string;
  locAm: string;
  locOm: string;
}

const calendarEvents: CalendarEventData[] = [
  {
    id: 1,
    semester: 'sem1',
    categoryKey: 'catUndergrad',
    titleEn: 'Freshman Student Arrival, Dormitory Allocation & Online Registration',
    titleAm: 'የአዲስ ገቢ ተማሪዎች መግቢያ፣ የዶርም ምደባ እና የመስመር ላይ ምዝገባ',
    titleOm: 'Dhufaatii Barattoota Haaraa, Ramaddii Doormii & Galmee Toora Interneetii',
    monthEn: 'OCT',
    monthAm: 'ጥቅምት',
    monthOm: 'ONK',
    day: '05 - 08',
    year: '2026',
    datesEn: 'October 05 – October 08, 2026',
    datesAm: 'ጥቅምት 05 – ጥቅምት 08, 2026',
    datesOm: 'Onkololeessa 05 – Onkololeessa 08, 2026',
    statusKey: 'statusOpen',
    statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    descEn:
      'All newly placed regular freshmen report to designated campuses (Nekemte, Shambu, Gimbi). Verification of Grade 12 certificates and digital student ID card issuance.',
    descAm:
      'ሁሉም አዲስ የተመደቡ መደበኛ ተማሪዎች ወደ ተመደቡባቸው ካምፓሶች (ነቀምቴ፣ ሻምቡ፣ ጊምቢ) ሪፖርት ያደርጋሉ። የ12ኛ ክፍል ሰነዶች ማረጋገጫ እና የዲጂታል መታወቂያ አሰጣጥ።',
    descOm:
      'Barattoonni haaraan hundi gara koolleejjiiwwan ramadamanitti (Naqamtee, Shaambuu, Gimbii) gabaasu. Mirkaneessi ragaa kutaa 12ffaa fi kenniinsa kaardii eenyummaa.',
    locEn: 'All Campuses (Main, Shambu, Gimbi)',
    locAm: 'ሁሉም ካምፓሶች (ዋናው ግቢ፣ ሻምቡ፣ ጊምቢ)',
    locOm: 'Koolleejjiiwwan Hunda (Wiirtuu, Shaambuu, Gimbii)',
  },
  {
    id: 2,
    semester: 'sem1',
    categoryKey: 'catSenior',
    titleEn: 'Senior Undergraduate Students Re-registration & Class Enrollment',
    titleAm: 'የነባር የመጀመሪያ ዲግሪ ተማሪዎች የሴሚስተር ዳግም ምዝገባ',
    titleOm: 'Haaromsa Galmee Barattoota Duraan Turanii & Filannoo Koursii',
    monthEn: 'OCT',
    monthAm: 'ጥቅምት',
    monthOm: 'ONK',
    day: '12 - 14',
    year: '2026',
    datesEn: 'October 12 – October 14, 2026',
    datesAm: 'ጥቅምት 12 – ጥቅምት 14, 2026',
    datesOm: 'Onkololeessa 12 – Onkololeessa 14, 2026',
    statusKey: 'statusUpcoming',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
    descEn:
      'Year II through Year V students register online for Semester I modules. Department advisors approve course selections via the portal.',
    descAm:
      'ከ2ኛ እስከ 5ኛ ዓመት ተማሪዎች ለ1ኛ ሴሚስተር ኮርሶች በመስመር ላይ ይመዘገባሉ። የትምህርት አማካሪዎች በፖርታሉ በኩል ያጸድቃሉ።',
    descOm:
      'Barattoonni waggaa 2ffaa hanga 5ffaa kourseewwan semisteera 1ffaa toora interneetiin galmeessu. Gorsitoonni poortaaliidhaan ni mirkaneessu.',
    locEn: 'Online Self-Service Portal',
    locAm: 'የመስመር ላይ የራስ-አገልግሎት ፖርታል',
    locOm: 'Poortaalii Tajaajila Ofii Toora Interneetii',
  },
  {
    id: 3,
    semester: 'sem1',
    categoryKey: 'catAll',
    titleEn: 'Official Commencement of Semester I Lectures & Laboratory Sessions',
    titleAm: 'የ1ኛ ሴሚስተር መደበኛ ትምህርት እና የላቦራቶሪ ክፍለ-ጊዜያት መጀመሪያ',
    titleOm: 'Baniinsa Barnoota Idilee Semisteera 1ffaa & Kutaa Laabiraatoorii',
    monthEn: 'OCT',
    monthAm: 'ጥቅምት',
    monthOm: 'ONK',
    day: '19',
    year: '2026',
    datesEn: 'Monday, October 19, 2026',
    datesAm: 'ሰኞ፣ ጥቅምት 19, 2026',
    datesOm: 'Wiixata, Onkololeessa 19, 2026',
    statusKey: 'statusUpcoming',
    statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
    descEn:
      'Lectures begin across all colleges. Course outline distribution and attendance registration.',
    descAm:
      'በሁሉም ኮሌጆች ትምህርት ይጀምራል። የኮርስ መመሪያዎች ስርጭት እና የተማሪዎች መገኘት ምዝገባ።',
    descOm:
      'Barnoonni koolleejjiiwwan hunda keessatti ni eegala. Qabiyyee koursii raabsuu fi hordoffii barattootaa.',
    locEn: 'University-wide',
    locAm: 'በመላው ዩኒቨርሲቲው',
    locOm: 'Yuunivarsiitii Guutuu Keessatti',
  },
  {
    id: 4,
    semester: 'sem1',
    categoryKey: 'catContinuing',
    titleEn: 'Weekend & Evening Program Registration and Class Kickoff',
    titleAm: 'የሳምንት መጨረሻ እና የማታ ፕሮግራም ምዝገባ እና የትምህርት ጅማሬ',
    titleOm: 'Galmee Sagantaa Wiik-endii & Galgalaa fi Eegalsa Barnootaa',
    monthEn: 'NOV',
    monthAm: 'ኅዳር',
    monthOm: 'SAD',
    day: '02 - 06',
    year: '2026',
    datesEn: 'November 02 – November 06, 2026',
    datesAm: 'ኅዳር 02 – ኅዳር 06, 2026',
    datesOm: 'Sadaasa 02 – Sadaasa 06, 2026',
    statusKey: 'statusUpcoming',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
    descEn:
      'Admissions for continuing education programs at Nekemte and Gimbi branch campuses.',
    descAm:
      'በነቀምቴ እና ጊምቢ ቅርንጫፍ ካምፓሶች የተከታታይ ትምህርት ፕሮግራሞች ምዝገባ።',
    descOm:
      'Galmee sagantaalee barnoota itti fufiinsaa Citaawaa Naqamtee fi Gimbii keessatti.',
    locEn: 'Nekemte & Gimbi Campuses',
    locAm: 'የነቀምቴ እና የጊምቢ ካምፓሶች',
    locOm: 'Citaawaalee Naqamtee & Gimbii',
  },
  {
    id: 5,
    semester: 'sem1',
    categoryKey: 'catExams',
    titleEn: 'Mid-Semester Examinations & Continuous Assessment Submission',
    titleAm: 'የሴሚስተር አጋማሽ ፈተናዎች እና ቀጣይነት ያለው ምዘና ውጤት ማስረከቢያ',
    titleOm: 'Qormaata Walakkaa Semisteeraa & Galchinsa Qabxii Hordoffii',
    monthEn: 'DEC',
    monthAm: 'ታኅሣሥ',
    monthOm: 'MUD',
    day: '14 - 19',
    year: '2026',
    datesEn: 'December 14 – December 19, 2026',
    datesAm: 'ታኅሣሥ 14 – ታኅሣሥ 19, 2026',
    datesOm: 'Muddee 14 – Muddee 19, 2026',
    statusKey: 'statusScheduled',
    statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    descEn:
      'Mid-term evaluations for undergraduate and postgraduate modules across all departments.',
    descAm:
      'በሁሉም ዲፓርትመንቶች የመጀመሪያ ዲግሪ እና የድህረ ምረቃ ሞጁሎች የግማሽ ሴሚስተር ምዘና።',
    descOm:
      'Madaallii walakkaa semisteeraa kourseewwan digrii jalqabaa fi lammaffaa hundaaf.',
    locEn: 'Examination Halls',
    locAm: 'የፈተና አዳራሾች',
    locOm: 'Galma Qormaataa',
  },
  {
    id: 6,
    semester: 'sem2',
    categoryKey: 'catSem2',
    titleEn: 'Semester II Registration & Course Add/Drop Period',
    titleAm: 'የ2ኛ ሴሚስተር ምዝገባ እና የኮርስ መጨመሪያ/መሰረዣ ጊዜ',
    titleOm: 'Galmee Semisteera II & Yeroo Koursii Dabaluu/Haquu',
    monthEn: 'FEB',
    monthAm: 'የካቲት',
    monthOm: 'GUR',
    day: '22 - 26',
    year: '2027',
    datesEn: 'February 22 – February 26, 2027',
    datesAm: 'የካቲት 22 – የካቲት 26, 2027',
    datesOm: 'Guraandhala 22 – Guraandhala 26, 2027',
    statusKey: 'statusScheduled',
    statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    descEn:
      'Commencement of second semester registration, clearance of first semester grades, and module adjustments.',
    descAm:
      'የሁለተኛ ሴሚስተር ምዝገባ መጀመሪያ፣ የ1ኛ ሴሚስተር ውጤት ማጣሪያ እና የሞጁል ማስተካከያዎች።',
    descOm:
      'Eegalsa galmee semisteera lammaffaa, qulqulleessa qabxii semisteera 1ffaa fi sirreeffama koursii.',
    locEn: 'Online Portal',
    locAm: 'የመስመር ላይ ፖርታል',
    locOm: 'Poortaalii Toora Interneetii',
  },
  {
    id: 7,
    semester: 'summer',
    categoryKey: 'catKiremt',
    titleEn: 'Summer Kiremt Teacher Training & Distance Admissions',
    titleAm: 'የክረምት የመምህራን ማሰልጠኛ እና የርቀት ትምህርት ምዝገባ',
    titleOm: 'Leenjii Barsiisotaa Ganna Qilleensaa & Seensa Barnoota Fagoo',
    monthEn: 'JUL',
    monthAm: 'ሐምሌ',
    monthOm: 'ADO',
    day: '01 - 10',
    year: '2027',
    datesEn: 'July 01 – July 10, 2027',
    datesAm: 'ሐምሌ 01 – ሐምሌ 10, 2027',
    datesOm: 'Adoolessa 01 – Adoolessa 10, 2027',
    statusKey: 'statusScheduled',
    statusColor: 'bg-purple-100 text-purple-800 border-purple-300',
    descEn:
      'Summer session enrollment for educational leadership, diploma upgrading, and distance programs.',
    descAm:
      'ለትምህርት አመራር፣ ለዲፕሎማ ማሻሻያ እና ለርቀት ትምህርት ፕሮግራሞች የክረምት ምዝገባ።',
    descOm:
      'Galmee sagantaa gannaa gaggeessummaa barnootaa, fooyyessa dippiloomaa fi sagantaa fagootiif.',
    locEn: 'All Campuses',
    locAm: 'ሁሉም ካምፓሶች',
    locOm: 'Koolleejjiiwwan Hunda',
  },
];

export default function CalendarPage() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all');

  const lang = i18n.language;

  const getEventTitle = (e: CalendarEventData) => {
    if (lang === 'am') return e.titleAm;
    if (lang === 'om') return e.titleOm;
    return e.titleEn;
  };

  const getEventMonth = (e: CalendarEventData) => {
    if (lang === 'am') return e.monthAm;
    if (lang === 'om') return e.monthOm;
    return e.monthEn;
  };

  const getEventDates = (e: CalendarEventData) => {
    if (lang === 'am') return e.datesAm;
    if (lang === 'om') return e.datesOm;
    return e.datesEn;
  };

  const getEventDesc = (e: CalendarEventData) => {
    if (lang === 'am') return e.descAm;
    if (lang === 'om') return e.descOm;
    return e.descEn;
  };

  const getEventLoc = (e: CalendarEventData) => {
    if (lang === 'am') return e.locAm;
    if (lang === 'om') return e.locOm;
    return e.locEn;
  };

  const filteredEvents =
    filter === 'all'
      ? calendarEvents
      : calendarEvents.filter((e) => e.semester === filter);

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] font-sans pb-24">
      {/* ─── AAU Navy Hero Banner ─── */}
      <section className="relative bg-[#00486E] text-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80"
            alt="Academic Calendar"
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
            <span className="text-[#66C2FF]">{t('portal.calendarPage.breadcrumb', 'Academic Calendar')}</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#002B40] text-gray-200 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>{t('portal.calendarPage.badge', 'Academic Year 2026/2027 Approved by University Senate')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            {t('portal.calendarPage.title', 'Official Academic Calendar & Key Dates')}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mt-3 max-w-3xl mx-auto leading-relaxed">
            {t('portal.calendarPage.desc', 'Important dates for student arrival, online self-registration, lecture schedules, exam periods, and graduation ceremonies across all study modalities.')}
          </p>
        </div>
      </section>

      {/* ─── Filter Tabs ─── */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-3">
            {[
              { id: 'all', label: t('portal.calendarPage.allDates', 'All Dates (7)') },
              { id: 'sem1', label: t('portal.calendarPage.sem1', 'Semester I (Fall 2026)') },
              { id: 'sem2', label: t('portal.calendarPage.sem2', 'Semester II (Spring 2027)') },
              { id: 'summer', label: t('portal.calendarPage.summer', 'Summer Kiremt 2027') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  filter === tab.id
                    ? 'bg-[#0073AA] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Calendar Timeline ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white border border-gray-200 hover:border-[#0073AA] rounded-sm p-6 shadow-sm transition-all flex flex-col md:flex-row items-start md:items-center gap-6 group"
          >
            {/* Date Badge */}
            <div className="w-24 h-24 rounded bg-[#EBF3F8] border border-[#B8D7EB] text-center flex flex-col justify-center items-center shrink-0 group-hover:bg-[#00486E] transition-colors">
              <span className="text-xs font-black uppercase text-[#0073AA] group-hover:text-[#66C2FF]">
                {getEventMonth(event)}
              </span>
              <span className="text-xl font-extrabold text-[#00486E] group-hover:text-white leading-tight">
                {event.day}
              </span>
              <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-300">
                {event.year}
              </span>
            </div>

            {/* Event Details */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9251D]">
                  {t(`portal.calendarPage.${event.categoryKey}`, event.categoryKey)}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500 font-semibold">{getEventDates(event)}</span>
              </div>

              <h3 className="text-lg font-bold text-[#00486E] group-hover:text-[#0073AA] transition-colors">
                {getEventTitle(event)}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {getEventDesc(event)}
              </p>

              <div className="text-xs text-gray-500 flex items-center gap-1.5 pt-1">
                <span>📍</span>
                <span>{getEventLoc(event)}</span>
              </div>
            </div>

            {/* Status Pill */}
            <div className="shrink-0 pt-2 md:pt-0">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${event.statusColor}`}>
                {t(`portal.calendarPage.${event.statusKey}`, event.statusKey)}
              </span>
            </div>
          </div>
        ))}

        {/* Bottom Senate Circular Download Card */}
        <div className="bg-[#002B40] text-white p-8 rounded-sm shadow-md mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-[#D9251D]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A3E0] block mb-1">
              {t('portal.calendarPage.senateBadge', 'OFFICIAL SENATE DOCUMENT')}
            </span>
            <h4 className="text-xl font-bold font-heading">
              {t('portal.calendarPage.senateTitle', 'Download Full Academic Calendar Circular (PDF)')}
            </h4>
            <p className="text-xs text-gray-300 mt-1">
              {t('portal.calendarPage.senateDesc', 'Includes full semester schedules, national holidays, drop/add deadlines, and Senate graduation sessions.')}
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(t('portal.calendarPage.downloadAlert', 'Wollega University Academic Calendar 2026/2027 PDF downloaded.'));
            }}
            className="bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded shadow transition-all shrink-0 flex items-center gap-2"
          >
            <span>{t('portal.calendarPage.downloadPdf', 'Download Calendar PDF')}</span>
            <span>⬇</span>
          </a>
        </div>
      </div>
    </div>
  );
}
