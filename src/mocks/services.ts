// ============================================================
// Mock Service Layer - Implements typed service interfaces
// Swap this module for real HTTP calls when backend is ready
// ============================================================

import type {
  Application,
  ApplicationFilters,
  PaginatedResult,
  User,
  UserRole,
  StudentPlacement,
  ClassSection,
  SemesterRegistration,
  Notification,
  AuditLogEntry,
  RegistrationStats,
  LookupResult,
  IdCard,
  IdCardTemplate,
  LoginPayload,
  RegisterPayload,
  RejectPayload,
  ImportPayload,
  ReportFilters,
  Campus,
  Program,
  CampusId,
} from '@/types';

import {
  campuses,
  programs as seedPrograms,
  users,
  students,
  applications as seedApplications,
  classSections as seedClassSections,
  generateSemesterRegistrations,
  generateNotifications,
  generateAuditLog,
  defaultIdCardTemplate,
  generateLargeQueue,
} from './seedData';

export const programs = seedPrograms;

// --- Simulated latency ---
const delay = (ms = 300) => new Promise(r => setTimeout(r, ms + Math.random() * 200));

// --- In-memory stores (mutable for session) ---
let allApplications = [...seedApplications, ...generateLargeQueue(200)];
let allUsers = [...users];
let allStudents = [...students];
let allClassSections = [...seedClassSections];
let allSemesterRegistrations = generateSemesterRegistrations();
let allAuditLog = generateAuditLog();
let allNotifications: Notification[] = [];
let idCardTemplate = { ...defaultIdCardTemplate };
let currentUser: User | null = null;

// ============================================================
// AUTH SERVICE
// ============================================================
export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    await delay(400);
    // Demo accounts
    const demoAccounts: Record<string, User> = {
      'student@wu.edu.et': { id: 'stu-001', email: 'student@wu.edu.et', fullName: 'Alemayehu Bezabeh', role: 'student', isActive: true, createdAt: '2024-01-01T00:00:00Z' },
      'registrar@wu.edu.et': allUsers.find(u => u.email === 'registrar@wu.edu.et')!,
      'admin@wu.edu.et': allUsers.find(u => u.email === 'admin@wu.edu.et')!,
      'management@wu.edu.et': allUsers.find(u => u.email === 'management@wu.edu.et')!,
      'council@wu.edu.et': allUsers.find(u => u.email === 'council@wu.edu.et')!,
    };
    const user = demoAccounts[payload.email];
    if (!user || payload.password !== 'password') {
      throw new Error('Invalid credentials');
    }
    currentUser = user;
    localStorage.setItem('wu-user', JSON.stringify(user));
    return user;
  },

  async register(payload: RegisterPayload): Promise<User> {
    await delay(500);
    const newUser: User = {
      id: `stu-${String(allStudents.length + 1).padStart(3, '0')}`,
      email: payload.email,
      fullName: payload.fullName,
      phone: payload.phone,
      role: 'student',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    allStudents.push({
      ...newUser,
      applicationStatus: 'draft',
      admissionType: payload.admissionType,
    } as any);
    return newUser;
  },

  async getCurrentUser(): Promise<User | null> {
    if (currentUser) return currentUser;
    const stored = localStorage.getItem('wu-user');
    if (stored) {
      currentUser = JSON.parse(stored);
      return currentUser;
    }
    return null;
  },

  logout() {
    currentUser = null;
    localStorage.removeItem('wu-user');
  },

  async forgotPassword(_email: string): Promise<{ success: boolean }> {
    await delay(500);
    return { success: true };
  },

  async resetPassword(_code: string, _newPassword: string): Promise<{ success: boolean }> {
    await delay(500);
    return { success: true };
  },

  async changePassword(_currentPassword: string, _newPassword: string): Promise<{ success: boolean }> {
    await delay(400);
    return { success: true };
  },
};

