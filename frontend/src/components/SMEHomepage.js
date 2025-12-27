import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SMEHomepage.css';

const SMEHomepage = () => {
  const navigate = useNavigate();
  const [smeName, setSmeName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a random project to get SME name (placeholder logic)
    const fetchSMEName = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        if (res.data && res.data.length > 0) {
          // Pick first project's title as placeholder for SME name
          const randomProject = res.data[Math.floor(Math.random() * res.data.length)];
          setSmeName(randomProject.title || 'SME User');
        } else {
          setSmeName('SME User');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching SME name:', err);
        setSmeName('SME User');
        setLoading(false);
      }
    };

    fetchSMEName();
  }, []);

  const handleProjectClick = () => {
    navigate('/projects');
  };

  if (loading) {
    return <div className="sme-home-loading">Loading...</div>;
  }

  return (
    <div className="sme-homepage-container">
      {/* Header */}
      <div className="sme-header">
        <div className="sme-header-logo">
          <img src="/images/agrinet-logo.svg" alt="Agrinet" className="sme-header-logo-icon" />
          <span className="sme-header-logo-text">Agrinet</span>
        </div>
        <div className="sme-header-menu">
          <span>Tools</span>
          <span>Company</span>
          <span>About Us</span>
          <span>Pricing</span>
          <span>Support</span>
        </div>
        <div className="sme-header-search">
          <input type="text" placeholder=" Search Company" className="sme-search-input" />
          <button className="sme-search-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2"/>
              <path d="M20 20l-4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="sme-header-actions">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M18 6v6l4-4-4-2zM18 27v-6l-4 4 4 2z" fill="#1B223C"/>
          </svg>
          <div className="sme-header-avatar"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="sme-main-wrapper">
        {/* Left Sidebar */}
        <div className="sme-left-sidebar">
          <div className="sme-nav-items">
            {/* Home - Active */}
            <div className="sme-nav-item sme-nav-active">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Home</span>
            </div>

            {/* Project - Clickable */}
            <div className="sme-nav-item sme-nav-clickable" onClick={handleProjectClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Project</span>
            </div>

            {/* Tasks - Disabled */}
            <div className="sme-nav-item sme-nav-disabled">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Tasks</span>
            </div>

            {/* Work Logs - Disabled */}
            <div className="sme-nav-item sme-nav-disabled">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Work Logs</span>
            </div>

            {/* Performance - Disabled */}
            <div className="sme-nav-item sme-nav-disabled">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2"/>
                <path d="M18 17l-4-4-3 3-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Performance</span>
            </div>

            {/* Settings - Disabled */}
            <div className="sme-nav-item sme-nav-disabled">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1v3m0 16v3m10-10h-3M5 12H2m15.36-7.36l-2.12 2.12M8.76 15.24l-2.12 2.12m12.72 0l-2.12-2.12M8.76 8.76L6.64 6.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>Settings</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="sme-content-area">
          {/* User Bar */}
          <div className="sme-user-bar">
            <div className="sme-user-info">
              <div className="sme-user-avatar-small"></div>
              <span className="sme-user-name">{smeName}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="#909090" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="sme-user-actions">
              <div className="sme-user-search">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#909090" strokeWidth="2"/>
                  <path d="M20 20l-4-4" stroke="#909090" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Search</span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" stroke="#909090" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="sme-welcome-section">
            <div className="sme-welcome-text">
              <h1>Hi, {smeName}!</h1>
              <p className="sme-subtitle">Project Management</p>
            </div>
            <button className="sme-filter-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Filter
            </button>
          </div>

          {/* Main Content */}
          <div className="sme-main-content">
            {/* Stats Row */}
            <div className="sme-stats-row">
              <div className="sme-stat-box">
                <svg className="sme-stat-box-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" stroke="#8B5CF6" strokeWidth="2"/>
                  <rect x="14" y="3" width="7" height="7" stroke="#8B5CF6" strokeWidth="2"/>
                  <rect x="3" y="14" width="7" height="7" stroke="#8B5CF6" strokeWidth="2"/>
                  <rect x="14" y="14" width="7" height="7" stroke="#8B5CF6" strokeWidth="2"/>
                </svg>
                <span className="sme-stat-box-label">Projects Accepted</span>
                <span className="sme-stat-box-value">15/20</span>
                <span className="sme-stat-box-link">See all</span>
              </div>

              <div className="sme-stat-box">
                <svg className="sme-stat-box-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18" stroke="#10B981" strokeWidth="2"/>
                  <path d="M7 16l4-4 3 3 6-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="sme-stat-box-label">Projects In Progress</span>
                <span className="sme-stat-box-value">95%</span>
                <span className="sme-stat-box-link">See all</span>
              </div>

              <div className="sme-stat-box">
                <svg className="sme-stat-box-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#F59E0B" strokeWidth="2"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#F59E0B" strokeWidth="2"/>
                </svg>
                <span className="sme-stat-box-label">Projects Declined</span>
                <span className="sme-stat-box-value">5 projects</span>
                <span className="sme-stat-box-link">See all</span>
              </div>
            </div>

            {/* Priority Project Section */}
            <div className="sme-section">
              <div className="sme-section-header">
                <h3 className="sme-section-title">Priority Project</h3>
                <span className="sme-see-all">See all</span>
              </div>
              <div className="sme-priority-cards">
                <div className="sme-priority-card">
                  <span className="sme-priority-badge sme-priority-high">High Priority</span>
                  <h4 className="sme-priority-title">Create user flow for Finance App</h4>
                  <span className="sme-priority-project-name">on Flazz project</span>
                  <span className="sme-priority-tag">Research</span>
                  <span className="sme-priority-status">50% done</span>
                  <span className="sme-priority-due">Due: December 15th, 2023</span>
                  <div className="sme-priority-avatars">
                    <div className="sme-priority-avatar"></div>
                    <div className="sme-priority-avatar"></div>
                    <div className="sme-priority-avatar"></div>
                  </div>
                  <div className="sme-priority-progress-bar">
                    <div className="sme-priority-progress-fill" style={{width: '50%'}}></div>
                  </div>
                  <div className="sme-priority-line sme-line-red"></div>
                </div>

                <div className="sme-priority-card">
                  <span className="sme-priority-badge sme-priority-med">Med Priority</span>
                  <h4 className="sme-priority-title">App usability testing with Maze</h4>
                  <span className="sme-priority-project-name">on Hour project</span>
                  <span className="sme-priority-tag">Research</span>
                  <span className="sme-priority-status-gray">Not started yet</span>
                  <span className="sme-priority-due">Due: January 21st, 2024</span>
                  <div className="sme-priority-avatars">
                    <div className="sme-priority-avatar"></div>
                    <div className="sme-priority-avatar"></div>
                  </div>
                  <div className="sme-priority-progress-bar">
                    <div className="sme-priority-progress-fill" style={{width: '0%'}}></div>
                  </div>
                  <div className="sme-priority-line sme-line-yellow"></div>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks Section */}
            <div className="sme-section">
              <div className="sme-section-header">
                <h3 className="sme-section-title">Upcoming Tasks</h3>
                <span className="sme-see-all">See all</span>
              </div>
              <div className="sme-task-grid">
                <div className="sme-task-item">
                  <span className="sme-task-time sme-task-time-red">Today, 10.00am</span>
                  <h4 className="sme-task-item-title">Analytic dashboard design</h4>
                  <span className="sme-task-item-project">on Circles project</span>
                </div>
                <div className="sme-task-item">
                  <span className="sme-task-time sme-task-time-red">Today, 15.00pm</span>
                  <h4 className="sme-task-item-title">Contact us section on landing page</h4>
                  <span className="sme-task-item-project">on Circles project</span>
                </div>
                <div className="sme-task-item">
                  <span className="sme-task-time sme-task-time-orange">Tomorrow, 09.00am</span>
                  <h4 className="sme-task-item-title">Design references for the App</h4>
                  <span className="sme-task-item-project">on Circles project</span>
                </div>
                <div className="sme-task-item">
                  <span className="sme-task-time sme-task-time-blue">Dec 15th, 10.00am</span>
                  <h4 className="sme-task-item-title">Wireframe for admin dashboard</h4>
                  <span className="sme-task-item-project">on Rewatch project</span>
                </div>
                <div className="sme-task-item">
                  <span className="sme-task-time sme-task-time-blue">Dec 15th, 12.00pm</span>
                  <h4 className="sme-task-item-title">Create project style guide and components</h4>
                  <span className="sme-task-item-project">on Rewatch project</span>
                </div>
                <div className="sme-task-item">
                  <span className="sme-task-time sme-task-time-orange">Dec 15th, 18.00pm</span>
                  <h4 className="sme-task-item-title">Visual assets for hero section</h4>
                  <span className="sme-task-item-project">on Rewatch project</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="sme-right-sidebar">
          <div className="sme-sidebar-user">
            <div className="sme-sidebar-avatar"></div>
            <div className="sme-sidebar-user-info">
              <span className="sme-sidebar-name">Ananda Faris</span>
              <span className="sme-sidebar-role">Premium Account</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="#909090" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Projects Section */}
          <div className="sme-sidebar-section">
            <h4>Projects</h4>
            <div className="sme-sidebar-items">
              <div className="sme-sidebar-item">
                <div className="sme-project-icon"></div>
                <div>
                  <p className="sme-item-title">Flazz</p>
                  <p className="sme-item-subtitle">9 members</p>
                </div>
              </div>
              <div className="sme-sidebar-item">
                <div className="sme-project-icon"></div>
                <div>
                  <p className="sme-item-title">Hour</p>
                  <p className="sme-item-subtitle">8 members</p>
                </div>
              </div>
              <div className="sme-sidebar-item">
                <div className="sme-project-icon"></div>
                <div>
                  <p className="sme-item-title">Circles</p>
                  <p className="sme-item-subtitle">5 members</p>
                </div>
              </div>
            </div>
          </div>

          {/* Friends Section */}
          <div className="sme-sidebar-section">
            <h4>Friends</h4>
            <div className="sme-sidebar-items">
              <div className="sme-sidebar-item">
                <div className="sme-friend-avatar"></div>
                <div>
                  <p className="sme-item-title">Jenny Wilson</p>
                  <p className="sme-item-subtitle">UX Researcher</p>
                </div>
              </div>
              <div className="sme-sidebar-item">
                <div className="sme-friend-avatar"></div>
                <div>
                  <p className="sme-item-title">Robert Fox</p>
                  <p className="sme-item-subtitle">UX Designer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div className="sme-sidebar-section">
            <h4>Activities</h4>
            <div className="sme-sidebar-items">
              <div className="sme-activity-item">
                <div className="sme-activity-avatar"></div>
                <div className="sme-activity-content">
                  <p>Just finished a task App Wireframe</p>
                  <span>3 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMEHomepage;
