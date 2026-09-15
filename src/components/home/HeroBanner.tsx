import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HeroBanner() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: '/image1.jpg',
      tag: t('portal.hero.slide1Tag', 'OFFICIAL ADMISSIONS 2026/2027'),
      headline: t('portal.hero.slide1Title', 'Welcome to Wallaga University Self-Registration Portal'),
      subtext: t(
        'portal.hero.slide1Sub',
        'Seamless digital self-service for freshmen admissions, class section placement, digital student ID card issuance, and academic verification across all 3 campuses.'
      ),
      primaryBtn: { text: t('portal.hero.slide1BtnPrimary', 'Begin Self-Registration'), to: '/register' },
      secondaryBtn: { text: t('portal.hero.slide1BtnSecondary', 'Explore Campuses'), to: '/campuses' },
    },
    {
      image: '/image2.jpg',
      tag: t('portal.hero.slide2Tag', 'ACADEMIC EXCELLENCE & RESEARCH'),
      headline: t('portal.hero.slide2Title', 'Over 120 Accredited Degree Programs & Modern Facilities'),
      subtext: t(
        'portal.hero.slide2Sub',
        'Offering undergraduate, postgraduate, evening, weekend, and summer Kiremt programs anchored in state-of-the-art laboratories and digital libraries.'
      ),
      primaryBtn: { text: t('portal.hero.slide2BtnPrimary', 'View Program Offerings'), to: '/campuses' },
      secondaryBtn: { text: t('portal.hero.slide2BtnSecondary', 'Academic Calendar'), to: '/calendar' },
    },
    {
      image: '/image3.jpg',
      tag: t('portal.hero.slide3Tag', 'THREE VIBRANT CAMPUSES'),
      headline: t('portal.hero.slide3Title', 'Serving Western Oromia at Nekemte, Shambu, and Gimbi'),
      subtext: t(
        'portal.hero.slide3Sub',
        'State-of-the-art lecture halls, high-speed campus networks, full student accommodation, and an inspiring academic community.'
      ),
      primaryBtn: { text: t('portal.hero.slide3BtnPrimary', 'Verify Admission Status'), to: '/lookup' },
      secondaryBtn: { text: t('portal.nav.campuses', 'Explore Campuses'), to: '/campuses' },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative bg-[#00486E] text-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[560px] lg:min-h-[620px]">
        {/* Left Side: Campus Imagery with AAU Asymmetric Slanted Border */}
        <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full overflow-hidden">
          <img
            key={slide.image}
            src={slide.image}
            alt="Wallaga University Campus"
            className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-105"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-[#00486E]/40" />

          {/* Floating Campus Badge */}
          <div className="absolute bottom-6 left-6 z-20 bg-[#002B40]/90 backdrop-blur-sm border border-white/20 px-4 py-2 rounded shadow-lg text-xs font-semibold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>Nekemte Main Campus • Shambu • Gimbi</span>
          </div>
        </div>

        {/* Right Side: Deep Navy Content Panel */}
        <div className="lg:col-span-5 bg-[#00486E] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-12 lg:py-16 relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#002B40] text-gray-200 border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>{slide.tag}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold font-heading leading-tight tracking-tight text-white">
              {slide.headline}
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              {slide.subtext}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={slide.primaryBtn.to}
                className="bg-white hover:bg-gray-100 text-[#00486E] font-bold px-6 py-3.5 rounded shadow hover:shadow-lg transition-all text-sm uppercase tracking-wide flex items-center gap-2"
              >
                <span>{slide.primaryBtn.text}</span>
                <span className="text-xs">↗</span>
              </Link>
              <Link
                to={slide.secondaryBtn.to}
                className="border-2 border-white/80 hover:bg-white/10 text-white font-bold px-6 py-3.5 rounded transition-all text-sm uppercase tracking-wide"
              >
                {slide.secondaryBtn.text}
              </Link>
            </div>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center justify-between pt-10 mt-6 border-t border-white/15">
            <div className="flex items-center gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-[#D9251D]' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                }
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Previous slide"
              >
                ←
              </button>
              <span>
                {currentSlide + 1} / {heroSlides.length}
              </span>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
