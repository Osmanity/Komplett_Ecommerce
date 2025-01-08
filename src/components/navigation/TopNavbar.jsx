import React from "react";
import { Link } from "react-router-dom";
import "./TopNavbar.css";

const TopNavbar = () => {
  return (
    <nav className="top-navbar">
      <div className="nav-brand">
        <Link to="/">Logo</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Hem</Link>
        <Link to="/about">Om oss</Link>
        <Link to="/contact">Kontakt</Link>
      </div>
    </nav>
  );
};

export default TopNavbar;
