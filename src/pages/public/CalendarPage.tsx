import { useTranslation } from 'react-i18next';
import Card from '@/components/ui/Card';

const calendarEvents = [
  { period: 'regular', dates: 'August 1 – September 30, 2024', status: 'Open' },
  { period: 'weekend', dates: 'August 15 – October 15, 2024', status: 'Open' },
  { period: 'night', dates: 'September 1 – October 31, 2024', status: 'Upcoming' },
  { period: 'summer', dates: 'January 15 – March 15, 2025', status: 'Upcoming' },
  { period: 'masters', dates: 'October 1 – November 30, 2024', status: 'Upcoming' },
];

export default function CalendarPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl font-bold text-wu-ink mb-2">{t('public.calendar.title')}</h1>
      <p className="text-neutral mb-8">{t('public.calendar.description')}</p>

      <Card>
        <div className="divide-y">
          {calendarEvents.map((event) => (
            <div key={event.period} className="flex items-center justify-between py-4">
              <div>
                <h3 className="font-medium text-wu-ink">{t(`public.calendar.${event.period}`)}</h3>
                <p className="text-sm text-neutral mt-0.5">{event.dates}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Open' ? 'bg-success-light text-success' : 'bg-warning-light text-warning'}`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
