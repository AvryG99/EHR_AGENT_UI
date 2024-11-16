// src/Login.js
import React, { useState } from 'react';
import '../../assets/Login.css';
import logo from '../../assets/Logo.jpg';

function Login({ onLogin, toggleAuthMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container full-screen-center background-default">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        
        <h2 className="login-title page-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="text" className="form-label">User Name</label>
            <input
              type="text"
              id="email"
              className="form-input"
              placeholder="Enter your user name"
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
          <button type="submit" className="login-button button">Log in</button>
        </form>
        <div className="login-footer">
          <p>
            Don’t have an account? <a href="#" className="signup-link link" onClick={toggleAuthMode}>Sign up</a>
          </p>
          <a href="#" className="forgot-password-link link">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
