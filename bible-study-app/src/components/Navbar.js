import React, { useState } from "react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import "../index.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <img
          src="/assets/logo.png"
          alt="Reference Bible Study"
          className="nav-logo"
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        />

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={handleToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li onClick={() => (window.location.href = "/")}>Home</li>
          <li onClick={() => (window.location.href = "/Media")}>Media</li>
          <li onClick={() => (window.location.href = "/category")}>Bible study</li>
          <li onClick={() => (window.location.href = "/about")}>About Us</li>
        </ul>

        {/* Social Icons */}
        <div className="nav-right">
          <div className="social-icons">
            <a href="https://www.tiktok.com/@ididntknowiwasmepodcast" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="icon" />
            </a>
            <a href="https://www.instagram.com/ididntknowiwasmepodcast/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
            </a>
            <a href="https://www.youtube.com/@ididntknowiwasmepodcast" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="icon" />
            </a>
          </div>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
     {menuOpen && (
  <div className="mobile-overlay">
    <button className="close-overlay-btn" onClick={closeMenu}>✕</button>
    <ul className="overlay-links">
      <li onClick={() => { closeMenu(); window.location.href = "/"; }}>Home</li>
      <li onClick={() => { closeMenu(); window.location.href = "/Media"; }}>Media</li>
      <li onClick={() => { closeMenu(); window.location.href = "/category"; }}>Bible Study</li>
      <li onClick={() => { closeMenu(); window.location.href = "/about"; }}>About Us</li>
    </ul>
  </div>
)}
    </>
  );
};

export default Navbar;
