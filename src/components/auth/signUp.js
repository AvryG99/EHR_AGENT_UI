// src/Signup.js
import React, { useState } from 'react';
import '../../assets/Signup.css';
import logo from '../../assets/Logo.jpg';

function Signup({ onSignup, toggleAuthMode }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onSignup();
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="signup-container full-screen-center background-default">
      <div className="signup-box">
        <img src={logo} alt="Logo" className="signup-logo" />
        
        <h2 className="signup-title page-title">Create an Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">User Name</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button button">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>
            Already have an account? <a href="#" className="login-link link" onClick={toggleAuthMode}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
