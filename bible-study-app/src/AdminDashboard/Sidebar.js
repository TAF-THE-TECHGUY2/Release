import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaPlus, FaEdit } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "" : "closed"}`}>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav>
        <Link to="/admin" className="nav-link">
          <FaHome className="icon" />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link to="/admin/manage" className="nav-link">
          <FaEdit className="icon" />
          {isOpen && <span>Manage Blogs</span>}
        </Link>
        <Link to="/admin/create" className="nav-link">
          <FaPlus className="icon" />
          {isOpen && <span>Create Blog</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
