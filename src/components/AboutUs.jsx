// src/components/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import AjayImg from "../assets/AJ.jpeg";
import SathwikaImg from "../assets/sath.jpeg";
import MadhuImg from "../assets/Madhu.jpg";
import VeeraImg from "../assets/Veera.jpg";
import RamanaImg from "../assets/ramana.jpg";
import "./AboutUs.css";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Ajay Kumar Chinthapally",
      hallTicket: "Full Stack Developer & Team Lead",
      img: AjayImg,
      info: `As the team lead, I designed and developed the frontend using React.js, deployed on Netlify with a custom domain, integrated components like the sentiment report, charts, and chatbot, handled frontend-backend integration with EC2 + Gunicorn, ensured HTTPS communication, managed workflow and tasks, and kept the app live. Learned leadership, planning, and real-world deployment under Dr. D. Ramana Kumar’s guidance.`,
    },
    {
      name: "Sathwika Goroju",
      hallTicket: "Backend Developer & AI Model Trainer",
      img: SathwikaImg,
      info: `Built backend on AWS EC2, ensured it stays live using systemctl and Gunicorn, integrated frontend-backend securely with HTTPS, fetched real-time posts via X API, processed them with our sentiment model, deployed model to AWS S3 for inference. Learned backend reliability, API handling, and production deployment under Dr. D. Ramana Kumar’s guidance.`,
    },
    {
      name: "Madhu Rao Peechara",
      hallTicket: "ML Engineer (NLP & Sentiment Analysis)",
      img: MadhuImg,
      info: `Trained and tested mBERT sentiment analysis model on Google Colab (T4 GPU) using Hugging Face Transformers and WandB for tracking. Achieved 98% accuracy in 3 epochs over 20 hours. Optimized preprocessing for multilingual posts, tested real-world datasets, learned large-scale training, GPU resource management, and deep learning model evaluation under Dr. D. Ramana Kumar’s guidance.`,
    },
    {
      name: "Anumarla Veera Bhramachary",
      hallTicket: "Testing & Data Storage",
      img: VeeraImg,
      info: `Handled testing and storage of trained models in AWS S3, ensured backend reliability, ran manual and automated tests for API and workflow validation, monitored logs for EC2 stability. Learned debugging, system validation, and integrating cloud storage with live applications under Dr. D. Ramana Kumar’s guidance.`,
    },
  ];

  return (
    <div className="about-container">
      {/* Section 1 - Intro */}
      <motion.div
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h1>About Us</h1>
        <p>
          Welcome to our Sentiment Analysis project! This platform is designed to analyze real-time posts
          and visualize their sentiment using cutting-edge AI models.
        </p>
      </motion.div>

      {/* Section 2 - Guide Info */}
      <motion.div
        className="guide-section"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <img src={RamanaImg} alt="Dr. Ramana Kumar" className="guide-img" />
        <div>
          <h2>Under the guidance of</h2>
          <h3>Mr. D. Ramana Kumar</h3>
          <p>
            M.Tech (Ph.D) <br />
            Assistant Professor <br />
            <a href="mailto:ramanacse@anurag.edu.in">ramanacse@anurag.edu.in</a>
          </p>
          <p>
            D. Ramana Kumar received a Master of Technology in CSE from Bharath University, Chennai, in
            2009, and is pursuing a Ph.D. in CSE from JNTUH. He has 18 years of teaching experience and
            published several research papers.
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
        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="team-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <img src={member.img} alt={member.name} className="team-img" />
              <div className="team-info">
                <h3>{member.name}</h3>
                <p>{member.hallTicket}</p>
                <p>{member.info}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
