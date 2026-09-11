import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateSelectArg, EventChangeArg, EventClickArg } from '@fullcalendar/core';
import type { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onSelect: (info: DateSelectArg) => void;
  onEventClick: (info: EventClickArg) => void;
  onEventChange: (info: EventChangeArg) => void;
}

export function CalendarView({ events, onSelect, onEventClick, onEventChange }: CalendarViewProps) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-slate-100 text-slate-800">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={window.innerWidth < 768 ? 'timeGridDay' : 'dayGridMonth'}
        selectable
        editable
        select={onSelect}
        eventClick={onEventClick}
        eventDrop={onEventChange}
        eventResize={onEventChange}
        events={events}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
      />
    </div>
  );
}