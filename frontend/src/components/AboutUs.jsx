import React from 'react';
import { useDarkMode } from './DarkMode';
import '../aboutUsStyle.css';

const AboutUsModal = ({ show, onClose }) => {
  const { isDarkMode } = useDarkMode();

  if (!show) return null;

  return (
<div className="aboutUs-modal-backdrop">
  <div className={`aboutUs-modal-card ${isDarkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}>
    
    {/* Close button stays pinned */}
    <button className="btn-close custom-close-btn" onClick={onClose}></button>

    {/* Scrollable body */}
    <div className="aboutus-body">
      <h3 className="fw-bold text-center mb-4">✍️ About Us</h3>

      <p className="fs-6 lh-lg mb-3">
        CrackIt is a comprehensive aptitude-testing and learning platform built for students, job-seekers, and professionals who want to sharpen their skills and boost career readiness.
      </p>

      <p className="fs-6 lh-lg mb-3 border-start border-3 border-primary ps-3 fst-italic">
        Our mission is simple: to make high-quality aptitude preparation accessible, structured, and engaging. Whether you are preparing for competitive exams, campus placements, or professional assessments, CrackIt provides carefully curated tests across key areas such as Numerical Reasoning, Verbal Skills, Logical Thinking, and more.
      </p>

      <p className="fs-6 lh-lg mb-3">
        We believe that practice is the foundation of confidence. That’s why our test bank is designed with progressive difficulty levels, ensuring that learners move from basic concepts to advanced problem-solving with clarity. Every question is crafted to reflect real-world standards, helping you develop both speed and accuracy.
      </p>

      <p className="fs-6 lh-lg mb-3">
        At CrackIt, we are more than just a test platform—we are your partner in personal and professional growth. Our goal is to empower you with knowledge, strengthen your analytical ability, and prepare you to excel in interviews, competitive exams, and beyond.
      </p>

      <p className="fs-5 fw-semibold text-primary text-center mt-3">
        Challenge yourself. Sharpen your mind. Crack it with CrackIt.
      </p>
    </div>
  </div>
</div>


  );
};

export default AboutUsModal;
