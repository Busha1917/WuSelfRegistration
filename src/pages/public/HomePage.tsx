import { useState, useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─── Scroll Reveal Wrapper ─── */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Hero Slides (AAU Style) ─── */
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    tag: 'FALL 2026/2027 ENROLLMENT',
    title: 'SEEK WISDOM, PURSUE EXCELLENCE AND EMPOWER NATIONS',
    subtitle: 'Wollega University Student Self-Registration & Academic Portal (WU-SSRS)',
    desc: 'Empowering over 25,000 students with seamless online registration, instantaneous admission tracking, lecture hall section assignment, and digital student ID card issuance across our Nekemte, Shambu, and Gimbi campuses.',
    primaryBtn: { text: 'Student Portal', to: '/login' },
    secondaryBtn: { text: 'Apply for Admission', to: '/register' },
  },
  {
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    tag: 'ACADEMIC EXCELLENCE',
    title: '120+ ACCREDITED DEGREE PROGRAMS ACROSS 3 CAMPUSES',
    subtitle: 'Undergraduate, Postgraduate, Weekend, and Continuing Education',
    desc: 'From cutting-edge engineering and computer science in Nekemte to comprehensive health sciences in Shambu and specialized agricultural sciences in Gimbi, explore our high-impact academic disciplines.',
    primaryBtn: { text: 'Explore Programs', to: '/campuses' },
    secondaryBtn: { text: 'Admission Lookup', to: '/lookup' },
  },
  {
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    tag: 'STUDENT CENTRIC DIGITAL SERVICES',
    title: 'COMPLETE YOUR REGISTRATION IN MINUTES, ZERO PAPERWORK',
    subtitle: 'Fast, Transparent, and Verified Academic Processing',
    desc: 'Upload required transcripts and birth certificates, verify admission status in real-time, get automatically allocated to your cohort section, and download your official digital student ID card.',
    primaryBtn: { text: 'Check Status', to: '/lookup' },
    secondaryBtn: { text: 'Start Application', to: '/register' },
  },
];

/* ─── News Data (AAU 2-Column Format) ─── */
const newsArticles = [
  {
    id: 1,
    title: 'Fall 2026 Self-Registration Now Open for All Incoming & Continuing Students',
    category: 'ADMISSIONS',
    date: 'September 1, 2026',
    desc: 'The Office of the Registrar officially announces the commencement of online self-registration for the 2026/2027 academic year. Students can submit documents and confirm semester enrollment via the portal.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Weekend and Night Program Application Deadline Extended to October 15',
    category: 'ANNOUNCEMENT',
    date: 'August 28, 2026',
    desc: 'Continuing education directorate announces a 2-week extension for weekend and evening graduate and undergraduate programs.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80',
    featured: false,
  },
  {
    id: 3,
    title: 'Automated Class Section Placement & Digital ID Cards Now Active on WU-SSRS',
    category: 'STUDENT PORTAL',
    date: 'August 22, 2026',
    desc: 'Approved students can now instantly view their assigned lecture halls, section cohorts, and download their official digital ID cards.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    featured: false,
  },
  {
    id: 4,
    title: 'New Clinical Skills Simulation Laboratory Inaugurated at Shambu Health Campus',
    category: 'CAMPUS NEWS',
    date: 'August 18, 2026',
    desc: 'The College of Health Sciences welcomes state-of-the-art simulation equipment supporting nursing, pharmacy, and public health programs.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    featured: false,
  },
];

