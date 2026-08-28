// ============================================================
// Mock Seed Data for WU-SSRS
// ============================================================

import type {
  Campus,
  Program,
  Student,
  User,
  Application,
  ClassSection,
  SemesterRegistration,
  Notification,
  AuditLogEntry,
  IdCardTemplate,
} from '@/types';

// --- Campuses ---
export const campuses: Campus[] = [
  {
    id: 'main',
    name: 'Main Campus',
    nameAm: 'ዋና ተቋም',
    nameOm: 'Citaawaa Guddaa',
    location: 'Nekemte',
    description: 'The main campus housing the university administration and majority of programs.',
    programs: [],
  },
  {
    id: 'shambu',
    name: 'Shambu Campus',
    nameAm: 'ሻምቡ ተቋም',
    nameOm: 'Citaawaa Shambuu',
    location: 'Shambu',
    description: 'Serving students in the eastern zone with dedicated facilities.',
    programs: [],
  },
  {
    id: 'gimbi',
    name: 'Gimbi Campus',
    nameAm: 'ግምቢ ተቋም',
    nameOm: 'Citaawaa Gimbi',
    location: 'Gimbi',
    description: 'Providing education access in the northern zone.',
    programs: [],
  },
];

// --- Programs ---
export const programs: Program[] = [
  { id: 'cs', name: 'Computer Science', nameAm: 'የኮምፒውተር ሳይንስ', nameOm: 'SaayinsiiKompiyootaraa', campusId: 'main', department: 'Natural Sciences', duration: '4 years', admissionTypes: ['regular', 'weekend'], requiredDocuments: ['photo', 'transcript', 'id_copy', 'birth_certificate'] },
  { id: 'ba', name: 'Business Administration', nameAm: 'የንግድ አስተዳደር', nameOm: 'Bulchiinsa Daldalaa', campusId: 'main', department: 'Business & Economics', duration: '4 years', admissionTypes: ['regular', 'weekend', 'night'], requiredDocuments: ['photo', 'transcript', 'id_copy'] },
  { id: 'eng', name: 'Civil Engineering', nameAm: 'የወን Geli ምህንስ Kickstarter', nameOm: 'Meeshaa Jahaazaa', campusId: 'main', department: 'Engineering', duration: '5 years', admissionTypes: ['regular'], requiredDocuments: ['photo', 'transcript', 'id_copy', 'birth_certificate', 'health_cert'] },
  { id: 'edu', name: 'Education (Primary)', nameAm: 'ትምህርት', nameOm: 'Barnoota', campusId: 'shambu', department: 'Education', duration: '4 years', admissionTypes: ['regular', 'weekend'], requiredDocuments: ['photo', 'transcript', 'id_copy'] },
  { id: 'nurs', name: 'Nursing', nameAm: 'የነርስ ሥራ', nameOm: 'Meeshaa Najjaruu', campusId: 'shambu', department: 'Health Sciences', duration: '4 years', admissionTypes: ['regular'], requiredDocuments: ['photo', 'transcript', 'id_copy', 'health_cert'] },
  { id: 'law', name: 'Law', nameAm: 'ሕግ', nameOm: "Seeraa", campusId: 'gimbi', department: 'Social Sciences', duration: '4 years', admissionTypes: ['regular', 'weekend'], requiredDocuments: ['photo', 'transcript', 'id_copy'] },
  { id: 'agri', name: 'Agriculture', nameAm: 'Ṭenna እርሻ', nameOm: 'Hortuu', campusId: 'gimbi', department: 'Agriculture', duration: '4 years', admissionTypes: ['regular', 'distance_summer'], requiredDocuments: ['photo', 'transcript', 'id_copy', 'birth_certificate'] },
  { id: 'psych', name: 'Psychology', nameAm: 'የስ沧ychology', nameOm: 'Saaykoloojii', campusId: 'main', department: 'Social Sciences', duration: '4 years', admissionTypes: ['masters'], requiredDocuments: ['photo', 'transcript', 'id_copy', 'recommendation_letter'] },
];

