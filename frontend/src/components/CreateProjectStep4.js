import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateProjectStep4.css';

function CreateProjectStep4() {
  const navigate = useNavigate();

  // Collected data from previous steps
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    locationCity: '',
    locationCountry: '',
    selectedServices: [],
    budgetMin: 0,
    budgetMax: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Load all data from sessionStorage on mount
  useEffect(() => {
    const step1Data = sessionStorage.getItem('projectStep1');
    const step2Data = sessionStorage.getItem('projectStep2');
    const step3Data = sessionStorage.getItem('projectStep3');

    if (step1Data && step2Data && step3Data) {
      const parsedStep1 = JSON.parse(step1Data);
      const parsedStep2 = JSON.parse(step2Data);
      const parsedStep3 = JSON.parse(step3Data);

      setProjectData({
        name: parsedStep1.name || '',
        description: parsedStep1.description || '',
        locationCity: parsedStep1.locationCity || '',
        locationCountry: parsedStep1.locationCountry || '',
        selectedServices: parsedStep2.selectedServices || [],
        budgetMin: parsedStep3.budgetMin || 0,
        budgetMax: parsedStep3.budgetMax || 0
      });
    } else {
      // If any step data is missing, redirect to step 1
      navigate('/create-project/step1');
    }
  }, [navigate]);

  // Navigate back to step 3
  const handleBack = () => {
    navigate('/create-project/step3');
  };

  // Submit project to backend
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      // Prepare data for backend
      const projectPayload = {
        title: projectData.name,
        description: projectData.description,
        needed_services: projectData.selectedServices,
        budget_min: projectData.budgetMin,
        budget_max: projectData.budgetMax,
        location_city: projectData.locationCity,
        location_country: projectData.locationCountry,
        status: 'open'
      };

      // Make API call to create project
      const response = await axios.post('http://localhost:5000/api/projects', projectPayload);

      // Clear sessionStorage after successful submission
      sessionStorage.removeItem('projectStep1');
      sessionStorage.removeItem('projectStep2');
      sessionStorage.removeItem('projectStep3');

      // Navigate to projects page
      navigate('/projects');
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.message || 'Failed to create project. Please try again.');
      setIsSubmitting(false);
    }
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
    <div className="create-project-step4-container">
      {/* Top Bar */}
      <div className="create-project-step4-top-bar">
        <div className="create-project-step4-logo-section">
          <div className="create-project-step4-logo-icon"></div>
          <span className="create-project-step4-logo-text">Agrinet</span>
        </div>
        <div className="create-project-step4-menu">
          <span>Tools</span>
          <span>Company</span>
          <span>About Us</span>
          <span>Pricing</span>
          <span>Support</span>
        </div>
        <div className="create-project-step4-search-container">
          <div className="create-project-step4-search-input">
            <span className="create-project-step4-search-placeholder">Search Company</span>
          </div>
          <div className="create-project-step4-search-button">
            <div className="create-project-step4-search-icon"></div>
          </div>
        </div>
        <div className="create-project-step4-notification-icon"></div>
        <div className="create-project-step4-profile-pic"></div>
      </div>

      {/* Left Sidebar */}
      <div className="create-project-step4-sidebar">
        <div className="create-project-step4-nav-item" onClick={handleHomeClick}>
          <div className="create-project-step4-nav-icon create-project-step4-home-icon"></div>
          <span>Home</span>
        </div>
        <div className="create-project-step4-nav-item create-project-step4-nav-item-active" onClick={handleProjectClick}>
          <div className="create-project-step4-nav-icon create-project-step4-project-icon"></div>
          <span>Project</span>
        </div>
        <div className="create-project-step4-nav-item">
          <div className="create-project-step4-nav-icon create-project-step4-tasks-icon"></div>
          <span>Tasks</span>
        </div>
        <div className="create-project-step4-nav-item">
          <div className="create-project-step4-nav-icon create-project-step4-logs-icon"></div>
          <span>Work Logs</span>
        </div>
        <div className="create-project-step4-nav-item">
          <div className="create-project-step4-nav-icon create-project-step4-performance-icon"></div>
          <span>Performance</span>
        </div>
        <div className="create-project-step4-nav-item">
          <div className="create-project-step4-nav-icon create-project-step4-settings-icon"></div>
          <span>Settings</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="create-project-step4-main">
        <div className="create-project-step4-header">
          <h1 className="create-project-step4-title">Project Creation for SME</h1>
          <p className="create-project-step4-subtitle">
            Please fill the form below to create your project. Feel free to add as much detail as needed.
          </p>
        </div>

        <div className="create-project-step4-divider"></div>

        <div className="create-project-step4-form-card">
          {/* Progress Indicator */}
          <div className="create-project-step4-progress-container">
            <div className="create-project-step4-progress-bar">
              <div className="create-project-step4-progress-fill" style={{ width: '100%' }}></div>
            </div>
            <div className="create-project-step4-progress-steps">
              <div className="create-project-step4-step create-project-step4-step-completed">
                <div className="create-project-step4-step-circle">1</div>
              </div>
              <div className="create-project-step4-step create-project-step4-step-completed">
                <div className="create-project-step4-step-circle">2</div>
              </div>
              <div className="create-project-step4-step create-project-step4-step-completed">
                <div className="create-project-step4-step-circle">3</div>
              </div>
              <div className="create-project-step4-step create-project-step4-step-active">
                <div className="create-project-step4-step-circle">4</div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="create-project-step4-form-section">
            <div className="create-project-step4-success-icon">
              <svg viewBox="0 0 120 120" className="create-project-step4-checkmark-svg">
                <circle cx="60" cy="60" r="54" fill="rgba(98, 137, 73, 0.15)" />
                <path d="M35 60 L52 77 L85 44" stroke="#628949" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h2 className="create-project-step4-form-title">Submit your project request</h2>
            <p className="create-project-step4-form-description">
              Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project approval in 24 - 48 hours.
            </p>

            {error && (
              <div className="create-project-step4-error">{error}</div>
            )}

            {/* Review Summary */}
            <div className="create-project-step4-review-summary">
              <div className="create-project-step4-review-item">
                <span className="create-project-step4-review-label">Project Name:</span>
                <span className="create-project-step4-review-value">{projectData.name}</span>
              </div>
              <div className="create-project-step4-review-item">
                <span className="create-project-step4-review-label">Description:</span>
                <span className="create-project-step4-review-value">{projectData.description}</span>
              </div>
              <div className="create-project-step4-review-item">
                <span className="create-project-step4-review-label">Location:</span>
                <span className="create-project-step4-review-value">
                  {projectData.locationCity}, {projectData.locationCountry}
                </span>
              </div>
              <div className="create-project-step4-review-item">
                <span className="create-project-step4-review-label">Services Needed:</span>
                <span className="create-project-step4-review-value">
                  {projectData.selectedServices.join(', ')}
                </span>
              </div>
              <div className="create-project-step4-review-item">
                <span className="create-project-step4-review-label">Budget Range:</span>
                <span className="create-project-step4-review-value">
                  ${projectData.budgetMin.toLocaleString()} - ${projectData.budgetMax.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="create-project-step4-form-divider"></div>

          {/* Action Buttons */}
          <div className="create-project-step4-actions">
            <button 
              className="create-project-step4-btn-secondary" 
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Previous step
            </button>
            <button 
              className="create-project-step4-btn-primary" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectStep4;
