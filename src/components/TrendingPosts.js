// frontend/src/components/TrendingPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrendingPosts = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);

  // Use the backend URL from environment variables
  const apiBase = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8080";

  const fetchTrends = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`${apiBase}/api/trending`);
      if (response.data && Array.isArray(response.data)) {
        setTrends(response.data);
      } else {
        setTrends([]);
        setError('No trends available at the moment.');
      }
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching trends:', err);
      // Axios error handling
      if (err.response) {
        setError(err.response.data?.error || `Error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response received from backend.');
      } else {
        setError('Request setup error.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends(); // Fetch once when component mounts
  }, []);

  return (
    <div className="card" style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Live Posts from X</h2>
        {lastUpdated && (
          <span style={{ fontSize: '0.8rem', color: '#505f79' }}>
            Updated at: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p style={{ color: '#bf2600' }}>{error}</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {trends.map((trend, index) => (
            <li
              key={index}
              style={{
                marginBottom: '15px',
                paddingBottom: '15px',
                borderBottom: '1px solid #eee',
                listStyle: 'none',
              }}
            >
              {trend.text || trend} {/* fallback if API sends plain string */}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={fetchTrends}
        style={{
          marginTop: '10px',
          padding: '8px 12px',
          backgroundColor: '#0052cc',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Refresh Posts
      </button>
    </div>
  );
};

export default TrendingPosts;
