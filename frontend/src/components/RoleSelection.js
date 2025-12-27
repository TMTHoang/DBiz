import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSMEClick = () => {
    navigate('/sme-home');
  };

  const handleAgencyClick = () => {
    // Agency flow not yet implemented
    alert('Agency flow is coming soon! Currently only SME flow is available.');
  };

  return (
    <div className="role-selection-container">
      {/* Header */}
      <div className="role-header">
        <div className="role-logo">
          <img src="/images/agrinet-logo.svg" alt="Agrinet" className="role-logo-icon" />
          <span className="role-logo-text">Agrinet</span>
        </div>
        <div className="role-nav-menu">
          <span className="role-nav-item">Tools</span>
          <span className="role-nav-item">Company</span>
          <span className="role-nav-item">About Us</span>
          <span className="role-nav-item">Pricing</span>
          <span className="role-nav-item">Support</span>
        </div>
        <div className="role-actions">
          <button className="role-btn-login">Login</button>
          <button className="role-btn-signup">Sign up</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="role-main-content">
        <div className="role-content-wrapper">
          {/* Title Section */}
          <div className="role-title-section">
            <h1 className="role-title">Who are you</h1>
            <p className="role-subtitle">
              Don't miss your next opportunity. Sign in to stay updated on your professional world.
            </p>
          </div>

          {/* Role Cards */}
          <div className="role-cards-container">
            {/* SME Card */}
            <div className="role-card" onClick={handleSMEClick}>
              <img src="/images/role-profile-icon.svg" alt="Profile" className="role-card-icon" />
              <div className="role-card-title">
                <span>SME Side</span>
              </div>
              <img src="/images/three-dots.svg" alt="More" className="role-card-dots" />
            </div>

            {/* Agency Card */}
            <div className="role-card role-card-disabled" onClick={handleAgencyClick}>
              <img src="/images/role-profile-icon.svg" alt="Profile" className="role-card-icon" />
              <span className="role-card-title-agency">Agency Side</span>
              <img src="/images/three-dots.svg" alt="More" className="role-card-dots" />
            </div>
          </div>

          {/* Login Link */}
          <div className="role-login-link">
            <span>Already have an account? Log in</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="role-footer">
        <div className="role-footer-divider"></div>
        <div className="role-footer-links">
          <span>User Agreement</span>
          <span>Help Center</span>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
          <span>Community Guidelines</span>
          <span>Send feedback</span>
          <span>@2024name</span>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