/* ─── Campus Data ─── */
const campuses = [
  {
    name: 'Main Campus — Nekemte',
    subtitle: 'Administrative Hub & Central Colleges',
    programs: '80+ Programs',
    students: '16,000+ Students',
    desc: 'Home to the College of Natural Sciences, Engineering, Business & Economics, Social Sciences, and University Central Senate.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Shambu Campus',
    subtitle: 'Health Sciences & Education Hub',
    programs: '24+ Programs',
    students: '5,500+ Students',
    desc: 'Specialized healthcare education featuring nursing, public health, medical laboratory sciences, and primary education faculties.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Gimbi Campus',
    subtitle: 'Agricultural Sciences & Applied Law',
    programs: '18+ Programs',
    students: '4,000+ Students',
    desc: 'Dedicated to sustainable agronomy, forestry, animal sciences, natural resource management, and regional legal studies.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2250d?auto=format&fit=crop&w=600&q=80',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;
    setEmailSubscribed(true);
    setSubscriberEmail('');
    setTimeout(() => setEmailSubscribed(false), 5000);
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          1. AAU-STYLE ASYMMETRIC SPLIT HERO BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#00486E] text-white min-h-[560px] md:min-h-[640px] flex items-stretch overflow-hidden">
        {/* Subtle geometric pattern overlay across the hero */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="w-full flex flex-col lg:flex-row items-stretch relative z-20">
          {/* Left: Asymmetric Campus Imagery with Curved Mask / Boundary */}
          <div className="lg:w-[48%] relative min-h-[300px] lg:min-h-full overflow-hidden">
            <img
              src={slide.image}
              alt="Wollega University Campus"
              className="w-full h-full object-cover object-center transition-all duration-1000 scale-100 hover:scale-105"
            />
            {/* Dark gradient overlay on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00486E] via-[#00486E]/40 to-transparent lg:hidden" />

            {/* AAU-Style Curved Wave Divider (Desktop Only) */}
            <div className="hidden lg:block absolute top-0 bottom-0 right-[-1px] w-28 text-[#00486E] fill-current pointer-events-none">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                <path d="M100,0 C60,25 20,40 100,100 Z" />
              </svg>
            </div>

            {/* Live Campus Badge on Image */}
            <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm shadow-md flex items-center gap-2 text-xs font-bold text-[#00486E]">
              <span className="w-2 h-2 rounded-full bg-[#D9251D] animate-ping" />
              <span>WU-SSRS PORTAL</span>
            </div>
          </div>

          {/* Right: AAU Signature Deep Navy Panel (#00486E) */}
          <div className="lg:w-[52%] px-6 sm:px-10 lg:px-16 py-12 lg:py-20 flex flex-col justify-center relative">
            <div className="max-w-2xl">
              {/* Category / Intake Tag */}
              <div className="inline-flex items-center gap-2 bg-[#00334E] text-[#00A3E0] px-3.5 py-1 rounded text-xs font-bold tracking-wider uppercase mb-5 border border-[#005B8A]">
                <span className="text-[#D9251D]">●</span>
                <span>{slide.tag}</span>
              </div>

              {/* Bold Uppercase Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-3 font-heading uppercase">
                {slide.title}
              </h1>

              {/* Sub-headline in Warm Cyan/Gold Accent */}
              <p className="text-base sm:text-lg font-semibold text-[#66C2FF] mb-4">
                {slide.subtitle}
              </p>

              {/* Description Body */}
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-8 max-w-xl">
                {slide.desc}
              </p>

              {/* CTAs (AAU Solid White Button + White Outline Button) */}
              <div className="flex flex-wrap items-center gap-4">
                <Link to={slide.primaryBtn.to}>
                  <button className="bg-white text-[#00486E] hover:bg-gray-100 font-bold px-6 py-3 rounded-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm tracking-wide">
                    <span>{slide.primaryBtn.text}</span>
                    <span className="text-xs">↗</span>
                  </button>
                </Link>

                <Link to={slide.secondaryBtn.to}>
                  <button className="border-2 border-white text-white hover:bg-white/10 font-bold px-6 py-3 rounded-sm transition-all flex items-center gap-2 text-sm tracking-wide">
                    <span>{slide.secondaryBtn.text}</span>
                    <span className="text-xs">↗</span>
                  </button>
                </Link>

                <Link to="/lookup" className="text-xs sm:text-sm text-gray-300 hover:text-white underline underline-offset-4 ml-2">
                  Check Admission Status ↗
                </Link>
              </div>
            </div>

            {/* Slider Pagination Controls (AAU Style, bottom right) */}
            <div className="mt-12 flex items-center justify-between pt-6 border-t border-white/15">
              <div className="flex items-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 transition-all rounded-full ${
                      idx === currentSlide ? 'w-8 bg-[#D9251D]' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-white">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                  className="w-8 h-8 rounded border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Previous Slide"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="w-8 h-8 rounded border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Next Slide"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. AAU-STYLE "OUR IMPACT IN NUMBERS" (STATISTICS)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F4F6F8] py-12 px-4 sm:px-6 lg:px-12 border-b border-gray-200">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1: AAU Signature Solid Navy Card (#00486E) */}
            <Reveal>
              <div className="bg-[#00486E] text-white p-7 rounded-sm shadow-md h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center text-2xl mb-4 text-[#00A3E0]">
                    🎓
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2 leading-snug">
                    Excellence in Western Ethiopia
                  </h3>
                  <p className="text-xs text-gray-200 leading-relaxed mb-6">
                    Wollega University stands at the forefront of quality instruction, cutting-edge research, and digitized student administrative services across 3 campuses.
                  </p>
                </div>
                <Link to="/campuses">
                  <button className="border border-white/40 hover:bg-white hover:text-[#00486E] text-white font-semibold text-xs px-4 py-2 rounded-sm transition-all flex items-center gap-1.5 w-fit">
                    <span>Explore Campuses</span>
                    <span>↗</span>
                  </button>
                </Link>
              </div>
            </Reveal>

            {/* Card 2: Stat Card #1 */}
            <Reveal delay={100}>
              <div className="bg-white p-7 rounded-sm border border-gray-200 shadow-sm h-full flex flex-col justify-center">
                <div className="text-4xl font-extrabold text-[#00486E] font-heading mb-1">
                  #1
                </div>
                <div className="text-sm font-bold text-[#1A1A1A] mb-1">
                  Regional University Hub
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Pioneering autonomous higher education, innovation parks, and online self-service enrollment.
                </p>
              </div>
            </Reveal>

            {/* Card 3: Stat Card #2 */}
            <Reveal delay={200}>
              <div className="bg-white p-7 rounded-sm border border-gray-200 shadow-sm h-full flex flex-col justify-center">
                <div className="text-4xl font-extrabold text-[#00486E] font-heading mb-1">
                  <AnimatedCounter end={25000} suffix="+" />
                </div>
                <div className="text-sm font-bold text-[#1A1A1A] mb-1">
                  Enrolled Students
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Regular, weekend, night, distance, masters, and PhD scholars actively registered across all colleges.
                </p>
              </div>
            </Reveal>

            {/* Card 4: Stat Card #3 */}
            <Reveal delay={300}>
              <div className="bg-white p-7 rounded-sm border border-gray-200 shadow-sm h-full flex flex-col justify-center">
                <div className="text-4xl font-extrabold text-[#00486E] font-heading mb-1">
                  <AnimatedCounter end={120} suffix="+" />
                </div>
                <div className="text-sm font-bold text-[#1A1A1A] mb-1">
                  Academic Programs
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Accredited curricula in Natural Sciences, Engineering, Health Sciences, Agriculture, Law & Business.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. AAU-STYLE QUICK LINKS BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-6 px-4 sm:px-6 lg:px-12 border-b border-gray-200">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#333333] tracking-wider uppercase shrink-0">
            <span className="text-[#D9251D]">●</span>
            <span>QUICK LINKS :</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 w-full">
            {[
              { label: 'REGISTRATION PORTAL', to: '/register' },
              { label: 'CHECK STATUS', to: '/lookup' },
              { label: 'OUR CAMPUSES', to: '/campuses' },
              { label: 'ACADEMIC CALENDAR', to: '/calendar' },
              { label: 'ADMISSION FAQ', to: '/faq' },
              { label: 'PORTAL LOGIN', to: '/login' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-sm hover:shadow flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                <span className="text-[10px]">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. AAU-STYLE FEATURE BANNER ("CAMPUS LIFE & EXCELLENCE")
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-12 overflow-hidden bg-gray-900 text-white">
        {/* Full-width High-Impact Campus Atmosphere Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80"
            alt="Campus Quad"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002B40] via-[#00486E]/80 to-transparent" />
        </div>

        {/* Huge Faint Watermark Headline (AAU signature) */}
        <div className="absolute right-6 bottom-4 text-7xl sm:text-9xl font-black text-white/5 pointer-events-none select-none tracking-widest font-heading hidden md:block">
          CAMPUS LIFE
        </div>

        <div className="max-w-[90rem] mx-auto relative z-10">
          <Reveal>
            {/* Floating White Overlay Card on Left (exact AAU pattern) */}
            <div className="max-w-lg bg-white text-[#1A1A1A] p-8 sm:p-10 rounded-sm shadow-2xl border-l-4 border-[#0073AA]">
              <div className="text-[11px] font-bold text-[#D9251D] tracking-widest uppercase mb-1.5">
                EXPLORE WOLLEGA UNIVERSITY
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#00486E] mb-3 leading-tight">
                Vibrant Campus Life & World-Class Facilities
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6">
                Spread across Nekemte, Shambu, and Gimbi, our campuses provide modern dormitory complexes, fully digitized libraries, athletic complexes, smart laboratories, and active student union councils.
              </p>
              <Link
                to="/campuses"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0073AA] hover:text-[#005C8A] group"
              >
                <span>Explore Campuses & Facilities</span>
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. AAU-STYLE "WHAT'S NEW" (NEWS & ANNOUNCEMENTS)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[90rem] mx-auto">
          {/* Section Header with AAU Dual-Color Underline Accent */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-1">
                LATEST UPDATES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading">
                What's New at Wollega University
              </h2>
              {/* Dual Accent Underline: Red segment on left, Blue on right */}
              <div className="flex items-center gap-1 mt-3">
                <div className="h-1 w-12 bg-[#D9251D]" />
                <div className="h-1 w-20 bg-[#0073AA]" />
              </div>
            </div>

            <Link to="/calendar" className="mt-4 sm:mt-0">
              <button className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold px-5 py-2.5 rounded shadow-sm hover:shadow transition-all flex items-center gap-1.5">
                <span>VIEW ALL ANNOUNCEMENTS</span>
                <span>↗</span>
              </button>
            </Link>
          </div>

          {/* 2-Column News Layout (Exact AAU grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Big Featured News Card (7 Columns) */}
            <div className="lg:col-span-7">
              {newsArticles.filter((n) => n.featured).map((article) => (
                <Reveal key={article.id}>
                  <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="relative h-72 sm:h-80 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-[#D9251D] text-white text-[11px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="text-xs text-[#888888] font-medium mb-2">
                        📅 {article.date}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#00486E] font-heading mb-3 group-hover:text-[#0073AA] transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#555555] leading-relaxed mb-6">
                        {article.desc}
                      </p>
                      <Link
                        to="/register"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#0073AA] hover:underline"
                      >
                        <span>Read Full Announcement & Apply</span>
                        <span>↗</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Right Column: 3 Stacked Horizontal News Cards (5 Columns) */}
            <div className="lg:col-span-5 space-y-4">
              {newsArticles.filter((n) => !n.featured).map((article, idx) => (
                <Reveal key={article.id} delay={idx * 100}>
                  <div className="bg-white border border-gray-200 rounded-sm p-4 flex gap-4 items-center hover:border-[#0073AA] hover:shadow-sm transition-all group cursor-pointer">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-sm overflow-hidden shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#D9251D] uppercase">
                          {article.category}
                        </span>
                        <span className="text-[10px] text-gray-400">•</span>
                        <span className="text-[11px] text-gray-400">
                          {article.date}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#00486E] group-hover:text-[#0073AA] transition-colors line-clamp-2 leading-snug font-heading">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {article.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          6. FOUR SIMPLE STEPS TO REGISTER (DIGITAL LIFECYCLE)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#F4F6F8] border-t border-b border-gray-200">
        <div className="max-w-[90rem] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-1">
              SELF-REGISTRATION WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading mb-3">
              Four Steps from Application to Classroom
            </h2>
            <p className="text-sm text-gray-600">
              The WU-SSRS system ensures zero wait time, complete transparency, and automated cohort assignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Create Account',
                desc: 'Sign up with your national ID, entrance examination reference, and active email address.',
                icon: '👤',
              },
              {
                step: '02',
                title: 'Complete Application',
                desc: 'Fill out personal data, academic background, and choose your preferred campus and college program.',
                icon: '📝',
              },
              {
                step: '03',
                title: 'Upload Documents',
                desc: 'Securely attach scanned official transcripts, birth certificates, and passport photos.',
                icon: '📄',
              },
              {
                step: '04',
                title: 'Section & Digital ID',
                desc: 'Upon registrar approval, view your lecture hall section and download your verified digital ID card.',
                icon: '🪪',
              },
            ].map((s, idx) => (
              <Reveal key={s.step} delay={idx * 100}>
                <div className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm hover:border-[#0073AA] transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{s.icon}</span>
                    <span className="text-2xl font-black text-[#00486E]/20 font-heading">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#00486E] mb-2 font-heading">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/register">
              <button className="bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold text-sm px-7 py-3 rounded shadow transition-all">
                Start Online Registration Now ↗
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          7. THREE CAMPUSES SHOWCASE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-[#D9251D] uppercase tracking-wider block mb-1">
                OUR INTEGRATED CAMPUSES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00486E] font-heading">
                Three Campuses, One Academic Mission
              </h2>
              <div className="flex items-center gap-1 mt-3">
                <div className="h-1 w-12 bg-[#D9251D]" />
                <div className="h-1 w-20 bg-[#0073AA]" />
              </div>
            </div>

            <Link to="/campuses" className="mt-4 sm:mt-0 text-sm font-bold text-[#0073AA] hover:underline">
              View All Campus Maps & Facilities ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campuses.map((c, idx) => (
              <Reveal key={c.name} delay={idx * 100}>
                <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#00486E] text-white text-[10px] font-bold px-2.5 py-1 rounded">
                      {c.programs}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-[#0073AA] font-semibold mb-1">
                      {c.subtitle}
                    </div>
                    <h3 className="text-lg font-bold text-[#00486E] mb-2 font-heading">
                      {c.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {c.desc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
                      <span>👥 {c.students}</span>
                      <Link to="/campuses" className="text-[#0073AA] font-bold hover:underline">
                        Explore Campus ↗
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          8. AAU-STYLE NEWSLETTER / ADMISSION ALERTS SUBSCRIPTION BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#002B40] text-white py-14 px-4 sm:px-6 lg:px-12 border-t border-[#003B57]">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-3xl shrink-0">
                🏛️
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-heading uppercase text-white tracking-wide">
                  Subscribe to Admission Updates & Announcements
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Receive deadline reminders, placement announcements, and exam schedules directly to your inbox.
                </p>
              </div>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                required
                className="px-4 py-3 bg-white text-[#1A1A1A] rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#0073AA] w-full sm:w-80"
              />
              <button
                type="submit"
                className="bg-[#0073AA] hover:bg-[#005C8A] text-white font-bold text-sm px-6 py-3 rounded-sm whitespace-nowrap transition-colors"
              >
                {emailSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          9. FLOATING ACTION WIDGETS (AAU SIGNATURE)
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <Link
          to="/lookup"
          className="w-12 h-12 bg-[#D9251D] hover:bg-[#B71C1C] text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-transform hover:scale-110 relative"
          title="Verify Admission Status"
        >
          🔍
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping" />
        </Link>

        <a
          href="mailto:support@wu.edu.et"
          className="w-12 h-12 bg-[#0073AA] hover:bg-[#005C8A] text-white rounded-full shadow-lg flex items-center justify-center text-xl transition-transform hover:scale-110"
          title="Student Helpdesk & Support"
        >
          💬
        </a>
      </div>
    </div>
  );
}
