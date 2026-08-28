import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wu-cream">
        <div className="animate-spin h-10 w-10 border-4 border-wu-maroon border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wu-cream">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-heading text-wu-ink mb-2">Access Denied</h1>
          <p className="text-neutral mb-4">You don't have permission to access this page.</p>
          <a href="/" className="text-wu-maroon hover:underline font-medium">Go to Home</a>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
