import { createContext, useState, useEffect, useContext } from 'react';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('tasklyEvents');
    return savedEvents ? JSON.parse(savedEvents).map(event => ({
      ...event,
      date: new Date(event.date)
    })) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasklyEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents(prev => {
      const updated = [...prev, newEvent];
      return updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    });
  };

  const updateEvent = (updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return (
    <CalendarContext.Provider value={{
      events,
      addEvent,
      updateEvent,
      deleteEvent
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};