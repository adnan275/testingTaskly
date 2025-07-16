import { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todayTasks');
    return savedTasks
      ? JSON.parse(savedTasks).map(task => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }))
      : [];
  });

  useEffect(() => {
    localStorage.setItem('todayTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, category = 'General') => {
    const newTask = {
      id: Date.now(),
      text,
      category,
      completed: false,
      createdAt: new Date()
    };

    setTasks(prev => [...prev, newTask]);
  };


  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };


  const toggleComplete = (taskId) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const hoursPassed =
            (new Date() - new Date(task.createdAt)) / (1000 * 60 * 60);
          if (hoursPassed > 24) return task; 
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };


  const updateTask = (taskId, newText) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleComplete,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};


export const useTasks = () => useContext(TaskContext);
