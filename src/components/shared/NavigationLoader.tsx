import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PageLoader from '@/components/shared/PageLoader';

export default function NavigationLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip loading screen on initial mount so page is immediately visible
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Scroll to top on every route navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return <PageLoader show={loading} message="Loading page..." />;
}
