// src/App.js
import React, { useState } from "react";
import Login from './components/auth/login';
import Signup from './components/auth/signUp';
import Chatbox from './components/chatBox/chatBox';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleSignup = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false); // Hàm logout để thoát về Login

  const toggleAuthMode = () => setIsSignup((prev) => !prev);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Chatbox onLogout={handleLogout} />
      ) : isSignup ? (
        <Signup onSignup={handleSignup} toggleAuthMode={toggleAuthMode} />
      ) : (
        <Login onLogin={handleLogin} toggleAuthMode={toggleAuthMode} />
      )}
    </div>
  );
}

export default App;
