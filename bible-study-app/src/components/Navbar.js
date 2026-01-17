import React, { useState } from "react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import "../index.css";
import logo from '../images/Logo.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const go = (href) => { window.location.href = href; };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <img
          src={logo}
          alt="Reference Bible Study"
          className="nav-logo"
          onClick={() => go('/')}
          style={{ cursor: 'pointer' }}
        />

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={handleToggle} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li onClick={() => go("/")}>Home</li>
          <li onClick={() => go("/Media")}>Media</li>
          <li onClick={() => go("/category")}>Blog</li>
          <li onClick={() => go("/about")}>About Us</li>
        </ul>

        {/* Right side: Socials + Buy Me a Coffee */}
        <div className="nav-right">
          <div className="social-icons">
            <a href="https://www.tiktok.com/@ididntknowiwasme?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="icon" />
            </a>
            <a href="https://www.instagram.com/ididntknowiwasmee/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
            </a>
            <a href="https://www.youtube.com/@ididntknowiwasmepodcast" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="icon" />
            </a>
          </div>

          {/* Buy Me a Coffee (desktop) */}
         <a
  className="bmc-btn--parchment"
  href="https://buymeacoffee.com/ididntknowiwasmee"
  target="_blank" rel="noopener noreferrer"
>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M4 7h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V7zm12 0h3a2 2 0 1 1 0 4h-3V7z"
          stroke="#7a5419" strokeWidth="1.8"/>
  </svg>
  Buy me a coffee
</a>


        </div>
      </nav>

      {/* Fullscreen Overlay Menu (mobile) */}
      {menuOpen && (
        <div className="mobile-overlay">
          <button className="close-overlay-btn" onClick={closeMenu} aria-label="Close menu">✕</button>
          <ul className="overlay-links">
            <li onClick={() => { closeMenu(); go("/"); }}>Home</li>
            <li onClick={() => { closeMenu(); go("/Media"); }}>Media</li>
            <li onClick={() => { closeMenu(); go("/category"); }}>Bible Study</li>
            <li onClick={() => { closeMenu(); go("/about"); }}>About Us</li>
          </ul>

          {/* Buy Me a Coffee (mobile) */}
          <a
            className="bmc-btn bmc-btn-mobile"
            href="https://www.buymeacoffee.com/YOUR_BMC_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="bmc-cup"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
            >
              <path d="M4 7h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V7zm12 0h3a2 2 0 1 1 0 4h-3V7z" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Buy me a coffee
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
