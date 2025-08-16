import React, { useEffect, useRef, useState } from "react";

// Global handler placeholder
let notifyHandler = null;

// This is the global function you’ll call anywhere
export const Notify = (message, message2 = "") => {
  if (notifyHandler) {
    notifyHandler(message, message2);
  } else {
    console.warn("Notify called but no handler registered yet.");
  }
};

const NotifyContainer = () => {
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const progressBarRef = useRef(null);

  // register this component as the global handler
  useEffect(() => {
    notifyHandler = (m1, m2) => {
      setMsg1(m1);
      setMsg2(m2);
    };
  }, []);

  useEffect(() => {
    if (!msg1) return;

    let width = 0;
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => handleClose(), 1000);
      } else {
        width += 2;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = width + "%";
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [msg1]);

  const handleClose = () => {
    if (msg1 === "Registration Successful!" || msg1 === "Your session is expired!") {
      window.dispatchEvent(new Event("openLoginModal"));
    }
    setMsg1("");
    setMsg2("");
  };

  if (!msg1) return null;

  return (
    <div
      id="successNotify"
      className="position-fixed top-0 end-0 m-3"
      style={{ zIndex: 1060, maxWidth: "350px", animation: "slideInRight 0.4s ease-out" }}
    >
      <div className="alert alert-success shadow rounded-4 p-3 d-flex flex-column" role="alert">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center gap-2">
            <i className="ri-checkbox-circle-line fs-4 text-success"></i>
            <div>
              <strong className="fs-6">{msg1}</strong>
              <div className="text-muted small">{msg2}</div>
            </div>
          </div>
        </div>
        <div className="progress mt-3" style={{ height: "5px", borderRadius: "4px", overflow: "hidden" }}>
          <div
            ref={progressBarRef}
            className="progress-bar bg-gradient"
            role="progressbar"
            style={{
              width: "0%",
              transition: "width 0.4s linear",
              backgroundImage: "linear-gradient(to right, #0d6efd, #0dcaf0)",
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
};

export default NotifyContainer;