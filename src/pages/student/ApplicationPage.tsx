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
    firstNameAm: 'ቡሻ',
    lastNameAm: 'ቶሌሳ',
    dateOfBirth: '2004-05-14',
    gender: 'male' as 'male' | 'female' | 'other',
    nationality: 'Ethiopian',
    phone: '+251-911-234-567',
    email: user?.email || 'student@wu.edu.et',
    region: 'Oromia',
    zone: 'East Wallaga',
    woreda: 'Nekemte City',
    kebele: 'Kebele 04',
    address: 'Nekemte Town, Wallaga, Ethiopia',
  });

  const [academic, setAcademic] = useState({
    previousSchool: 'Nekemte Comprehensive Secondary & Preparatory School',
    examType: 'Ethiopian Higher Education Entrance Examination (EHEEE)',
    examYear: 2023,
    examScore: 485,
    subjects: [
      { name: 'Mathematics', grade: 'A (88%)' },
      { name: 'English Language', grade: 'A (82%)' },
      { name: 'Physics', grade: 'A (85%)' },
      { name: 'Chemistry', grade: 'B (78%)' },
      { name: 'Civics & Ethical Education', grade: 'A (91%)' },
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
      file: new File([''], 'EHEEE_Official_Certificate_2023.pdf', { type: 'application/pdf' }),
      name: 'EHEEE_Official_Certificate_2023.pdf',
      size: '1.4 MB',
    },
    {
      file: new File([''], 'Ethiopian_National_Digital_ID_Fayda.pdf', { type: 'application/pdf' }),
      name: 'Ethiopian_National_Digital_ID_Fayda.pdf',
      size: '850 KB',
    },
    {
      file: new File([''], 'Official_Grade_9_12_Transcript.pdf', { type: 'application/pdf' }),
      name: 'Official_Grade_9_12_Transcript.pdf',
      size: '3.2 MB',
    },
  ]);

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
      {/* ─── Hero ─── */}
      <DashboardHero
        badge="FDRE MINISTRY OF EDUCATION • OFFICIAL ADMISSIONS PORTAL"
        title={t('student.application.title', 'Undergraduate & Postgraduate Admission Dossier')}
        description="Complete all five sections of your institutional admission dossier. Ensure your bio-data corresponds with your Ethiopian National Digital ID (Fayda) and Ministry of Education entrance examination records."
        stats={[
          { label: 'Academic Year', value: '2026 / 2027' },
          { label: 'Application Status', value: application?.status ? application.status.toUpperCase() : 'IN PROGRESS', highlight: true },
          { label: 'Campus Choices', value: 'Nekemte • Shambu • Gimbi' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSaveDraft}
              disabled={loading}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded transition-all flex items-center gap-1.5"
            >
              <span>Save Progress</span>
              <span>💾</span>
            </button>
            <button
              onClick={() => navigate('/student/documents')}
              className="bg-[#0073AA] hover:bg-[#005B88] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Document Repository</span>
              <span>📂</span>
            </button>
          </div>
        }
      />

      {/* ─── Stepper Progress ─── */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-xs p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {steps.map((s, idx) => {
            const isCompleted = step > idx;
            const isCurrent = step === idx;
            return (
              <button
                key={s.id}
                onClick={() => setStep(idx)}
                className={`text-left p-3 rounded transition-all border ${isCurrent
                    ? 'bg-[#00486E] border-[#00486E] text-white shadow-xs'
                    : isCompleted
                      ? 'bg-blue-50/60 border-blue-200 text-[#00486E] hover:bg-blue-100/50'
                      : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${isCurrent
                        ? 'bg-[#D9251D] text-white'
                        : isCompleted
                          ? 'bg-[#00486E] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                  >
                    {isCompleted ? '✓' : idx + 1}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase opacity-75">
                    Step {idx + 1}
                  </span>
                </div>
                <p className="font-bold text-xs leading-tight line-clamp-1">{s.label}</p>
                <p className={`text-[11px] mt-0.5 line-clamp-1 ${isCurrent ? 'text-blue-100' : 'text-gray-500'}`}>
                  {s.sub}
                </p>
              </button>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <Input
                  label="Mobile Phone (+251)"
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  required
                />
                <Input
                  label="Institutional / Contact Email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  required
                />
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
                <Input
                  label="Kebele / House No."
                  value={personalInfo.kebele}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, kebele: e.target.value })}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Full Residential Postal Address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  />
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <Input
                    label="Previous Secondary & Preparatory School"
                    value={academic.previousSchool}
                    onChange={(e) => setAcademic({ ...academic, previousSchool: e.target.value })}
                    required
                  />
                </div>
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
                <div className="md:col-span-2">
                  <Input
                    label="Cumulative National Examination Score (Total out of 600 / 700)"
                    type="number"
                    step="0.01"
                    value={academic.examScore}
                    onChange={(e) => setAcademic({ ...academic, examScore: Number(e.target.value) })}
                    required
                  />
                </div>
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
                        subjects: [...academic.subjects, { name: '', grade: '' }],
                      })
                    }
                    className="text-xs font-bold text-[#0073AA] hover:underline flex items-center gap-1"
                  >
                    <span>+ Add Subject</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {academic.subjects.map((sub, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
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
                            className="mt-1 text-red-500 hover:text-red-700 text-sm p-2 rounded hover:bg-red-50"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <Input
                  label="Second Choice Alternative Program (Optional)"
                  value={programInfo.secondChoice || ''}
                  onChange={(e) => setProgramInfo({ ...programInfo, secondChoice: e.target.value })}
                  placeholder="e.g. Information Technology (B.Sc.)"
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

              {/* Drag and drop zone */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center bg-gray-50/50 hover:bg-white hover:border-[#00486E] transition-all cursor-pointer">
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
                  <span className="inline-block mt-4 bg-[#00486E] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded shadow-xs">
                    Select Digital Files
                  </span>
                </label>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-3">
                <h3 className="font-black text-xs text-gray-400 uppercase tracking-wider">
                  Attached Verification Files ({documents.length})
                </h3>
                {documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded p-3.5 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-blue-50 text-[#00486E] font-bold flex items-center justify-center text-sm border border-blue-100">
                        PDF
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#00486E]">{doc.name}</p>
                        <p className="text-[11px] text-gray-500">{doc.size} • Verified Format</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDocuments(documents.filter((_, i) => i !== idx))}
                      className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 px-3 py-1.5 rounded transition-all"
                    >
                      Remove
                    </button>
                  </div>
                ))}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Personal Information Summary */}
                <div className="bg-[#F8F9FA] rounded border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                    <h4 className="font-black text-xs text-[#00486E] uppercase tracking-wider">
                      Applicant Bio-Data
                    </h4>
                    <button
                      onClick={() => setStep(0)}
                      className="text-xs font-bold text-[#0073AA] hover:underline"
                    >
                      Edit ✏️
                    </button>
                  </div>
                  <dl className="grid grid-cols-2 gap-y-2 text-xs">
                    <dt className="text-gray-500">Full Name:</dt>
                    <dd className="font-bold text-[#00486E]">{personalInfo.firstName} {personalInfo.lastName}</dd>
                    <dt className="text-gray-500">Amharic Name:</dt>
                    <dd className="font-bold text-[#00486E]">{personalInfo.firstNameAm} {personalInfo.lastNameAm}</dd>
                    <dt className="text-gray-500">Date of Birth:</dt>
                    <dd className="font-medium text-gray-800">{personalInfo.dateOfBirth}</dd>
                    <dt className="text-gray-500">Gender & Nationality:</dt>
                    <dd className="font-medium text-gray-800 capitalize">{personalInfo.gender} • {personalInfo.nationality}</dd>
                    <dt className="text-gray-500">Contact Telephone:</dt>
                    <dd className="font-medium text-gray-800">{personalInfo.phone}</dd>
                    <dt className="text-gray-500">Email Address:</dt>
                    <dd className="font-medium text-gray-800">{personalInfo.email}</dd>
                    <dt className="text-gray-500">Region & Woreda:</dt>
                    <dd className="font-medium text-gray-800">{personalInfo.region}, {personalInfo.woreda}</dd>
                  </dl>
                </div>

                {/* Academic Qualifications Summary */}
                <div className="bg-[#F8F9FA] rounded border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                    <h4 className="font-black text-xs text-[#00486E] uppercase tracking-wider">
                      Academic Background
                    </h4>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-[#0073AA] hover:underline"
                    >
                      Edit ✏️
                    </button>
                  </div>
                  <dl className="grid grid-cols-2 gap-y-2 text-xs">
                    <dt className="text-gray-500">Preparatory School:</dt>
                    <dd className="font-bold text-[#00486E] col-span-2">{academic.previousSchool}</dd>
                    <dt className="text-gray-500">Exam Category:</dt>
                    <dd className="font-medium text-gray-800">{academic.examType}</dd>
                    <dt className="text-gray-500">Year of Exam:</dt>
                    <dd className="font-medium text-gray-800">{academic.examYear}</dd>
                    <dt className="text-gray-500">Total Score:</dt>
                    <dd className="font-black text-green-700 bg-green-50 px-2 py-0.5 rounded inline-block w-fit">
                      {academic.examScore} / 700
                    </dd>
                    <dt className="text-gray-500">Subject Count:</dt>
                    <dd className="font-medium text-gray-800">{academic.subjects.length} subjects registered</dd>
                  </dl>
                </div>

                {/* Program Choice Summary */}
                <div className="bg-[#F8F9FA] rounded border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                    <h4 className="font-black text-xs text-[#00486E] uppercase tracking-wider">
                      Program & Campus Placement
                    </h4>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-bold text-[#0073AA] hover:underline"
                    >
                      Edit ✏️
                    </button>
                  </div>
                  <dl className="grid grid-cols-2 gap-y-2 text-xs">
                    <dt className="text-gray-500">Selected Campus:</dt>
                    <dd className="font-bold text-[#00486E] uppercase">{programInfo.campusId} Campus</dd>
                    <dt className="text-gray-500">Primary Program:</dt>
                    <dd className="font-bold text-[#00486E]">{programInfo.firstChoice || programInfo.programId}</dd>
                    <dt className="text-gray-500">Modality / Shift:</dt>
                    <dd className="font-medium text-gray-800 capitalize">{programInfo.admissionType}</dd>
                    <dt className="text-gray-500">Academic Intake:</dt>
                    <dd className="font-medium text-gray-800">AY {programInfo.intakeYear} • Semester {programInfo.intakeSemester}</dd>
                  </dl>
                </div>

                {/* Documents Summary */}
                <div className="bg-[#F8F9FA] rounded border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                    <h4 className="font-black text-xs text-[#00486E] uppercase tracking-wider">
                      Uploaded Documents
                    </h4>
                    <button
                      onClick={() => setStep(3)}
                      className="text-xs font-bold text-[#0073AA] hover:underline"
                    >
                      Edit ✏️
                    </button>
                  </div>
                  <ul className="space-y-2 text-xs">
                    {documents.map((d, i) => (
                      <li key={i} className="flex items-center justify-between text-gray-700">
                        <span className="font-medium">📄 {d.name}</span>
                        <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">{d.size}</span>
                      </li>
                    ))}
                  </ul>
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
    </div>
  );
}
