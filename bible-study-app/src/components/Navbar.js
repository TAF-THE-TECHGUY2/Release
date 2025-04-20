import React from "react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo (Clickable to Home) */}
      <img 
        src="/assets/logo.png" 
        alt="Reference Bible Study" 
        className="nav-logo" 
        onClick={() => window.location.href = "/"}
        style={{ cursor: "pointer" }}
      />

      {/* Navigation Links */}
      <ul className="nav-links">
        <li onClick={() => window.location.href = "/"}>Home</li>
        <li onClick={() => window.location.href = "/Media"}>Media</li>
        <li onClick={() => window.location.href = "/blog"}>Bible study</li>
        <li onClick={() => window.location.href = "/about"}>About Us</li>
      </ul>

      {/* Social Icons */}
      <div className="nav-right">
  <div className="social-icons">
    <a
      href="https://www.tiktok.com/@ididntknowiwasmepodcast"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaTiktok className="icon" />
    </a>
    <a
      href="https://www.instagram.com/ididntknowiwasmepodcast/?utm_source=ig_web_button_share_sheet"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaInstagram className="icon" />
    </a>
    <a
      href="https://www.youtube.com/@ididntknowiwasmepodcast"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaYoutube className="icon" />
    </a>
  </div>
</div>

    </nav>
  );
};

export default Navbar;
