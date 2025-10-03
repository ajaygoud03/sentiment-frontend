// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import TrendingPosts from './components/TrendingPosts';
import AnalyzePost from './components/AnalyzePost';
import SentimentReport from './components/SentimentReport';
import SentimentChart from './components/SentimentChart';
import Chatbot from './components/Chatbot';
import AboutUs from './components/AboutUs'; // About page

function Dashboard() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [postText, setPostText] = useState('');

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1>Sentiment Analysis Dashboard</h1>
        <p>
          Analyze the sentiment of X posts in real-time with an mBERT-powered model.
        </p>
        <Link to="/about" className="about-link">About Us →</Link>
      </header>

      {/* Main Dashboard */}
      <main className="dashboard">
        <TrendingPosts />
        <AnalyzePost
          setIsLoading={setIsLoading}
          setError={setError}
          setAnalysisResult={setAnalysisResult}
          setPostText={setPostText}
        />
        <SentimentReport
          isLoading={isLoading}
          error={error}
          result={analysisResult}
          postText={postText}
        />
        <SentimentChart result={analysisResult} />
      </main>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
