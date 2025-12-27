import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProjectStep2.css';

function CreateProjectStep2() {
  const navigate = useNavigate();
  
  // Services list with icons
  const servicesList = [
    { name: 'SEO', icon: 'search' },
    { name: 'Social Media', icon: 'share' },
    { name: 'Content Marketing', icon: 'content' },
    { name: 'PPC', icon: 'click' },
    { name: 'Web Design', icon: 'design' },
    { name: 'E-commerce Dev', icon: 'cart' },
    { name: 'Brand Strategy', icon: 'target' },
    { name: 'Email Marketing', icon: 'email' }
  ];

  // Form state
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState('');

  // Load data from sessionStorage on mount
  useEffect(() => {
    const step2Data = sessionStorage.getItem('projectStep2');
    if (step2Data) {
      const parsedData = JSON.parse(step2Data);
      setSelectedServices(parsedData.selectedServices || []);
    }
  }, []);

  // Toggle service selection
  const handleServiceToggle = (serviceName) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceName)) {
        return prev.filter(s => s !== serviceName);
      } else {
        return [...prev, serviceName];
      }
    });
    setError(''); // Clear error when user makes selection
  };

  // Navigate back to step 1
  const handleBack = () => {
    navigate('/create-project/step1');
  };

  // Validate and proceed to step 3
  const handleNext = () => {
    if (selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }

    // Save to sessionStorage
    sessionStorage.setItem('projectStep2', JSON.stringify({ selectedServices }));
    
    // Navigate to step 3
    navigate('/create-project/step3');
  };

  // Handle home navigation
  const handleHomeClick = () => {
    navigate('/sme-home');
  };

  // Handle project navigation
  const handleProjectClick = () => {
    navigate('/projects');
  };

  return (
    <div className="create-project-step2-container">
      {/* Top Bar */}
      <div className="create-project-step2-top-bar">
        <div className="create-project-step2-logo-section">
          <div className="create-project-step2-logo-icon"></div>
          <span className="create-project-step2-logo-text">Agrinet</span>
        </div>
        <div className="create-project-step2-menu">
          <span>Tools</span>
          <span>Company</span>
          <span>About Us</span>
          <span>Pricing</span>
          <span>Support</span>
        </div>
        <div className="create-project-step2-search-container">
          <div className="create-project-step2-search-input">
            <span className="create-project-step2-search-placeholder">Search Company</span>
          </div>
          <div className="create-project-step2-search-button">
            <div className="create-project-step2-search-icon"></div>
          </div>
        </div>
        <div className="create-project-step2-notification-icon"></div>
        <div className="create-project-step2-profile-pic"></div>
      </div>

      {/* Left Sidebar */}
      <div className="create-project-step2-sidebar">
        <div className="create-project-step2-nav-item" onClick={handleHomeClick}>
          <div className="create-project-step2-nav-icon create-project-step2-home-icon"></div>
          <span>Home</span>
        </div>
        <div className="create-project-step2-nav-item create-project-step2-nav-item-active" onClick={handleProjectClick}>
          <div className="create-project-step2-nav-icon create-project-step2-project-icon"></div>
          <span>Project</span>
        </div>
        <div className="create-project-step2-nav-item">
          <div className="create-project-step2-nav-icon create-project-step2-tasks-icon"></div>
          <span>Tasks</span>
        </div>
        <div className="create-project-step2-nav-item">
          <div className="create-project-step2-nav-icon create-project-step2-logs-icon"></div>
          <span>Work Logs</span>
        </div>
        <div className="create-project-step2-nav-item">
          <div className="create-project-step2-nav-icon create-project-step2-performance-icon"></div>
          <span>Performance</span>
        </div>
        <div className="create-project-step2-nav-item">
          <div className="create-project-step2-nav-icon create-project-step2-settings-icon"></div>
          <span>Settings</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="create-project-step2-main">
        <div className="create-project-step2-header">
          <h1 className="create-project-step2-title">Project Creation for SME</h1>
          <p className="create-project-step2-subtitle">
            Please fill the form below to create your project. Feel free to add as much detail as needed.
          </p>
        </div>

        <div className="create-project-step2-divider"></div>

        <div className="create-project-step2-form-card">
          {/* Progress Indicator */}
          <div className="create-project-step2-progress-container">
            <div className="create-project-step2-progress-bar">
              <div className="create-project-step2-progress-fill" style={{ width: '50%' }}></div>
            </div>
            <div className="create-project-step2-progress-steps">
              <div className="create-project-step2-step create-project-step2-step-completed">
                <div className="create-project-step2-step-circle">1</div>
              </div>
              <div className="create-project-step2-step create-project-step2-step-active">
                <div className="create-project-step2-step-circle">2</div>
              </div>
              <div className="create-project-step2-step">
                <div className="create-project-step2-step-circle">3</div>
              </div>
              <div className="create-project-step2-step">
                <div className="create-project-step2-step-circle">4</div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="create-project-step2-form-section">
            <h2 className="create-project-step2-form-title">Needed Services</h2>
            <p className="create-project-step2-form-description">
              Please select which service that are required.
            </p>

            {error && <div className="create-project-step2-error">{error}</div>}

            <div className="create-project-step2-services-grid">
              {servicesList.map((service, index) => (
                <div 
                  key={index}
                  className={`create-project-step2-service-option ${
                    selectedServices.includes(service.name) ? 'create-project-step2-service-selected' : ''
                  }`}
                  onClick={() => handleServiceToggle(service.name)}
                >
                  <div className="create-project-step2-service-icon-wrapper">
                    <div className={`create-project-step2-service-icon create-project-step2-icon-${service.icon}`}>
                      {selectedServices.includes(service.name) && (
                        <div className="create-project-step2-checkmark-overlay">✓</div>
                      )}
                    </div>
                  </div>
                  <span className="create-project-step2-service-label">{service.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="create-project-step2-form-divider"></div>

          {/* Action Buttons */}
          <div className="create-project-step2-actions">
            <button className="create-project-step2-btn-secondary" onClick={handleBack}>
              Previous step
            </button>
            <button className="create-project-step2-btn-primary" onClick={handleNext}>
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectStep2;
