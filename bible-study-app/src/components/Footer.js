import React from "react";
import { Link } from "react-router-dom"; // if you're using React Router
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© 2025 Release Bible Study. All rights reserved.</span>
        <Link to="/login" className="admin-link">Go to Admin Panel</Link>
      </div>
    </footer>
  );
};

export default Footer;
