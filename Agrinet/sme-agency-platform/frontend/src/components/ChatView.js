import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatView = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleConfirm = async () => {
    const confirmed = window.confirm('Are you sure you want to confirm this match? This will end the session and allow you to start a new connection with this agency.');
    
    if (!confirmed) {
      return; // User cancelled
    }

    try {
      // Confirm the match
      await axios.post(`http://localhost:5000/api/match/confirm/${requestId}`);
      
      // Delete the match request to reset the session
      await axios.delete(`http://localhost:5000/api/requests/${requestId}`);
      
      alert('Match Confirmed! Session ended. You can now send a new request to this agency.');
      
      // Navigate back to home page
      navigate('/');
    } catch (err) {
      console.error('Error confirming match:', err);
      alert('Failed to confirm match. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat</h2>
      
      <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
        💡 Messages are stored temporarily (max 5) and will be cleared when you leave this chat.
      </p>
      
      {/* Messages Display */}
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px',
        minHeight: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: '#f9f9f9'
      }}>
        {messages.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center' }}>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index}
              style={{
                marginBottom: '15px',
                padding: '10px',
                backgroundColor: msg.sender_role === 'SME' ? '#e3f2fd' : '#f1f8e9',
                borderRadius: '5px',
                borderLeft: `4px solid ${msg.sender_role === 'SME' ? '#2196F3' : '#8BC34A'}`
              }}
            >
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '14px', color: '#555' }}>
                {msg.sender_role}
              </p>
              <p style={{ margin: '0', fontSize: '16px' }}>
                {msg.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Send Message Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Send
          </button>
        </div>
      </form>

      {/* Confirm Match Button */}
      <button 
        onClick={handleConfirm}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          width: '100%'
        }}
      >
        Confirm Match
      </button>
    </div>
  );
};

export default ChatView;