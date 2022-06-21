import { format } from 'date-fns';

export const serializeEvent = event => {
  if (event === null) {
    return null;
  }
  const start = new Date(event.start);
  const end = new Date(event.end);
  return {
    ...event,
    start,
    end,
    startDate: format(start, 'yyyy/MM/dd'),
    startTime: format(start, 'HH:mm'),
    endDate: format(end, 'yyyy/MM/dd'),
    endTime: format(end, 'HH:mm'),
    color: event.color || '#2196F3',
  };
};

export const serializeCalendar = calendar => {
  if (calendar === null) {
    return null;
  }
  return {
    ...calendar,
    color: calendar.color || '#2196F3',
  };
};