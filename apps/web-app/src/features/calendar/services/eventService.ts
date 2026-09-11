import { api } from '../../../api/client';
import { CATEGORIES, type CalendarEvent, type CreateEventInput } from '../types';

interface ApiEvent {
  id?: string;
  _id?: string;
  title: string;
  start_time?: string;
  startTime?: string;
  end_time?: string;
  endTime?: string;
  color?: string;
  category?: string;
}

export async function getEvents(): Promise<CalendarEvent[]> {
  const response = await api.get('/events');
  const eventData: ApiEvent[] = response.data.events || response.data;

  return eventData.map((event) => {
    const category = CATEGORIES.find((item) => item.id === event.category) || CATEGORIES[1];
    const color = event.color || category.color;
    return {
      id: event.id || event._id || '',
      title: event.title,
      start: event.start_time || event.startTime || '',
      end: event.end_time || event.endTime || '',
      backgroundColor: color,
      borderColor: color,
      extendedProps: { category: event.category || 'study' },
    };
  });
}

export function createEvent(event: CreateEventInput) {
  return api.post('/events', event);
}

export function updateEvent(id: string, event: { title: string; startTime: string; endTime: string }) {
  return api.put(`/events/${id}`, event);
}

export function deleteEvent(id: string) {
  return api.delete(`/events/${id}`);
}