import { Link } from 'react-router-dom';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

interface AuthHeaderProps {
  backLink?: string;
  backText?: string;
}

export default function AuthHeader({
  backLink = '/',
  backText = 'Return to University Home',
}: AuthHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-6 border-b border-gray-200">
      <Link
        to={backLink}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0073AA] hover:text-[#005C8A] transition-colors"
      >
        <span>←</span>
        <span>{backText}</span>
      </Link>

      <LanguageSwitcher />
    </div>
  );
}
