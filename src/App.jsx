import { useState, useEffect } from 'react';
import CalendarApp from './Components/CalendarApp';
import './Components/CalendarApp.css';
import Image from './assets/image.png';
import Logo from './assets/Logo.png';
import TodayTasks from './Components/TodayTasks';
import { TaskProvider } from './TaskContext.jsx';
import { CalendarProvider } from './Components/CalendarContext.jsx';
import PendingTasks from './Components/PendingTasks';
import AboutPage from './Components/About';
import Login from './Components/Login';
import './App.css';
import './Components/Login.css'; 
import './Components/TodayTasks.css'; 

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'featured';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <TaskProvider>
      <CalendarProvider>
        <div className={`app-container ${isMobile ? 'mobile' : ''}`}>
          <nav className="navbar">
            <div className="navbar-brand">
              <img src={Logo} alt="Calendar Logo" className="logo" />
              <span>Taskly</span>
            </div>

            <div className="navbar-links">
              {['today', 'featured', 'pending', 'about'].map((tab) => (
                <button
                  key={tab}
                  className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(tab);
                    localStorage.setItem('activeTab', tab);
                  }}
                >
                  {tab === 'today'
                    ? "Today's Tasks"
                    : tab === 'featured'
                    ? 'Future Tasks'
                    : tab === 'pending'
                    ? 'Pending'
                    : 'About'}
                </button>
              ))}
            </div>

            <div className="profile-section">
              <img src={Image} alt="Profile" className="profile-pic" />
              <button className="logout-btn" onClick={handleLogout} title="Logout">
                <i className="bx bx-log-out"></i>
              </button>
            </div>
          </nav>

          <main className="main-content">
            {activeTab === 'today' && <TodayTasks />}
            {activeTab === 'featured' && <CalendarApp />}
            {activeTab === 'pending' && <PendingTasks />}
            {activeTab === 'about' && <AboutPage />}
          </main>
        </div>
      </CalendarProvider>
    </TaskProvider>
  );
};

export default App;
