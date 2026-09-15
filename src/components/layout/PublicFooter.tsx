import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PublicFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#002B40] text-white pt-16 pb-12 border-t-4 border-[#0073AA]">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#003B57]">
          {/* Column 1: University Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 bg-white p-0.5 shrink-0">
                <img src="/logo1.png" alt="Wallaga University" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#66C2FF] font-heading">ወለጋ ዩኒቨርሲቲ</div>
                <div className="text-base font-extrabold text-[#D9251D] tracking-tight bg-white px-1.5 py-0.2 rounded-sm inline-block leading-tight">
                  Wallaga UNIVERSITY
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {t('portal.footer.mission', 'Office of the Registrar • Student Self-Registration System (WU-SSRS). Empowering learners across Western Oromia through digital academic management.')}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-[#001D2C] px-3 py-1.5 rounded-full text-xs text-gray-300 border border-[#003B57]">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>24/7 Digital Self-Service Portal</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#D9251D] rounded-sm" />
              <span>{t('portal.footer.quickLinksTitle', 'Student Self-Service')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link to="/lookup" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>{t('portal.nav.lookup', 'Verify Admission Status')}</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>{t('portal.nav.beginRegistration', 'Apply for New Admission')}</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>{t('portal.nav.portalLogin', 'Student Portal Login')}</span>
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>{t('portal.nav.calendar', 'Academic Calendar')}</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>{t('portal.nav.faq', 'Frequently Asked Questions')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#0073AA] rounded-sm" />
              <span>{t('portal.campusesPage.colleges', 'Academic Programs')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li>
                <Link to="/campuses" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>Undergraduate Regular Degree</span>
                </Link>
              </li>
              <li>
                <Link to="/campuses" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>Continuing & Weekend Studies</span>
                </Link>
              </li>
              <li>
                <Link to="/campuses" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>Postgraduate Masters & PhD</span>
                </Link>
              </li>
              <li>
                <Link to="/campuses" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>Kiremt Summer Programs</span>
                </Link>
              </li>
              <li>
                <Link to="/campuses" className="hover:text-[#66C2FF] transition-colors flex items-center gap-1.5">
                  <span>›</span> <span>Distance Education Division</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Campuses & Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#D9251D] rounded-sm" />
              <span>{t('portal.footer.campusesTitle', 'Campuses & Contact')}</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <span className="text-[#66C2FF]">📍</span>
                <span><strong>Main Campus:</strong> Nekemte, Oromia, Ethiopia (P.O. Box 395)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#66C2FF]">📍</span>
                <span><strong>Branches:</strong> Shambu Campus & Gimbi Campus</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#66C2FF]">📞</span>
                <span>+251-571-11-04-00 / +251-571-11-04-01</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#66C2FF]">✉️</span>
                <span>info@wu.edu.et • registrar@wu.edu.et</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} Wallaga University. {t('portal.footer.rights', 'All rights reserved. Wallaga University Registrar Directorate.')}
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-white cursor-pointer transition-colors">Telegram</span>
            <span className="hover:text-white cursor-pointer transition-colors">YouTube</span>
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
