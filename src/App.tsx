import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '@/components/layouts/PublicLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

// Public pages
import HomePage from '@/pages/public/HomePage';
import CampusesPage from '@/pages/public/CampusesPage';
import LookupPage from '@/pages/public/LookupPage';
import CalendarPage from '@/pages/public/CalendarPage';

// Student pages
import StudentDashboard from '@/pages/student/StudentDashboard';
import ApplicationPage from '@/pages/student/ApplicationPage';
import DocumentsPage from '@/pages/student/DocumentsPage';
import StatusPage from '@/pages/student/StatusPage';
import IdCardPage from '@/pages/student/IdCardPage';
import PlacementPage from '@/pages/student/PlacementPage';
import ReRegistrationPage from '@/pages/student/ReRegistrationPage';
import StudentHistoryPage from '@/pages/student/StudentHistoryPage';
import ProfilePage from '@/pages/student/ProfilePage';

// Registrar pages
import RegistrarDashboard from '@/pages/registrar/RegistrarDashboard';
import ReviewQueue from '@/pages/registrar/ReviewQueue';
import SemesterQueue from '@/pages/registrar/SemesterQueue';
import PlacementMgmt from '@/pages/registrar/PlacementMgmt';
import RegistrarHistory from '@/pages/registrar/RegistrarHistory';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UserManagement from '@/pages/admin/UserManagement';
import ImportData from '@/pages/admin/ImportData';
import ConfigPage from '@/pages/admin/ConfigPage';
import ReportsPage from '@/pages/admin/ReportsPage';
import AuditLog from '@/pages/admin/AuditLog';

// Management pages
import ManagementDashboard from '@/pages/management/ManagementDashboard';
import SemesterStats from '@/pages/management/SemesterStats';
import ManagementReports from '@/pages/management/ManagementReports';

// Council pages
import CouncilAssist from '@/pages/council/CouncilAssist';

import NavigationLoader from '@/components/shared/NavigationLoader';

export default function App() {
  return (
    <BrowserRouter>
      <NavigationLoader />
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/campuses" element={<CampusesPage />} />
          <Route path="/lookup" element={<LookupPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Student routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/application" element={<ApplicationPage />} />
            <Route path="/student/documents" element={<DocumentsPage />} />
            <Route path="/student/status" element={<StatusPage />} />
            <Route path="/student/id-card" element={<IdCardPage />} />
            <Route path="/student/placement" element={<PlacementPage />} />
            <Route path="/student/re-registration" element={<ReRegistrationPage />} />
            <Route path="/student/history" element={<StudentHistoryPage />} />
            <Route path="/student/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Registrar routes */}
        <Route element={<ProtectedRoute allowedRoles={['registrar']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/registrar/dashboard" element={<RegistrarDashboard />} />
            <Route path="/registrar/queue" element={<ReviewQueue />} />
            <Route path="/registrar/queue/:appId" element={<ReviewQueue />} />
            <Route path="/registrar/semester-queue" element={<SemesterQueue />} />
            <Route path="/registrar/placement" element={<PlacementMgmt />} />
            <Route path="/registrar/history" element={<RegistrarHistory />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/import" element={<ImportData />} />
            <Route path="/admin/config" element={<ConfigPage />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
            <Route path="/admin/audit-log" element={<AuditLog />} />
          </Route>
        </Route>

        {/* Management routes */}
        <Route element={<ProtectedRoute allowedRoles={['management']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/management/dashboard" element={<ManagementDashboard />} />
            <Route path="/management/semester-stats" element={<SemesterStats />} />
            <Route path="/management/reports" element={<ManagementReports />} />
          </Route>
        </Route>

        {/* Council routes */}
        <Route element={<ProtectedRoute allowedRoles={['council']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/council/assist" element={<CouncilAssist />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
