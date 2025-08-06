import React, { useState } from 'react';
import axios from "axios";
import { useDarkMode } from './DarkMode';
import '../registerStyle.css';

const RegistrationModal = ({ show, onClose, ShowLogin, onNotify }) => {
  const [form, setForm] = useState({
    Fname: '',
    Lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  /*terms: false,*/
  const { isDarkMode } = useDarkMode();
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const digitsOnly = form.phone.toString().replace(/\D/g, '');
    if (!form.Fname.trim()) newErrors.Fname = 'First name is required';
    if (!form.Lname.trim()) newErrors.Lname = 'Last name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (form.password.length < 6) newErrors.password = 'At least 8 characters required';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (form.phone && digitsOnly.length !== 10) newErrors.phone = 'Invalid phone number';
    /*if (!form.terms) newErrors.terms = 'You must agree to the terms';*/
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmitting(true);
      try {
        await axios.post("https://crackit-01.onrender.com/user/register", form);
        onNotify("Registration Successful!", "Please login...");
        setForm({ Fname: '', Lname: '', email: '', password: '', confirmPassword: '', phone: '' });
        setErrors({});
        onClose();
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === "User already exists") {
          setErrors({ email: "Email already exists" });
        } else {
          onNotify("Registration Failed!", "Please try again later.");
          console.error("⚠️ Registration error:", error.message);
          onClose();
        }
      }
      finally{
        setSubmitting(false);
      }
    }
    
  };

    const handleModalClose = () => {
    setForm({ Fname: '', Lname: '', email: '', password: '', confirmPassword: '', phone: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="registration-modal-backdrop ">
      <div className={`registration-modal-card ${isDarkMode ? 'dark-mode' : ''}`}>
        <button className="btn-close custom-close-btn" onClick={handleModalClose}></button>

        <div className="text-center mb-4">
          <h2 className="fw-bold">Create Your Account</h2>
          <p className="text-muted">Join thousands of successful test-takers and start your journey to excellence</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="mb-3">
            <div className="row g-2">
              <div className="col">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.Fname ? 'is-invalid' : ''}`}
                  name="Fname"
                  value={form.Fname}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.Fname}</div>
              </div>
              <div className="col">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.Lname ? 'is-invalid' : ''}`}
                  name="Lname"
                  value={form.Lname}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">{errors.Lname}</div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={form.email} onChange={handleChange} />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                <i className={`ri-${showPassword ? 'eye-line' : 'eye-off-line'}`}></i>
              </button>
            </div>
            <div className="invalid-feedback d-block">{errors.password}</div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirm ? 'text' : 'password'}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirm(!showConfirm)}>
                <i className={`ri-${showConfirm ? 'eye-line' : 'eye-off-line'}`}></i>
              </button>
            </div>
            <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number <span className="text-muted">(Optional)</span></label>
            <input type="Number" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} name="phone" value={form.phone} onChange={handleChange} />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>

          {/* Terms */}
          {/*<div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" name="terms" id="terms" checked={form.terms} onChange={handleChange} />
            <label className="form-check-label" htmlFor="terms">
              I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
            </label>
            </div>*/}
          {errors.terms && <div className="text-danger small mt-1">{errors.terms}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
            {submitting ? (
              <>
                Creating Account...
                <span className="spinner-ring" />
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-muted mt-4">
          Already have an account?<button className="btn btn-link text-primary p-1" onClick={ShowLogin}>Sign in</button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationModal;
