import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectProfile = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        // Get first 4 projects
        setProjects(response.data.slice(0, 4));
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

  if (loading) {
    return (
      <div>
        <h2>My Projects</h2>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>My Projects</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Logo Header */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/images/agrinet-logo.svg" alt="Agrinet" style={{ width: '40px', height: '40px' }} />
        <span style={{ fontSize: '24px', fontWeight: '500', color: '#1B223C', fontFamily: 'Outfit, sans-serif' }}>Agrinet</span>
      </div>
      <div style={{ padding: '20px 40px' }}>
      <h2>My Projects</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Select a project to browse recommended agencies
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {projects.map((project) => (
          <div 
            key={project._id}
            style={{ 
              padding: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <h3 style={{ 
              marginTop: 0, 
              marginBottom: '15px',
              color: '#333',
              fontSize: '20px'
            }}>
              {project.title}
            </h3>
            
            <p style={{ 
              color: '#666', 
              fontSize: '14px',
              marginBottom: '15px',
              lineHeight: '1.5'
            }}>
              {project.description}
            </p>
            
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#555', fontSize: '14px' }}>Services Needed:</strong>
              <div style={{ marginTop: '8px' }}>
                {project.needed_services.map((service, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      margin: '4px 4px 4px 0',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
              <strong>Budget:</strong> ${project.budget_min.toLocaleString()} - ${project.budget_max.toLocaleString()}
            </p>
            
            <p style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
              <strong>Location:</strong> {project.location_city}, {project.location_country}
            </p>
            
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>
              <strong>Status:</strong>{' '}
              <span style={{ 
                color: project.status === 'open' ? '#28a745' : '#6c757d',
                fontWeight: 'bold'
              }}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </p>
            
            <button 
              onClick={() => handleBrowseAgencies(project._id)}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0056b3';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#007bff';
              }}
            >
              Browse Agencies
            </button>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
          No projects available. Please add some projects to get started.
        </p>
      )}
      </div>
    </div>
  );
};

export default ProjectProfile;
