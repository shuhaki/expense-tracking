import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        💰 Expense Tracker
      </Link>
      
      {user ? (
        <div className="navbar-nav">
          <div className="navbar-user">
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="nav-btn">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="navbar-nav">
          <Link to="/login" className="nav-btn">
            Login
          </Link>
          <Link to="/register" className="nav-btn">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

