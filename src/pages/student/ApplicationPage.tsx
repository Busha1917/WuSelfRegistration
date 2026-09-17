import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { applicationService, publicService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import type { Application, Campus, Program, AdmissionType, CampusId } from '@/types';
import DashboardHero from '@/components/shared/DashboardHero';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Check, Eye } from 'lucide-react';

const steps = [
  { id: 0, label: 'Personal Information', sub: 'Bio-data & Residency' },
  { id: 1, label: 'Academic Qualifications', sub: 'EHEEE & Grade 12 Scores' },
  { id: 2, label: 'Campus & Program', sub: 'Department & Shift Selection' },
  { id: 3, label: 'Verification Documents', sub: 'Transcripts & National ID' },
  { id: 4, label: 'Review & Submit', sub: 'Final Dossier Verification' },
];

export default function ApplicationPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToast } = useToast();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [agreed, setAgreed] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.fullName ? user.fullName.split(' ')[0] : 'Busha',
    lastName: user?.fullName ? user.fullName.split(' ')[1] || 'Tolessa' : 'Tolessa',
    grandFatherName: 'Gemechu',
    firstNameAm: 'ቡሻ',
    lastNameAm: 'ቶሌሳ',
    grandFatherNameAm: 'ገመቹ',
    dateOfBirth: '2004-05-14',
    gender: 'male' as 'male' | 'female' | 'other',
    nationality: 'Ethiopian',
    phone: '+251-911-234-567',
    emergencyPhone: '+251-922-345-678',
    email: user?.email || 'student@wu.edu.et',
    region: 'Oromia',
    zone: 'East Wallaga',
    woreda: 'Nekemte City',
    kebele: 'Kebele 04',
    houseNo: 'House No. 245',
    address: 'Nekemte Town, Wallaga, Ethiopia',
  });

  const [academic, setAcademic] = useState({
    previousSchool: 'Nekemte Comprehensive Secondary & Preparatory School',
    schoolLocation: 'Nekemte, East Wallaga',
    registrationNumber: 'EHEEE/2023/84920',
    examType: 'Ethiopian Higher Education Entrance Examination (EHEEE)',
    examYear: 2023,
    examScore: 485,
    subjects: [
      { name: 'Mathematics', grade: 'A (88%)', stream: 'Natural Science' },
      { name: 'English Language', grade: 'A (82%)', stream: 'Common Core' },
      { name: 'Physics', grade: 'A (85%)', stream: 'Natural Science' },
      { name: 'Chemistry', grade: 'B (78%)', stream: 'Natural Science' },
      { name: 'Civics & Ethical Education', grade: 'A (91%)', stream: 'Common Core' },
    ],
  });

  const [programInfo, setProgramInfo] = useState({
    programId: 'cs-bsc',
    campusId: 'main' as CampusId,
    admissionType: 'regular' as AdmissionType,
    intakeYear: 2026,
    intakeSemester: '1' as '1' | '2',
    firstChoice: 'Computer Science (B.Sc.)',
    secondChoice: 'Software Engineering (B.Sc.)',
  });

  const [documents, setDocuments] = useState<{ file: File; name: string; size: string }[]>([
    {
      file: new File([''], 'National_ID_Fayda_Biometric.pdf', { type: 'application/pdf' }),
      name: 'National_ID_Fayda_Biometric.pdf',
      size: '850 KB',
    },
    {
      file: new File([''], 'Official_Transcript_Grade_9_to_12.pdf', { type: 'application/pdf' }),
      name: 'Official_Transcript_Grade_9_to_12.pdf',
      size: '3.2 MB',
    },
    {
      file: new File([''], 'Ministry_Certificate_Grade_8.pdf', { type: 'application/pdf' }),
      name: 'Ministry_Certificate_Grade_8.pdf',
      size: '1.1 MB',
    },
    {
      file: new File([''], 'Matric_Certificate_Grade_10_EGSECE.pdf', { type: 'application/pdf' }),
      name: 'Matric_Certificate_Grade_10_EGSECE.pdf',
      size: '1.5 MB',
    },
    {
      file: new File([''], 'University_Entrance_Result_Grade_12_EHEEE.pdf', { type: 'application/pdf' }),
      name: 'University_Entrance_Result_Grade_12_EHEEE.pdf',
      size: '1.4 MB',
    },
  ]);

  const [previewDoc, setPreviewDoc] = useState<{ file: File; name: string; size: string } | null>(null);

  useEffect(() => {
    publicService.getCampuses().then(setCampuses);
    publicService.getPrograms().then(setPrograms);
    if (user) {
      applicationService.getApplicationByStudentId(user.id).then((app) => {
        if (app) {
          setApplication(app);
          if (app.personalInfo) setPersonalInfo((prev) => ({ ...prev, ...(app.personalInfo as any) }));
          if (app.academicBackground) setAcademic((prev) => ({ ...prev, ...(app.academicBackground as any) }));
          if (app.programInfo) setProgramInfo((prev) => ({ ...prev, ...(app.programInfo as any) }));
        }
      });
    }
  }, [user]);

  const filteredPrograms = programs.filter((p) => p.campusId === programInfo.campusId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newDocs = Array.from(files).map((f) => ({
      file: f,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
    }));
    setDocuments([...documents, ...newDocs]);
    addToast(`${newDocs.length} document(s) uploaded.`, 'success');
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      if (application) {
        await applicationService.updateApplication(application.id, {
          personalInfo: personalInfo as any,
          academicBackground: academic as any,
          programInfo: programInfo as any,
        });
      } else {
        const app = await applicationService.createApplication({
          studentId: user?.id,
          personalInfo: personalInfo as any,
          academicBackground: academic as any,
          programInfo: programInfo as any,
        });
        setApplication(app);
      }
      addToast('Application draft saved successfully. You can return at any time.', 'success');
    } catch {
      addToast('Failed to save draft. Please check your network connection.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!agreed && step === 4) {
      addToast('Please confirm the institutional declaration before final submission.', 'warning');
      return;
    }
    setLoading(true);
    try {
      if (application) {
        await applicationService.updateApplication(application.id, {
          personalInfo: personalInfo as any,
          academicBackground: academic as any,
          programInfo: programInfo as any,
        });
        await applicationService.submitApplication(application.id);
      } else {
        const app = await applicationService.createApplication({
          studentId: user?.id,
          personalInfo: personalInfo as any,
          academicBackground: academic as any,
          programInfo: programInfo as any,
        });
        await applicationService.submitApplication(app.id);
      }
      addToast('Application successfully submitted to the Office of the University Registrar!', 'success');
      navigate('/student/status');
    } catch {
      addToast('Application submission failed. Please verify all required fields.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero (Clean & Minimized Descriptive Section) ─── */}
      <DashboardHero
        badge="ADMISSIONS PORTAL • AY 2026/2027"
        title={t('student.application.title', 'Student Admission Application Form')}
        compact
        description={
          <div className="space-y-3 mt-2 text-gray-200">
            <p className="text-xs sm:text-sm leading-relaxed max-w-3xl">
              Complete your institutional admission dossier across the five structured sections below. Please ensure your personal information and biodata match your Ethiopian National Digital ID (Fayda) and Ministry of Education entrance examination records.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-300 pt-0.5">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EDC935]" />
                <span><strong>Status:</strong> {application?.status ? application.status.replace('_', ' ').toUpperCase() : 'IN PROGRESS'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Progress is saved as you navigate between steps</span>
              </span>
            </div>
          </div>
        }
      />

      {/* ─── Stepper Progress (Modern Connected Minimalist Stepper) ─── */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs py-4 sm:py-5 px-4 sm:px-6 overflow-x-auto">
        <div className="w-[75%] min-w-[560px] mx-auto flex items-start justify-between">
          {steps.map((s, idx) => {
            const isCompleted = step > idx;
            const isCurrent = step === idx;
            const isLast = idx === steps.length - 1;

            return (
              <div key={s.id} className="flex items-start flex-1 last:flex-none">
                {/* Step Node */}
                <button
                  type="button"
                  onClick={() => setStep(idx)}
                  className="group flex flex-col items-center cursor-pointer focus:outline-hidden transition-all text-center select-none shrink-0"
                >
                  {/* Step Circle */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'border-2 sm:border-[2.5px] border-[#0073AA] text-[#0073AA] bg-white ring-3 ring-blue-100 shadow-xs'
                        : isCompleted
                          ? 'border-2 sm:border-[2.5px] border-[#0073AA] text-[#0073AA] bg-blue-50/50 hover:bg-blue-100/60'
                          : 'border-2 border-slate-300 text-slate-400 bg-white group-hover:border-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                    ) : isLast ? (
                      <Eye className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isCurrent ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                    ) : (
                      <span className="text-xs sm:text-sm font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`mt-2 text-xs tracking-tight transition-colors duration-200 text-center leading-snug whitespace-nowrap ${
                      isCurrent
                        ? 'font-bold text-[#0073AA]'
                        : isCompleted
                          ? 'font-bold text-[#00486E]'
                          : 'font-semibold text-slate-500 group-hover:text-slate-700'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>

                {/* Horizontal Divider / Connector */}
                {!isLast && (
                  <div className="flex-1 mx-2 sm:mx-4 mt-[17px] sm:mt-[19px] flex items-center">
                    <div
                      className={`w-full h-[2px] rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-[#0073AA]' : 'bg-slate-200'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Form Step Content ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs overflow-hidden">
        <div className="bg-[#F8F9FA] px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Section {step + 1} of 5
            </span>
            <h2 className="text-base sm:text-lg font-black text-[#00486E]">
              {steps[step].label}
            </h2>
          </div>
          <span className="text-xs font-bold text-[#00486E] bg-blue-50 border border-blue-200 px-3 py-1 rounded">
            {steps[step].sub}
          </span>
        </div>

        <div className="p-6 sm:p-8">
          {/* STEP 0: PERSONAL INFORMATION */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 border-l-4 border-l-[#0073AA] p-4 rounded-r text-xs text-[#00486E]">
                <p className="font-bold">National ID & Name Verification</p>
                <p className="text-gray-600 mt-0.5">
                  Enter your official full name both in English and Amharic script (ፊደል). Names must correspond with your Ethiopian National Digital ID (Fayda) and national matriculation certificate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Row 1: English Full Name */}
                <Input
                  label="First / Given Name (English)"
                  value={personalInfo.firstName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                  required
                />
                <Input
                  label="Father / Surname (English)"
                  value={personalInfo.lastName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                  required
                />
                <Input
                  label="Grandfather Name (English)"
                  value={personalInfo.grandFatherName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, grandFatherName: e.target.value })}
                  required
                />

                {/* Row 2: Local Script Names */}
                <Input
                  label="የመጀመሪያ ስም (በአማርኛ / Afaan Oromoo)"
                  value={personalInfo.firstNameAm || ''}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, firstNameAm: e.target.value })}
                  placeholder="ምሳሌ፡ ቡሻ"
                />
                <Input
                  label="የአባት ስም (በአማርኛ / Afaan Oromoo)"
                  value={personalInfo.lastNameAm || ''}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, lastNameAm: e.target.value })}
                  placeholder="ምሳሌ፡ ቶሌሳ"
                />
                <Input
                  label="የአያት ስም (በአማርኛ / Afaan Oromoo)"
                  value={personalInfo.grandFatherNameAm || ''}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, grandFatherNameAm: e.target.value })}
                  placeholder="ምሳሌ፡ ገመቹ"
                />

                {/* Row 3: Identity Demographics */}
                <Input
                  label="Date of Birth (Gregorian / Ethiopian)"
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                  required
                />
                <Select
                  label="Gender / ጾታ"
                  value={personalInfo.gender}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value as any })}
                  options={[
                    { value: 'male', label: 'Male / ወንድ' },
                    { value: 'female', label: 'Female / ሴት' },
                  ]}
                />
                <Input
                  label="Nationality / ዜግነት"
                  value={personalInfo.nationality}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, nationality: e.target.value })}
                />

                {/* Row 4: Contact Information */}
                <Input
                  label="Mobile Phone (+251)"
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  required
                />
                <Input
                  label="Emergency Contact Phone"
                  type="tel"
                  value={personalInfo.emergencyPhone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, emergencyPhone: e.target.value })}
                  required
                />
                <Input
                  label="Institutional / Contact Email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  required
                />

                {/* Row 5: Regional Administrative Jurisdiction */}
                <Input
                  label="Regional State (ክልል)"
                  value={personalInfo.region}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, region: e.target.value })}
                />
                <Input
                  label="Administrative Zone (ዞን)"
                  value={personalInfo.zone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, zone: e.target.value })}
                />
                <Input
                  label="Woreda (ወረዳ)"
                  value={personalInfo.woreda}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, woreda: e.target.value })}
                />

                {/* Row 6: Local Residence */}
                <Input
                  label="Kebele / Village"
                  value={personalInfo.kebele}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, kebele: e.target.value })}
                />
                <Input
                  label="House / Door Number"
                  value={personalInfo.houseNo}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, houseNo: e.target.value })}
                />
                <Input
                  label="Full Residential Postal Address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* STEP 1: ACADEMIC QUALIFICATIONS */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 border-l-4 border-l-[#0073AA] p-4 rounded-r text-xs text-[#00486E]">
                <p className="font-bold">Ministry of Education National Examination Records</p>
                <p className="text-gray-600 mt-0.5">
                  Provide your Grade 12 National Secondary School Leaving Examination (EHEEE) scores. The admissions office validates these entries against the central MOE database.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Input
                  label="Previous Secondary & Preparatory School"
                  value={academic.previousSchool}
                  onChange={(e) => setAcademic({ ...academic, previousSchool: e.target.value })}
                  required
                />
                <Input
                  label="School Town / Region"
                  value={academic.schoolLocation}
                  onChange={(e) => setAcademic({ ...academic, schoolLocation: e.target.value })}
                  placeholder="e.g. Nekemte, East Wallaga"
                />
                <Input
                  label="MoE Exam Registration Number"
                  value={academic.registrationNumber}
                  onChange={(e) => setAcademic({ ...academic, registrationNumber: e.target.value })}
                  placeholder="e.g. EHEEE/2023/84920"
                />
                <Input
                  label="National Examination System"
                  value={academic.examType}
                  onChange={(e) => setAcademic({ ...academic, examType: e.target.value })}
                />
                <Input
                  label="Examination Year (E.C. / G.C.)"
                  type="number"
                  value={academic.examYear}
                  onChange={(e) => setAcademic({ ...academic, examYear: Number(e.target.value) })}
                />
                <Input
                  label="Cumulative National Examination Score"
                  type="number"
                  step="0.01"
                  value={academic.examScore}
                  onChange={(e) => setAcademic({ ...academic, examScore: Number(e.target.value) })}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-black text-sm text-[#00486E] uppercase tracking-wider">
                    Core Subject Grade Breakdown
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setAcademic({
                        ...academic,
                        subjects: [...academic.subjects, { name: '', grade: '', stream: 'General' }],
                      })
                    }
                    className="text-xs font-bold text-[#0073AA] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ Add Subject</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {academic.subjects.map((sub, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      <Input
                        label={idx === 0 ? 'Subject Name' : undefined}
                        value={sub.name}
                        onChange={(e) => {
                          const s = [...academic.subjects];
                          s[idx].name = e.target.value;
                          setAcademic({ ...academic, subjects: s });
                        }}
                        placeholder="e.g. Mathematics, English, Physics"
                      />
                      <Input
                        label={idx === 0 ? 'Curriculum Stream / Department' : undefined}
                        value={sub.stream || ''}
                        onChange={(e) => {
                          const s = [...academic.subjects];
                          s[idx].stream = e.target.value;
                          setAcademic({ ...academic, subjects: s });
                        }}
                        placeholder="e.g. Natural Science"
                      />
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Input
                            label={idx === 0 ? 'Grade / Marks' : undefined}
                            value={sub.grade}
                            onChange={(e) => {
                              const s = [...academic.subjects];
                              s[idx].grade = e.target.value;
                              setAcademic({ ...academic, subjects: s });
                            }}
                            placeholder="e.g. A (88%), 4.0, Excellent"
                          />
                        </div>
                        {academic.subjects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setAcademic({
                                ...academic,
                                subjects: academic.subjects.filter((_, i) => i !== idx),
                              });
                            }}
                            className={`${idx === 0 ? 'mt-6' : 'mt-1'} text-red-500 hover:text-red-700 text-sm p-2 rounded hover:bg-red-50 cursor-pointer`}
                            title="Remove Subject"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CAMPUS & PROGRAM */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 border-l-4 border-l-[#0073AA] p-4 rounded-r text-xs text-[#00486E]">
                <p className="font-bold">Campus & Modality Allocation</p>
                <p className="text-gray-600 mt-0.5">
                  Choose your designated Wallaga University campus and preferred academic program. Program availability depends on campus capacity and institutional Senate guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Select
                  label="Institutional Campus"
                  value={programInfo.campusId}
                  onChange={(e) => setProgramInfo({ ...programInfo, campusId: e.target.value as CampusId })}
                  options={
                    campuses.length > 0
                      ? campuses.map((c) => ({ value: c.id, label: `${c.name} (${c.location})` }))
                      : [
                        { value: 'main', label: 'Main Campus (Nekemte) - Administration & Science' },
                        { value: 'shambu', label: 'Shambu Campus - Eastern Academic Center' },
                        { value: 'gimbi', label: 'Gimbi Campus - Western Educational Hub' },
                      ]
                  }
                />
                <Select
                  label="Program of Study (First Choice)"
                  value={programInfo.programId}
                  onChange={(e) =>
                    setProgramInfo({
                      ...programInfo,
                      programId: e.target.value,
                      firstChoice: e.target.value,
                    })
                  }
                  options={
                    filteredPrograms.length > 0
                      ? filteredPrograms.map((p) => ({ value: p.id, label: `${p.name} (${p.duration})` }))
                      : [
                        { value: 'cs-bsc', label: 'Computer Science (B.Sc.)' },
                        { value: 'se-bsc', label: 'Software Engineering (B.Sc.)' },
                        { value: 'ee-bsc', label: 'Electrical & Computer Engineering (B.Sc.)' },
                        { value: 'med-md', label: 'Medicine & Health Sciences (MD)' },
                        { value: 'law-llb', label: 'School of Law (LL.B.)' },
                      ]
                  }
                />
                <Input
                  label="Second Choice Alternative Program (Optional)"
                  value={programInfo.secondChoice || ''}
                  onChange={(e) => setProgramInfo({ ...programInfo, secondChoice: e.target.value })}
                  placeholder="e.g. Information Technology (B.Sc.)"
                />
                <Select
                  label="Admission Modality / Shift"
                  value={programInfo.admissionType}
                  onChange={(e) =>
                    setProgramInfo({ ...programInfo, admissionType: e.target.value as AdmissionType })
                  }
                  options={[
                    { value: 'regular', label: 'Regular (Government Sponsored)' },
                    { value: 'weekend', label: 'Weekend Self-Sponsored (Continuing Education)' },
                    { value: 'night', label: 'Evening / Night Program' },
                    { value: 'distance_summer', label: 'Distance & Summer In-Service' },
                    { value: 'masters', label: 'Postgraduate Masters & Specialty' },
                  ]}
                />
                <Input
                  label="Intake Academic Year"
                  type="number"
                  value={programInfo.intakeYear}
                  onChange={(e) => setProgramInfo({ ...programInfo, intakeYear: Number(e.target.value) })}
                />
                <Select
                  label="Intake Semester"
                  value={programInfo.intakeSemester}
                  onChange={(e) => setProgramInfo({ ...programInfo, intakeSemester: e.target.value as '1' | '2' })}
                  options={[
                    { value: '1', label: 'Semester I (Autumn / Meskerem)' },
                    { value: '2', label: 'Semester II (Spring / Yekatit)' },
                  ]}
                />
              </div>
            </div>
          )}

          {/* STEP 3: VERIFICATION DOCUMENTS */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 border-l-4 border-l-[#0073AA] p-4 rounded-r text-xs text-[#00486E]">
                <p className="font-bold">Required Institutional Documentation</p>
                <p className="text-gray-600 mt-0.5">
                  Upload high-resolution scans of your original certificates. Files must be in PDF, JPG, or PNG format with a maximum size of 10 MB per file.
                </p>
              </div>

              {/* Document Requirement Cards (3 Per Row) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. National ID */}
                <div className="bg-white border border-gray-200 rounded p-4 shadow-2xs border-t-4 border-t-[#0073AA]">
                  <span className="text-2xl mb-1 block">🆔</span>
                  <h4 className="text-xs font-extrabold text-[#002B40] uppercase tracking-wider">1. National ID (Fayda)</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Ethiopian Digital ID (Fayda) biometric slip, national passport, or valid Kebele citizenship card.</p>
                </div>
                {/* 2. Official Transcript (9-12) */}
                <div className="bg-white border border-gray-200 rounded p-4 shadow-2xs border-t-4 border-t-[#10B981]">
                  <span className="text-2xl mb-1 block">📋</span>
                  <h4 className="text-xs font-extrabold text-[#002B40] uppercase tracking-wider">2. Official Transcript (Grades 9–12)</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Certified academic records and complete grade transcripts covering secondary Grades 9th through 12th.</p>
                </div>
                {/* 3. Ministry (8th Grade) */}
                <div className="bg-white border border-gray-200 rounded p-4 shadow-2xs border-t-4 border-t-[#F59E0B]">
                  <span className="text-2xl mb-1 block">📜</span>
                  <h4 className="text-xs font-extrabold text-[#002B40] uppercase tracking-wider">3. Ministry Certificate (8th Grade)</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Official Regional Bureau of Education Grade 8 Primary School Leaving Certificate.</p>
                </div>
                {/* 4. Matric (10th Grade) */}
                <div className="bg-white border border-gray-200 rounded p-4 shadow-2xs border-t-4 border-t-[#8B5CF6]">
                  <span className="text-2xl mb-1 block">🎓</span>
                  <h4 className="text-xs font-extrabold text-[#002B40] uppercase tracking-wider">4. Matric Certificate (10th Grade)</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Ethiopian General Secondary Education Certificate Examination (EGSECE) official score slip.</p>
                </div>
                {/* 5. University Entrance (12th Grade) */}
                <div className="bg-white border border-gray-200 rounded p-4 shadow-2xs border-t-4 border-t-[#D9251D]">
                  <span className="text-2xl mb-1 block">🏛️</span>
                  <h4 className="text-xs font-extrabold text-[#002B40] uppercase tracking-wider">5. Entrance Exam (12th Grade)</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Ethiopian Higher Education Entrance Examination (EHEEE) university placement score sheet.</p>
                </div>
                {/* 6. Optional Supporting */}
                <div className="bg-white border border-gray-200 rounded p-4 shadow-2xs border-t-4 border-t-slate-400">
                  <span className="text-2xl mb-1 block">📎</span>
                  <h4 className="text-xs font-extrabold text-[#002B40] uppercase tracking-wider">Additional Supporting (Optional)</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Medical accommodations, affirmative action verification, or athletic / special talent records.</p>
                </div>
              </div>

              {/* Drag and drop zone */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-10 text-center bg-gray-50/50 hover:bg-white hover:border-[#00486E] transition-all cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-[#00486E] flex items-center justify-center text-3xl mx-auto mb-3 shadow-xs">
                    📁
                  </div>
                  <p className="text-sm font-bold text-[#00486E]">
                    Click to browse files or drag and drop here
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Accepts official PDF grade slips, EHEEE certificates, Kebele ID scans (Max: 10 MB)
                  </p>
                  <span className="inline-block mt-4 bg-[#00486E] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded shadow-xs cursor-pointer">
                    Select Digital Files
                  </span>
                </label>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-xs text-[#002B40] uppercase tracking-wider">
                  Attached Verification Files ({documents.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white border border-gray-200 rounded p-3.5 shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded bg-blue-50 text-[#00486E] font-extrabold flex items-center justify-center text-xs border border-blue-100 shrink-0">
                          PDF
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#00486E] truncate">{doc.name}</p>
                          <p className="text-[10px] text-gray-500">{doc.size} • Verified</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(doc)}
                          title="View Document Attachment"
                          className="w-8 h-8 text-[#0073AA] hover:text-white hover:bg-[#0073AA] bg-blue-50 border border-blue-200 rounded transition-all cursor-pointer flex items-center justify-center shadow-2xs"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDocuments(documents.filter((_, i) => i !== idx))}
                          title="Remove Attachment"
                          className="w-8 h-8 text-red-600 hover:text-white hover:bg-red-600 bg-red-50 border border-red-200 rounded transition-all cursor-pointer flex items-center justify-center shadow-2xs text-xs font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMISSION */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 border-l-4 border-l-[#0073AA] p-4 rounded-r text-xs text-[#00486E]">
                <p className="font-bold">Official Application Verification</p>
                <p className="text-gray-600 mt-0.5">
                  Carefully review your compiled admission file below. Once submitted, your application is locked and transmitted directly to the Office of the University Registrar for evaluation.
                </p>
              </div>

              {/* 3 Review Cards in 1 Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Personal Information Summary */}
                <div className="bg-[#F8F9FA] rounded border border-gray-200 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                      <h4 className="font-extrabold text-xs text-[#00486E] uppercase tracking-wider">
                        Applicant Bio-Data
                      </h4>
                      <button
                        onClick={() => setStep(0)}
                        className="text-xs font-bold text-[#0073AA] hover:underline cursor-pointer"
                      >
                        Edit ✏️
                      </button>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Full Name (English):</dt>
                        <dd className="text-gray-700 font-medium">{personalInfo.firstName} {personalInfo.lastName} {personalInfo.grandFatherName}</dd>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Amharic Script:</dt>
                        <dd className="text-gray-700 font-medium">{personalInfo.firstNameAm} {personalInfo.lastNameAm} {personalInfo.grandFatherNameAm}</dd>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <dt className="font-extrabold text-[#002B40]">Date of Birth:</dt>
                          <dd className="text-gray-700">{personalInfo.dateOfBirth}</dd>
                        </div>
                        <div>
                          <dt className="font-extrabold text-[#002B40]">Gender:</dt>
                          <dd className="text-gray-700 capitalize">{personalInfo.gender}</dd>
                        </div>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Contact Telephone:</dt>
                        <dd className="text-gray-700">{personalInfo.phone}</dd>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Email Address:</dt>
                        <dd className="text-gray-700">{personalInfo.email}</dd>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Region & Woreda:</dt>
                        <dd className="text-gray-700">{personalInfo.region}, {personalInfo.woreda}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Academic Qualifications Summary */}
                <div className="bg-[#F8F9FA] rounded border border-gray-200 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                      <h4 className="font-extrabold text-xs text-[#00486E] uppercase tracking-wider">
                        Academic Background
                      </h4>
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-[#0073AA] hover:underline cursor-pointer"
                      >
                        Edit ✏️
                      </button>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Preparatory School:</dt>
                        <dd className="text-gray-700 font-medium">{academic.previousSchool}</dd>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">School Location:</dt>
                        <dd className="text-gray-700">{academic.schoolLocation}</dd>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <dt className="font-extrabold text-[#002B40]">Exam System:</dt>
                          <dd className="text-gray-700">{academic.examType}</dd>
                        </div>
                        <div>
                          <dt className="font-extrabold text-[#002B40]">Exam Year:</dt>
                          <dd className="text-gray-700">{academic.examYear}</dd>
                        </div>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Cumulative Exam Score:</dt>
                        <dd className="font-black text-green-700 bg-green-50 px-2 py-0.5 rounded inline-block w-fit mt-0.5">
                          {academic.examScore} / 700
                        </dd>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Subjects Breakdown:</dt>
                        <dd className="text-gray-700">{academic.subjects.length} subjects registered</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Program Choice Summary */}
                <div className="bg-[#F8F9FA] rounded border border-gray-200 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                      <h4 className="font-extrabold text-xs text-[#00486E] uppercase tracking-wider">
                        Program & Placement
                      </h4>
                      <button
                        onClick={() => setStep(2)}
                        className="text-xs font-bold text-[#0073AA] hover:underline cursor-pointer"
                      >
                        Edit ✏️
                      </button>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Designated Campus:</dt>
                        <dd className="font-bold text-[#00486E] uppercase">{programInfo.campusId} Campus</dd>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Primary Program:</dt>
                        <dd className="font-bold text-[#00486E]">{programInfo.firstChoice || programInfo.programId}</dd>
                      </div>
                      <div>
                        <dt className="font-extrabold text-[#002B40]">Alternative Program:</dt>
                        <dd className="text-gray-700">{programInfo.secondChoice || 'None specified'}</dd>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <dt className="font-extrabold text-[#002B40]">Modality:</dt>
                          <dd className="text-gray-700 capitalize">{programInfo.admissionType}</dd>
                        </div>
                        <div>
                          <dt className="font-extrabold text-[#002B40]">Intake:</dt>
                          <dd className="text-gray-700">AY {programInfo.intakeYear} (Sem {programInfo.intakeSemester})</dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents Summary in 3 columns */}
              <div className="bg-[#F8F9FA] rounded border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                  <h4 className="font-extrabold text-xs text-[#00486E] uppercase tracking-wider">
                    Attached Verification Documents ({documents.length})
                  </h4>
                  <button
                    onClick={() => setStep(3)}
                    className="text-xs font-bold text-[#0073AA] hover:underline cursor-pointer"
                  >
                    Manage Files ✏️
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {documents.map((d, i) => (
                    <div key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded p-2.5 shadow-2xs">
                      <span className="font-bold text-xs text-[#00486E] truncate">📄 {d.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-bold">{d.size}</span>
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(d)}
                          title="View Document"
                          className="w-6 h-6 text-[#0073AA] hover:text-white hover:bg-[#0073AA] bg-blue-50 border border-blue-200 rounded transition-all cursor-pointer flex items-center justify-center"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Declaration */}
              <div className="bg-amber-50/70 border border-amber-200 rounded p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#00486E] border-gray-300 rounded focus:ring-[#00486E]"
                  />
                  <div className="text-xs text-gray-800">
                    <span className="font-bold block text-[#00486E]">
                      Institutional Declaration & Authenticity Guarantee
                    </span>
                    I hereby solemnly declare under penalty of academic disqualification and legal liability that all information, certificates, scores, and personal documentation provided in this application are authentic and true copies of official records. I agree to abide by the Senate Legislation and Student Code of Conduct of Wallaga University.
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="bg-[#F8F9FA] px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all"
              >
                ← Back to Step {step}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={loading}
              className="bg-white hover:bg-gray-100 text-[#00486E] border border-gray-300 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all"
            >
              Save Draft
            </button>

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-[#00486E] hover:bg-[#003652] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Continue to Step {step + 2}</span>
                <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#D9251D] hover:bg-[#B51E17] text-white text-xs font-black uppercase tracking-wider px-8 py-2.5 rounded shadow-sm transition-all flex items-center gap-2"
              >
                <span>Submit Official Application</span>
                <span>✓</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── Document Preview Modal ─── */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="bg-[#00486E] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold truncate max-w-md">{previewDoc.name}</h3>
                  <p className="text-[11px] text-blue-200">Official Verification Attachment • {previewDoc.size}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-base"
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Document Preview Canvas */}
            <div className="p-6 bg-[#F8F9FA] max-h-[70vh] overflow-y-auto">
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sm:p-8 shadow-xs text-center space-y-4 relative overflow-hidden">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
                  <span className="text-6xl font-black rotate-[-30deg] uppercase text-gray-900">
                    WALLAGA UNIVERSITY
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="text-left">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0073AA] block">
                      Wollega University Admissions Dossier
                    </span>
                    <h4 className="text-sm font-black text-[#002B40]">{previewDoc.name}</h4>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span>✓</span> Verified Authenticated
                  </span>
                </div>

                {/* Simulated Document Viewer */}
                <div className="py-8 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0073AA] flex items-center justify-center text-3xl mx-auto mb-3">
                    📜
                  </div>
                  <h5 className="font-bold text-sm text-[#002B40]">Document Attachment Preview</h5>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    This file has been securely uploaded and validated against institutional admissions criteria.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-600 font-medium">
                    <span className="bg-white border px-3 py-1 rounded shadow-2xs"><strong>Format:</strong> PDF / Image</span>
                    <span className="bg-white border px-3 py-1 rounded shadow-2xs"><strong>File Size:</strong> {previewDoc.size}</span>
                    <span className="bg-white border px-3 py-1 rounded shadow-2xs"><strong>Verification:</strong> Institutional Hash Valid</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">Dossier ID: WU-2026-DOC-VERIFIED</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    addToast(`Downloading ${previewDoc.name}...`, 'info');
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-4 py-2 rounded transition-colors cursor-pointer"
                >
                  Download File
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="bg-[#0073AA] hover:bg-[#005C8A] text-white text-xs font-bold px-5 py-2 rounded transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
