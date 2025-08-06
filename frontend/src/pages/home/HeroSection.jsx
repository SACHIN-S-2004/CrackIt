import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDarkMode } from '../../components/DarkMode';
import useAuthStore from '../../components/userToken'; // Add this
import './style.css';

const HeroSection = () => {
  const { isDarkMode } = useDarkMode();
  const { isAuthenticated } = useAuthStore(); // Add this
  const navigate = useNavigate();

  function loginVerify(){
    if (!isAuthenticated) {
      // Trigger navbar login modal
      window.dispatchEvent(new CustomEvent('openLoginModal'));
      return;
    } else {
      navigate('/aptitude-tests');
    }
  }

  return (
    <>
      <section
        className="hero-section d-flex align-items-center pt-5"
        style={{
          backgroundImage: `url('HeroSectionBg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="overlay"></div>
        <div className="container position-relative px-4 px-sm-5">
          <div className="d-flex flex-column flex-lg-row align-items-center">
            <div className="col-lg-5 text-center text-lg-start mb-5 mb-lg-0">
              <h1 className="fw-bold mb-3 display-4">
                Sharpen Your Skills.<br />
                <span className="text-primary">Ace the Test.</span>
              </h1>
              <p className="fs-4 text-muted mb-3">Your Path to Test Success Starts Here</p>
              <p 
                style={!isDarkMode ? { color: 'rgba(26, 27, 29, 0.8)' } : {color: 'rgba(236, 238, 242, 0.84)'}} 
                className="fs-5 mb-4"
              >
                Master aptitude tests with our comprehensive platform featuring personalized learning paths, real-time analytics, and thousands of practice questions designed by experts.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <button className="btn btn-primary px-4 py-3 fs-5 rounded-button" onClick={loginVerify}>
                  {isAuthenticated ? 'Start Practicing' : 'Login to Start'}
                </button>
                <button
                  className="btn btn-outline-primary px-4 py-3 fs-5 rounded-button"
                  onClick={() => document.getElementById('test-categories').scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Tests
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remove all modal components - they're handled by Navbar */}
      
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why Choose CrackIt?</h2>
          <p className="text-muted mb-5">Unlock your potential with our advanced testing platform</p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div className="icon-circle bg-blue-light mx-auto mb-3"><i className="ri-user-star-line text-primary fs-3"></i></div>
                <h5 className="fw-bold">Personalized Learning Path</h5>
                <p className="text-muted">Adaptive algorithms create customized study plans based on your strengths and weaknesses.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div className="icon-circle bg-green-light mx-auto mb-3"><i className="ri-bar-chart-line text-success fs-3"></i></div>
                <h5 className="fw-bold">Real-time Analytics</h5>
                <p className="text-muted">Track your progress with detailed performance insights and improvement areas.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center p-4 shadow-sm">
                <div className="icon-circle bg-purple-light mx-auto mb-3"><i className="ri-book-open-line text-purple fs-3"></i></div>
                <h5 className="fw-bold">Comprehensive Test Bank</h5>
                <p className="text-muted">Access thousands of expertly crafted questions across multiple categories.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;