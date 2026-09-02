import HeroBanner from '@/components/home/HeroBanner';
import ImpactStats from '@/components/home/ImpactStats';
import QuickLinksBar from '@/components/home/QuickLinksBar';
import CampusLifeBanner from '@/components/home/CampusLifeBanner';
import NewsSection from '@/components/home/NewsSection';
import RegistrationSteps from '@/components/home/RegistrationSteps';
import CampusesShowcase from '@/components/home/CampusesShowcase';

export default function HomePage() {
  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] overflow-hidden font-sans">
      {/* 1. Asymmetric Split Curved Hero Banner */}
      <HeroBanner />

      {/* 2. Institutional Impact Metrics Counters */}
      <ImpactStats />

      {/* 3. AAU Action Blue Quick Links Bar */}
      <QuickLinksBar />

      {/* 4. Full-Width Campus Life & Facilities Banner */}
      <CampusLifeBanner />

      {/* 5. What's New 2-Column News & Announcements Grid */}
      <NewsSection />

      {/* 6. Four-Step Digital Self-Registration Workflow */}
      <RegistrationSteps />

      {/* 7. Three Campuses Showcase (Nekemte, Shambu, Gimbi) */}
      <CampusesShowcase />
    </div>
  );
}
