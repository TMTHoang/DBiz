import React from 'react';
import { useNavigate } from 'react-router-dom';

// Mock project ID for MVP phase - Updated to match actual database
const MOCK_PROJECT_ID = '691323cba9e690e2dae61c84';

const ProjectProfile = () => {
  const navigate = useNavigate();

  const handleBrowseAgencies = () => {
    navigate(`/recommend/${MOCK_PROJECT_ID}`);
  };

  return (
    <div>
      <h2>My Project</h2>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>New E-commerce Website</h3>
        <p><strong>Description:</strong> Looking for a marketing agency to help launch our new e-commerce platform. We need comprehensive digital marketing support including web design, SEO optimization, and social media strategy.</p>
        <p><strong>Services Needed:</strong> Web Design, E-commerce Development, SEO</p>
        <p><strong>Budget Range:</strong> $5,000 - $15,000</p>
        <p><strong>Status:</strong> Open</p>
        <button 
          onClick={handleBrowseAgencies}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Browse Agencies
        </button>
      </div>
    </div>
  );
};

export default ProjectProfile;
