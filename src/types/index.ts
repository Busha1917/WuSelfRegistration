// ============================================================
// WU-SSRS Shared TypeScript Types
// Mirrors the eventual API contract for easy backend swap
// ============================================================

// --- Enums ---
export type UserRole = 'student' | 'registrar' | 'admin' | 'management' | 'council';
export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
export type DocumentStatus = 'pending' | 'uploaded' | 'verified' | 'rejected';
export type SemesterStatus = 'active' | 'upcoming' | 'completed';
export type Gender = 'male' | 'female' | 'other';
export type AdmissionType = 'regular' | 'weekend' | 'night' | 'distance_summer' | 'masters' | 'phd';
export type CampusId = 'main' | 'shambu' | 'gimbi';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type ImportStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type PlacementStatus = 'unplaced' | 'placed' | 'published';

// --- Core Entities ---
export interface Campus {
  id: CampusId;
  name: string;
  nameAm: string;
  nameOm: string;
  location: string;
  description: string;
  programs: Program[];
}

export interface Program {
  id: string;
  name: string;
  nameAm: string;
  nameOm: string;
  campusId: CampusId;
  department: string;
  duration: string;
  admissionTypes: AdmissionType[];
  requiredDocuments: string[];
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  fullNameAm?: string;
  phone?: string;
  role: UserRole;
  campusId?: CampusId;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface Student extends User {
  role: 'student';
  examReferenceNumber?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: Gender;
  programId?: string;
  admissionType?: AdmissionType;
  campusId?: CampusId;
  applicationStatus: ApplicationStatus;
  studentId?: string;
  intakeYear?: number;
  intakeSemester?: '1' | '2';
}

export interface RegistrarOfficer extends User {
  role: 'registrar';
  campusId: CampusId;
}

// --- Application ---
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  firstNameAm?: string;
  lastNameAm?: string;
  dateOfBirth: string;
  gender: Gender;
  nationality: string;
  phone: string;
  email: string;
  region: string;
  zone: string;
  woreda: string;
  kebele: string;
  address: string;
}

export interface AcademicBackground {
  previousSchool: string;
  examType: string;
  examYear: number;
  examScore: number;
  subjects: { name: string; grade: string }[];
}

export interface ProgramInfo {
  programId: string;
  campusId: CampusId;
  admissionType: AdmissionType;
  intakeYear: number;
  intakeSemester: '1' | '2';
  firstChoice: string;
  secondChoice?: string;
}

export interface ParentsInfo {
  fatherFirstName: string;
  fatherMiddleName: string;
  fatherLastName: string;
  fatherFirstNameAm?: string;
  fatherMiddleNameAm?: string;
  fatherLastNameAm?: string;
  fatherPhone: string;
  fatherOccupation: string;
  fatherEmployer?: string;
  motherFirstName: string;
  motherMiddleName: string;
  motherLastName: string;
  motherFirstNameAm?: string;
  motherMiddleNameAm?: string;
  motherLastNameAm?: string;
  motherPhone: string;
  motherOccupation: string;
  motherEmployer?: string;
}

export interface GuardianInfo {
  guardianFirstName: string;
  guardianMiddleName: string;
  guardianLastName: string;
  guardianFirstNameAm?: string;
  guardianMiddleNameAm?: string;
  guardianLastNameAm?: string;
  relationship: string;
  phone: string;
  emergencyPhone?: string;
  email?: string;
  occupation?: string;
  employer?: string;
  incomeRange?: string;
  region?: string;
  zone?: string;
  woreda?: string;
  kebele?: string;
  houseNo?: string;
  contactPreference?: string;
}

export interface Application {
  id: string;
  studentId: string;
  status: ApplicationStatus;
  personalInfo: PersonalInfo;
  parentsInfo?: ParentsInfo;
  guardianInfo?: GuardianInfo;
  academicBackground: AcademicBackground;
  programInfo: ProgramInfo;
  documents: ApplicationDocument[];
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  resubmissionDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Documents ---
export interface DocumentRequirement {
  id: string;
  name: string;
  nameAm: string;
  nameOm: string;
  description: string;
  programIds?: string[];
  isRequired: boolean;
  acceptedTypes: string[];
  maxSizeMB: number;
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  requirementId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  status: DocumentStatus;
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

// --- Placement ---
export interface ClassSection {
  id: string;
  name: string;
  programId: string;
  campusId: CampusId;
  intakeYear: number;
  capacity: number;
  currentEnrollment: number;
  lectureHall: string;
}

export interface StudentPlacement {
  id: string;
  studentId: string;
  applicationId: string;
  classSectionId: string;
  classSection?: ClassSection;
  publishedAt?: string;
  status: PlacementStatus;
}

// --- Semester Re-registration ---
export interface SemesterRegistration {
  id: string;
  studentId: string;
  semester: string;
  academicYear: string;
  status: ApplicationStatus;
  programId: string;
  campusId: CampusId;
  classSectionId?: string;
  feeCleared: boolean;
  academicStanding: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  createdAt: string;
}

// --- ID Card ---
export interface IdCard {
  id: string;
  studentId: string;
  cardNumber: string;
  photoUrl: string;
  fullName: string;
  program: string;
  campus: CampusId;
  intakeYear: number;
  validUntil: string;
  qrCode: string;
  issuedAt: string;
}

export interface IdCardTemplate {
  id: string;
  photoPosition: { x: number; y: number; width: number; height: number };
  namePosition: { x: number; y: number };
  idPosition: { x: number; y: number };
  programPosition: { x: number; y: number };
  campusPosition: { x: number; y: number };
  qrPosition: { x: number; y: number; size: number };
  backgroundColor: string;
  accentColor: string;
}

// --- Notifications ---
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// --- Audit Log ---
export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

// --- Reports ---
export interface ReportFilters {
  campusId?: CampusId;
  programId?: string;
  intakeYear?: number;
  admissionType?: AdmissionType;
  status?: ApplicationStatus;
  dateFrom?: string;
  dateTo?: string;
}

export interface RegistrationStats {
  total: number;
  submitted: number;
  underReview: number;
  approved: number;
  rejected: number;
  pending: number;
  byCampus: { campusId: CampusId; count: number }[];
  byProgram: { programId: string; name: string; count: number }[];
  byMonth: { month: string; count: number }[];
}

// --- Forms ---
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  admissionType: AdmissionType;
  nationalId?: string;
}

export interface RejectPayload {
  reason: string;
  correctiveAction?: string;
}

export interface BulkApprovePayload {
  applicationIds: string[];
}

export interface ImportPayload {
  fileName: string;
  data: Record<string, unknown>[];
  admissionType: AdmissionType;
  intakeYear: number;
  intakeSemester: '1' | '2';
  campusId: CampusId;
}

// --- Lookup ---
export interface LookupResult {
  found: boolean;
  student?: {
    name: string;
    campus: string;
    program: string;
    section?: string;
    status: ApplicationStatus;
  };
}

// --- Pagination ---
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// --- Query params ---
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface ApplicationFilters extends PaginationParams {
  campusId?: CampusId;
  programId?: string;
  admissionType?: AdmissionType;
  status?: ApplicationStatus;
  search?: string;
}
