import React, { useEffect, useRef } from 'react';

function Notify({ message, message2, onClose, onShowLogin }) {
  const progressBarRef = useRef(null);

  useEffect(() => {
    let width = 0;
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onClose();
          if (message === "Registration Successful!") {
            onShowLogin();
          }
        }, 1000);
      } else {
        width += 2;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = width + "%";
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onClose, onShowLogin]);

  return (
    <div
      id="successNotify"
      className="position-fixed top-0 end-0 m-3"
      style={{ zIndex: 1060, maxWidth: '350px', animation: 'slideInRight 0.4s ease-out' }}
    >
      <div className="alert alert-success shadow rounded-4 p-3 d-flex flex-column" role="alert">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center gap-2">
            <i className="ri-checkbox-circle-line fs-4 text-success"></i>
            <div>
              <strong className="fs-6">{message}</strong>
              <div className="text-muted small">{message2}</div>
            </div>
          </div>
          {/*<button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>*/}
        </div>
        <div className="progress mt-3" style={{ height: '5px', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            ref={progressBarRef}
            className="progress-bar bg-gradient"
            role="progressbar"
            style={{
              width: '0%',
              transition: 'width 0.4s linear',
              backgroundImage: 'linear-gradient(to right, #0d6efd, #0dcaf0)',
            }}
          ></div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideInRight {
            0% {
              opacity: 0;
              transform: translateX(50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Notify;
