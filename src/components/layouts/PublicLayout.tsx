import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

export default function PublicLayout() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-wu-cream">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-wu-maroon rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">WU</span>
              </div>
              <div>
                <div className="font-heading font-bold text-wu-ink text-sm leading-tight">{t('app.name')}</div>
                <div className="text-[10px] text-neutral leading-tight">{t('app.subtitle')}</div>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm text-wu-ink hover:text-wu-maroon transition-colors">{t('nav.home')}</Link>
              <Link to="/campuses" className="text-sm text-neutral hover:text-wu-maroon transition-colors">Campuses</Link>
              <Link to="/lookup" className="text-sm text-neutral hover:text-wu-maroon transition-colors">{t('public.lookup.title').split(' ').slice(0, 2).join(' ')}</Link>
              <Link to="/calendar" className="text-sm text-neutral hover:text-wu-maroon transition-colors">Calendar</Link>
              <Link to="/faq" className="text-sm text-neutral hover:text-wu-maroon transition-colors">FAQ</Link>
            </nav>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link to="/login" className="text-sm font-medium text-wu-maroon hover:text-wu-maroon-900 transition-colors">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="text-sm font-medium bg-wu-maroon text-white px-4 py-2 rounded-lg hover:bg-wu-maroon-900 transition-colors">
                {t('nav.register')}
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="bg-wu-maroon text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-bold mb-3">{t('app.name')}</h3>
              <p className="text-sm text-white/70">{t('app.subtitle')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/campuses" className="block text-sm text-white/70 hover:text-white">Our Campuses</Link>
                <Link to="/requirements" className="block text-sm text-white/70 hover:text-white">Document Requirements</Link>
                <Link to="/faq" className="block text-sm text-white/70 hover:text-white">FAQ</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Contact</h4>
              <p className="text-sm text-white/70">Nekemte, Oromia, Ethiopia</p>
              <p className="text-sm text-white/70">info@wu.edu.et</p>
              <p className="text-sm text-white/70">+251-571-11-XX-XX</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-white/50">
            © {new Date().getFullYear()} {t('app.name')}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
