import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Mock project ID (same as in ProjectProfile.js) - Updated to match actual database
const MOCK_PROJECT_ID = '691323cba9e690e2dae61c84';

const AgencyProfile = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasExistingRequest, setHasExistingRequest] = useState(false);

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/agencies/${agencyId}`);
        setAgency(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching agency profile:', err);
        setLoading(false);
      }
    };

    const checkExistingRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests?projectId=${MOCK_PROJECT_ID}&agencyId=${agencyId}`);
        // Only consider it as existing if there's an active request (not 'matched')
        if (res.data && res.data.length > 0) {
          const hasActiveRequest = res.data.some(req => req.status !== 'matched');
          setHasExistingRequest(hasActiveRequest);
        }
      } catch (err) {
        console.error('Error checking existing request:', err);
      }
    };

    fetchAgency();
    checkExistingRequest();
  }, [agencyId]);

  const handleConnect = async () => {
    if (hasExistingRequest) {
      alert('You have already sent a connection request to this agency.');
      return;
    }

    try {
      const body = {
        projectId: MOCK_PROJECT_ID,
        agencyId: agencyId
      };
      
      console.log('Sending request with body:', body);
      const res = await axios.post('http://localhost:5000/api/requests', body);
      console.log('Request successful:', res.data);
      
      // Navigate to chat page with the new request ID
      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      
      if (err.response && err.response.status === 400) {
        alert(`Error: ${err.response.data.message || 'A connection request already exists for this agency.'}`);
      } else if (err.response) {
        alert(`Error ${err.response.status}: ${err.response.data.message || 'Failed to send connection request.'}`);
      } else if (err.request) {
        alert('No response from server. Please check if the backend is running.');
      } else {
        alert('Failed to send connection request. Please try again.');
      }
    }
  };

  if (loading) {
    return <p>Loading agency profile...</p>;
  }

  if (!agency) {
    return <p>Agency not found.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Agency Profile</h2>
      
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3>{agency.company_name}</h3>
        
        <div style={{ marginTop: '15px' }}>
          <p><strong>Location:</strong> {agency.location_city}, {agency.location_country}</p>
          
          <p><strong>Team Size:</strong> {agency.team_size} employees</p>
          
          <p><strong>Experience:</strong> {agency.experience_years} years</p>
          
          <p><strong>Rating:</strong> {agency.agency_rating} / 5.0</p>
          
          <div style={{ marginTop: '15px' }}>
            <p><strong>Offered Services:</strong></p>
            <p style={{ marginLeft: '20px', color: '#555' }}>
              {agency.offered_services.join(', ')}
            </p>
          </div>
        </div>

        {hasExistingRequest ? (
          <div style={{ marginTop: '20px' }}>
            <button 
              disabled
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'not-allowed',
                fontSize: '16px',
                fontWeight: 'bold',
                width: '100%',
                opacity: 0.6
              }}
            >
              Request Already Sent
            </button>
            <p style={{ marginTop: '10px', color: '#666', fontSize: '14px', textAlign: 'center' }}>
              You have already sent a connection request to this agency.
            </p>
          </div>
        ) : (
          <button 
            onClick={handleConnect}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            Send Connection Request
          </button>
        )}
      </div>
    </div>
  );
};

export default AgencyProfile;
