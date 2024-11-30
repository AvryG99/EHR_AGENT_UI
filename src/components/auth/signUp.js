import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/Signup.css";
import logo from "../../assets/Logo.jpg";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/node/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 2000);
      } else {
        setMessageType("error");
        setMessage(data.message || "Signup failed!");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2 className="signup-title page-title">Create an Account</h2>
        {message && (
          <p style={{ color: messageType === "success" ? "green" : "red" }}>
            {message}
          </p>
        )}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              required
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
              required
            />
          </div>
          <button type="submit" className="signup-button button">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <a href="#" className="login-link link" onClick={() => navigate("/login")}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
