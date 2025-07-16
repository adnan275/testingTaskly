import { useTasks } from '../TaskContext';
import { useCalendar } from './CalendarContext';

const PendingTasks = () => {
  const { tasks } = useTasks();
  const { events } = useCalendar();

  const getPendingTasks = () => {
    const todayPending = tasks.filter(task => !task.completed);

    const calendarPending = events.filter(event => {
      const eventDate = new Date(event.date);
      const now = new Date();

      const eventDateWithoutTime = new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate()
      );

      const todayWithoutTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      return (
        eventDateWithoutTime > todayWithoutTime ||
        (eventDateWithoutTime.getTime() === todayWithoutTime.getTime() &&
          now.getTime() < new Date(`${eventDate.toISOString().split('T')[0]}T${event.time}`).getTime())
      );
    });

    return { todayPending, calendarPending };
  };

  const { todayPending, calendarPending } = getPendingTasks();

  return (
    <div className="pending-tasks">
      <h2 className="pending-heading">Pending Tasks</h2>

      <div className="pending-categories">
        {/* Today */}
        <div className="pending-section">
          <h3 className="section-heading">
            <i className="bx bx-task"></i> Today's Pending ({todayPending.length})
          </h3>
          {todayPending.length > 0 ? (
            todayPending.map(task => (
              <div key={task.id} className="pending-item task-item">
                <div className="item-content">
                  <i className="bx bx-checkbox"></i>
                  <span>
                    {task.text}
                    {task.category && (
                      <span style={{ fontStyle: 'italic', color: '#7ec9f5', marginLeft: '8px' }}>
                        — {task.category}
                      </span>
                    )}
                  </span>
                </div>
                <div className="item-time">
                  Added: {task.createdAt.toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No pending tasks for today!</div>
          )}
        </div>

        {/*Calendar*/}
        <div className="pending-section">
          <h3 className="section-heading">
            <i className="bx bx-calendar"></i> Upcoming Events ({calendarPending.length})
          </h3>
          {calendarPending.length > 0 ? (
            calendarPending.map(event => (
              <div key={event.id} className="pending-item event-item">
                <div className="item-content">
                  <i className="bx bx-calendar-event"></i>
                  <div className="event-details">
                    <span className="event-text">{event.text}</span>
                    <span className="event-time">
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No upcoming events!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
