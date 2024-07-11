import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

const Header = () => {
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");
  const user = loggedInUser ? JSON.parse(loggedInUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("SignupTable");
    navigate('/logout'); 
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <FaShoppingCart className="cart-icon" />
          <span className="store-name">OrionEStore</span>
        </div>
        <nav className="nav-menu">
          {user ? (
            <>
              <Link to="/profile" className="nav-item">Profile</Link>
              <Link to="/products" className="nav-item">Products</Link>
              <Link to="/checkout" className="nav-item">Checkout</Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-item">Home</Link>
              <Link to="/login" className="nav-item">LogIn</Link>
              <Link to="/signin" className="nav-item">SignIn</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;