// --- Users ---
export const users: User[] = [
  { id: 'reg-1', email: 'registrar@wu.edu.et', fullName: 'Dr. Tesfaye Lemma', role: 'registrar', campusId: 'main', isActive: true, createdAt: '2024-01-01T00:00:00Z' },
  { id: 'reg-2', email: 'registrar.shambu@wu.edu.et', fullName: 'Mulu Woldemariam', role: 'registrar', campusId: 'shambu', isActive: true, createdAt: '2024-01-01T00:00:00Z' },
  { id: 'reg-3', email: 'registrar.gimbi@wu.edu.et', fullName: 'Abebe Kitila', role: 'registrar', campusId: 'gimbi', isActive: true, createdAt: '2024-01-01T00:00:00Z' },
  { id: 'admin-1', email: 'admin@wu.edu.et', fullName: 'System Administrator', role: 'admin', isActive: true, createdAt: '2024-01-01T00:00:00Z' },
  { id: 'mgmt-1', email: 'management@wu.edu.et', fullName: 'Prof. Getachew Daba', role: 'management', campusId: 'main', isActive: true, createdAt: '2024-01-01T00:00:00Z' },
  { id: 'council-1', email: 'council@wu.edu.et', fullName: 'Student Council Rep', role: 'council', campusId: 'main', isActive: true, createdAt: '2024-01-01T00:00:00Z' },
];

// --- Students ---
function generateStudents(): Student[] {
  const names = [
    'Alemayehu Bezabeh', 'Fatuma Abdi', 'Birhanu Tadesse', 'Hiwot Girma',
    'Dawit Mekonnen', 'Sara Hassen', 'Tolosa Bekele', 'Meseret Assefa',
    'Abdi Hussen', 'Rahel Getachew', 'Yonas Desta', 'Hana Mamo',
    'Samuel Gebremedhin', 'Amina Ibrahim', 'Ephrem Teshome', 'Lily Worku',
    'Kibrom Gebrehiwot', 'Zeynab Mohammed', 'Daniel Zeleke', 'Feven Tesfaye',
    'Girma Lemma', 'Safiya Osman', 'Belayneh Gemechu', 'Tigist Asfaw',
    'Chala Dabi', 'Roza Abdurahman', 'Bebae Mamo', 'Abdulkadir Jemal',
    'Ejigu Tadesse', 'Meron Adane', 'Gebreegziabher Brhane', 'Senait Bayu',
  ];
  const statuses: Application['status'][] = ['draft', 'submitted', 'under_review', 'approved', 'rejected'];
  const admissionTypes: Student['admissionType'][] = ['regular', 'weekend', 'night', 'distance_summer', 'masters'];
  const campusIds: Campus['id'][] = ['main', 'shambu', 'gimbi'];

  return names.map((name, i) => ({
    id: `stu-${String(i + 1).padStart(3, '0')}`,
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
    fullName: name,
    role: 'student' as const,
    phone: `+2519${String(10000000 + Math.floor(Math.random() * 89999999))}`,
    applicationStatus: statuses[i % statuses.length],
    admissionType: admissionTypes[i % admissionTypes.length],
    campusId: campusIds[i % 3],
    programId: programs[i % programs.length].id,
    studentId: i % statuses.length >= 3 ? `WU/2024/${String(i + 1).padStart(4, '0')}` : undefined,
    intakeYear: 2024,
    intakeSemester: i % 2 === 0 ? '1' : '2',
    isActive: true,
    createdAt: new Date(2024, 0, 1 + i).toISOString(),
  }));
}

export const students: Student[] = generateStudents();

