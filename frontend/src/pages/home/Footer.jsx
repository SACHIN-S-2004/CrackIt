import React from 'react';
import './style.css';

export function MFooter() {
  return (
    <div className="d-flex flex-column text-center justify-content-between border-top pt-3 mb-4">
      <p className="mb-2 mb-md-0 text-center">© 2025 CrackIt. All rights reserved.</p>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <h5 className="pacifico-font text-primary mb-3">CrackIt</h5>
            <p className="p-2 text-white-50">Empowering students and professionals to excel in aptitude tests through innovative learning technology and comprehensive practice materials.</p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled text-muted">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Stay Updated</h6>
            <p className="p-2 text-white-50">Subscribe to our newsletter for the latest updates and study tips.</p>
            <div className="d-flex">
              <input type="email" placeholder="Enter your email" className="form-control rounded-button" />
              <button className="btn btn-primary ms-2 rounded-button">Subscribe</button>
            </div>
          </div>
        </div>
        <MFooter/>
      </div>
    </footer>
  );
};

export default Footer;
