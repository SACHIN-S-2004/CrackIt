import React, {useState} from 'react';
import './style.css';
import ComingSoonModal from '../../components/ComingSoonModal';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    image: 'https://readdy.ai/api/search-image?query=professional%20young%20woman%20smiling%20confident%20business%20attire%20headshot%20portrait%20clean%20white%20background&width=80&height=80&seq=testimonial001&orientation=squarish',
    text: 'AptitudeAce helped me land my dream job! The personalized practice sessions and detailed analytics made all the difference in my preparation.',
  },
  {
    name: 'Michael Chen',
    role: 'Finance Analyst',
    image: 'https://readdy.ai/api/search-image?query=professional%20young%20man%20smiling%20confident%20business%20suit%20headshot%20portrait%20clean%20white%20background&width=80&height=80&seq=testimonial002&orientation=squarish',
    text: 'The comprehensive test bank and real-time feedback system are incredible. I improved my scores by 40% in just two months!',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Graduate Student',
    image: 'https://readdy.ai/api/search-image?query=professional%20young%20woman%20smiling%20confident%20business%20attire%20headshot%20portrait%20clean%20white%20background%20diverse&width=80&height=80&seq=testimonial003&orientation=squarish',
    text: 'Perfect for graduate school prep! The adaptive learning system identified my weak areas and helped me focus my study time effectively.',
  }
];

const Testimonials = () => {
  const [showCSoonModal, setShowCSoonModal] = useState(false);

  return (
    <>
      <ComingSoonModal show={showCSoonModal} onHide={() => setShowCSoonModal(false)} /> 
      {/* First Section: User Testimonials 
      <section className="py-5 bg-light">
        <div className="container px-4 px-md-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6 text-dark mb-3">What Our Users Say</h2>
            <p className="fs-4 text-muted">Success stories from our community</p>
          </div>

          <div className="row g-4">
            {testimonials.map((user, i) => (
              <div className="col-md-4" key={i}>
                <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm h-100">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      width="48"
                      height="48"
                      className="rounded-circle object-fit-cover me-3"
                      style={{ objectFit: 'cover', width: '48px', height: '48px' }}
                    />
                    <div>
                      <h5 className="fw-semibold text-dark mb-1">{user.name}</h5>
                      <p className="text-muted mb-0 small">{user.role}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <i className="ri-star-fill text-warning me-1"></i>
                    <i className="ri-star-fill text-warning me-1"></i>
                    <i className="ri-star-fill text-warning me-1"></i>
                    <i className="ri-star-fill text-warning me-1"></i>
                    <i className="ri-star-fill text-warning"></i>
                  </div>
                  <p className="text-muted fst-italic">"{user.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}
      {/* Second Section: CTA (Call-To-Action) */}
      <section className="py-5 call-to-action text-white text-center">
        <div className="container px-4 px-sm-5">
          <h2 className="display-5 fw-bold mb-4 text-white">Ready to Discover Your Potential?</h2>
          <p className="fs-5 text-blue-100 mb-5">
            Join thousands of professionals who have unlocked their cognitive abilities through our comprehensive aptitude testing platform. Start your journey today.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-5">
            <a className="btn btn-light text-primary px-4 py-3 fs-5 rounded-button hover-scale" href="#">Start Your Test</a>
            <button className="btn btn-outline-light px-4 py-3 fs-5 rounded-button" onClick={() => setShowCSoonModal(true)}>View Sample Questions</button>
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
