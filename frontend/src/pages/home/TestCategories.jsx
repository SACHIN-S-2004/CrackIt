import React from 'react';
import './style.css';

const categories = [
  { icon: 'ri-calculator-line', title: 'Numerical Reasoning', desc: 'Test your mathematical and numerical problem-solving abilities with complex calculations and data interpretation.' },
  { icon: 'ri-chat-3-line', title: 'Verbal Reasoning', desc: 'Evaluate your language comprehension, vocabulary, and ability to understand written information effectively.' },
  { icon: 'ri-puzzle-line', title: 'Logical Reasoning', desc: 'Challenge your logical thinking and pattern recognition skills with abstract and analytical problems.' },
  { icon: 'ri-compass-3-line', title: 'Spatial Reasoning', desc: 'Assess your ability to visualize and manipulate objects in three-dimensional space and understand spatial relationships.' },
  { icon: 'ri-time-line', title: 'Speed & Accuracy', desc: 'Measure your processing speed and attention to detail with time-pressured tasks and precision challenges.' },
  { icon: 'ri-brain-line', title: 'Memory & Concentration', desc: 'Test your working memory, concentration levels, and ability to retain and recall information accurately.' }
];

const Categories = () => {
  return (
    <section id="test-categories" className="py-5 bg-white">
      <div className="container text-center mt-3">
        <h2 className="fw-bold mb-4 ">Test Categories</h2>
        <p className="text-muted mb-5">Choose from our comprehensive range of aptitude tests designed to evaluate different cognitive abilities and skills.</p>
        <div className="row g-4 p-2">
          {categories.map((cat, i) => (
            <div key={i} className="col-md-4">
              <div className="card shadow-sm h-100 border border-light rounded-3 p-4 category-card text-center">
                <div className="icon-box mx-auto mb-3">
                  <i className={`${cat.icon} fs-3`}></i>
                </div>
                <h5 className="fw-bold">{cat.title}</h5>
                <p className="text-muted">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
