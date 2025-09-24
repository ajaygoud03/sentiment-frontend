// frontend/src/components/TrendingPosts.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const TrendingPosts = () => {
    const [trends, setTrends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);

    // useCallback ensures fetchTrends reference stays stable
    const fetchTrends = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            // Use env variable for backend URL or fallback to local
            const apiBase = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8080";
            const response = await axios.get(`${apiBase}/api/trending`);
            setTrends(response.data);
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Error fetching trends:", err);
            setError(err.response?.data?.error || 'Could not load trends.');
        } finally {
            setIsLoading(false);
        }
    }, []); // no dependencies; stable reference

    useEffect(() => {
        fetchTrends(); // fetch once on mount
    }, [fetchTrends]); // safe, no ESLint errors

    return (
        <div className="card" style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
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
                            {trend.text || trend} {/* fallback if no 'text' */}
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={fetchTrends}
                style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Refresh Posts
            </button>
        </div>
    );
};

export default TrendingPosts;
