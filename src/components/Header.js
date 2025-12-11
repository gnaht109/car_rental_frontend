import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo">M</Link>
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/cars">All Cars</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
        <div className="header-actions">
          {user ? (
            <>
              <span>Hello, {user.username}</span>
              <button 
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-secondary">Log In</NavLink>
              <NavLink to="/register" className="btn btn-primary">Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
