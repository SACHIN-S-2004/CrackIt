import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Collapse, Spinner, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronDown, FaStar, FaCheck } from 'react-icons/fa';
import { useDarkMode } from './DarkMode';
import axios from 'axios';
import Navbar from '../pages/home/Navbar';
import { MFooter } from '../pages/home/Footer';
import '../TestDifficulty.css';

const testContent = {
  'numerical-reasoning': {
    title: 'Numerical Reasoning',
    description: `Numerical Reasoning tests measure your ability to work with numbers under pressure, analyze quantitative information, and draw logical conclusions from data. These assessments are commonly presented through tables, charts, and graphs that simulate real-world scenarios — whether it’s evaluating company revenue, budgeting figures, or analyzing percentage growth. The core objective is not just to perform arithmetic but to interpret what the numbers are revealing and make informed decisions from them.
    As industries increasingly rely on data to drive results, these tests are vital for positions in finance, operations, engineering, analytics, and management. Employers value candidates who can assess risks, optimize resources, and interpret data-based trends accurately and efficiently. The better you are at distilling insights from numbers, the more strategically you'll contribute to any organization.
    Numerical reasoning goes beyond the basics of math. It requires mental agility, pattern recognition, and the ability to process information rapidly while avoiding errors. With consistent practice, you'll strengthen not just your calculation speed, but also your overall critical thinking skills in quantitative settings. The ability to filter relevant data from distractions and act decisively can give you a significant advantage in aptitude assessments and professional environments alike.`,
    quote: "Mathematics, rightly viewed, possesses not only truth, but supreme beauty.",
    author: "Bertrand Russell",
  },
  'verbal-skills': {
    title: 'Verbal Skills',
    description: `Verbal Skills tests assess your ability to comprehend, evaluate, and respond to written information accurately and effectively. These tests often feature reading comprehension, grammar correction, vocabulary usage, and verbal logic. Success requires more than just fluency — it demands the ability to think critically about what’s being said, distinguish fact from opinion, and identify nuances in meaning, tone, and context.
    In today’s workplace, strong verbal abilities are essential across almost every role — whether you're drafting emails, interpreting contracts, analyzing reports, or participating in client conversations. Your ability to grasp complex ideas quickly, communicate them clearly, and spot inconsistencies in arguments reflects directly on your professional aptitude and credibility.
    Through regular practice, you'll develop sharper comprehension, faster reading speed, and a more refined sense of language precision. These improvements translate not only to better test scores but to improved communication in real life — helping you to influence, persuade, and collaborate more effectively in both professional and academic settings.`,
    quote: "Words are, of course, the most powerful drug used by mankind.",
    author: "Mark Twain",
  },
  'abstract-reasoning': {
    title: 'Abstract Reasoning',
    description: `Abstract Reasoning tests evaluate your capacity to identify patterns, rules, and logical sequences in shapes, diagrams, or symbols. Unlike verbal or numerical tests, these problems are non-verbal and often visual, requiring you to spot consistencies and progressions without relying on language or calculations. These assessments measure fluid intelligence — your ability to learn and adapt in unfamiliar situations, solve novel problems, and think laterally.
    This type of reasoning is often a predictor of how well someone can approach tasks they haven't encountered before, especially when there are no clear instructions. It's especially relevant in technical and problem-solving roles where innovation, system design, or strategic thinking is essential. Many companies use abstract reasoning tests to identify candidates who can think beyond the obvious and connect the dots when others might miss them.
    Practicing abstract reasoning sharpens your pattern recognition and mental flexibility. It trains your brain to see relationships in visual chaos and recognize logic even when traditional cues like text or numbers are absent. Over time, you’ll become faster at understanding how complex systems evolve, a skill that pays off both in tests and in high-performance work environments.`,
    quote: '“The measure of intelligence is the ability to change.”',
    author: 'Albert Einstein',
  },
  'deductive-reasoning': {
    title: 'Deductive Reasoning',
    description: `Deductive Reasoning tests require you to apply established principles or rules to arrive at logical conclusions. These questions simulate real-world logic puzzles, where every step must be justified and each outcome must follow naturally from the given premises. You won’t rely on assumptions or instincts; instead, success demands structured, rule-based thinking.
    Such tests are especially useful in evaluating candidates for roles that require policy interpretation, legal analysis, software debugging, auditing, or anything where procedures must be followed rigorously. They help employers identify people who think critically and can apply systems thinking to a wide range of complex challenges.
    As you progress through higher levels, the scenarios grow more intricate, requiring you to manage multiple conditions, filter irrelevant details, and evaluate numerous outcomes. Mastering deductive reasoning enhances your ability to think in frameworks, anticipate consequences, and reduce errors in both testing environments and professional workflows.`,
    quote: '“Logic will get you from A to B. Imagination will take you everywhere.”',
    author: 'Albert Einstein',
  },
  'cognitive-ability': {
    title: 'Cognitive Ability',
    description: `Cognitive Ability tests measure your overall capacity to learn, solve problems, and process information efficiently. Unlike subject-specific tests, cognitive assessments are broad, evaluating mental faculties like logical reasoning, short-term memory, verbal and numerical fluency, and abstract thinking. They offer a holistic view of how quickly and accurately your brain works under time-constrained conditions.
    These assessments are often used by employers to predict long-term potential rather than specific skill sets. A high score implies that a candidate can quickly understand new concepts, adapt to complex work environments, and navigate shifting priorities with ease. In this way, cognitive ability is considered one of the best indicators of job performance across industries.
    Preparation for these tests involves more than memorization — it focuses on exercising your brain across different modes of thinking. You’ll train your focus, pattern recognition, reaction speed, and mental flexibility. Over time, this not only improves your test scores but also boosts your general problem-solving skills, helping you think clearer and act smarter in day-to-day scenarios.`,
    quote: '“Intelligence is the ability to adapt to change.”',
    author: 'Albert Einstein',
  },
  'critical-thinking': {
    title: 'Critical Thinking',
    description: `Critical Thinking tests assess your ability to logically evaluate arguments, detect inconsistencies, and make reasoned judgments based on evidence. In these assessments, you are typically given a passage or scenario followed by questions asking you to identify assumptions, judge the strength of arguments, or decide if a conclusion logically follows. The emphasis is on objective analysis and rational decision-making.
    These skills are highly valued in leadership, research, strategy, journalism, consulting, and any role where decision-making impacts outcomes. Critical thinkers are less prone to biases, less swayed by emotion, and more capable of making informed, structured choices even under pressure.
    Training in critical thinking isn’t just about answering test questions — it’s about developing a habit of reflection, questioning, and evidence-based judgment. With practice, you become more comfortable analyzing complex situations, weighing trade-offs, and communicating clear conclusions. It enhances your performance not only in tests but also in how you handle real-world decisions and debates.`,
    quote: '“The unexamined life is not worth living.”',
    author: 'Socrates',
  },
  'personality-test': {
    title: 'Personality Test',
    description: `Personality Tests are designed to explore your behavioral tendencies, emotional responses, and interpersonal traits. Unlike ability tests, these assessments don’t have right or wrong answers. Instead, they aim to determine how you typically react to various scenarios — for example, whether you're more introverted or extroverted, structured or flexible, assertive or accommodating.
    Organizations use personality tests to gauge cultural fit and predict how someone may behave within a team, handle stress, or take initiative. They also provide insights into work style preferences, such as leadership tendencies, motivation types, and collaboration patterns. This helps employers align roles with the right personality dynamics for higher productivity and satisfaction.
    Understanding your own personality traits can also be eye-opening. It can help you select better-suited career paths, strengthen self-awareness, and improve how you relate to others. While personality tests can’t be "studied for" in the traditional sense, familiarizing yourself with the traits being assessed helps you present your authentic self in a way that matches your goals.`,
    quote: '“Knowing yourself is the beginning of all wisdom.”',
    author: 'Aristotle',
  },
  'situational-judgement': {
    title: 'Situational Judgement',
    description: `Situational Judgement Tests (SJTs) are designed to simulate workplace scenarios and evaluate how you would respond in practical, often high-pressure, environments. You'll be presented with realistic situations — like team conflicts, task prioritization, or ethical dilemmas — and must select or rank the most appropriate responses. These decisions reveal your emotional intelligence, ethical grounding, and practical problem-solving skills.
    SJTs are widely used in recruitment across fields like customer service, law enforcement, healthcare, and management. They provide insights into a candidate’s judgment, professionalism, and behavioral tendencies in ways that standard aptitude tests can't capture. Employers are looking for individuals who not only know what to do, but also know *how* to do it in alignment with team values and company standards.
    To perform well, you’ll need to balance empathy, logic, and workplace protocol. Practicing SJTs helps you identify key priorities in a scenario, predict consequences of actions, and avoid common traps like overreacting or ignoring details. Over time, your responses become more instinctively aligned with good workplace judgment — a skill that continues to benefit you well beyond the test environment.`,
    quote: '“In every moment of decision, your values are your compass. Trust them.”',
    author: 'John C. Maxwell',
  },
};

