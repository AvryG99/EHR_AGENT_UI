// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import Chatbox from "./components/chatBox/chatBox";
import ViewTable from "./components/view_table/ViewTable";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/chatbox" /> : <Login onLogin={handleLogin} />
          }
        />

        {/* Route for SignUp */}
        <Route
          path="/signUp"
          element={
            isLoggedIn ? <Navigate to="/chatbox" /> : <SignUp />
          }
        />

        {/* Route for Chatbox */}
        <Route
          path="/chatbox"
          element={
            isLoggedIn ? (
              <Chatbox username={username} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Route for ViewTable */}
        <Route
          path="/view-table"
          element={
            isLoggedIn ? (
              <ViewTable />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
