import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'am', label: 'አማርኛ', flag: '🇪🇹' },
  { code: 'om', label: 'Afaan Oromo', flag: '🇪🇹' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  return (
    <select
      value={current}
      onChange={(e) => changeLanguage(e.target.value)}
      className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-white text-wu-ink focus:outline-none focus:ring-2 focus:ring-wu-gold"
      aria-label="Language"
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.label}
        </option>
      ))}
    </select>
  );
}
