import React, { useEffect, useState } from 'react';
import { Card, Table, Spinner, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import {MFooter} from '../components/common/Footer';
import { Notify } from '../utils/Notify';

const PerformanceTracker = () => {
  const [activeCategory, setActiveCategory] = useState('Numerical Reasoning');
  const [performanceData, setPerformanceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem("token");
    
      if (!token) {
        Notify("Authentication Required", "Log in to proceed! ....");
        navigate("/");
        return;
      }
    
    }, [navigate]);

  const categories = [
    'Numerical Reasoning',
    'Verbal Skills',
    'Logical Reasoning',
    'Abstract Reasoning',
    'Deductive Reasoning',
    'Cognitive Ability',
    'Personality Test',
    'Situational Judgment'
  ];

  const visibleCount = 4;
  const maxPageIndex = Math.floor((categories.length - 1) / visibleCount);
  const visibleCategories = categories.slice(pageIndex * visibleCount, (pageIndex + 1) * visibleCount);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(`https://crackit-01.onrender.com/result/user/${user.email}`);

        // Group by topic
        const grouped = {};
        res.data.results.forEach((test) => {
          if (!grouped[test.topic]) grouped[test.topic] = [];
          grouped[test.topic].push(test);
        });

        setPerformanceData(grouped);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching performance data:', err);
      }
    };

    fetchPerformance();
  }, []);

  const handleScrollRight = () => {
    if (pageIndex < maxPageIndex) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleScrollLeft = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><Spinner animation="border" /></div>;
  }

  return (
    <>
      <Navbar />
        <div className="container mt-4 py-4">
        <h3 className="mb-4 mt-4">📊 Your Performance Tracker</h3>

        <div className="d-flex align-items-center mb-4 overflow-hidden position-relative" style={{ height: '3rem' }}>
            {pageIndex > 0 && (
            <Button variant="light" className="me-2" onClick={handleScrollLeft}>⬅️</Button>
            )}

            <div className="d-flex flex-grow-1 justify-content-center overflow-hidden" style={{ minWidth: 0 }}>
            <AnimatePresence mode="wait">
                <motion.div
                key={pageIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="d-flex gap-2 flex-nowrap"
                >
                {visibleCategories.map((cat) => (
                    <Button
                    key={cat}
                    variant={cat === activeCategory ? 'primary' : 'outline-secondary'}
                    onClick={() => setActiveCategory(cat)}
                    >
                    {cat}
                    </Button>
                ))}
                </motion.div>
            </AnimatePresence>
            </div>

            {pageIndex < maxPageIndex && (
            <Button variant="light" className="ms-2" onClick={handleScrollRight}>➡️</Button>
            )}
        </div>

        <PerformanceTabContent data={performanceData[activeCategory] || []} />
        </div>
        <MFooter />
    </>
  );
};

const PerformanceTabContent = ({ data }) => {
  const graphData = data.length ? data.map((test, index) => ({
    name: `Test ${index + 1}`,
    score: test.score,
  })) : [{ name: "No Tests", score: 0 }];

  return (
    <>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#007bff" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
          {!data.length && (
            <motion.p
              className="text-center mt-3 p-3 border border-secondary rounded bg-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              This space is waiting for your first win. Go get it!
            </motion.p>

          )}
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3">📄 Test History</h5>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Test Name</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((test, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{test.testName || 'Untitled'}</td>
                  <td>{new Date(test.date).toLocaleDateString()}</td>
                  <td>{test.score} / {test.total || 10}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default PerformanceTracker;