const TestDifficulty = () => {

  const {isDarkMode} = useDarkMode();
  const [attendedTests, setAttendedTests] = useState([]);

  const { category, topic } = useParams();
  const navigate = useNavigate();
  const content = testContent[topic] || testContent['default'];

  const [testList, setTestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    axios.get(`https://crackit-01.onrender.com/question/getList?topic=${topic}`)
      .then(res => {
        //console.log(res.data.questions);
        setTestList(res.data.questions);
        setLoading(false);

      })
      .catch(err => {
        console.error(err);
        setLoading(false);

        if (res.response && res.response.status === 404) {
          setError('No tests available for this topic yet.');
        } else {
          setError('Failed to load tests. Please try again later.');
        }
      });

      // Fetch attended test IDs
      if (user?.email) {
        axios.get(`https://crackit-01.onrender.com/result/user/${user.email}`)
        /*axios.get(`http://localhost:3000/result/user/${user.email}`)*/
          .then(res => {
            //console.log('res.data:', res.data);
            const attendedIds = res.data.results.map(result => result.id); // 'id' from your mapped controller output
            //console.log('attendedIds:', attendedIds);
            setAttendedTests(attendedIds);
          })
          .catch(err => {
            console.error('Error fetching attended tests:', err);
          });
      }
  }, [topic]);

  const handleStartTest = (test) => {
    setSelectedTest(test);
    setShowConfirmModal(true);
  };

  const confirmStartTest = () => {
    setShowConfirmModal(false);
    // Navigate to TestPage.jsx with test data
      /*console.log('Test ID:', selectedTest._id);
      console.log('Test Topic:', selectedTest.topic);
      console.log('Test Difficulty:', selectedTest.difficulty);*/
    navigate(`/aptitude-tests/${category}/${topic}/${selectedTest.difficulty}/test`, {
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

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'secondary';
    }
  };

  const getTestDetails = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return [
          'Difficulty Level: Easy',
          'Total Questions: 10',
          'Time Allotted: 20 minutes',
          'Marking Scheme: No negative marking',
          'Target Audience: Beginners or first-time test-takers'
        ];
      case 'medium':
        return [
          'Difficulty Level: Medium',
          'Total Questions: 10',
          'Time Allotted: 15 minutes',
          'Marking Scheme: -0.5 penalty for each incorrect answer',
          'Recommended For: Intermediate-level candidates with prior exposure'
        ];
      case 'hard':
        return [
          'Difficulty Level: Hard',
          'Total Questions: 15',
          'Time Allotted: 15 minutes',
          'Marking Scheme: -1 penalty for each incorrect answer',
          'Intended For: Advanced candidates seeking a rigorous challenge'
        ];
      default:
        return [
          'Invalid difficulty level specified. Please choose from: Easy, Medium, or Hard.'
        ];
    }
  };

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <div className="fContent text-center mb-5">
          <h3 className="mb-3">{content.title}</h3>
          <p>Select a test to start practicing for your {content.title} exam.</p>
        </div>

        {/* Test List */}
        {/*console.log(error)*/}
        <Row className="mb-4">
          <Col>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (error ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fa fa-exclamation-triangle fa-3x text-warning"></i>
                  </div>
                  <h4 className="text-muted mb-3">{error}</h4>
                  <p className="text-muted">
                    Tests for this topic are coming soon. Check back later or try other topics.
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/aptitude-tests')}
                    className="mt-3"
                  >
                    Browse Other Topics
                  </Button>
                </div>
              ) : testList.length === 0 ? (
                  // Empty state - No tests found
                  <div className="text-center py-5">
                    <div className="mb-4">
                      <i className="fa fa-clipboard-list fa-3x text-info"></i>
                    </div>
                    <h4 className="text-muted mb-3">No Tests Available</h4>
                    <p className="text-muted">
                      There are currently no tests available for {content.title}.
                    </p>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate('/aptitude-tests')}
                      className="mt-3"
                    >
                      Explore Other Topics
                    </Button>
                  </div>
                ) : (
                    testList.map((test, index) => {
                      const isExpanded = expandedIndex === index;
                      const details = getTestDetails(test.difficulty);
                      const isAttended = attendedTests.includes(test._id);
                      //console.log('isAttended:', isAttended);

                      return (
                        <Card
                          key={test._id}
                          className={`mb-3 shadow-sm ${isAttended ? 'attended' : ''}`}
                        >
                          {/*console.log(test)*/}
                          <Card.Body className="d-flex flex-column p-0">
                            <div className="d-flex justify-content-between align-items-center">                        
                              {isAttended ? (
                                <div className="p-0 me-2 text-success" style={{ fontSize: '1.2rem' }}>
                                  <FaCheck />
                                </div>
                              ) : (
                                <Button
                                  variant="link"
                                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                  className="p-0 me-2"
                                >
                                  {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                                </Button>
                              )}

                              <div className="flex-grow-1">
                                <strong>{test.testName}</strong>
                              </div>

                              <div className="d-flex align-items-center gap-3">
                                <Badge bg={getDifficultyColor(test.difficulty)} className="text-capitalize">
                                  {test.difficulty}
                                </Badge>
                                <FaStar className="text-warning" />
                                {/* <FaCheckCircle className="text-success" /> */}
                                {/* <FaTimesCircle className="text-danger" /> */}
                              </div>
                            </div>

                            <Collapse in={isExpanded && !isAttended}>
                              <div className="mt-3">
                                <ul className="mb-0 text-muted ps-4">
                                  {details.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                  ))}
                                </ul>
                                {/* Start Button - Bottom Right */}
                                <div className="d-flex justify-content-end mt-3">
                                  <Button 
                                    variant="primary" 
                                    size="md"
                                    onClick={() => handleStartTest(test)}
                                    className="p-2 px-3 rounded-button"
                                  >
                                    Start Test
                                  </Button>
                                </div>
                              </div>
                            </Collapse>
                          </Card.Body>
                        </Card>
                      );
                    })
                  )
              )}
          </Col>
        </Row>

        {/* Confirmation Modal */}
        <Modal show={showConfirmModal} onHide={cancelStartTest} centered>
          <Modal.Header closeButton>
            <Modal.Title>Start Test Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTest && (
              <div>
                <h5>Are you ready to start the test?</h5>
                <hr />
                <p><strong>Topic:</strong> {selectedTest.topic}</p>
                <p><strong>Difficulty:</strong> <Badge bg={getDifficultyColor(selectedTest.difficulty)}>{selectedTest.difficulty}</Badge></p>
                <div className="mt-3">
                  <h6>Test Details:</h6>
                  <ul className="text-muted">
                    {getTestDetails(selectedTest.difficulty).map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="alert alert-warning mt-3">
                  <strong>Important:</strong> Once you start the test, the timer will begin immediately. Make sure you're ready!
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelStartTest}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmStartTest}>
              Yes, Start Test
            </Button>
          </Modal.Footer>
        </Modal>


        {/* Test Description */}
        <Row className="mt-5">
          <Col md={10} className="mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <Card className="p-4 rounded-4 shadow-lg" style={{ background: '#f9f9f9', border: '1px solid #ddd' }}>
                <div className="text-center mb-4">
                  <h4 className="mb-2">About {content.title}</h4>
                  <div style={{ width: '60px', height: '4px', background: '#3fa28c', margin: '0 auto' }}></div>
                </div>
                {content.description
                  .trim()
                  .split('\n')
                  .filter(paragraph => paragraph.trim())
                  .map((para, idx) => (
                    <p key={idx} style={{ textAlign: 'justify', lineHeight: '1.7' }}>
                      {para.trim()}
                    </p>
                ))}
              </Card>
            </motion.div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={8} className="mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-3 bg-light border-0 rounded-3">
                <blockquote className="blockquote mb-0 text-center">
                  <p className="mb-2">{content.quote}</p>
                  <footer className="blockquote-footer mt-2">{content.author}</footer>
                </blockquote>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <MFooter />
    </>
  );
};

export default TestDifficulty;