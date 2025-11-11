import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecommendationList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('');

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

  if (loading) {
    return <p>Finding the best agencies for you...</p>;
  }

  // Filter recommendations by location
  const filteredRecs = recommendations.filter((rec) => 
    rec.agency.location_city.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Recommended Agencies</h2>
      <p>Found {recommendations.length} agencies for your project</p>
      
      {/* Location Filter Input */}
      <div style={{ marginTop: '15px', marginBottom: '20px' }}>
        <label htmlFor="locationFilter" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Filter by Location (City):
        </label>
        <input
          id="locationFilter"
          type="text"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          placeholder="Enter city name..."
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '250px'
          }}
        />
        {locationFilter && (
          <span style={{ marginLeft: '10px', color: '#666' }}>
            Showing {filteredRecs.length} of {recommendations.length} agencies
          </span>
        )}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        {filteredRecs.map((rec) => (
          <div 
            key={rec.agency._id} 
            className="agency-card"
          >
            <h3>{rec.agency.company_name}</h3>
            <p><strong>Location:</strong> {rec.agency.location_city}</p>
            <p><strong>Rating:</strong> {rec.agency.agency_rating} / 5.0</p>
            <p><strong>Match Score:</strong> {rec.scores.total_score.toFixed(2)}</p>
            <button 
              onClick={() => navigate(`/agency/${rec.agency._id}`)}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              View Profile & Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
