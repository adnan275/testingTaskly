import Profile from '../assets/profile.jpeg';

const AboutPage = () => {
    return (
      <div className="about-page">
        <div className="about-header">
          <h1>About Taskly</h1>
          <p>Your Smart Task Management Solution</p>
        </div>
  
        <div className="about-content">
          <section className="about-section">
            <h2><i className="bx bx-rocket"></i> Our Mission</h2>
            <p>
              Taskly was born from the need for a simple yet powerful task management tool 
              that combines daily task tracking with calendar integration. We aim to help 
              users stay organized and productive through intuitive design and smart features.
            </p>
          </section>
  
          <section className="about-section">
            <h2><i className="bx bx-star"></i> Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <i className="bx bx-calendar"></i>
                <h3>Smart Calendar</h3>
                <p>Visualize tasks and events in an intuitive calendar interface</p>
              </div>
              <div className="feature-card">
                <i className="bx bx-task"></i>
                <h3>Daily Tracking</h3>
                <p>Manage today's tasks with priority and completion tracking</p>
              </div>
              <div className="feature-card">
                <i className="bx bx-bell"></i>
                <h3>Smart Reminders</h3>
                <p>Never miss important deadlines with integrated reminders</p>
              </div>
            </div>
          </section>
  
          <section className="about-section team-section">
            <h2><i className="bx bx-group"></i> Development Team</h2>
            <div className="team-member">
              <img 
                src={Profile}
                alt="Developer" 
                className="developer-pic" 
              />
              <div className="member-info">
                <h3>Adnan Rizvi</h3>
                <p>Full Stack Developer</p>
                <div className="social-links">
                  <a href="https://github.com/adnan275"><i className="bx bxl-github"></i></a>
                  <a href="https://www.linkedin.com/in/adnan-rizvi-o1/"><i className="bx bxl-linkedin"></i></a>
                  <a href="mailto:adnan.ashar7869@gmail.com"><i className="bx bx-envelope"></i></a>
                </div>
              </div>
            </div>
          </section>
  
          <footer className="about-footer">
            <p>© 2024 Taskly. All rights reserved.</p>
            <p>Version 1.0.0</p>
          </footer>
        </div>
      </div>
    );
  };
  
  export default AboutPage;