import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SMEHomepageNew.css';

function SMEHomepageNew() {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate('/projects');
  };

  return (
    <div className="sme-homepage">
      {/* Top Navigation Bar */}
      <header className="sme-top-bar">
        <div className="sme-top-left">
          <div className="sme-logo-section">
            <img src="/agrinet-logo-new.svg" alt="Agrinet" className="sme-logo-img" />
            <span className="sme-logo-text">Agrinet</span>
          </div>
          <nav className="sme-top-menu">
            <a href="#" className="sme-menu-link">Tools</a>
            <a href="#" className="sme-menu-link">Company</a>
            <a href="#" className="sme-menu-link">About Us</a>
            <a href="#" className="sme-menu-link">Pricing</a>
            <a href="#" className="sme-menu-link">Support</a>
          </nav>
        </div>
        <div className="sme-top-right">
          <div className="sme-search-container">
            <input type="text" className="sme-search-input" placeholder=" Search Company" />
            <div className="sme-search-button">
              <img src="/search-icon.svg" alt="Search" />
            </div>
          </div>
          <img src="/notification-icon.svg" alt="Notifications" className="sme-notification-bell" />
          <div className="sme-profile-pic"></div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <div className="sme-dashboard-container">
        {/* Left Sidebar */}
        <aside className="sme-left-sidebar">
          <div className="sme-sidebar-nav">
            <div className="sme-nav-item active">
              <div className="sme-nav-icon"></div>
              <span>Home</span>
            </div>
            <div className="sme-nav-item" onClick={handleProjectClick}>
              <div className="sme-nav-icon"></div>
              <span>Project</span>
            </div>
            <div className="sme-nav-item">
              <div className="sme-nav-icon"></div>
              <span>Tasks</span>
            </div>
            <div className="sme-nav-item">
              <div className="sme-nav-icon"></div>
              <span>Work Logs</span>
            </div>
            <div className="sme-nav-item">
              <div className="sme-nav-icon"></div>
              <span>Performance</span>
            </div>
            <div className="sme-nav-item">
              <div className="sme-nav-icon"></div>
              <span>Settings</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="sme-main-content">
          {/* User Bar at top of main content */}
          <div className="sme-user-bar">
            <div className="sme-user-left">
              <div className="sme-user-avatar-pic"></div>
              <div className="sme-user-name-section">
                <span className="sme-user-name-text">SME Name</span>
                <img src="/arrow-down-2.svg" alt="dropdown" className="sme-dropdown-arrow" />
              </div>
            </div>
            <div className="sme-user-right">
              <div className="sme-search-box">
                <span className="sme-search-text">Search</span>
                <img src="/search-icon.svg" alt="Search" className="sme-search-icon-small" />
              </div>
              <img src="/notification-icon-2.svg" alt="Notification" className="sme-notif-icon" />
            </div>
          </div>

          {/* Welcome Section with Filter */}
          <div className="sme-welcome-section">
            <div className="sme-welcome-left">
              <h1 className="sme-welcome-heading">Hi, SME Name!</h1>
              <p className="sme-welcome-subheading">Project Management</p>
            </div>
            <button className="sme-filter-button">
              <img src="/filter-icon.svg" alt="Filter" />
              <span>Filter</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="sme-stats-row">
            <div className="sme-stat-card">
              <div className="sme-stat-header">
                <img src="/task-square-icon.svg" alt="Tasks" className="sme-stat-icon" />
                <span className="sme-stat-label">Projects Accepted</span>
              </div>
              <div className="sme-stat-value">15/20</div>
              <a href="#" className="sme-stat-link">See all</a>
            </div>

            <div className="sme-stat-card">
              <div className="sme-stat-header">
                <img src="/status-up-icon.svg" alt="Status" className="sme-stat-icon" />
                <span className="sme-stat-label">Projects In Progress</span>
              </div>
              <div className="sme-stat-value large">95%</div>
              <a href="#" className="sme-stat-link">See all</a>
            </div>

            <div className="sme-stat-card">
              <div className="sme-stat-header">
                <img src="/document-code-icon.svg" alt="Documents" className="sme-stat-icon" />
                <span className="sme-stat-label">Projects Declined</span>
              </div>
              <div className="sme-stat-value">5 projects</div>
              <a href="#" className="sme-stat-link">See all</a>
            </div>
          </div>

          {/* Priority Projects Section */}
          <div className="sme-priority-section">
            <div className="sme-section-header">
              <h2 className="sme-section-title">Priority Project</h2>
              <a href="#" className="sme-section-link">See all</a>
            </div>
            <div className="sme-priority-cards">
              <div className="sme-priority-card">
                <div className="sme-priority-badge high">High Priority</div>
                <div className="sme-priority-vertical-line red"></div>
                <h3 className="sme-priority-title">Create user flow for Finance App</h3>
                <p className="sme-priority-subtitle">on Flazz project</p>
                <div className="sme-priority-tag">Research</div>
                <div className="sme-priority-progress-bar">
                  <div className="sme-progress-fill" style={{ width: '50%' }}></div>
                </div>
                <div className="sme-priority-footer">
                  <span className="sme-priority-done">50% done</span>
                  <span className="sme-priority-due">Due: December 15th, 2023</span>
                </div>
              </div>

              <div className="sme-priority-card">
                <div className="sme-priority-badge medium">Med Priority</div>
                <div className="sme-priority-vertical-line yellow"></div>
                <h3 className="sme-priority-title">App usability testing with Maze</h3>
                <p className="sme-priority-subtitle">on Hour project</p>
                <div className="sme-priority-tag">Research</div>
                <div className="sme-priority-progress-bar"></div>
                <div className="sme-priority-footer">
                  <span className="sme-priority-done">Not started yet</span>
                  <span className="sme-priority-due">Due: January 21st, 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks Section */}
          <div className="sme-tasks-section">
            <div className="sme-section-header">
              <h2 className="sme-section-title">Upcoming Tasks</h2>
              <a href="#" className="sme-section-link">See all</a>
            </div>
            <div className="sme-tasks-grid">
              <div className="sme-task-card">
                <h4 className="sme-task-title">Analytic dashboard design</h4>
                <p className="sme-task-project">on Circles project</p>
                <div className="sme-task-badge red">Today, 10.00am</div>
              </div>

              <div className="sme-task-card">
                <h4 className="sme-task-title">Contact us section on landing page</h4>
                <p className="sme-task-project">on Circles project</p>
                <div className="sme-task-badge red">Today, 15.00pm</div>
              </div>

              <div className="sme-task-card">
                <h4 className="sme-task-title">Design references for the App</h4>
                <p className="sme-task-project">on Circles project</p>
                <div className="sme-task-badge orange">Tomorrow, 09.00am</div>
              </div>

              <div className="sme-task-card">
                <h4 className="sme-task-title">Wireframe for admin dashboard</h4>
                <p className="sme-task-project">on Rewatch project</p>
                <div className="sme-task-badge blue">Dec 15th, 10.00am</div>
              </div>

              <div className="sme-task-card">
                <h4 className="sme-task-title">Create project style guide and components</h4>
                <p className="sme-task-project">on Rewatch project</p>
                <div className="sme-task-badge blue">Dec 15th, 12.00pm</div>
              </div>

              <div className="sme-task-card">
                <h4 className="sme-task-title">Visual assets for hero section</h4>
                <p className="sme-task-project">on Rewatch project</p>
                <div className="sme-task-badge blue">Dec 15th, 18.00pm</div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="sme-right-sidebar">
          <div className="sme-profile-section">
            <div className="sme-profile-avatar"></div>
            <div className="sme-profile-info">
              <div className="sme-profile-name">Ananda Faris</div>
              <div className="sme-profile-status">Premium Account</div>
            </div>
            <img src="/arrow-down.svg" alt="dropdown" className="sme-profile-dropdown" />
          </div>

          <div className="sme-projects-section">
            <h3 className="sme-sidebar-title">Projects</h3>
            <div className="sme-project-list">
              <div className="sme-project-item">
                <div className="sme-project-icon"></div>
                <div className="sme-project-details">
                  <div className="sme-project-name">Flazz</div>
                  <div className="sme-project-members">9 members</div>
                </div>
              </div>
              <div className="sme-project-item">
                <div className="sme-project-icon"></div>
                <div className="sme-project-details">
                  <div className="sme-project-name">Hour</div>
                  <div className="sme-project-members">8 members</div>
                </div>
              </div>
              <div className="sme-project-item">
                <div className="sme-project-icon"></div>
                <div className="sme-project-details">
                  <div className="sme-project-name">Circles</div>
                  <div className="sme-project-members">5 members</div>
                </div>
              </div>
              <div className="sme-project-item">
                <div className="sme-project-icon"></div>
                <div className="sme-project-details">
                  <div className="sme-project-name">Rewatch</div>
                  <div className="sme-project-members">10 members</div>
                </div>
              </div>
              <div className="sme-project-item">
                <div className="sme-project-icon"></div>
                <div className="sme-project-details">
                  <div className="sme-project-name">Layers</div>
                  <div className="sme-project-members">7 members</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sme-friends-section">
            <h3 className="sme-sidebar-title">Friends</h3>
            <div className="sme-friend-list">
              <div className="sme-friend-item">
                <div className="sme-friend-avatar"></div>
                <div className="sme-friend-details">
                  <div className="sme-friend-name">Jenny Wilson</div>
                  <div className="sme-friend-role">UX Researcher</div>
                </div>
              </div>
              <div className="sme-friend-item">
                <div className="sme-friend-avatar"></div>
                <div className="sme-friend-details">
                  <div className="sme-friend-name">Robert Fox</div>
                  <div className="sme-friend-role">UX Designer</div>
                </div>
              </div>
              <div className="sme-friend-item">
                <div className="sme-friend-avatar"></div>
                <div className="sme-friend-details">
                  <div className="sme-friend-name">Cody Fisher</div>
                  <div className="sme-friend-role">Product Manager</div>
                </div>
              </div>
              <div className="sme-friend-item">
                <div className="sme-friend-avatar"></div>
                <div className="sme-friend-details">
                  <div className="sme-friend-name">Wade Warren</div>
                  <div className="sme-friend-role">Visual Designer</div>
                </div>
              </div>
              <div className="sme-friend-item">
                <div className="sme-friend-avatar"></div>
                <div className="sme-friend-details">
                  <div className="sme-friend-name">Dianne Russell</div>
                  <div className="sme-friend-role">UX Writer</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sme-activities-section">
            <h3 className="sme-sidebar-title">Activites</h3>
            <div className="sme-activity-list">
              <div className="sme-activity-item">
                <div className="sme-activity-avatar"></div>
                <div className="sme-activity-content">
                  <div className="sme-activity-text">Just finished a task App Wireframe</div>
                  <div className="sme-activity-time">3 minutes ago</div>
                </div>
              </div>
              <div className="sme-activity-item">
                <div className="sme-activity-avatar"></div>
                <div className="sme-activity-content">
                  <div className="sme-activity-text">Just finished a task Secondary Conduct Research</div>
                  <div className="sme-activity-time">3 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SMEHomepageNew;
