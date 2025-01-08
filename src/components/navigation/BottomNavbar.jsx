import React from "react";
import { Link } from "react-router-dom";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  return (
    <nav className="bottom-navbar">
      <Link to="/" className="nav-item">
        <i className="fas fa-home"></i>
        <span>Hem</span>
      </Link>
      <Link to="/search" className="nav-item">
        <i className="fas fa-search"></i>
        <span>Sök</span>
      </Link>
      <Link to="/profile" className="nav-item">
        <i className="fas fa-user"></i>
        <span>Profil</span>
      </Link>
      <Link to="/settings" className="nav-item">
        <i className="fas fa-cog"></i>
        <span>Inställningar</span>
      </Link>
    </nav>
  );
};

export default BottomNavbar;
