import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import ComingSoonModal from '../modals/ComingSoonModal';
import useAuthStore from '../../store/userToken';
import '../../styles/HomePage.css';

const Testimonials = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTest, setSelectedTest] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showCSoonModal, setShowCSoonModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const handlestartTest = () => {
    if (!isAuthenticated) {
      // Trigger navbar login modal
      window.dispatchEvent(new CustomEvent('openLoginModal'));
      return;
    } else {
      navigate('/aptitude-tests');
    }
  };

  async function handleViewSampleTest() {

    setLoading(true);
    setShowConfirmModal(true);

    await axios.get(`https://crackit-01.onrender.com/question/getList?topic=sample-test`)
    .then(res => {
      //console.log('Fetched Test Data:', res.data.questions[0]);
      setSelectedTest(res.data.questions[0]);
      setError(null);
      setLoading(false);
      /*console.log('Test ID:', selectedTest._id);
      console.log('Test Name:', selectedTest.testName);
      console.log('Test Topic:', selectedTest.topic);
      console.log('Test Difficulty:', selectedTest.difficulty);*/

    })
    .catch(err => {
      console.error(err);
      setLoading(false);

      if (err.response && err.response.status === 404) {
        setError('No tests available for this topic yet.');
      } else {
        setError('Failed to load tests.');
      }
    });
  }

    const confirmStartTest = () => {
    setShowConfirmModal(false);
    // Navigate to TestPage.jsx with test data
    /*console.log('Test ID:', selectedTest._id);
    console.log('Test Name:', selectedTest.testName);
    console.log('Test Topic:', selectedTest.topic);
    console.log('Test Difficulty:', selectedTest.difficulty);*/
    navigate(`/aptitude-tests/guest/sampleTest`, {
      state: {
        testId: selectedTest._id,
        testName: selectedTest.testName,
        topic: selectedTest.topic,
        difficulty: selectedTest.difficulty
      }
    });
  };

  const cancelStartTest = () => {
    setShowConfirmModal(false);
    setSelectedTest(null);
  };


  return (
    <>
      <ComingSoonModal show={showCSoonModal} onHide={() => setShowCSoonModal(false)} />
        
      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={cancelStartTest} centered>
        <Modal.Header closeButton>
          <Modal.Title>Start Test Confirmation</Modal.Title>
        </Modal.Header>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (error ? (
          <Modal.Body>
            <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fa fa-exclamation-triangle fa-3x text-danger"></i>
                  </div>
                  <h4 className="text-muted mb-3">{error}</h4>
                  <p className="text-muted">
                    Please try again later.
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => cancelStartTest()}
                    className="mt-3"
                  >
                    Close
                  </Button>
                </div>
          </Modal.Body>
        ):(
          <>
            <Modal.Body>
              <div>
                <h5>Are you ready to start the test?</h5>
                <hr />
                <div className="mt-3">
                  <h6>Test Details:</h6>
                  <ul className="text-muted">
                    <li>Category: General</li>
                    <li>Difficulty Level: Medium</li>
                    <li>Total Questions: 10</li>
                    <li>Time Allotted: 15 minutes</li>
                    <li>Marking Scheme: -0.5 penalty for each incorrect answer</li>
                    <li>Recommended For: Beginner-Intermediate level candidates with prior exposure</li>
                  </ul>
                </div>
                <div className="alert alert-warning mt-3">
                  <strong>Important:</strong> Once you start the test, the timer will begin immediately. Make sure you're ready!
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelStartTest}>
                Cancel
              </Button>
              <Button variant="primary" onClick={confirmStartTest}>
                Yes, Start Test
              </Button>
            </Modal.Footer>
          </>
        ))}
      </Modal> 

      <section className="py-5 call-to-action text-white text-center">
        <div className="container px-4 px-sm-5">
          <h2 className="display-5 fw-bold mb-4 text-white">Ready to Discover Your Potential?</h2>
          <p className="fs-5 text-blue-100 mb-5">
            Join thousands of professionals who have unlocked their cognitive abilities through our comprehensive aptitude testing platform. Start your journey today.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-5">
            <button className="btn btn-light text-primary px-4 py-3 fs-5 rounded-button hover-scale" onClick={handlestartTest}>Start Your Test</button>

            <button className="btn btn-outline-light px-4 py-3 fs-5 rounded-button" onClick={() => handleViewSampleTest()}>View Sample Test</button>
          </div>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="text-white fs-2 fw-bold mb-1">50,000+</div>
              <div className="text-blue-100">Tests Completed</div>
            </div>
            <div className="col-md-4">
              <div className="text-white fs-2 fw-bold mb-1">95%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div className="col-md-4">
              <div className="text-white fs-2 fw-bold mb-1">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
