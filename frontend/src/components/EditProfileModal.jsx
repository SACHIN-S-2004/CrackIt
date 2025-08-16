import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDarkMode } from './DarkMode';
import { Notify } from './onNotify';
import '../registerStyle.css';

const UpdateProfileModal = ({ show, onClose, source }) => {
  const [form1, setForm1] = useState({
    Fname: '',
    Lname: '',
    email: '',
    phone: '',
  });
  const [form2, setForm2] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { isDarkMode } = useDarkMode();
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch user data and populate form
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (source === "profile") {
          setForm1({
            Fname: userData.Fname || '',
            Lname: userData.Lname || '',
            email: userData.email || '',
            phone: userData.phone || '',
          });
        } else {
          setForm2({
            email: userData.email || '',
            password: '',
            confirmPassword: '',
          });
        }
      } catch (error) {
        console.error("⚠️ Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [show, source]);
  
  if (!show) return null;
  
  const handleModalClose = () => {
    setForm1({ Fname: '', Lname: '', email: '', phone: '' });
    setForm2({ email: '', password: '', confirmPassword: '' });
    setErrors({});
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm1({ ...form1, [name]: value });
    setForm2({ ...form2, [name]: value });
  };

  const validateProfile = () => {
    const newErrors = {};
    const digitsOnly = form1.phone.toString().replace(/\D/g, '');
    if (!form1.Fname.trim()) newErrors.Fname = 'First name is required';
    if (!form1.Lname.trim()) newErrors.Lname = 'Last name is required';
    if (form1.phone && digitsOnly.length !== 10) newErrors.phone = 'Invalid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePass = () => {
    const newErrors = {};
    if (form2.password.length < 6) newErrors.password = 'At least 6 characters required';
    if (form2.password !== form2.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      let token = localStorage.getItem("token");
      if (source === "profile") {
        if (validateProfile()) {
          const res = await axios.post("https://crackit-01.onrender.com/user/updateProfile", form1, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          Notify("Update Successful!", "Enjoy learning...");
          setForm1({ Fname: '', Lname: '', email: '', phone: '' });

          const { user } = res.data;
          localStorage.setItem("user", JSON.stringify(user));

          setErrors({});
          onClose();
        }
      } else {
        if (validatePass()) {
          const res = await axios.post("https://crackit-01.onrender.com/user/changePassword", form2, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          Notify("Update Successful!", "Enjoy learning...");
          setForm2({ email: '', password: '', confirmPassword: '' });

          const { user } = res.data;
          localStorage.setItem("user", JSON.stringify(user));

          setErrors({});
          onClose();
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === "User not found") {
        setErrors({ email: "Error: Email doesn't exist, Try again Later" });
      } else if (error.response && error.response.status === 400 && error.response.data.message === "Same Password") {
        setErrors({ password: "Error: Same Password, Try another one" });
      } else {
        Notify("Updation Failed!", "Please try again later.");
        console.error("⚠️ Updation error:", error.message);
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registration-modal-backdrop">
      <div className={`registration-modal-card  mt-2 ${isDarkMode ? 'dark-mode' : ''}`}>
        <button className="btn-close custom-close-btn" onClick={handleModalClose}></button>

        {(source === "profile") ? (
          <div className="text-center mb-4">
            <h2 className="fw-bold">Edit Your Account</h2>
            <p className="text-muted">Keep your profile sharp — excellence is an ongoing journey.</p>
          </div>
        ) : (
          <div className="text-center mb-4">
            <h2 className="fw-bold">Change Password</h2>
            <p className="text-muted">CrackIt’s smarter when you're safer — update your password now.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          {(source === "profile")?(
            <div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',            // ensure parent div has enough height
                }}>
                    <div style={{
                        backgroundColor: '#e0e0e0',     // customize to match CrackIt theme
                        color: '#222',
                        borderRadius: '50%',
                        width: '96px',
                        height: '96px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        userSelect: 'none',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)', // optional subtle lift
                    }}>
                        {(() => {
                        const user = JSON.parse(localStorage.getItem('user'));
                        const initials = user?.Fname && user?.Lname
                            ? `${user.Fname.trim()[0]}${user.Lname.trim()[0]}`.toUpperCase()
                            : 'U';
                        return initials;
                        })()}
                    </div>
                </div>

                <div className="mt-4 mb-3">
                  <div className="row g-2">
                    <div className="col">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.Fname ? 'is-invalid' : ''}`}
                        name="Fname"
                        value={form1.Fname}
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
                        value={form1.Lname}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.Lname}</div>
                    </div>
                  </div>
                </div>
      
              {/* Email */}
              <div className="mb-3 ">
                <label className="form-label">Email Address</label>
                <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={form1.email} onChange={handleChange} disabled={true}/>
                <div className="invalid-feedback">{errors.email}</div>
              </div>
      
                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone Number <span className="text-muted">(Optional)</span></label>
                  <input type="Number" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} name="phone" value={form1.phone} onChange={handleChange} />
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
            </div>
          ):(
            <div>
              {/* Email */}
              <div className="mb-3 ">
                <label className="form-label">Email Address</label>
                <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={form2.email} onChange={handleChange} disabled={true}/>
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
                    value={form2.password}
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
                    value={form2.confirmPassword}
                    onChange={handleChange}
                  />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirm(!showConfirm)}>
                    <i className={`ri-${showConfirm ? 'eye-line' : 'eye-off-line'}`}></i>
                  </button>
                </div>
                <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
              </div>
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
            {(source=="profile")?(
                submitting ? <>Updating Account... <span className="spinner-ring" /></>: 'Update Account'
            ):(
                submitting ? <>Changing Password... <span className="spinner-ring" /></>: 'Change Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;