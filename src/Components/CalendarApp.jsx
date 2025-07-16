import { useState, useEffect } from 'react';
import './CalendarApp.css';
import { useCalendar } from './CalendarContext.jsx';

const CalendarApp = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useCalendar();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [eventTime, setEventTime] = useState({ hours: '00', minutes: '00' });
  const [eventText, setEventText] = useState('');
  const [eventCategory, setEventCategory] = useState('General');
  const [editingEvent, setEditingEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, '0')}:${eventTime.minutes.padStart(2, '0')}`,
      text: eventText,
      category: eventCategory
    };

    if (editingEvent) {
      updateEvent(newEvent);
    } else {
      addEvent(newEvent);
    }

    setEventTime({ hours: '00', minutes: '00' });
    setEventText('');
    setEventCategory('General');
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    const [hours, minutes] = event.time.split(':');
    setEventText(event.text);
    setEventTime({ hours, minutes });
    setSelectedDate(event.date);
    setEventCategory(event.category || 'General');
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
  };

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>

        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <button className="nav-button" onClick={prevMonth}>
              <i className="bx bx-chevron-left"></i>
            </button>
            <button className="nav-button" onClick={nextMonth}>
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{isMobile ? day.substring(0, 2) : day}</span>
          ))}
        </div>

        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}

          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? 'current-day'
                  : ''
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="time"
                value={`${eventTime.hours}:${eventTime.minutes}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  setEventTime({ hours, minutes });
                }}
                className="time-picker"
              />
            </div>

            <select
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              className="category-select"
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>

            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>

            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? 'Update Event' : 'Add Event'}
            </button>

            <button className="close-event-popup" onClick={() => setShowEventPopup(false)}>
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}

        {events.length > 0 ? (
          events.map((event) => (
            <div className="event" key={event.id}>
              <div className="event-date-wrapper">
                <div className="event-date">
                  {(() => {
                    const date = new Date(event.date);
                    return `${monthsOfYear[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
                  })()}
                </div>
                <div className="event-time">{event.time}</div>
              </div>
              <div className="event-text">
                {event.text}{" "}
                <span className="event-category">({event.category || 'General'})</span>
              </div>
              <div className="event-buttons">
                <button onClick={() => handleEditEvent(event)}>
                  <i className="bx bxs-edit-alt"></i>
                </button>
                <button onClick={() => handleDeleteEvent(event.id)}>
                  <i className="bx bxs-message-alt-x"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No events scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