// --- Applications ---
function generateApplications(): Application[] {
  return students.filter(s => s.applicationStatus !== 'draft').map((s, i) => ({
    id: `app-${String(i + 1).padStart(3, '0')}`,
    studentId: s.id,
    status: s.applicationStatus as Application['status'],
    personalInfo: {
      firstName: s.fullName.split(' ')[0],
      lastName: s.fullName.split(' ').slice(1).join(' '),
      dateOfBirth: `200${2 + (i % 5)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      gender: i % 2 === 0 ? 'male' : 'female',
      nationality: 'Ethiopian',
      phone: s.phone || '',
      email: s.email,
      region: 'Oromia',
      zone: 'East Wollega',
      woreda: ['Nekemte', 'Ambo', 'Gimbi', 'Shambu'][i % 4],
      kebele: `Kebele ${(i % 20) + 1}`,
      address: `Nekemte, Kebele ${(i % 20) + 1}`,
    },
    academicBackground: {
      previousSchool: ['Nekemte High School', 'Ambo Preparatory', 'Shambu Secondary', 'Gimbi Academy'][i % 4],
      examType: 'Ethiopian Higher Education Entrance',
      examYear: 2023,
      examScore: 3.0 + Math.random() * 1.5,
      subjects: [
        { name: 'Mathematics', grade: ['A', 'B+', 'B'][i % 3] },
        { name: 'Physics', grade: ['A', 'B+', 'B'][i % 3] },
        { name: 'English', grade: ['B+', 'B', 'B'][i % 3] },
      ],
    },
    programInfo: {
      programId: s.programId || 'cs',
      campusId: s.campusId || 'main',
      admissionType: s.admissionType || 'regular',
      intakeYear: s.intakeYear || 2024,
      intakeSemester: s.intakeSemester || '1',
      firstChoice: s.programId || 'cs',
    },
    documents: [],
    submittedAt: s.applicationStatus !== 'draft' ? new Date(2024, 0, 5 + i).toISOString() : undefined,
    rejectionReason: s.applicationStatus === 'rejected' ? 'Missing required document: birth certificate' : undefined,
    resubmissionDeadline: s.applicationStatus === 'rejected' ? new Date(2024, 1, 15).toISOString() : undefined,
    createdAt: new Date(2024, 0, 1 + i).toISOString(),
    updatedAt: new Date(2024, 0, 5 + i).toISOString(),
  }));
}

export const applications: Application[] = generateApplications();

// --- Class Sections ---
export const classSections: ClassSection[] = [
  { id: 'cs-1', name: 'CS-1A', programId: 'cs', campusId: 'main', intakeYear: 2024, capacity: 60, currentEnrollment: 45, lectureHall: 'Room 101, Science Building' },
  { id: 'cs-2', name: 'CS-1B', programId: 'cs', campusId: 'main', intakeYear: 2024, capacity: 60, currentEnrollment: 38, lectureHall: 'Room 102, Science Building' },
  { id: 'ba-1', name: 'BA-1A', programId: 'ba', campusId: 'main', intakeYear: 2024, capacity: 80, currentEnrollment: 65, lectureHall: 'Room 201, Business Block' },
  { id: 'eng-1', name: 'ENG-1A', programId: 'eng', campusId: 'main', intakeYear: 2024, capacity: 50, currentEnrollment: 42, lectureHall: 'Room 301, Engineering Block' },
  { id: 'edu-1', name: 'EDU-1A', programId: 'edu', campusId: 'shambu', intakeYear: 2024, capacity: 70, currentEnrollment: 55, lectureHall: 'Hall A, Education Building' },
  { id: 'nurs-1', name: 'NURS-1A', programId: 'nurs', campusId: 'shambu', intakeYear: 2024, capacity: 40, currentEnrollment: 35, lectureHall: 'Room 101, Health Sciences' },
  { id: 'law-1', name: 'LAW-1A', programId: 'law', campusId: 'gimbi', intakeYear: 2024, capacity: 60, currentEnrollment: 48, lectureHall: 'Room 101, Law Building' },
  { id: 'agri-1', name: 'AGRI-1A', programId: 'agri', campusId: 'gimbi', intakeYear: 2024, capacity: 55, currentEnrollment: 40, lectureHall: 'Farm Lab, Agriculture Block' },
];

// --- Semester Registrations ---
export function generateSemesterRegistrations(): SemesterRegistration[] {
  return students.filter(s => s.applicationStatus === 'approved').slice(0, 10).map((s, i) => ({
    id: `sem-${String(i + 1).padStart(3, '0')}`,
    studentId: s.id,
    semester: '2',
    academicYear: '2024/2025',
    status: (['submitted', 'under_review', 'approved', 'rejected'] as const)[i % 4],
    programId: s.programId || 'cs',
    campusId: s.campusId || 'main',
    feeCleared: i % 3 !== 0,
    academicStanding: 'Good Standing',
    submittedAt: new Date(2024, 11, 1 + i).toISOString(),
    rejectionReason: i % 4 === 3 ? 'Fee clearance pending' : undefined,
    createdAt: new Date(2024, 11, 1 + i).toISOString(),
  }));
}

// --- Notifications ---
export function generateNotifications(userId: string): Notification[] {
  return [
    { id: 'n-1', userId, title: 'Application Received', message: 'Your application has been received and is being processed.', type: 'success', read: false, createdAt: new Date().toISOString() },
    { id: 'n-2', userId, title: 'Document Required', message: 'Please upload your birth certificate to complete your application.', type: 'warning', read: false, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'n-3', userId, title: 'Re-registration Open', message: 'Semester re-registration is now open. Please confirm your enrollment.', type: 'info', read: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
  ];
}

// --- Audit Log ---
export function generateAuditLog(): AuditLogEntry[] {
  const actions = ['view_application', 'verify_document', 'approve_application', 'reject_application', 'assign_section', 'login', 'logout', 'import_data', 'update_config'];
  const entries: AuditLogEntry[] = [];
  for (let i = 0; i < 50; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    entries.push({
      id: `audit-${String(i + 1).padStart(3, '0')}`,
      userId: user.id,
      userName: user.fullName,
      userRole: user.role,
      action,
      targetType: action.includes('application') ? 'application' : action.includes('document') ? 'document' : 'system',
      targetId: action.includes('application') ? `app-${String(Math.floor(Math.random() * 30) + 1).padStart(3, '0')}` : 'system',
      details: `Action performed: ${action.replace(/_/g, ' ')}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
      ipAddress: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
    });
  }
  return entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// --- ID Card Template ---
export const defaultIdCardTemplate: IdCardTemplate = {
  id: 'default',
  photoPosition: { x: 20, y: 30, width: 100, height: 120 },
  namePosition: { x: 140, y: 40 },
  idPosition: { x: 140, y: 70 },
  programPosition: { x: 140, y: 100 },
  campusPosition: { x: 140, y: 130 },
  qrPosition: { x: 280, y: 30, size: 80 },
  backgroundColor: '#FFFFFF',
  accentColor: '#8C0F2A',
};

// --- Helper to generate large dataset for registrar queue ---
export function generateLargeQueue(count: number): Application[] {
  const extraApplications: Application[] = [];
  for (let i = 0; i < count; i++) {
    const campusId = (['main', 'shambu', 'gimbi'] as const)[i % 3];
    const prog = programs.filter(p => p.campusId === campusId)[i % programs.filter(p => p.campusId === campusId).length];
    const status = (['submitted', 'under_review'] as const)[i % 2];
    extraApplications.push({
      id: `bulk-app-${String(i + 1).padStart(5, '0')}`,
      studentId: `bulk-stu-${String(i + 1).padStart(5, '0')}`,
      status,
      personalInfo: {
        firstName: `Student${i + 1}`,
        lastName: `Family${i + 1}`,
        dateOfBirth: '2002-01-15',
        gender: i % 2 === 0 ? 'male' : 'female',
        nationality: 'Ethiopian',
        phone: `+2519${String(10000000 + i).padStart(8, '0').slice(0, 8)}`,
        email: `student${i + 1}@email.com`,
        region: 'Oromia',
        zone: 'East Wollega',
        woreda: 'Nekemte',
        kebele: `Kebele ${(i % 20) + 1}`,
        address: `Address ${i + 1}`,
      },
      academicBackground: {
        previousSchool: `School ${i + 1}`,
        examType: 'Ethiopian Higher Education Entrance',
        examYear: 2023,
        examScore: 3.2,
        subjects: [{ name: 'Math', grade: 'B+' }],
      },
      programInfo: {
        programId: prog?.id || 'cs',
        campusId,
        admissionType: 'regular',
        intakeYear: 2024,
        intakeSemester: '1',
        firstChoice: prog?.id || 'cs',
      },
      documents: [],
      submittedAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString(),
    });
  }
  return extraApplications;
}
