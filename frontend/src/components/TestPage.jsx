import { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, Modal } from 'react-bootstrap';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useDarkMode } from './DarkMode';
import '../TestPage.css';

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const savedMeta = JSON.parse(localStorage.getItem('test_meta')) || {};
  const { testId, topic, difficulty, testIndex } = location.state || savedMeta;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [status, setStatus] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [packInfo, setPackInfo] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  // Confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'exit' or 'submit'

  const timerRef = useRef(null);

  useEffect(() => {
    if (location.state) {
      localStorage.setItem('test_meta', JSON.stringify({ testId, topic, difficulty }));
    }
  }, [location.state]);

  useEffect(() => {
    const blockBack = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', blockBack);
    return () => window.removeEventListener('popstate', blockBack);
  }, []);

  useEffect(() => {
    const warnBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeUnload);
    return () => window.removeEventListener('beforeunload', warnBeforeUnload);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(`test_${testId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTimeLeft(parsed.timeLeft);
      setUserAnswers(parsed.userAnswers || {});
      setStatus(parsed.status || {});
      setCurrentQuestionIndex(parsed.currentQuestionIndex || 0);
    } else {
      if (difficulty === 'easy') setTimeLeft(20 * 60);
      else setTimeLeft(15 * 60);
    }
  }, [testId, difficulty]);

  useEffect(() => {
    if (submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setSubmitted(true);
          localStorage.removeItem(`test_${testId}`);
          localStorage.removeItem('test_meta');
          return 0;
        }
        localStorage.setItem(`test_${testId}`, JSON.stringify({
          timeLeft: prev - 1,
          userAnswers,
          status,
          currentQuestionIndex,
        }));
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [submitted, userAnswers, status, currentQuestionIndex]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`https://crackit-01.onrender.com/question/get?id=${testId}`);
        setTimeout(() => {
          setQuestions(res.data.questions);
          setPackInfo(res.data.packInfo);
        }, 1000);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, [testId]);

  const handleAnswerSelect = (index, option) => {
    setUserAnswers((prev) => ({ ...prev, [index]: option }));
    setShowWarning(false);
  };

  const handleNext = () => {
    if (!userAnswers.hasOwnProperty(currentQuestionIndex)) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setStatus((prev) => ({ ...prev, [currentQuestionIndex]: 'answered' }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSkip = () => {
    setShowWarning(false);
    setStatus((prev) => ({ ...prev, [currentQuestionIndex]: 'skipped' }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleEmergencyExit = () => {
    setModalType('exit');
    setShowConfirmModal(true);
  };

  const handleSubmit = () => {
    setModalType('submit');
    setShowConfirmModal(true);
  };

  const confirmAction = () => {
    setShowConfirmModal(false);
    if (modalType === 'exit') {
      clearInterval(timerRef.current);
      localStorage.removeItem(`test_${testId}`);
      localStorage.removeItem('test_meta');
      navigate('/aptitude-tests', { replace: true });
    } else if (modalType === 'submit') {
      clearInterval(timerRef.current);
      setSubmitted(true);
      localStorage.removeItem(`test_${testId}`);
      localStorage.removeItem('test_meta');
      submitResultToServer();
    }
  };

  const calculateScore = () => {
    if (!questions.length) return 0; // No questions loaded
    let score = 0;
    questions.forEach((q, idx) => {
      if (!(idx in userAnswers)) return; // skipped/unanswered
      const selected = userAnswers[idx];
      const correct = q.options[q.ansIndex];
      if (selected === correct) score += 1;
      else {
        if (difficulty === 'medium') score -= 0.5;
        if (difficulty === 'hard') score -= 1;
      }
    });
    return score;
  };


  const submitResultToServer = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const email = userData?.email;
      if (!email || !testId || !questions.length) {
        console.error('Missing required data to submit result.');
        return;
      }
      const selectedOptions = questions.map((q, index) => {
        const selectedAnswer = userAnswers[index];
        const selectedIndex = q.options.findIndex(opt => opt === selectedAnswer);
        return selectedIndex !== -1 ? selectedIndex : "NA";
      });
      const correctOptions = questions.map((q) => q.ansIndex ?? "NA");
      const score = calculateScore();
      const total = questions.length;
      const testName = topic + " #" + testIndex;

      const resultPayload = {
        email,
        topic,
        testName,
        qPackID: testId,
        selectedOptions,
        correctOptions,
        score,
        total
      };

      const response = await axios.post('https://crackit-01.onrender.com/result/store', resultPayload, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        console.log("✅ Result submitted successfully", response.data);
      } else {
        console.error("❌ Unexpected response from server:", response);
      }
    } catch (error) {
      console.error("❌ Error submitting result:", error?.response?.data || error.message);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const current = questions[currentQuestionIndex];
  if (!current || !packInfo) {
    return (
      <Container className="py-5 text-center">
        <h4>Loading your test...</h4>
      </Container>
    );
  }

  if (submitted) {
    const score = calculateScore();
    return (
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-5 d-flex justify-content-center align-items-center flex-wrap text-center gap-4"
        >
          <h3 className="mb-0">
            {(topic || 'Test').toUpperCase()} - {(difficulty || 'Easy').toUpperCase()} RESULTS
          </h3>

          <div className="px-4 py-3 bg-light border rounded shadow-sm">
            <h4 className="mb-1 text-success">🏆 Score</h4>
            <h2 className="fw-bold text-dark mb-0">
              {score} <span className="text-muted">/ {questions.length}</span>
            </h2>
          </div>

        </motion.div>
          <div className="text-center">
            <Link to="/aptitude-tests" className="btn btn-primary mt-3 mb-4 me-2">Back to Categories</Link>
            <Link to="/performance-tracker" className="btn btn-primary mt-3 mb-4">Progress History</Link>
          </div>
        <Row>
          <Col md={8} className="mx-auto">
            {questions.map((q, index) => {
              const selected = userAnswers[index];
              const correct = q.options[q.ansIndex];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="mb-4 p-4 shadow-sm">
                    <h5>Question {index + 1}</h5>
                    <p className="mb-2">{q.question}</p>

                    {/* Show answer status */}
                    {selected ? (
                      <p className="mb-2"><strong>Your Answer:</strong> {selected}</p>
                    ) : (
                      <p className="text-danger mb-2"><strong>Your Answer:</strong> No option selected</p>
                    )}
                    <p><strong>Correct Answer:</strong> {correct}</p>

                    {/* Options display with logic */}
                    <div className="mt-3">
                      {q.options.map((option, optIdx) => {
                        const isCorrect = option === correct;
                        const isSelected = option === selected;
                        const skipped = !selected;

                        let bgClass = "border";
                        let icon = "";

                        if (isCorrect) {
                          bgClass = "bg-success text-white";
                          if (isSelected && !skipped) icon = "✅";
                        }

                        if (isSelected && !isCorrect) {
                          bgClass = "bg-danger text-white";
                          icon = "❌";
                        }

                        return (
                          <div key={optIdx} className="d-flex align-items-center mb-2">
                            <div className="me-2" style={{ width: '24px' }}>{icon}</div>
                            <div className={`flex-grow-1 w-100 p-2 rounded ${bgClass}`}>
                              {option}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p className="mt-3"><strong>Explanation:</strong> {q.explanation}</p>
                  </Card>
                </motion.div>
              );
            })}

            <div className="text-center">
              <Link onClick={(e) => {
                      e.preventDefault(); // prevents page reload
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
              className="btn btn-primary mt-3 mb-4">Go to Top</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <h4>{packInfo.topic} - {packInfo.difficulty.toUpperCase()}</h4>
        <div className="d-flex flex-column align-items-end">
          <Button
            variant="outline-danger"
            size="md"
            className="mb-2 p-2 mb-3 px-3"
            onClick={handleEmergencyExit}
          > Exit Test</Button>
          <Badge
            bg={timeLeft <= 120 ? 'danger' : 'success'}
            className={`fs-5 px-3 py-2 mt-4 rounded-pill ${timeLeft <= 120 ? 'pulse' : ''}`}
          >
            ⏳ {formatTime(timeLeft)}
          </Badge>
        </div>
      </div>

      <Row>
        <Col md={8}>
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 shadow-sm mb-3">
              <h5>Question {currentQuestionIndex + 1}</h5>
              <p className="mb-4">{current.question}</p>

              <Form>
                {current.options.map((option, idx) => (
                  <Form.Check
                    key={idx}
                    type="radio"
                    name={`q-${currentQuestionIndex}`}
                    label={option}
                    checked={userAnswers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerSelect(currentQuestionIndex, option)}
                    className="mb-2"
                  />
                ))}
              </Form>

              {showWarning && (
                <div className="text-danger mt-2 mb-3 fw-semibold">
                  ⚠️ No option selected
                </div>
              )}

              <div className="d-flex justify-content-between mt-3">
                <Button variant="outline-danger" onClick={handleSkip}>Skip</Button>
                <Button variant="primary" onClick={handleNext}>Next</Button>
                <Button variant="success" onClick={handleSubmit}>Submit</Button>
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h6 className="mb-3">Question Index</h6>
            <div className="d-flex flex-wrap">
              {questions.map((_, index) => {
                let variant = 'outline-secondary';
                if (status[index] === 'answered') variant = 'success';
                else if (status[index] === 'skipped') variant = 'danger';
                if (index === currentQuestionIndex) variant = 'primary';
                return (
                  <Button
                    key={index}
                    variant={variant}
                    className="m-1"
                    onClick={() => setCurrentQuestionIndex(index)}
                    disabled={difficulty === 'hard'}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Shared Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
        backdropClassName="custom-backdrop"
        className={isDarkMode ? 'dark-mode' : ''}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'exit' ? 'Exit Test' : 'Submit Test'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'exit'
            ? 'This will end your test and clear all progress. Are you absolutely sure?'
            : 'This action will lock your answers and complete the test. Proceed?'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button
            variant={modalType === 'exit' ? 'danger' : 'success'}
            onClick={confirmAction}
          >
            {modalType === 'exit' ? 'Yes, Exit' : 'Yes, Submit'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TestPage;