import React, { useState, forwardRef, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import {useDarkMode} from '../../components/DarkMode';
import RegistrationModal from '../../components/RegisterModal';
import UpdateProfileModal from '../../components/EditProfileModal';
import LoginModal from '../../components/LoginModal';
import Notify from '../../components/onNotify';
import useAuthStore from '../../components/userToken';
import ComingSoonModal from '../../components/ComingSoonModal';
import './style.css';

const Navbar = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [UpdateProfile, setUpdateProfile] = useState(false);
  const [notifyMessage1, setNotifyMessage1] = useState("");
  const [notifyMessage2, setNotifyMessage2] = useState("");
  const [showCSoonModal, setShowCSoonModal] = useState(false);

  const [source, setSource] = useState("");

  const { isAuthenticated, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navigate = useNavigate();

  const handleNotify = (message, message2) => {
    setNotifyMessage1(message);
    setNotifyMessage2(message2);
  };
  
  const updateProfileInvoke = (message) => {
    setNotifyMessage1(message);
  };

  const handleLogout = () => {
    setNotifyMessage1("Logging out!...");
    setNotifyMessage2("");
    
    setTimeout(() => {
      handleNotifyClose();
      //localStorage.removeItem("token");
      //logout();
    }, 4000);
    setTimeout(() => logout(), 3500);
    setTimeout(() => navigate('/'), 3500);
  };

  const handleNotifyClose = () => {
    setNotifyMessage1("");
    setNotifyMessage2("");
  };

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        fontWeight: 'bold',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {children}
    </div>
  ));

  useEffect(() => {
    const handleOpenLogin = () => setShowLogin(true);
    window.addEventListener('openLoginModal', handleOpenLogin);
    return () => window.removeEventListener('openLoginModal', handleOpenLogin);
  }, []);

  return (
    <nav className="navbar navbar-expand-md bg-white fixed-top shadow-sm p-2">
      <div className="container px-2 px-md-2">
        <Link className="navbar-brand d-flex align-items-center logo-wrapper" to="/">
          <img src="/CrackItPNG2.png" alt="Logo" className="logo-img no-vertical-padding" />
        </Link>
        {/* LOGO CONTAINER */}

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
          <i className="ri-menu-line fs-3"></i>
        </button>
        {/*console.log(localStorage.getItem('token'))*/}
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarMenu">

          {/*((localStorage.getItem('token'))!="null")*/isAuthenticated?(
          <div className="collapse navbar-collapse" id="navbarMenu">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-md-4">
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/aptitude-tests">Tests</Link>
                </li>
                <li className="nav-item"><a type="button" className="nav-link text-dark" onClick={() => setShowCSoonModal(true)}>Resources</a></li>
                {/*<li className="nav-item">
                  <Link className="nav-link text-dark" to="/about" >About</Link>
                </li>*/}
                <li className="nav-item"><a type="button" className="nav-link text-dark" onClick={() => setShowCSoonModal(true)}>About</a></li>
              </ul>
              {/* Dark Mode Toggle */}
              <button 
                className="dark-mode-toggle me-3"
                onClick={toggleDarkMode}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <i className={`ri-${isDarkMode ? 'sun' : 'moon'}-line`}></i>
              </button>

              {/* Replace react-bootstrap Dropdown with a custom dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle">
                  {(() => {
                    const user = JSON.parse(localStorage.getItem('user'));
                    const initials = user?.Fname && user?.Lname 
                      ? `${user.Fname.trim()[0]}${user.Lname.trim()[0]}`.toUpperCase() 
                      : 'U';
                    return initials;
                  })()}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    minWidth: '150px',
                    backgroundColor: '#29A5F0',
                    borderRadius: '8px',
                  }}
                >
                  <Dropdown.Item onClick={() => { setUpdateProfile(true); setSource("profile");}} /*href="/profile"*/ className="text-white">Edit Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => { setUpdateProfile(true); setSource("password");}} /*href="/profile"*/ className="text-white">Change Password</Dropdown.Item>
                  <Dropdown.Item onClick={() => { navigate("/performance-tracker");}} /*href="/profile"*/ className="text-white">Performance Tracker</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout} className="text-white">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

          </div>
          ):(
            <div className="d-flex align-items-center">
              {/* Dark Mode Toggle for non-authenticated users */}
              <button 
                className="dark-mode-toggle me-3"
                onClick={toggleDarkMode}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <i className={`ri-${isDarkMode ? 'sun' : 'moon'}-line`}></i>
              </button>
              <button className="btn btn-outline-primary me-2 rounded-button" onClick={() => setShowLogin(true)}>Login</button>
              <button className="btn btn-primary rounded-button" onClick={() => setShowRegister(true)}>Register</button>
            </div>
          )}
        </div>
      </div>
      <RegistrationModal show={showRegister} onClose={() => setShowRegister(false)}
        ShowLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        onNotify={handleNotify}
      />
      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} 
        ShowRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onNotify={handleNotify}
      />
      {notifyMessage1 && (
        <Notify
          message={notifyMessage1}
          message2={notifyMessage2}
          onClose={handleNotifyClose}
          onShowLogin={() => setShowLogin(true)}
          /*onShowLogin={() => {
            // Only show login if user explicitly requests it
            if (!notifyMessage1.includes("Logged out")) {
              setShowLogin(true);
            }
          }}*/
        />
      )}
      <UpdateProfileModal show={UpdateProfile} onClose={() => setUpdateProfile(false)}
        onNotify={handleNotify} source={source}
      />
      <ComingSoonModal show={showCSoonModal} onHide={() => setShowCSoonModal(false)} />
    </nav>
  );
};

export default Navbar;