export interface EventCategory {
  id: string;
  name: string;
  color: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  extendedProps?: {
    category?: string;
  };
}

export interface CreateEventInput {
  title: string;
  startTime: string;
  endTime: string;
  category: string;
  color?: string;
}

export const CATEGORIES: EventCategory[] = [
  { id: 'work', name: 'Công việc', color: '#ef4444' },
  { id: 'study', name: 'Học tập', color: '#3b82f6' },
  { id: 'personal', name: 'Cá nhân', color: '#10b981' },
  { id: 'important', name: 'Quan trọng', color: '#f59e0b' },
];