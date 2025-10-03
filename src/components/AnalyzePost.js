import React, { useState } from 'react';
import axios from 'axios';
import SentimentReport from './SentimentReport';
import SentimentChart from './SentimentChart';
import './AnalyzePost.css';

const AnalyzePost = () => {
    const [url, setUrl] = useState('');
    const [postText, setPostText] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
        if (!url.trim()) {
            setError('Please enter a post URL.');
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysisResult(null);
        setPostText('');

        try {
            const apiPath = process.env.REACT_APP_BACKEND_URL
                ? `${process.env.REACT_APP_BACKEND_URL}/api/fetch_and_analyze`
                : 'http://localhost:8080/api/fetch_and_analyze';

            const response = await axios.post(apiPath, { url });
            setPostText(response.data.postText);
            setAnalysisResult({
                sentiment: response.data.sentiment,
                score: Number(response.data.score),
            });

        } catch (err) {
            setError(err.response?.data?.error || 'Failed to analyze the post.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="card">
                <h2>Analyze a Post</h2>
                <div className="input-group">
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste X post link here..." />
                    <button onClick={handleAnalyze} disabled={isLoading}>
                        {isLoading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>

                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </div>

            <SentimentReport isLoading={isLoading} error={error} result={analysisResult} postText={postText} />
            {analysisResult && <SentimentChart result={analysisResult} />}
        </div>
    );
};

export default AnalyzePost;
