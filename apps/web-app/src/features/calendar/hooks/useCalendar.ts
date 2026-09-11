import { useCallback, useEffect, useState } from 'react';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../services/eventService';
import type { CalendarEvent, CreateEventInput } from '../types';

export function useCalendar(enabled: boolean) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const refreshEvents = useCallback(async () => {
    try {
      setEvents(await getEvents());
    } catch (error) {
      console.error('Lỗi tải danh sách sự kiện:', error);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    void getEvents()
      .then((nextEvents) => setEvents(nextEvents))
      .catch((error) => console.error('Lỗi tải danh sách sự kiện:', error));
  }, [enabled]);

  const addEvent = async (event: CreateEventInput) => {
    await createEvent(event);
    await refreshEvents();
  };

  const changeEvent = async (event: CalendarEvent, revert: () => void) => {
    try {
      await updateEvent(event.id, {
        title: event.title,
        startTime: new Date(event.start).toISOString(),
        endTime: new Date(event.end).toISOString(),
      });
    } catch (error) {
      console.error('Không thể cập nhật thời gian sự kiện:', error);
      alert('Không thể cập nhật thời gian sự kiện!');
      revert();
    }
  };

  const removeEvent = async () => {
    if (!selectedEvent) return;
    try {
      await deleteEvent(selectedEvent.id);
      setEvents((current) => current.filter((event) => event.id !== selectedEvent.id));
      setSelectedEvent(null);
    } catch (error) {
      console.error('Xóa sự kiện thất bại:', error);
      alert('Xóa sự kiện thất bại!');
    }
  };

  return { events, selectedEvent, setSelectedEvent, addEvent, changeEvent, removeEvent };
}