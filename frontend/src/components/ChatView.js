import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChatView.css';

const ChatView = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [agency, setAgency] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch agency details
  useEffect(() => {
    const fetchAgencyDetails = async () => {
      try {
        const requestRes = await axios.get(`http://localhost:5000/api/requests/${requestId}`);
        const matchRequest = requestRes.data;
        
        if (matchRequest.agency_id) {
          const agencyData = matchRequest.agency_id._id ? matchRequest.agency_id : 
                            await axios.get(`http://localhost:5000/api/agencies/${matchRequest.agency_id}`).then(res => res.data);
          setAgency(agencyData);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching agency details:', err);
        setLoading(false);
      }
    };

    fetchAgencyDetails();
  }, [requestId]);

  // Clean up messages when component unmounts (chat closed)
  useEffect(() => {
    return () => {
      // Clear messages when leaving the chat
      setMessages([]);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) {
      return; // Don't send empty messages
    }

    try {
      // Create message object
      const messageObj = {
        sender_role: 'SME',
        content: newMessage.trim(),
        timestamp: new Date().toISOString()
      };

      // Add new message and keep only the last 5 messages
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, messageObj];
        // Keep only the last 5 messages
        return updatedMessages.slice(-5);
      });
      
      // Clear the input field
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleConfirm = () => {
    setShowConfirmModal(true);
  };

  const confirmMatch = async () => {
    try {
      // Confirm the match
      await axios.post(`http://localhost:5000/api/match/confirm/${requestId}`);
      
      // Navigate to the confirmation page
      navigate(`/match-confirmed/${requestId}`);
    } catch (err) {
      console.error('Error confirming match:', err);
      alert('Failed to confirm match. Please try again.');
    }
  };

  const isConfirmEnabled = messages.length >= 3;

  if (loading) {
    return <div className="chat-view-container"><p>Loading chat...</p></div>;
  }

  return (
    <div className="chat-view-container">
      {/* Logo Header */}
      <div className="chat-logo-header">
        <img src="/images/agrinet-logo.svg" alt="Agrinet" className="chat-logo-icon" />
        <span className="chat-logo-text-header">Agrinet</span>
      </div>

      {/* Chat Interface */}
      <div className="chat-interface">
      {/* Center - Chat Messages Area */}
      <div className="chat-messages-area">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div style={{ position: 'relative' }}>
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='70' cy='130' r='50' fill='%2398C840'/%3E%3Ccircle cx='110' cy='70' r='50' fill='%23FF6B35'/%3E%3Ccircle cx='150' cy='130' r='50' fill='%234399FF'/%3E%3C/svg%3E"
                alt={agency?.company_name || 'Agency'} 
                className="chat-agency-avatar"
              />
              <div className="chat-online-indicator"></div>
            </div>
            <h3 className="chat-agency-name">{agency?.company_name || 'Agency Name'}</h3>
          </div>
          <div className="chat-header-icons">
            <button className="chat-header-icon-btn" title="Search">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button className="chat-header-icon-btn" title="Favorites">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button className="chat-header-icon-btn" title="Notifications">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="chat-messages-container">
          {/* Date Divider */}
          <div className="chat-date-divider">
            <span className="chat-date-text">Yesterday</span>
          </div>

          {/* Messages */}
          {messages.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index}
                className={`chat-message ${msg.sender_role === 'SME' ? 'user-message' : 'agency-message'}`}
              >
                {msg.sender_role === 'Agency' && (
                  <img 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='70' cy='130' r='50' fill='%2398C840'/%3E%3Ccircle cx='110' cy='70' r='50' fill='%23FF6B35'/%3E%3Ccircle cx='150' cy='130' r='50' fill='%234399FF'/%3E%3C/svg%3E"
                    alt="Agency" 
                    className="chat-message-avatar"
                  />
                )}
                <div className="chat-message-bubble">
                  {msg.content}
                </div>
                {msg.sender_role === 'SME' && (
                  <img 
                    src="/images/user-profile.png" 
                    alt="You" 
                    className="chat-message-avatar"
                  />
                )}
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <form onSubmit={handleSubmit}>
            <div className="chat-input-wrapper">
              <span className="chat-input-icon">📎</span>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write Something..."
                className="chat-input"
              />
              <span className="chat-input-icon">😊</span>
              <button 
                type="submit" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                ✈️
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Sidebar - Profile Panel */}
      <div className="chat-right-sidebar">
        <div className="chat-profile-section">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='70' cy='130' r='50' fill='%2398C840'/%3E%3Ccircle cx='110' cy='70' r='50' fill='%23FF6B35'/%3E%3Ccircle cx='150' cy='130' r='50' fill='%234399FF'/%3E%3C/svg%3E"
            alt={agency?.company_name || 'Agency'} 
            className="chat-profile-avatar"
          />
          <h3 className="chat-profile-name">{agency?.company_name || 'Dianne Jhonson'}</h3>
          <p className="chat-profile-role">Junior Developer</p>
          
          <div className="chat-profile-actions">
            <button className="chat-profile-action-btn">
              <span className="chat-profile-action-icon">💬</span>
              <span className="chat-profile-action-text">Chat</span>
            </button>
            <button className="chat-profile-action-btn">
              <span className="chat-profile-action-icon">📹</span>
              <span className="chat-profile-action-text">Video Call</span>
            </button>
          </div>
        </div>

        <div className="chat-profile-options">
          <div className="chat-profile-option">
            <span className="chat-profile-option-icon">👥</span>
            <span>View Friends</span>
          </div>
          <div className="chat-profile-option">
            <span className="chat-profile-option-icon">❤️</span>
            <span>Add to Favorites</span>
          </div>
        </div>

        <div className="chat-attachments-section">
          <h4 className="chat-attachments-title">Attachments</h4>
          <div className="chat-attachments-grid">
            <div className="chat-attachment-item">
              <span className="chat-attachment-icon">📄</span>
              <span className="chat-attachment-label">PDF</span>
            </div>
            <div className="chat-attachment-item">
              <span className="chat-attachment-icon">🎬</span>
              <span className="chat-attachment-label">VIDEO</span>
            </div>
            <div className="chat-attachment-item">
              <span className="chat-attachment-icon">🎵</span>
              <span className="chat-attachment-label">MP3</span>
            </div>
            <div className="chat-attachment-item">
              <span className="chat-attachment-icon">🖼️</span>
              <span className="chat-attachment-label">IMAGE</span>
            </div>
          </div>
        </div>

        {messages.length < 3 && (
          <div className="chat-warning-message">
            ⚠️ Send {3 - messages.length} more message{3 - messages.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* Confirm Connection Button */}
        <button 
          onClick={handleConfirm}
          disabled={!isConfirmEnabled}
          className="chat-right-confirm-button"
          title={isConfirmEnabled ? 'Confirm this match' : 'Send at least 3 messages to enable'}
        >
          <p className="chat-right-confirm-text">
            CONFIRM CONNECTION
          </p>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirm-modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="confirm-modal-title">Confirm Connection</h2>
            <p className="confirm-modal-text">
              Are you sure you want to confirm this match? This will end the session 
              and allow you to start a new connection with this agency.
            </p>
            <div className="confirm-modal-buttons">
              <button 
                className="confirm-modal-btn confirm-btn-ok"
                onClick={confirmMatch}
              >
                OK
              </button>
              <button 
                className="confirm-modal-btn confirm-btn-cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ChatView;