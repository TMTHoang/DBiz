import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecommendationList.css';

const RecommendationList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recommend/${projectId}`);
        setRecommendations(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setLoading(false);
      }
    };

    fetchRecs();
  }, [projectId]);

  const handleConnect = async (agencyId, agency) => {
    // Navigate to agency profile page
    navigate(`/agency/${agencyId}`, { state: { projectId } });
  };

  if (loading) {
    return <div className="rec-loading">Finding the best agencies for you...</div>;
  }

  // Extract unique locations and services for filters
  const uniqueLocations = [...new Set(recommendations.map(rec => 
    `${rec.agency.location_city}, ${rec.agency.location_country}`
  ))].sort();

  const allServices = recommendations.flatMap(rec => rec.agency.offered_services);
  const uniqueServices = [...new Set(allServices)].sort();

  // Get name suggestions based on search input
  const suggestedNames = nameSearch
    ? recommendations
        .map(rec => rec.agency.company_name)
        .filter(name => name.toLowerCase().includes(nameSearch.toLowerCase()))
        .slice(0, 5) // Show max 5 suggestions
    : [];

  // Filter recommendations
  const filteredRecs = recommendations.filter((rec) => {
    const matchesLocation = !locationFilter || 
      `${rec.agency.location_city}, ${rec.agency.location_country}` === locationFilter;
    
    const matchesService = !serviceFilter || 
      rec.agency.offered_services.includes(serviceFilter);
    
    const matchesName = !nameSearch || 
      rec.agency.company_name.toLowerCase().includes(nameSearch.toLowerCase());
    
    return matchesLocation && matchesService && matchesName;
  });

  return (
    <div className="recommendation-container">
      {/* Logo Header */}
      <div className="rec-logo-header">
        <img src="/images/agrinet-logo.svg" alt="Agrinet" className="rec-logo-icon" />
        <span className="rec-logo-text-header">Agrinet</span>
      </div>

      {/* Hero Section */}
      <div className="rec-hero">
        <div className="rec-hero-text">
          <h1 className="rec-hero-title">Find Your Dream Agency Today!</h1>
          <p className="rec-hero-subtitle">Connecting Talent with Opportunity: Your Gateway to Career Success</p>
        </div>
        
        {/* Search/Filter Section */}
        <div className="rec-search-section">
          <div className="rec-search-wrapper">
            <input
              type="text"
              className="rec-search-input"
              placeholder="Job Title or Company"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestedNames.length > 0 && (
              <div className="rec-suggestions">
                {suggestedNames.map((name, idx) => (
                  <div
                    key={idx}
                    className="rec-suggestion-item"
                    onClick={() => {
                      setNameSearch(name);
                      setShowSuggestions(false);
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="rec-select-wrapper">
            <label className="rec-select-label">Select Location</label>
            <select
              className="rec-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All</option>
              {uniqueLocations.map((location, idx) => (
                <option key={idx} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="rec-select-wrapper">
            <label className="rec-select-label">Select Service</label>
            <select
              className="rec-select"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              <option value="">All</option>
              {uniqueServices.map((service, idx) => (
                <option key={idx} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <button className="rec-search-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Search
          </button>
        </div>
      </div>

      {/* Agencies Section */}
      <div className="rec-agencies-section">
        <div className="rec-agencies-header">
          <div className="rec-agencies-header-text">
            <h2>Recent Agencies Available</h2>
            <p>This sorted depending on your choice and preference</p>
          </div>
          <span className="rec-view-all">View all</span>
        </div>

        {/* Agency Cards */}
        <div className="rec-agencies-list">
          {filteredRecs.map((rec) => (
            <div key={rec.agency._id} className="rec-agency-card">
              <div style={{ flex: 1 }}>
                {/* Card Header */}
                <div className="rec-card-header">
                  <div className="rec-agency-badge-icon">
                    <div className="rec-status-badge">
                      {rec.agency.availability_status || 'Available'}
                    </div>
                  </div>
                  <svg className="rec-favorite-icon" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </div>

                {/* Logo and Info */}
                <div className="rec-logo-text">
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='70' cy='130' r='50' fill='%2398C840'/%3E%3Ccircle cx='110' cy='70' r='50' fill='%23FF6B35'/%3E%3Ccircle cx='150' cy='130' r='50' fill='%234399FF'/%3E%3C/svg%3E"
                    alt={rec.agency.company_name}
                    className="rec-agency-logo"
                  />
                  <div className="rec-agency-info">
                    <h3>{rec.agency.company_name}</h3>
                    <p className="rec-agency-name">{rec.agency.company_name}</p>
                    
                    {/* Rating and Match Score */}
                    <div className="rec-scores">
                      <div className="rec-score-item">
                        <svg className="rec-star-icon" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5l2-5z"/>
                        </svg>
                        {rec.agency.agency_rating || 4.5}
                      </div>
                      <div className="rec-score-item">
                        🎯 Match: {rec.scores?.total_score ? Math.round(rec.scores.total_score) + '%' : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="rec-card-footer">
                  <div className="rec-details">
                    {/* Service */}
                    <div className="rec-detail-item">
                      <svg className="rec-detail-icon" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2"/>
                        <path d="M16 3v4M8 3v4M2 11h20"/>
                      </svg>
                      <span className="rec-detail-text">{rec.agency.offered_services?.[0] || 'Service'}</span>
                    </div>
                    
                    {/* Employment Type */}
                    <div className="rec-detail-item">
                      <svg className="rec-detail-icon" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      <span className="rec-detail-text">{rec.agency.employment_type || 'Full time'}</span>
                    </div>
                    
                    {/* Budget */}
                    <div className="rec-detail-item">
                      <svg className="rec-detail-icon" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                      </svg>
                      <span className="rec-detail-text">
                        ${rec.agency.budget_min?.toLocaleString()}-${rec.agency.budget_max?.toLocaleString()}
                      </span>
                    </div>
                    
                    {/* Location */}
                    <div className="rec-detail-item">
                      <svg className="rec-detail-icon" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="rec-detail-text">
                        {rec.agency.location_city}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    className="rec-connect-btn"
                    onClick={() => handleConnect(rec.agency._id, rec.agency)}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationList;
