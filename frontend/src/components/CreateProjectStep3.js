import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProjectStep3.css';

function CreateProjectStep3() {
  const navigate = useNavigate();

  // Form state
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [errors, setErrors] = useState({});

  // Load data from sessionStorage on mount
  useEffect(() => {
    const step3Data = sessionStorage.getItem('projectStep3');
    if (step3Data) {
      const parsedData = JSON.parse(step3Data);
      setBudgetMin(parsedData.budgetMin || '');
      setBudgetMax(parsedData.budgetMax || '');
    }
  }, []);

  // Validate budget inputs
  const validateBudget = () => {
    const newErrors = {};
    const min = parseFloat(budgetMin);
    const max = parseFloat(budgetMax);

    if (!budgetMin || budgetMin.trim() === '') {
      newErrors.budgetMin = 'Minimum budget is required';
    } else if (isNaN(min) || min < 0) {
      newErrors.budgetMin = 'Please enter a valid positive number';
    }

    if (!budgetMax || budgetMax.trim() === '') {
      newErrors.budgetMax = 'Maximum budget is required';
    } else if (isNaN(max) || max < 0) {
      newErrors.budgetMax = 'Please enter a valid positive number';
    }

    if (min && max && !isNaN(min) && !isNaN(max) && min >= max) {
      newErrors.budgetMax = 'Maximum budget must be greater than minimum budget';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate back to step 2
  const handleBack = () => {
    navigate('/create-project/step2');
  };

  // Validate and proceed to step 4
  const handleNext = () => {
    if (!validateBudget()) {
      return;
    }

    // Save to sessionStorage
    sessionStorage.setItem('projectStep3', JSON.stringify({ 
      budgetMin: parseFloat(budgetMin), 
      budgetMax: parseFloat(budgetMax) 
    }));
    
    // Navigate to step 4
    navigate('/create-project/step4');
  };

  // Handle home navigation
  const handleHomeClick = () => {
    navigate('/sme-home');
  };

  // Handle project navigation
  const handleProjectClick = () => {
    navigate('/projects');
  };

  // Handle input change with validation
  const handleMinChange = (e) => {
    setBudgetMin(e.target.value);
    if (errors.budgetMin) {
      setErrors({ ...errors, budgetMin: '' });
    }
  };

  const handleMaxChange = (e) => {
    setBudgetMax(e.target.value);
    if (errors.budgetMax) {
      setErrors({ ...errors, budgetMax: '' });
    }
  };

  return (
    <div className="create-project-step3-container">
      {/* Top Bar */}
      <div className="create-project-step3-top-bar">
        <div className="create-project-step3-logo-section">
          <div className="create-project-step3-logo-icon"></div>
          <span className="create-project-step3-logo-text">Agrinet</span>
        </div>
        <div className="create-project-step3-menu">
          <span>Tools</span>
          <span>Company</span>
          <span>About Us</span>
          <span>Pricing</span>
          <span>Support</span>
        </div>
        <div className="create-project-step3-search-container">
          <div className="create-project-step3-search-input">
            <span className="create-project-step3-search-placeholder">Search Company</span>
          </div>
          <div className="create-project-step3-search-button">
            <div className="create-project-step3-search-icon"></div>
          </div>
        </div>
        <div className="create-project-step3-notification-icon"></div>
        <div className="create-project-step3-profile-pic"></div>
      </div>

      {/* Left Sidebar */}
      <div className="create-project-step3-sidebar">
        <div className="create-project-step3-nav-item" onClick={handleHomeClick}>
          <div className="create-project-step3-nav-icon create-project-step3-home-icon"></div>
          <span>Home</span>
        </div>
        <div className="create-project-step3-nav-item create-project-step3-nav-item-active" onClick={handleProjectClick}>
          <div className="create-project-step3-nav-icon create-project-step3-project-icon"></div>
          <span>Project</span>
        </div>
        <div className="create-project-step3-nav-item">
          <div className="create-project-step3-nav-icon create-project-step3-tasks-icon"></div>
          <span>Tasks</span>
        </div>
        <div className="create-project-step3-nav-item">
          <div className="create-project-step3-nav-icon create-project-step3-logs-icon"></div>
          <span>Work Logs</span>
        </div>
        <div className="create-project-step3-nav-item">
          <div className="create-project-step3-nav-icon create-project-step3-performance-icon"></div>
          <span>Performance</span>
        </div>
        <div className="create-project-step3-nav-item">
          <div className="create-project-step3-nav-icon create-project-step3-settings-icon"></div>
          <span>Settings</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="create-project-step3-main">
        <div className="create-project-step3-header">
          <h1 className="create-project-step3-title">Project Creation for SME</h1>
          <p className="create-project-step3-subtitle">
            Please fill the form below to create your project. Feel free to add as much detail as needed.
          </p>
        </div>

        <div className="create-project-step3-divider"></div>

        <div className="create-project-step3-form-card">
          {/* Progress Indicator */}
          <div className="create-project-step3-progress-container">
            <div className="create-project-step3-progress-bar">
              <div className="create-project-step3-progress-fill" style={{ width: '75%' }}></div>
            </div>
            <div className="create-project-step3-progress-steps">
              <div className="create-project-step3-step create-project-step3-step-completed">
                <div className="create-project-step3-step-circle">1</div>
              </div>
              <div className="create-project-step3-step create-project-step3-step-completed">
                <div className="create-project-step3-step-circle">2</div>
              </div>
              <div className="create-project-step3-step create-project-step3-step-active">
                <div className="create-project-step3-step-circle">3</div>
              </div>
              <div className="create-project-step3-step">
                <div className="create-project-step3-step-circle">4</div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="create-project-step3-form-section">
            <h2 className="create-project-step3-form-title">Budget Range</h2>
            <p className="create-project-step3-form-description">
              Please enter your budget range for this project in USD.
            </p>

            <div className="create-project-step3-budget-grid">
              <div className="create-project-step3-input-group">
                <label className="create-project-step3-label">Minimum Budget ($)</label>
                <input
                  type="number"
                  className={`create-project-step3-input ${errors.budgetMin ? 'create-project-step3-input-error' : ''}`}
                  placeholder="e.g., 5000"
                  value={budgetMin}
                  onChange={handleMinChange}
                  min="0"
                  step="100"
                />
                {errors.budgetMin && (
                  <span className="create-project-step3-error-text">{errors.budgetMin}</span>
                )}
              </div>

              <div className="create-project-step3-input-group">
                <label className="create-project-step3-label">Maximum Budget ($)</label>
                <input
                  type="number"
                  className={`create-project-step3-input ${errors.budgetMax ? 'create-project-step3-input-error' : ''}`}
                  placeholder="e.g., 15000"
                  value={budgetMax}
                  onChange={handleMaxChange}
                  min="0"
                  step="100"
                />
                {errors.budgetMax && (
                  <span className="create-project-step3-error-text">{errors.budgetMax}</span>
                )}
              </div>
            </div>

            {budgetMin && budgetMax && !errors.budgetMin && !errors.budgetMax && (
              <div className="create-project-step3-budget-summary">
                <div className="create-project-step3-summary-icon">💰</div>
                <div className="create-project-step3-summary-text">
                  Your budget range: <strong>${parseFloat(budgetMin).toLocaleString()} - ${parseFloat(budgetMax).toLocaleString()}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="create-project-step3-form-divider"></div>

          {/* Action Buttons */}
          <div className="create-project-step3-actions">
            <button className="create-project-step3-btn-secondary" onClick={handleBack}>
              Previous step
            </button>
            <button className="create-project-step3-btn-primary" onClick={handleNext}>
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectStep3;
