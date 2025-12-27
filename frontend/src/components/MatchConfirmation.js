import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MatchConfirmation.css';

function MatchConfirmation() {
  const [agency, setAgency] = useState(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { requestId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        // Fetch the match request to get agency and project IDs
        const requestRes = await axios.get(`http://localhost:5000/api/requests/${requestId}`);
        const matchRequest = requestRes.data;

        // Fetch agency details
        const agencyRes = await axios.get(`http://localhost:5000/api/agencies/${matchRequest.agency_id._id || matchRequest.agency_id}`);
        setAgency(agencyRes.data);

        // If project is populated, use it; otherwise fetch it
        if (matchRequest.project_id.title) {
          setProject(matchRequest.project_id);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching match details:', err);
        setError('Failed to load match details');
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [requestId]);

  if (loading) {
    return (
      <div className="match-confirmation-container">
        <div className="match-confirmation-content">
          <p>Loading match details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="match-confirmation-container">
        <div className="match-confirmation-content">
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="match-confirmation-container">
      <div className="match-confirmation-background" />
      
      {/* Background Image */}
      <img 
        src="/images/background-image.png"
        alt="Background decoration" 
        className="match-background-image"
        onError={(e) => console.error('Failed to load background image:', e.target.src)}
      />

      <div className="match-confirmation-content">
        {/* Logo Section */}
        <div className="match-logo-section">
          <img 
            src="/images/agrinet-logo.svg" 
            alt="Agrinet Logo" 
            className="match-logo-icon"
            onError={(e) => console.error('Failed to load logo:', e.target.src)}
          />
          <h1 className="match-logo-text">Agrinet</h1>
        </div>

        {/* Join Us Badge */}
        <div className="match-join-badge">
          <img 
            src="/images/arrow-icon.svg" 
            alt="Arrow icon" 
            className="match-join-icon"
            onError={(e) => console.error('Failed to load arrow icon:', e.target.src)}
          />
          <span className="match-join-text">Join Us</span>
        </div>

        {/* Main Content */}
        <div className="match-main-content">
          <div className="match-heading">
            <h2 className="match-heading-line1">
              You've got a <span className="match-heading-highlight">MATCH</span>
            </h2>
            <p className="match-heading-line2">
              with {agency?.company_name || 'ABC AGENCY'}
            </p>
          </div>

          {/* Confirm Connection Button */}
          <div className="match-confirm-button-wrapper">
            <button 
              className="match-confirm-button"
              onClick={() => navigate('/')}
            >
              <p className="match-confirm-button-text">CONFIRM CONNECTION</p>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="match-star-decoration" />
        <div className="match-circle-decoration" />
      </div>
    </div>
  );
}

export default MatchConfirmation;
