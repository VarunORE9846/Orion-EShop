import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Logout = () => {
  return (
    <div className="logout-container">
      <img src="/logout.jpg" alt="Website" className="logout-image" />
      <div className="logout-message">
        <h2>You have been logged out!!</h2>
        <p>Thank you for visiting our website! Have a wonderful day ahead</p>
        <div className="logout-links">
          <p>Developed by:</p>
          <p>Aravjot Singh Sandhu</p>
          <Link to="/login" className="logout-link">
            Login
          </Link>
          <Link to="/" className="logout-link">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
