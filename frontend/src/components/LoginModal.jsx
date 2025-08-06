import React, { useState } from 'react';
import axios from "axios";
import useAuthStore from './userToken';
import { useDarkMode } from './DarkMode';
import '../loginStyle.css';

const LoginModal = ({ show, onClose, ShowRegister, onNotify }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { isDarkMode } = useDarkMode();
  
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        //const res=await axios.post("https://localhost:3000/user/login", formData);
        const res=await axios.post("https://crackit-01.onrender.com/user/login", formData);
        //onNotify("Login Successful!");
        console.log("🎉 Login Successful!", formData);

        const { token, user } = res.data;
        
        localStorage.setItem("user", JSON.stringify(user));

        setFormData({ email: '', password: '' });
        setErrors({});
        onClose();

        onNotify("Logging in...", "Welcome, " + user.Fname + " " + user.Lname + "!");
        setTimeout(() => /*localStorage.setItem("token", token)*/login(token), 3500);

      } catch (error) {
        console.log("⚠️ Login error:", error.message);
        console.error("⚠️ Login error:", error.response.data.message);

        if (error.response && error.response.data.message === "User does not exist") {
          setErrors({ email: 'Incorrect email. Please check your credentials.' });
        } 
        else if (error.response && error.response.data.message === "Incorrect password") {          
          setErrors({ password: 'Incorrect Password. Please check your credentials.' });
        } 
        else {
          //onNotify("Login Failed!");
          setErrors({ general: 'An unexpected error occurred. Please try again later.' });
        }  
      }
      finally{
        setLoading(false);
      }
    }
  };

    const handleModalClose = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
    onClose();
  };

  return (
    <div className="registration-modal-backdrop">
      <div className={`login-card fade-in ${isDarkMode ? 'dark-mode' : ''}`}>
        <button className="btn-close custom-close-btn" onClick={handleModalClose}></button>
        <h1 className="text-center fw-bold mb-2">Welcome Back</h1>
        <p className="subheading text-center text-muted mb-4">Log in to your account</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <div className="input-wrapper">
              <span className="input-icon"><i className="fa-solid fa-envelope icon"></i></span>
              <input
                name="email"
                type="email"
                className="input-field"
                placeholder="Email / Username"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <p className="error-message">{errors.email}</p>
          </div>
          {/* Password */}
          <div className={`input-group ${errors.password ? 'error' : ''}`}>
            <div className="input-wrapper">
              <span className="input-icon"><i className="fa-solid fa-lock icon"></i></span>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <p className="error-message">{errors.password}</p>
          </div>
          {/* Remember + Forgot */}
          <div className="form-options mb-4">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#">Forgot password?</a>
          </div>
            {errors.general && (
                <div className="alert alert-danger" role="alert">
                  {errors.general}
                </div>
            )}
          {/* Submit */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                Logging in...
                <span className="spinner-ring" />
              </>
            ) : (
              <span className="btn-text">Login</span>
            )}
          </button>
        </form>

        <div className="register-link mt-4 text-center text-muted">
          Don’t have an account?{' '}<button type="button" className="btn btn-link text-primary p-1" onClick={ShowRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
