import { useState } from 'react';
import { useTasks } from '../TaskContext';

const TodayTasks = () => {
  const { tasks, addTask, deleteTask, toggleComplete, updateTask } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [category, setCategory] = useState('General');

  const today = new Date().toDateString();
  const todayTasks = tasks.filter(
    (task) => new Date(task.createdAt).toDateString() === today
  );

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask, category);
      setNewTask('');
    }
  };

  const handleSaveEdit = (taskId) => {
    updateTask(taskId, editText);
    setEditingTask(null);
  };

  return (
    <div className="today-tasks">
      <h2 className="tasks-heading">Today's Tasks</h2>

      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="task-input"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />

        <select
          className="task-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>

        <button onClick={handleAddTask} className="add-task-btn">
          <i className="bx bx-plus"></i>
        </button>
      </div>

      <div className="tasks-list">
        {todayTasks.map((task) => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="task-checkbox"
              />

              {editingTask === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-task-input"
                  autoFocus
                />
              ) : (
                <span className="task-text">{task.text} — <em>{task.category}</em></span>
              )}

              <div className="task-time">
                {new Date(task.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>

            <div className="task-actions">
              {editingTask === task.id ? (
                <button onClick={() => handleSaveEdit(task.id)} className="save-edit-btn">
                  <i className="bx bx-check"></i>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingTask(task.id);
                    setEditText(task.text);
                  }}
                  className="edit-task-btn"
                >
                  <i className="bx bx-edit"></i>
                </button>
              )}
              <button onClick={() => deleteTask(task.id)} className="delete-task-btn">
                <i className="bx bx-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayTasks;
