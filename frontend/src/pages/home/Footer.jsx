import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../components/userToken';
import ComingSoonModal from '../../components/ComingSoonModal';
import { Notify } from '../../components/onNotify';
import './style.css';

export function MFooter() {
  return (
    <div className="d-flex flex-column text-center justify-content-between border-top pt-3 mb-4">
      <p className="mb-2 mb-md-0 text-center">© 2025 CrackIt. All rights reserved.</p>
    </div>
  )
}

const Footer = () => {
  const [showCSoonModal, setShowCSoonModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  function showContactUsModal(){
    if (!isAuthenticated) {
      // Trigger navbar login modal
      Notify("Authentication Required", "Log in to proceed! ....");
    } else {
      window.dispatchEvent(new CustomEvent('openContactModal'));
      return;
    }
  }

  return (
    <>
    <ComingSoonModal show={showCSoonModal} onHide={() => setShowCSoonModal(false)} /> 
    <footer className="footer pt-5 pb-3">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <h5 className="pacifico-font text-primary mb-3">CrackIt</h5>
            <p className="p-2 no-style">Empowering students and professionals to excel in aptitude tests through innovative learning technology and comprehensive practice materials.</p>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled text-muted">
              <li>
                <Link className="{isDarkMode ? footer-link : Wfooter-link}" onClick={() => window.dispatchEvent(new CustomEvent('openAboutUsModal'))}>
                  About Us
                </Link>
              </li>
              <li>
                <Link className="{isDarkMode ? footer-link : Wfooter-link}" onClick={() => showContactUsModal()}>
                  Contact
                </Link>
              </li>
              <li>
                <Link className="{isDarkMode ? footer-link : Wfooter-link}" onClick={() => window.dispatchEvent(new CustomEvent('elseCase'))}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Stay Updated</h6>
            <p className="p-2 no-style">Subscribe to our newsletter for the latest updates and study tips.</p>
            <div className="d-flex">
              <input type="email" placeholder="Enter your email" className="form-control rounded-button" />
              <button className="btn btn-primary ms-2 rounded-button custom-bttn" onClick={() => setShowCSoonModal(true)}>Subscribe</button>
            </div>
          </div>
        </div>
        <MFooter/>
      </div>
    </footer>
    </>
  );
};

export default Footer;
