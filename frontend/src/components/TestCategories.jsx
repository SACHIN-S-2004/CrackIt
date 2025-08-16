import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { useDarkMode } from './DarkMode';
import Navbar from '../pages/home/Navbar';
import { MFooter } from '../pages/home/Footer';
import { Notify } from './onNotify';
import '../TestCategories.css';

const TestCategories = () => {

  const { isDarkMode } = useDarkMode();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      
      Notify("Your session is expired!", "Please login...");
      navigate("/");
      return;
    }
  
  }, [navigate]);

  const categories = [
    {
      category: 'numerical',
      topic: 'numerical-reasoning',
      title: 'Numerical Reasoning',
      imageSrc: 'https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_55533927.jpg',
      imageAlt: 'Numerical Aptitude Test',
      srcSet: 'https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_55533927.jpg 800w, https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_55533927-600x400.jpg 600w, https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_55533927-768x512.jpg 768w',
    },
    {
      category: 'verbal',
      topic: 'verbal-skills',
      title: 'Verbal Skills',
      imageSrc: 'https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_537159163.jpg',
      imageAlt: 'Verbal Aptitude Test',
      srcSet: 'https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_537159163.jpg 800w, https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_537159163-600x400.jpg 600w, https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_537159163-768x512.jpg 768w',
    },
    {
      category: 'verbal',
      topic: 'logical-reasoning',
      title: 'Logical Reasoning',
      imageSrc: 'https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_574535839.jpg',
      imageAlt: 'Logical Reasoning',
      srcSet: 'https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_574535839.jpg 800w, https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_574535839-600x400.jpg 600w, https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_574535839-768x512.jpg 768w',
    },
    {
      category: 'nonverbal',
      topic: 'abstract-reasoning',
      title: 'Abstract Reasoning',
      imageSrc: 'https://aptitude-test.com/wp-content/uploads/2023/12/patterns.png',
      imageAlt: 'Abstract Reasoning',
      srcSet: 'https://aptitude-test.com/wp-content/uploads/2023/12/patterns.png 800w, https://aptitude-test.com/wp-content/uploads/2023/12/patterns-400x400.png 400w, https://aptitude-test.com/wp-content/uploads/2023/12/patterns-768x768.png 768w',
    },
    {
      category: 'verbal',
      topic: 'deductive-reasoning',
      title: 'Deductive Reasoning',
      imageSrc: 'https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_370742959.jpg',
      imageAlt: 'Deductive Reasoning',
      srcSet: 'https://aptitude-test.com/wp-content/uploads/2023/12/AdobeStock_370742959.jpg 600w',
    },
    {
      category: 'cognitive',
      topic: 'cognitive-ability',
      title: 'Cognitive Ability',
      imageSrc: 'https://aptitude-test.com/wp-content/uploads/2023/12/bigstock-Close-Up-Photo-Of-Beautiful-Yo-215907727-1.jpg',
      imageAlt: 'Cognitive Ability',
      srcSet: 'https://aptitude-test.com/wp-content/uploads/2023/12/bigstock-Close-Up-Photo-Of-Beautiful-Yo-215907727-1.jpg 900w, https://aptitude-test.com/wp-content/uploads/2023/12/bigstock-Close-Up-Photo-Of-Beautiful-Yo-215907727-1-599x400.jpg 599w, https://aptitude-test.com/wp-content/uploads/2023/12/bigstock-Close-Up-Photo-Of-Beautiful-Yo-215907727-1-768x513.jpg 768w',
    },
    {
      category: 'personality',
      topic: 'personality-test',
      title: 'Personality Test',
      imageSrc: 'https://aptitude-test.com/wp-content/uploads/2023/12/iam.jpg',
      imageAlt: 'Personality Test',
      srcSet: 'https://aptitude-test.com/wp-content/uploads/2023/12/iam.jpg 300w',
    },
    {
      category: 'situational',
      topic: 'situational-judgement',
      title: 'Situational Judgement',
      imageSrc: 'https://aptitude-test.com/wp-content/uploads/2023/12/toxic-workplace-issues.jpg',
      imageAlt: 'Situational Judgement',
      srcSet: 'https://aptitude-test.com/wp-content/uploads/2023/12/toxic-workplace-issues.jpg 1146w, https://aptitude-test.com/wp-content/uploads/2023/12/toxic-workplace-issues-573x400.jpg 573w, https://aptitude-test.com/wp-content/uploads/2023/12/toxic-workplace-issues-768x536.jpg 768w',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <div className="fContent text-center mb-5">
          <h3 className="mb-3">Practice Tests by Category</h3>
          <p>Find the test prep materials suitable for your needs. Select the relevant category below.</p>
        </div>
        <Row className="align-center">
          {categories.map((category, index) => (
            <Col key={index} md={3} sm={6} className="mb-4">
              <motion.div
                className={`category-card box has-hover centerHList showPointer box-shadow-2 box-bounce box-text-bottom ${isDarkMode ? 'dark-card' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/aptitude-tests/${category.category}/${category.topic}`} className="text-decoration-none">
                  <div className="box-image">
                    <div className="image-overlay-add image-cover" style={{ paddingTop: '80%' }}>
                      <img
                        decoding="async"
                        src={category.imageSrc}
                        data-src={category.imageSrc}
                        alt={category.imageAlt}
                        className="lazy-load img-fluid"
                        srcSet={category.srcSet}
                        sizes="auto, (max-width: 800px) 100vw, 800px"
                      />
                      <div className="overlay" style={{ backgroundColor: 'rgba(63, 162, 140, 0.1)' }}></div>
                    </div>
                  </div>
                  <div className="box-text text-center">
                    <div className="box-text-inner">
                      <h4>{category.title}</h4>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      <MFooter />
    </>
  );
};

export default TestCategories;