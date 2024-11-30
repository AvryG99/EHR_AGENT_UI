import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/Login.css";
import logo from "../../assets/Logo.jpg";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/node/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage("Login successful!");
        setTimeout(() => {
          setMessage("");
          localStorage.setItem("token", data.token); // Lưu token vào localStorage
          onLogin(data.username); // Pass username to App state
          navigate("/chatbox"); // Điều hướng đến trang chatbox
        }, 2000);
      } else {
        setMessageType("error");
        setMessage(data.message || "Login failed!");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container full-screen-center background-default">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="login-title page-title">Welcome Back</h2>
        {message && (
          <p style={{ color: messageType === "success" ? "green" : "red" }}>
            {message}
          </p>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button button">Log in</button>
        </form>
        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <a href="#" className="signup-link link" onClick={() => navigate("/signUp")}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
