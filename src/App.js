import React, { useState } from 'react';
import './App.css';
import TrendingPosts from './components/TrendingPosts';
import AnalyzePost from './components/AnalyzePost';
import SentimentReport from './components/SentimentReport';
import SentimentChart from './components/SentimentChart';
import Chatbot from './components/Chatbot'; // ✅ import chatbot

function App() {
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

      {/*  Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
