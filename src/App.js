import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

import TrendingPosts from "./components/TrendingPosts";
import AnalyzePost from "./components/AnalyzePost";
import SentimentReport from "./components/SentimentReport";
import SentimentChart from "./components/SentimentChart";
import Chatbot from "./components/Chatbot";
import AboutUs from "./components/AboutUs";

function Dashboard({
  analysisResult,
  setAnalysisResult,
  isLoading,
  setIsLoading,
  error,
  setError,
  postText,
  setPostText,
}) {
  return (
    <div className="dashboard">
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
    </div>
  );
}

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [postText, setPostText] = useState("");

  return (
    <Router>
      <div className="App">
        {/* NAVBAR */}
        <header className="navbar">
          <h1 className="navbar-title">Sentiment Analysis Dashboard</h1>
          <nav className="navbar-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About Us
            </NavLink>
          </nav>
        </header>

        {/* ROUTES */}
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  analysisResult={analysisResult}
                  setAnalysisResult={setAnalysisResult}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  error={error}
                  setError={setError}
                  postText={postText}
                  setPostText={setPostText}
                />
              }
            />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>

        {/* CHATBOT FLOATS EVERYWHERE */}
        <Chatbot
          analysisResult={analysisResult}
          setAnalysisResult={setAnalysisResult}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          setError={setError}
          postText={postText}
          setPostText={setPostText}
        />
      </div>
    </Router>
  );
}

export default App;
