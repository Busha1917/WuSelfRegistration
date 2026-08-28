import { useTranslation } from 'react-i18next';
import Card, { CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ManagementReports() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-wu-ink">{t('management.reports.title')}</h1>
        <span className="text-xs bg-warning-light text-warning px-3 py-1 rounded-full font-medium">{t('management.reports.readOnly')}</span>
      </div>

      <Card>
        <CardTitle>Available Reports</CardTitle>
        <div className="space-y-4 mt-4">
          {[
            { title: 'Registration Summary Report', desc: 'Overview of all registrations by campus, program, and status.' },
            { title: 'Approval Rate Report', desc: 'Analysis of approval and rejection rates across campuses.' },
            { title: 'Campus-wise Enrollment', desc: 'Enrollment distribution across all three campuses.' },
            { title: 'Program Demand Report', desc: 'Most popular programs by application count.' },
            { title: 'Semester Comparison', desc: 'Compare enrollment trends across semesters.' },
          ].map((report) => (
            <div key={report.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-wu-ink">{report.title}</h3>
                <p className="text-xs text-neutral mt-0.5">{report.desc}</p>
              </div>
              <Button variant="ghost" size="sm">{t('management.reports.export')}</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
