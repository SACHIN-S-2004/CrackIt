import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDarkMode } from './DarkMode';
import { Notify } from './onNotify';
import '../registerStyle.css';

const FeedbackModal = ({ show, onClose }) => {
  const [form, setForm] = useState({
    Fname: '',
    Lname: '',
    email: '',
    subject: '',
    message: '',
  });
  const { isDarkMode } = useDarkMode();
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    // Fetch user data and populate form
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
          setForm({
            Fname: userData.Fname || '',
            Lname: userData.Lname || '',
            email: userData.email || '',
          });
      } catch (error) {
        console.error("⚠️ Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [show]);
  
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitting(true);
      try {
        let token = localStorage.getItem("token");
        //console.log(form);
        /*await axios.post("http://localhost:3000/user/contact", form, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });*/
        await axios.post("https://crackit-01.onrender.com/user/contact", form, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        Notify("Message Sent Successfully!", "We will get back to you soon.");
        setForm({ Fname: '', Lname: '', email: '', subject: '', message: '' });
        setErrors({});
        onClose();
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === "User not found") {
          setErrors({ email: "User not found" });
        } else {
          Notify("Server Error!", "Please try again later.");
          console.error("⚠️ Server error:", error.message);
          onClose();
        }
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleModalClose = () => {
    setForm({ Fname: '', Lname: '', email: '', subject: '', message: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="registration-modal-backdrop">
      <div className={`registration-modal-card ${isDarkMode ? 'dark-mode' : ''}`}>
        <button className="btn-close custom-close-btn" onClick={handleModalClose}></button>

        <div className="text-center mb-4">
          <h2 className="fw-bold">Contact Us</h2>
          <p className="text-muted no-style">We're always happy to hear from you—whether it's a question, comment, or suggestion. Just fill out the form below, and we'll get back to you as quickly as we can. Most inquiries receive a response within 24 hours, often even faster.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-3">
            <div className="row g-2">
              <div className="col">
                <label className="form-label">First Name</label>
                <input type="text" className={`form-control ${errors.Fname ? 'is-invalid' : ''}`} name="Fname" value={form.Fname} onChange={handleChange} disabled={true}/>
                <div className="invalid-feedback">{errors.Fname}</div>
              </div>
              <div className="col">
                <label className="form-label">Last Name</label>
                <input type="text" className={`form-control ${errors.Lname ? 'is-invalid' : ''}`} name="Lname" value={form.Lname} onChange={handleChange} disabled={true}/>
                <div className="invalid-feedback">{errors.Lname}</div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={form.email} onChange={handleChange} disabled={true}/>
            <div className="invalid-feedback">{errors.email}</div>
          </div>

            {/* Subject */}
            <div className="mb-3">
                <label className="form-label">Subject</label>
                <input type="text" className={`form-control ${errors.subject ? 'is-invalid' : ''}`} name="subject" value={form.subject ?? ''} onChange={handleChange} />
                <div className="invalid-feedback">{errors.subject}</div>
            </div>

            {/* Message */}
            <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className={`form-control ${errors.message ? 'is-invalid' : ''}`} name="message" value={form.message ?? ''} onChange={handleChange}></textarea>
                <div className="invalid-feedback">{errors.message}</div>
            </div>

          {/* Terms */}
          {/*<div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name="terms" id="terms" checked={form.terms} onChange={handleChange} />
            <label className="form-check-label" htmlFor="terms">
              I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>
          {errors.terms && <div className="text-danger small mt-1">{errors.terms}</div>}*/}

          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
            {submitting ? (
              <>
                Sending Message...
                <span className="spinner-ring" />
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted text-center">We appreciate your feedback!</p>
        </div>
        </div>
    </div>
  );
};

export default FeedbackModal;