import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProjectProfileNew.css';

const ProjectProfileNew = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleBrowseAgencies = (projectId) => {
    navigate(`/recommend/${projectId}`);
  };

  const handleHomeClick = () => {
    navigate('/sme-home');
  };

  const handleCreateProject = () => {
    navigate('/create-project/step1');
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="project-profile-container">
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-profile-container">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="project-profile-container">
      {/* Top Navigation Bar */}
      <div className="project-top-bar">
        <div className="project-logo-section">
          <img src="/agrinet-logo-new.svg" alt="Agrinet Logo" className="project-logo-img" />
          <span className="project-logo-text">Agrinet</span>
        </div>
        <div className="project-menu">
          <span className="project-menu-item">Tools</span>
          <span className="project-menu-item">Company</span>
          <span className="project-menu-item">About Us</span>
          <span className="project-menu-item">Pricing</span>
          <span className="project-menu-item">Support</span>
        </div>
        <div className="project-search-container">
          <input type="text" placeholder=" Search Company" className="project-search-input" />
          <button className="project-search-button"></button>
        </div>
        <img src="/notification-icon.svg" alt="Notifications" className="project-notification-icon" />
        <div className="project-profile-pic"></div>
      </div>

      {/* Dashboard Container */}
      <div className="project-dashboard-container">
        {/* Left Sidebar */}
        <div className="project-left-sidebar">
          <div className="project-nav-section">
            <div className="project-nav-item" onClick={handleHomeClick}>
              <div className="project-nav-icon"></div>
              <span>Home</span>
            </div>
            <div className="project-nav-item project-nav-item-active">
              <div className="project-nav-icon"></div>
              <span>Project</span>
            </div>
            <div className="project-nav-item">
              <div className="project-nav-icon"></div>
              <span>Tasks</span>
            </div>
            <div className="project-nav-item">
              <div className="project-nav-icon"></div>
              <span>Work Logs</span>
            </div>
            <div className="project-nav-item">
              <div className="project-nav-icon"></div>
              <span>Performance</span>
            </div>
            <div className="project-nav-item">
              <div className="project-nav-icon"></div>
              <span>Settings</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="project-main-content">
          {/* Projects Heading with CREATE Button */}
          <div className="project-heading-wrapper">
            <h1 className="project-heading">Projects</h1>
            <button className="project-create-button" onClick={handleCreateProject}>CREATE</button>
          </div>

          {/* Stats Cards */}
          <div className="project-stats-row">
            <div className="project-stat-card">
              <div className="project-stat-header">
                <div className="project-stat-icon project-stat-icon-accepted"></div>
                <span className="project-stat-label">Projects Accepted</span>
              </div>
              <div className="project-stat-value">15/20</div>
              <div className="project-stat-link">See all</div>
            </div>

            <div className="project-stat-card">
              <div className="project-stat-header">
                <div className="project-stat-icon project-stat-icon-progress"></div>
                <span className="project-stat-label">Projects In Progress</span>
              </div>
              <div className="project-stat-value project-stat-value-large">95%</div>
              <div className="project-stat-link">See all</div>
            </div>

            <div className="project-stat-card">
              <div className="project-stat-header">
                <div className="project-stat-icon project-stat-icon-declined"></div>
                <span className="project-stat-label">Projects Declined</span>
              </div>
              <div className="project-stat-value">5 projects</div>
              <div className="project-stat-link">See all</div>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="project-cards-grid">
            {currentProjects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-card-header-wrapper">
                  <div className="project-card-header">
                    <h3 className="project-card-title">{project.title}</h3>
                    <button className="project-card-choose-button" onClick={() => handleBrowseAgencies(project._id)}>
                      Choose
                    </button>
                  </div>
                </div>
                
                <div className="project-card-divider"></div>
                
                <div className="project-card-content">
                  <div className="project-card-footer">
                    <div className="project-card-info-section">
                      <div className="project-card-info">
                        <span className="project-card-info-label">Services:</span>
                        <span className="project-card-info-value">{project.needed_services.join(', ')}</span>
                      </div>
                      <div className="project-card-info">
                        <span className="project-card-info-label">Budget:</span>
                        <span className="project-card-info-value">${project.budget_min.toLocaleString()} - ${project.budget_max.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className={`project-card-status project-card-status-${project.status}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="project-pagination">
            <span 
              className="project-pagination-text" 
              onClick={handlePreviousPage}
              style={{ cursor: currentPage === 1 ? 'default' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              Previous
            </span>
            {[...Array(Math.min(totalPages, 3))].map((_, idx) => (
              <div
                key={idx + 1}
                className={`project-pagination-number ${currentPage === idx + 1 ? 'project-pagination-active' : ''}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </div>
            ))}
            <span 
              className="project-pagination-text"
              onClick={handleNextPage}
              style={{ cursor: currentPage === totalPages ? 'default' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Next
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProfileNew;
