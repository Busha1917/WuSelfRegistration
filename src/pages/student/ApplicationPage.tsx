import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { applicationService, publicService } from '@/mocks/services';
import { useToast } from '@/components/ui/Toast';
import type { Application, Campus, Program, AdmissionType, CampusId } from '@/types';
import Stepper from '@/components/shared/Stepper';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const steps = [
  { label: 'Personal Info' },
  { label: 'Academic' },
  { label: 'Program' },
  { label: 'Documents' },
  { label: 'Review' },
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

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '', lastName: '', firstNameAm: undefined as string | undefined, lastNameAm: undefined as string | undefined,
    dateOfBirth: '', gender: 'male' as 'male' | 'female' | 'other',
    nationality: 'Ethiopian', phone: '', email: user?.email || '',
    region: '', zone: '', woreda: '', kebele: '', address: '',
  });

  const [academic, setAcademic] = useState({
    previousSchool: '', examType: 'Ethiopian Higher Education Entrance', examYear: 2023, examScore: 0,
    subjects: [{ name: 'Mathematics', grade: '' }, { name: 'English', grade: '' }, { name: 'Physics', grade: '' }],
  });

  const [programInfo, setProgramInfo] = useState({
    programId: '', campusId: 'main' as CampusId, admissionType: 'regular' as AdmissionType,
    intakeYear: 2024, intakeSemester: '1' as '1' | '2', firstChoice: '', secondChoice: undefined as string | undefined,
  });

  const [documents, setDocuments] = useState<{ file: File; name: string }[]>([]);

  useEffect(() => {
    publicService.getCampuses().then(setCampuses);
    publicService.getPrograms().then(setPrograms);
    if (user) {
      applicationService.getApplicationByStudentId(user.id).then((app) => {
        if (app) {
          setApplication(app);
          setPersonalInfo(app.personalInfo as any);
          setAcademic(app.academicBackground);
          setProgramInfo(app.programInfo as any);
        }
      });
    }
  }, [user]);

  const filteredPrograms = programs.filter((p) => p.campusId === programInfo.campusId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newDocs = Array.from(files).map((f) => ({ file: f, name: f.name }));
    setDocuments([...documents, ...newDocs]);
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
      addToast('Draft saved', 'success');
    } catch {
      addToast('Failed to save draft', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
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
      addToast(t('student.application.submitted'), 'success');
      navigate('/student/status');
    } catch {
      addToast('Submission failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label={t('student.application.personalInfo.firstName')} value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} required />
            <Input label={t('student.application.personalInfo.lastName')} value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} required />
            <Input label={t('student.application.personalInfo.firstNameAm')} value={personalInfo.firstNameAm || ''} onChange={(e) => setPersonalInfo({ ...personalInfo, firstNameAm: e.target.value })} />
            <Input label={t('student.application.personalInfo.lastNameAm')} value={personalInfo.lastNameAm || ''} onChange={(e) => setPersonalInfo({ ...personalInfo, lastNameAm: e.target.value })} />
            <Input label={t('student.application.personalInfo.dateOfBirth')} type="date" value={personalInfo.dateOfBirth} onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })} required />
            <Select label={t('student.application.personalInfo.gender')} value={personalInfo.gender} onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value as any })} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
            <Input label={t('student.application.personalInfo.nationality')} value={personalInfo.nationality} onChange={(e) => setPersonalInfo({ ...personalInfo, nationality: e.target.value })} />
            <Input label={t('student.application.personalInfo.phone')} type="tel" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} required />
            <Input label={t('student.application.personalInfo.email')} type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} required />
            <Input label={t('student.application.personalInfo.region')} value={personalInfo.region} onChange={(e) => setPersonalInfo({ ...personalInfo, region: e.target.value })} />
            <Input label={t('student.application.personalInfo.zone')} value={personalInfo.zone} onChange={(e) => setPersonalInfo({ ...personalInfo, zone: e.target.value })} />
            <Input label={t('student.application.personalInfo.woreda')} value={personalInfo.woreda} onChange={(e) => setPersonalInfo({ ...personalInfo, woreda: e.target.value })} />
            <Input label={t('student.application.personalInfo.kebele')} value={personalInfo.kebele} onChange={(e) => setPersonalInfo({ ...personalInfo, kebele: e.target.value })} />
            <div className="md:col-span-2">
              <Input label={t('student.application.personalInfo.address')} value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label={t('student.application.academic.previousSchool')} value={academic.previousSchool} onChange={(e) => setAcademic({ ...academic, previousSchool: e.target.value })} required />
              <Input label={t('student.application.academic.examType')} value={academic.examType} onChange={(e) => setAcademic({ ...academic, examType: e.target.value })} />
              <Input label={t('student.application.academic.examYear')} type="number" value={academic.examYear} onChange={(e) => setAcademic({ ...academic, examYear: Number(e.target.value) })} />
              <Input label={t('student.application.academic.examScore')} type="number" step="0.01" value={academic.examScore} onChange={(e) => setAcademic({ ...academic, examScore: Number(e.target.value) })} />
            </div>
            <h3 className="font-medium text-wu-ink">{t('student.application.academic.subjects')}</h3>
            {academic.subjects.map((sub, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-3">
                <Input value={sub.name} onChange={(e) => { const s = [...academic.subjects]; s[idx].name = e.target.value; setAcademic({ ...academic, subjects: s }); }} />
                <Input value={sub.grade} onChange={(e) => { const s = [...academic.subjects]; s[idx].grade = e.target.value; setAcademic({ ...academic, subjects: s }); }} placeholder="Grade" />
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label={t('student.application.program.campus')} value={programInfo.campusId} onChange={(e) => setProgramInfo({ ...programInfo, campusId: e.target.value as CampusId })} options={campuses.map((c) => ({ value: c.id, label: c.name }))} />
            <Select label={t('student.application.program.program')} value={programInfo.programId} onChange={(e) => setProgramInfo({ ...programInfo, programId: e.target.value, firstChoice: e.target.value })} options={filteredPrograms.map((p) => ({ value: p.id, label: p.name }))} placeholder="Select program" />
            <Select label={t('student.application.program.admissionType')} value={programInfo.admissionType} onChange={(e) => setProgramInfo({ ...programInfo, admissionType: e.target.value as AdmissionType })} options={[{ value: 'regular', label: 'Regular' }, { value: 'weekend', label: 'Weekend' }, { value: 'night', label: 'Night' }, { value: 'distance_summer', label: 'Distance/Summer' }, { value: 'masters', label: 'Masters' }]} />
            <Input label={t('student.application.program.intakeYear')} type="number" value={programInfo.intakeYear} onChange={(e) => setProgramInfo({ ...programInfo, intakeYear: Number(e.target.value) })} />
            <Select label={t('student.application.program.intakeSemester')} value={programInfo.intakeSemester} onChange={(e) => setProgramInfo({ ...programInfo, intakeSemester: e.target.value as '1' | '2' })} options={[{ value: '1', label: t('student.application.program.semester1') }, { value: '2', label: t('student.application.program.semester2') }]} />
            <Select label={t('student.application.program.secondChoice')} value={programInfo.secondChoice} onChange={(e) => setProgramInfo({ ...programInfo, secondChoice: e.target.value })} options={filteredPrograms.map((p) => ({ value: p.id, label: p.name }))} placeholder="Optional" />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-wu-maroon transition-colors">
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-4xl mb-2">📎</div>
                <p className="text-sm text-neutral">{t('student.documents.dragDrop')}</p>
                <p className="text-xs text-neutral mt-1">PDF, JPG, PNG</p>
              </label>
            </div>
            {documents.length > 0 && (
              <div className="space-y-2">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span>📄</span>
                      <span className="text-sm font-medium">{doc.name}</span>
                      <span className="text-xs text-neutral">({(doc.file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button onClick={() => setDocuments(documents.filter((_, i) => i !== idx))} className="text-danger text-sm hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-neutral">Note: You can submit without documents and upload them later.</p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-wu-ink mb-2">Personal Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-neutral">Name:</span><span>{personalInfo.firstName} {personalInfo.lastName}</span>
                <span className="text-neutral">DOB:</span><span>{personalInfo.dateOfBirth}</span>
                <span className="text-neutral">Gender:</span><span>{personalInfo.gender}</span>
                <span className="text-neutral">Phone:</span><span>{personalInfo.phone}</span>
                <span className="text-neutral">Email:</span><span>{personalInfo.email}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-wu-ink mb-2">Academic Background</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-neutral">School:</span><span>{academic.previousSchool}</span>
                <span className="text-neutral">Exam Year:</span><span>{academic.examYear}</span>
                <span className="text-neutral">Score:</span><span>{academic.examScore}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-wu-ink mb-2">Program Selection</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-neutral">Campus:</span><span>{programInfo.campusId}</span>
                <span className="text-neutral">Program:</span><span>{programInfo.programId}</span>
                <span className="text-neutral">Type:</span><span>{programInfo.admissionType}</span>
                <span className="text-neutral">Intake:</span><span>{programInfo.intakeYear} Sem {programInfo.intakeSemester}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-wu-ink mb-2">Documents</h4>
              <p className="text-sm text-neutral">{documents.length} file(s) attached</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('student.application.title')}</h1>
      <Stepper steps={steps} currentStep={step} />

      <Card>
        <h2 className="font-heading font-semibold text-wu-ink mb-4">{steps[step].label}</h2>
        {renderStep()}
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {step > 0 && <Button variant="ghost" onClick={() => setStep(step - 1)}>{t('student.application.back')}</Button>}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleSaveDraft} loading={loading}>{t('student.application.saveDraft')}</Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>{t('student.application.next')}</Button>
          ) : (
            <Button onClick={handleSubmit} loading={loading}>{t('student.application.submit')}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