// ============================================================
// APPLICATION SERVICE
// ============================================================
export const applicationService = {
  async getApplications(filters: ApplicationFilters): Promise<PaginatedResult<Application>> {
    await delay(200);
    let filtered = [...allApplications];

    if (filters.campusId) {
      filtered = filtered.filter(a => a.programInfo.campusId === filters.campusId);
    }
    if (filters.programId) {
      filtered = filtered.filter(a => a.programInfo.programId === filters.programId);
    }
    if (filters.status) {
      filtered = filtered.filter(a => a.status === filters.status);
    }
    if (filters.admissionType) {
      filtered = filtered.filter(a => a.programInfo.admissionType === filters.admissionType);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(a =>
        a.personalInfo.firstName.toLowerCase().includes(q) ||
        a.personalInfo.lastName.toLowerCase().includes(q) ||
        a.studentId?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (filters.sortBy) {
      const dir = filters.sortDirection === 'asc' ? 1 : -1;
      filtered.sort((a: any, b: any) => {
        const av = a[filters.sortBy!];
        const bv = b[filters.sortBy!];
        if (av < bv) return -dir;
        if (av > bv) return dir;
        return 0;
      });
    } else {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / filters.pageSize);
    const start = (filters.page - 1) * filters.pageSize;
    const data = filtered.slice(start, start + filters.pageSize);

    return { data, total, page: filters.page, pageSize: filters.pageSize, totalPages };
  },

  async getApplicationById(id: string): Promise<Application | null> {
    await delay(150);
    return allApplications.find(a => a.id === id) || null;
  },

  async getApplicationByStudentId(studentId: string): Promise<Application | null> {
    await delay(150);
    return allApplications.find(a => a.studentId === studentId) || null;
  },

  async createApplication(application: Partial<Application>): Promise<Application> {
    await delay(300);
    const newApp: Application = {
      id: `app-${String(allApplications.length + 1).padStart(5, '0')}`,
      studentId: application.studentId || '',
      status: 'draft',
      personalInfo: application.personalInfo!,
      academicBackground: application.academicBackground!,
      programInfo: application.programInfo!,
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    allApplications.push(newApp);
    return newApp;
  },

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application> {
    await delay(200);
    const idx = allApplications.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Application not found');
    allApplications[idx] = { ...allApplications[idx], ...updates, updatedAt: new Date().toISOString() };
    return allApplications[idx];
  },

  async submitApplication(id: string): Promise<Application> {
    await delay(400);
    const idx = allApplications.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Application not found');
    allApplications[idx] = {
      ...allApplications[idx],
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return allApplications[idx];
  },

  async approveApplication(id: string, _sectionId?: string): Promise<Application> {
    await delay(300);
    const idx = allApplications.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Application not found');
    allApplications[idx] = {
      ...allApplications[idx],
      status: 'approved',
      reviewedAt: new Date().toISOString(),
      reviewedBy: currentUser?.id,
      updatedAt: new Date().toISOString(),
    };
    allAuditLog.unshift({
      id: `audit-${Date.now()}`,
      userId: currentUser?.id || '',
      userName: currentUser?.fullName || '',
      userRole: currentUser?.role || 'registrar',
      action: 'approve_application',
      targetType: 'application',
      targetId: id,
      details: 'Application approved',
      timestamp: new Date().toISOString(),
    });
    return allApplications[idx];
  },

  async rejectApplication(id: string, payload: RejectPayload): Promise<Application> {
    await delay(300);
    const idx = allApplications.findIndex(a => a.id === id);
    if (idx === -1) throw new Error('Application not found');
    allApplications[idx] = {
      ...allApplications[idx],
      status: 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewedBy: currentUser?.id,
      rejectionReason: payload.reason,
      updatedAt: new Date().toISOString(),
    };
    return allApplications[idx];
  },

  async bulkApprove(ids: string[]): Promise<{ approved: number }> {
    await delay(500);
    let count = 0;
    ids.forEach(id => {
      const idx = allApplications.findIndex(a => a.id === id);
      if (idx !== -1) {
        allApplications[idx] = {
          ...allApplications[idx],
          status: 'approved',
          reviewedAt: new Date().toISOString(),
          reviewedBy: currentUser?.id,
          updatedAt: new Date().toISOString(),
        };
        count++;
      }
    });
    return { approved: count };
  },

  async getStats(filters?: ReportFilters): Promise<RegistrationStats> {
    await delay(300);
    let filtered = [...allApplications];
    if (filters?.campusId) filtered = filtered.filter(a => a.programInfo.campusId === filters.campusId);
    if (filters?.programId) filtered = filtered.filter(a => a.programInfo.programId === filters.programId);

    const byCampus = (['main', 'shambu', 'gimbi'] as const).map(c => ({
      campusId: c,
      count: filtered.filter(a => a.programInfo.campusId === c).length,
    }));

    const programCounts: Record<string, { name: string; count: number }> = {};
    filtered.forEach(a => {
      const p = programs.find(pr => pr.id === a.programInfo.programId);
      if (p) {
        if (!programCounts[p.id]) programCounts[p.id] = { name: p.name, count: 0 };
        programCounts[p.id].count++;
      }
    });

    return {
      total: filtered.length,
      submitted: filtered.filter(a => a.status === 'submitted').length,
      underReview: filtered.filter(a => a.status === 'under_review').length,
      approved: filtered.filter(a => a.status === 'approved').length,
      rejected: filtered.filter(a => a.status === 'rejected').length,
      pending: filtered.filter(a => a.status === 'submitted' || a.status === 'under_review').length,
      byCampus,
      byProgram: Object.entries(programCounts).map(([id, v]) => ({ programId: id, ...v })),
      byMonth: [
        { month: 'Jan', count: Math.floor(filtered.length * 0.3) },
        { month: 'Feb', count: Math.floor(filtered.length * 0.25) },
        { month: 'Mar', count: Math.floor(filtered.length * 0.2) },
        { month: 'Apr', count: Math.floor(filtered.length * 0.15) },
        { month: 'May', count: Math.floor(filtered.length * 0.1) },
      ],
    };
  },
};

// ============================================================
// DOCUMENT SERVICE
// ============================================================
export const documentService = {
  async uploadDocument(applicationId: string, file: File, requirementId: string) {
    await delay(800);
    return {
      id: `doc-${Date.now()}`,
      applicationId,
      requirementId,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileType: file.type,
      fileSize: file.size,
      status: 'uploaded' as const,
      uploadedAt: new Date().toISOString(),
    };
  },
};

// ============================================================
// PLACEMENT SERVICE
// ============================================================
export const placementService = {
  async getClassSections(campusId?: CampusId): Promise<ClassSection[]> {
    await delay(200);
    if (campusId) return allClassSections.filter(s => s.campusId === campusId);
    return allClassSections;
  },

  async getStudentPlacement(studentId: string): Promise<StudentPlacement | null> {
    await delay(150);
    const sections = allClassSections.filter(s => s.currentEnrollment < s.capacity);
    if (sections.length === 0) return null;
    const idx = Math.abs(studentId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % sections.length;
    return {
      id: `placement-${studentId}`,
      studentId,
      applicationId: `app-${studentId}`,
      classSectionId: sections[idx].id,
      classSection: sections[idx],
      publishedAt: new Date().toISOString(),
      status: 'placed',
    };
  },

  async assignStudents(_sectionId: string, studentIds: string[]): Promise<{ assigned: number }> {
    await delay(400);
    return { assigned: studentIds.length };
  },

  async publishPlacements(campusId: CampusId): Promise<{ published: number }> {
    await delay(500);
    return { published: allClassSections.filter(s => s.campusId === campusId).reduce((a, s) => a + s.currentEnrollment, 0) };
  },
};

// ============================================================
// SEMESTER RE-REGISTRATION SERVICE
// ============================================================
export const semesterService = {
  async getRegistrations(filters: ApplicationFilters): Promise<PaginatedResult<SemesterRegistration>> {
    await delay(200);
    let filtered = [...allSemesterRegistrations];
    if (filters.status) filtered = filtered.filter(r => r.status === filters.status);
    if (filters.campusId) filtered = filtered.filter(r => r.campusId === filters.campusId);

    const total = filtered.length;
    const totalPages = Math.ceil(total / filters.pageSize);
    const start = (filters.page - 1) * filters.pageSize;
    const data = filtered.slice(start, start + filters.pageSize);

    return { data, total, page: filters.page, pageSize: filters.pageSize, totalPages };
  },

  async submitReRegistration(studentId: string): Promise<SemesterRegistration> {
    await delay(400);
    const student = allStudents.find(s => s.id === studentId);
    const newReg: SemesterRegistration = {
      id: `sem-${String(allSemesterRegistrations.length + 1).padStart(3, '0')}`,
      studentId,
      semester: '2',
      academicYear: '2024/2025',
      status: 'submitted',
      programId: student?.programId || 'cs',
      campusId: student?.campusId || 'main',
      feeCleared: true,
      academicStanding: 'Good Standing',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    allSemesterRegistrations.push(newReg);
    return newReg;
  },

  async approveReRegistration(id: string): Promise<SemesterRegistration> {
    await delay(300);
    const idx = allSemesterRegistrations.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Registration not found');
    allSemesterRegistrations[idx] = {
      ...allSemesterRegistrations[idx],
      status: 'approved',
      reviewedAt: new Date().toISOString(),
      reviewedBy: currentUser?.id,
    };
    return allSemesterRegistrations[idx];
  },

  async rejectReRegistration(id: string, reason: string): Promise<SemesterRegistration> {
    await delay(300);
    const idx = allSemesterRegistrations.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Registration not found');
    allSemesterRegistrations[idx] = {
      ...allSemesterRegistrations[idx],
      status: 'rejected',
      reviewedAt: new Date().toISOString(),
      reviewedBy: currentUser?.id,
      rejectionReason: reason,
    };
    return allSemesterRegistrations[idx];
  },

  async getStats(): Promise<RegistrationStats> {
    await delay(200);
    return {
      total: allSemesterRegistrations.length,
      submitted: allSemesterRegistrations.filter(r => r.status === 'submitted').length,
      underReview: allSemesterRegistrations.filter(r => r.status === 'under_review').length,
      approved: allSemesterRegistrations.filter(r => r.status === 'approved').length,
      rejected: allSemesterRegistrations.filter(r => r.status === 'rejected').length,
      pending: allSemesterRegistrations.filter(r => r.status === 'submitted').length,
      byCampus: (['main', 'shambu', 'gimbi'] as const).map(c => ({
        campusId: c,
        count: allSemesterRegistrations.filter(r => r.campusId === c).length,
      })),
      byProgram: [],
      byMonth: [],
    };
  },
};

// ============================================================
// NOTIFICATION SERVICE
// ============================================================
export const notificationService = {
  async getNotifications(userId: string): Promise<Notification[]> {
    await delay(100);
    if (allNotifications.length === 0) {
      allNotifications = generateNotifications(userId);
    }
    return allNotifications.filter(n => n.userId === userId);
  },

  async markAsRead(id: string): Promise<void> {
    await delay(50);
    const n = allNotifications.find(n => n.id === id);
    if (n) n.read = true;
  },

  async markAllAsRead(userId: string): Promise<void> {
    await delay(50);
    allNotifications.filter(n => n.userId === userId).forEach(n => (n.read = true));
  },

  getUnreadCount(userId: string): number {
    return allNotifications.filter(n => n.userId === userId && !n.read).length;
  },
};

// ============================================================
// ID CARD SERVICE
// ============================================================
export const idCardService = {
  async getStudentIdCard(studentId: string): Promise<IdCard | null> {
    await delay(300);
    const student = allStudents.find(s => s.id === studentId);
    if (!student || student.applicationStatus !== 'approved') return null;
    return {
      id: `idcard-${studentId}`,
      studentId,
      cardNumber: student.studentId || `WU/2024/${studentId.slice(-4)}`,
      photoUrl: '',
      fullName: student.fullName,
      program: programs.find(p => p.id === student.programId)?.name || 'Unknown',
      campus: student.campusId || 'main',
      intakeYear: student.intakeYear || 2024,
      validUntil: '2025-12-31',
      qrCode: `https://wu.edu.et/verify/${student.studentId}`,
      issuedAt: new Date().toISOString(),
    };
  },

  async getTemplate(): Promise<IdCardTemplate> {
    await delay(100);
    return idCardTemplate;
  },

  async updateTemplate(template: IdCardTemplate): Promise<IdCardTemplate> {
    await delay(300);
    idCardTemplate = template;
    return idCardTemplate;
  },
};

// ============================================================
// ADMIN SERVICE
// ============================================================
export const adminService = {
  async getUsers(filters?: { search?: string; role?: UserRole }): Promise<User[]> {
    await delay(200);
    let filtered = [...allUsers];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(u => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (filters?.role) {
      filtered = filtered.filter(u => u.role === filters.role);
    }
    return filtered;
  },

  async createUser(userData: Partial<User> & { password?: string }): Promise<User> {
    await delay(300);
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email || '',
      fullName: userData.fullName || '',
      role: userData.role || 'student',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    allUsers.push(newUser);
    return newUser;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    await delay(200);
    const idx = allUsers.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    allUsers[idx] = { ...allUsers[idx], ...updates };
    return allUsers[idx];
  },

  async deactivateUser(id: string): Promise<User> {
    await delay(200);
    const idx = allUsers.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    allUsers[idx] = { ...allUsers[idx], isActive: false };
    return allUsers[idx];
  },

  async importData(payload: ImportPayload): Promise<{ created: number; flagged: number; errors: string[] }> {
    await delay(1000);
    const created = payload.data.length;
    const flagged = Math.floor(created * 0.05);
    return {
      created: created - flagged,
      flagged,
      errors: flagged > 0 ? [`${flagged} records had validation issues`] : [],
    };
  },

  async getAuditLog(filters?: { search?: string; action?: string }): Promise<AuditLogEntry[]> {
    await delay(200);
    let filtered = [...allAuditLog];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(e =>
        e.userName.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        e.details.toLowerCase().includes(q)
      );
    }
    if (filters?.action) {
      filtered = filtered.filter(e => e.action === filters.action);
    }
    return filtered;
  },
};

// ============================================================
// PUBLIC SERVICE (no auth required)
// ============================================================
export const publicService = {
  async getCampuses(): Promise<Campus[]> {
    await delay(100);
    return campuses;
  },

  async getPrograms(): Promise<Program[]> {
    await delay(100);
    return programs;
  },

  async lookupStudent(query: string): Promise<LookupResult> {
    await delay(300);
    const q = query.toLowerCase();
    const found = allStudents.find(s =>
      s.fullName.toLowerCase().includes(q) ||
      s.studentId?.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
    if (!found) return { found: false };
    return {
      found: true,
      student: {
        name: found.fullName,
        campus: found.campusId || 'main',
        program: programs.find(p => p.id === found.programId)?.name || 'Unknown',
        status: found.applicationStatus,
      },
    };
  },
};
