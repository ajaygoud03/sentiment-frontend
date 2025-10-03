import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./AboutUs.css";
import AjayImg from "../assets/AJ.jpeg";
import SathwikaImg from "../assets/sath.jpeg";
import MadhuImg from "../assets/Madhu.jpg";
import VeeraImg from "../assets/Veera.jpg";
import RamanaImg from "../assets/ramana.jpg";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Ajay Kumar Chinthapally",
      role: "Full Stack Developer & Team Lead",
      img: AjayImg,
      mail: "mailto:cajaygoud7731@gmail.com",
      info: "As the team lead, I designed and developed the frontend using React.js, deployed on Netlify, integrated dashboard, charts, and chatbot, handled frontend-backend integration with EC2/Gunicorn and HTTPS, and managed project workflow under Dr. D. Ramana Kumar's guidance.",
    },
    {
      name: "Sathwika Goroju",
      role: "Backend Developer & AI Model Trainer",
      img: SathwikaImg,
      mail: "mailto:sathwikagoroju@gmail.com",
      info: "I built the backend on AWS EC2, used systemctl to keep it live, integrated X API for real-time posts, processed them through the sentiment model, deployed model to S3, and ensured secure HTTPS communication under Dr. D. Ramana Kumar's mentorship.",
    },
    {
      name: "Madhu Rao Peechara",
      role: "ML Engineer (NLP & Sentiment Analysis)",
      img: MadhuImg,
      mail: "mailto:madhurao525@gmail.com",
      info: "I trained the mBERT sentiment model on Google Colab with T4 GPU, Hugging Face Transformers, WandB tracking (20 hours, 3 epochs, 98% accuracy), tested it on real datasets, optimized preprocessing, and strengthened my NLP and deep learning skills under Dr. D. Ramana Kumar.",
    },
    {
      name: "Anumarla Veera Bhramachary",
      role: "Testing & Data Storage",
      img: VeeraImg,
      mail: "mailto:22eg105k10@anurag.edu.in",
      info: "I handled model storage on AWS S3, tested the entire workflow from fetching X posts to sentiment scores, validated edge cases, monitored EC2 server stability, and learned critical skills in debugging, testing, and cloud storage integration under Dr. D. Ramana Kumar.",
    },
  ];

  return (
    <div className="about-container">
      {/* Section 1 - Intro */}
      <motion.div
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h1>About Us</h1>
        <p>
          Welcome to our Sentiment Analysis project! This platform analyzes real-time posts and visualizes sentiment using cutting-edge AI models.
        </p>
      </motion.div>

      {/* Section 2 - Guide Info */}
      <motion.div
        className="guide-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <img src={RamanaImg} alt="Dr. Ramana Kumar" className="guide-img" />
        <div className="guide-info">
          <h3>Mr. D. Ramana Kumar</h3>
          <p>M.Tech (Ph.D) <br /> Assistant Professor</p>
          <p><a href="mailto:ramanacse@anurag.edu.in">ramanacse@anurag.edu.in</a></p>
          <p>
            Dr. Ramana Kumar has 18 years of teaching experience and guided this project, helping the team connect multiple technologies and learn real-world deployment skills.
          </p>
        </div>
      </motion.div>

      {/* Section 3 - Team Members */}
      <motion.div
        className="team-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2>Our Team</h2>
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            className="team-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img src={member.img} alt={member.name} className="team-img" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.info}</p>
              <p>Email: <a href={member.mail}>{member.mail.replace("mailto:", "")}</a></p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Back to Dashboard Button */}
      <div className="back-btn-container">
        <Link to="/" className="back-btn">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
