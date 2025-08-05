import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../ComingSoonModal.css'; // Don't forget this

const ComingSoonModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered animation>
      <div className="coming-soon-modal text-center bg-dark text-white p-5 rounded">
        <div className="floating-emoji emoji-left">🎉</div>
        <div className="floating-emoji emoji-right">🚀</div>

        <h2 className="glow-text mb-3">Coming Soon</h2>
        <p className="mb-4 text-muted fs-5">
          We're working on something amazing. Stay tuned!
        </p>

        <Button variant="outline-light" onClick={onHide}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ComingSoonModal;
