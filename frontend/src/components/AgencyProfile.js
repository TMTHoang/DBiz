import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AgencyProfile.css';

const AgencyProfile = () => {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get project ID from navigation state or fetch first project
        let currentProjectId = location.state?.projectId;
        
        if (!currentProjectId) {
          // Fetch the first available project
          const projectsRes = await axios.get('http://localhost:5000/api/projects');
          if (projectsRes.data && projectsRes.data.length > 0) {
            currentProjectId = projectsRes.data[0]._id;
          }
        }
        
        setProjectId(currentProjectId);

        // Fetch agency details
        const agencyRes = await axios.get(`http://localhost:5000/api/agencies/${agencyId}`);
        setAgency(agencyRes.data);

        // For demo purposes, skip checking for existing requests
        // This allows testing multiple connections to the same agency

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [agencyId, location.state]);

  const handleConnect = async () => {
    if (!projectId) {
      alert('No project selected. Please go back and select a project first.');
      return;
    }

    try {
      const body = {
        projectId: projectId,
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
    return <div className="agency-profile-container"><p style={{padding: '40px', textAlign: 'center'}}>Loading agency profile...</p></div>;
  }

  if (!agency) {
    return <div className="agency-profile-container"><p style={{padding: '40px', textAlign: 'center'}}>Agency not found.</p></div>;
  }

  return (
    <div className="agency-profile-container">
      {/* Logo Header */}
      <div className="agency-logo-header">
        <img src="/images/agrinet-logo.svg" alt="Agrinet" className="agency-logo-icon" />
        <span className="agency-logo-text-header">Agrinet</span>
      </div>

      {/* Hero Background Section */}
      <div className="agency-hero">
        <img 
          src="/images/agency-profile/hero-bg.png"
          alt="Hero Background"
          className="agency-hero-bg"
        />
        <div className="agency-hero-overlay"></div>
      </div>

      {/* Profile Header Content (separate from background) */}
      <div className="agency-profile-header">
        <div className="agency-header-content">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='70' cy='130' r='50' fill='%2398C840'/%3E%3Ccircle cx='110' cy='70' r='50' fill='%23FF6B35'/%3E%3Ccircle cx='150' cy='130' r='50' fill='%234399FF'/%3E%3C/svg%3E"
            alt={agency.company_name}
            className="agency-avatar"
          />
          <div className="agency-hero-info">
            <div className="agency-hero-title">
              <h1 className="agency-name">{agency.company_name}</h1>
              <svg className="verified-badge" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9.31" fill="#3D88E0" stroke="#3D88E0" strokeWidth="1.38"/>
                <path d="M5.88 10.18l2.6 1.77 5.64-4.72" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="agency-tagline">Wisozk - Becker Co</p>
            <div className="agency-stats">
              <div className="stat-item">
                <svg viewBox="0 0 16 17" fill="none" stroke="#6F747A">
                  <path d="M14 7.27l-5.29-4.4a1.33 1.33 0 00-1.71 0L1.71 7.27" strokeWidth="1.33"/>
                  <path d="M2.67 6.6v6.67c0 .73.6 1.33 1.33 1.33h8c.73 0 1.33-.6 1.33-1.33V6.6" strokeWidth="1.33" fill="none"/>
                </svg>
                <span className="stat-text">{agency.location_city}, {agency.location_country}</span>
              </div>
              <div className="stat-item">
                <svg viewBox="0 0 16 17" fill="none" stroke="#6F747A">
                  <path d="M10.33 4.6c0 1.47-1.2 2.67-2.67 2.67A2.67 2.67 0 015 4.6c0-1.46 1.2-2.66 2.66-2.66 1.47 0 2.67 1.2 2.67 2.66z" strokeWidth="1.33" fill="none"/>
                  <path d="M2.67 15.93v-2.66c0-1.47 1.2-2.67 2.66-2.67h4c1.47 0 2.67 1.2 2.67 2.67v2.66" strokeWidth="1.33"/>
                </svg>
                <span className="stat-text">{agency.team_size} Team Members</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleConnect}
            className="connect-button"
          >
            Connect
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="agency-main-content">
        {/* Navigation */}
        <div className="agency-nav">
          <span className="nav-tab">Overview</span>
        </div>

        {/* About Section */}
        <section className="agency-about">
          <h2>About {agency.company_name}</h2>
          {agency.about && (
            <>
              <p className="agency-about-text">{agency.about}</p>
              <p className="agency-about-text">{agency.about}</p>
            </>
          )}
        </section>

        {/* Service Provided */}
        <section className="services-section">
          <h2>Service Provided</h2>
          <div className="services-grid">
            {agency.offered_services && agency.offered_services.map((service, idx) => {
              // Define icon for each service type
              const getServiceIcon = (serviceName) => {
                const icons = {
                  'SEO': (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                      <path d="M11 8v6M8 11h6"/>
                    </svg>
                  ),
                  'Social Media': (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                    </svg>
                  ),
                  'Content Marketing': (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                    </svg>
                  ),
                  'PPC': (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                    </svg>
                  ),
                  'Web Design': (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2"/>
                      <path d="M8 21h8M12 17v4"/>
                    </svg>
                  ),
                  'E-commerce Dev': (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                    </svg>
                  ),
                  'Brand Strategy': (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                  'Email Marketing': (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <path d="M22 6l-10 7L2 6"/>
                    </svg>
                  )
                };
                return icons[serviceName] || (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#628949" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                  </svg>
                );
              };
              
              return (
                <div key={idx} className="service-chip">
                  <div className="service-icon">
                    {getServiceIcon(service)}
                  </div>
                  <span className="service-text">{service}</span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Value Section */}
        <section className="value-section">
          <h2>Value</h2>
          <div className="value-text-content">
            <p>{agency.value_proposition || 'We deliver exceptional results through innovative strategies and dedicated expertise.'}</p>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Team</h2>
          <div className="team-grid">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="team-member-card">
                <img 
                  src={`/images/agency-profile/team-member-${num > 3 ? num - 3 : num}.png`}
                  alt="Team Member"
                  className="member-avatar"
                />
                <div className="member-info">
                  <h4>Andhika Sudarman</h4>
                  <p>Chief Executive Officer</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="achievements-section">
          <h2>Achievements</h2>
          <div className="achievement-item">
            <div className="achievement-icon"></div>
            <div className="achievement-content">
              <h3>Achievements 1</h3>
              <div style={{display: 'flex', gap: '10px', marginBottom: '8px'}}>
                <span className="achievement-category">Category</span>
                <span className="achievement-issuer">Issued by</span>
              </div>
              <p className="achievement-period">Time/Period</p>
              <p className="achievement-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus eros eu vehicula interdum. Cras nec ultricies massa. Curabitur rutrum, diam id consequat consequat
              </p>
            </div>
          </div>
          <div className="achievement-item">
            <div className="achievement-icon linkedin"></div>
            <div className="achievement-content">
              <h3>Achievements 2</h3>
              <div style={{display: 'flex', gap: '10px', marginBottom: '8px'}}>
                <span className="achievement-category">Category</span>
                <span className="achievement-issuer">Issued by</span>
              </div>
              <p className="achievement-period">Time/Period</p>
              <p className="achievement-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus eros eu vehicula interdum.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Projects Section */}
        <section className="projects-section">
          <div className="projects-header">
            <h2>Projects</h2>
            <p className="projects-subtitle">Explore our portfolio of successful collaborations</p>
          </div>
          <div className="projects-grid">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="project-card">
                <div className="project-image">
                  <svg viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="url(#projectGradient{num})"/>
                    <defs>
                      <linearGradient id="projectGradient{num}" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={num % 3 === 0 ? '#628949' : num % 3 === 1 ? '#4399FF' : '#FF6B35'}/>
                        <stop offset="100%" stopColor={num % 3 === 0 ? '#98C840' : num % 3 === 1 ? '#6BB5FF' : '#FFA07A'}/>
                      </linearGradient>
                    </defs>
                    <text x="50" y="55" textAnchor="middle" fill="white" fontSize="24" fontWeight="600">
                      {num}
                    </text>
                  </svg>
                </div>
                <div className="project-content">
                  <h3>Project {num}</h3>
                  <p className="project-period">Period</p>
                  <div className="project-details">
                    <div className="project-detail-item">
                      <div className="project-detail-icon">
                        <svg viewBox="0 0 16 16" fill="none" stroke="#6F747A" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6"/>
                          <path d="M8 5v3l2 2"/>
                        </svg>
                      </div>
                      <span className="project-detail-text">Service</span>
                    </div>
                    <div className="project-detail-item">
                      <div className="project-detail-icon">
                        <svg viewBox="0 0 16 16" fill="none" stroke="#6F747A" strokeWidth="1.5">
                          <path d="M8 9.33c1.47 0 2.67-1.2 2.67-2.67S9.47 4 8 4 5.33 5.2 5.33 6.67 6.53 9.33 8 9.33z"/>
                          <path d="M2.67 14v-1.33c0-1.47 1.2-2.67 2.66-2.67h5.34c1.46 0 2.66 1.2 2.66 2.67V14"/>
                        </svg>
                      </div>
                      <span className="project-detail-text">Customer</span>
                    </div>
                    <div className="project-detail-item">
                      <div className="project-detail-icon">
                        <svg viewBox="0 0 16 16" fill="none" stroke="#6F747A" strokeWidth="1.5">
                          <rect x="2" y="3" width="12" height="10" rx="1"/>
                          <path d="M2 6h12M5 3v3M11 3v3"/>
                        </svg>
                      </div>
                      <span className="project-detail-text">Scale</span>
                    </div>
                  </div>
                  <div className="project-badge">
                    <span className="project-badge-text">Remote</span>
                  </div>
                  <button className="read-more-button">Read more</button>
                </div>
              </div>
            ))}
          </div>
          <button className="more-projects-button">
            More
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 13.5l-5.67-5.67" stroke="#2F343A" strokeWidth="1.5"/>
            </svg>
          </button>
        </section>
      </div>
    </div>
  );
};

export default AgencyProfile;
