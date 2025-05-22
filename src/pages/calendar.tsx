import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US'; // Locale support
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Storm Alert Review',
    start: new Date(),
    end: new Date(),
    allDay: true,
  },
  {
    title: 'Weather Report Meeting',
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
  },
];

const CalendarPage = () => {
  return (
    <div className="p-4 h-full bg-gray-50 rounded-r-lg overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Weather Calendar</h2>
      <div className="bg-white rounded shadow p-4 h-full flex flex-col">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="flex-grow"
        />
      </div>
    </div>
  );
};

export default CalendarPage;
