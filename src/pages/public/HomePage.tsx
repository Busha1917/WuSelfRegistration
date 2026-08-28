import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const features = [
  { icon: '📝', title: 'Online Registration', desc: 'Apply from anywhere, anytime — no queues, no paperwork.' },
  { icon: '📊', title: 'Real-time Tracking', desc: 'Track your application status in real-time with instant updates.' },
  { icon: '📄', title: 'Digital Documents', desc: 'Upload and manage all required documents digitally.' },
  { icon: '🪪', title: 'Digital ID Card', desc: 'Receive your student ID card digitally upon approval.' },
  { icon: '🏫', title: 'Class Placement', desc: 'Automatic class and section assignment by the registrar.' },
  { icon: '🔄', title: 'Semester Re-registration', desc: 'Confirm your enrollment each semester with one click.' },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-wu-maroon to-wu-maroon-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t('public.hero.title')}</h1>
          <p className="text-xl text-white/80 mb-3">{t('public.hero.subtitle')}</p>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">{t('public.hero.description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/lookup">
              <Button variant="secondary" size="lg">{t('public.hero.checkStatus')}</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">{t('public.hero.registerNow')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-wu-ink text-center mb-10">Why Use WU-SSRS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-heading font-semibold text-wu-ink mb-2">{f.title}</h3>
                <p className="text-sm text-neutral">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-wu-cream py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold text-wu-ink mb-4">Ready to Begin?</h2>
          <p className="text-neutral mb-6">Create your account and start your registration journey with Wollega University today.</p>
          <Link to="/register">
            <Button size="lg">{t('public.hero.registerNow')}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
