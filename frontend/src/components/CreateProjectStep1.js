import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProjectStep1.css';

const CreateProjectStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    locationCity: '',
    locationCountry: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    // Store data in sessionStorage to pass to next step
    sessionStorage.setItem('projectStep1', JSON.stringify(formData));
    navigate('/create-project/step2');
  };

  const handleBack = () => {
    navigate('/projects');
  };

  return (
    <div className="create-project-container">
      {/* Top Navigation Bar */}
      <div className="create-project-top-bar">
        <div className="create-project-logo-section">
          <img src="/agrinet-logo-new.svg" alt="Agrinet Logo" className="create-project-logo-img" />
          <span className="create-project-logo-text">Agrinet</span>
        </div>
        <div className="create-project-menu">
          <span className="create-project-menu-item">Tools</span>
          <span className="create-project-menu-item">Company</span>
          <span className="create-project-menu-item">About Us</span>
          <span className="create-project-menu-item">Pricing</span>
          <span className="create-project-menu-item">Support</span>
        </div>
        <div className="create-project-search-container">
          <input type="text" placeholder=" Search Company" className="create-project-search-input" />
          <button className="create-project-search-button"></button>
        </div>
        <img src="/notification-icon.svg" alt="Notifications" className="create-project-notification-icon" />
        <div className="create-project-profile-pic"></div>
      </div>

      {/* Left Sidebar */}
      <div className="create-project-left-sidebar">
        <div className="create-project-nav-section">
          <div className="create-project-nav-item" onClick={() => navigate('/sme-home')}>
            <div className="create-project-nav-icon"></div>
            <span>Home</span>
          </div>
          <div className="create-project-nav-item create-project-nav-item-active" onClick={() => navigate('/projects')}>
            <div className="create-project-nav-icon"></div>
            <span>Project</span>
          </div>
          <div className="create-project-nav-item">
            <div className="create-project-nav-icon"></div>
            <span>Tasks</span>
          </div>
          <div className="create-project-nav-item">
            <div className="create-project-nav-icon"></div>
            <span>Work Logs</span>
          </div>
          <div className="create-project-nav-item">
            <div className="create-project-nav-icon"></div>
            <span>Performance</span>
          </div>
          <div className="create-project-nav-item">
            <div className="create-project-nav-icon"></div>
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="create-project-main-content">
        <div className="create-project-form-wrapper">
          <h1 className="create-project-main-title">Project Creation for SME</h1>
          <p className="create-project-subtitle">
            Please fill the form below to create your project. Feel free to add as much detail as needed.
          </p>

          <div className="create-project-divider"></div>

          {/* Form Card */}
          <div className="create-project-form-card">
            {/* Progress Indicator */}
            <div className="create-project-progress-wrapper">
              <div className="create-project-progress-bar">
                <div className="create-project-progress-fill"></div>
              </div>
              <div className="create-project-progress-steps">
                <div className="create-project-step-circle create-project-step-active">1</div>
                <div className="create-project-step-circle">2</div>
                <div className="create-project-step-circle">3</div>
                <div className="create-project-step-circle">4</div>
              </div>
            </div>

            {/* Form Section */}
            <div className="create-project-form-section">
              <h2 className="create-project-section-title">Project details</h2>
              <p className="create-project-section-subtitle">Enter the basic information of your project</p>

              <div className="create-project-form-grid">
                <div className="create-project-form-group">
                  <label className="create-project-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Project Launching"
                    className="create-project-input"
                  />
                </div>

                <div className="create-project-form-group">
                  <label className="create-project-label">Location City</label>
                  <input
                    type="text"
                    name="locationCity"
                    value={formData.locationCity}
                    onChange={handleChange}
                    placeholder="New York"
                    className="create-project-input"
                  />
                </div>

                <div className="create-project-form-group">
                  <label className="create-project-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of your project"
                    className="create-project-input"
                  />
                </div>

                <div className="create-project-form-group">
                  <label className="create-project-label">Location Country</label>
                  <input
                    type="text"
                    name="locationCountry"
                    value={formData.locationCountry}
                    onChange={handleChange}
                    placeholder="USA"
                    className="create-project-input"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="create-project-actions">
              <button className="create-project-btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button className="create-project-btn-primary" onClick={handleNext}>
                Next step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectStep1;
