import { useState } from 'react';
import type { DateSelectArg, EventChangeArg, EventClickArg } from '@fullcalendar/core';
import { Header } from '../components/layout/Header';
import { LoginForm } from '../features/auth/components/LoginForm';
import { useAuth } from '../features/auth/hooks/useAuth';
import { CalendarView } from '../features/calendar/components/CalendarView';
import { CategoryLegend } from '../features/calendar/components/CategoryLegend';
import { EventDetailModal } from '../features/calendar/components/EventDetailModal';
import { EventModal } from '../features/calendar/components/EventModal';
import { useCalendar } from '../features/calendar/hooks/useCalendar';
import type { CalendarEvent } from '../features/calendar/types';

function CalendarRoute({ onLogout }: { onLogout: () => void }) {
  const { events, selectedEvent, setSelectedEvent, addEvent, changeEvent, removeEvent } = useCalendar(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleSelect = (info: DateSelectArg) => setSelectedDate(info.startStr.split('T')[0]);
  const handleEventClick = (info: EventClickArg) => {
    const event = info.event;
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.start?.toISOString() || '',
      end: event.end?.toISOString() || '',
    });
  };
  const handleEventChange = (info: EventChangeArg) => {
    const event = info.event;
    const calendarEvent: CalendarEvent = {
      id: event.id,
      title: event.title,
      start: event.start?.toISOString() || '',
      end: event.end?.toISOString() || event.start?.toISOString() || '',
    };
    void changeEvent(calendarEvent, info.revert);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <Header onLogout={onLogout} />
      <CategoryLegend />
      <CalendarView events={events} onSelect={handleSelect} onEventClick={handleEventClick} onEventChange={handleEventChange} />
      {selectedDate && <EventModal date={selectedDate} onClose={() => setSelectedDate(null)} onSubmit={addEvent} />}
      {selectedEvent && <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onDelete={removeEvent} />}
    </div>
  );
}

export function AppRouter() {
  const { token, signIn, signOut } = useAuth();
  return token ? <CalendarRoute onLogout={signOut} /> : <LoginForm onSubmit={signIn} />;
}