import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaPlus, FaEdit } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 900) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />
      <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
        <button
          className="sidebar-toggle-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="sidebar-brand">
          <div className="brand-mark">ID</div>
          {isOpen && <div className="brand-text">Admin Console</div>}
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            <FaHome className="icon" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>
          <NavLink
            to="/admin/manage"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            <FaEdit className="icon" />
            {isOpen && <span>Manage Blogs</span>}
          </NavLink>
          <NavLink
            to="/admin/create"
            className={({ isActive }) =>
              `nav-link${isActive ? " active" : ""}`
            }
          >
            <FaPlus className="icon" />
            {isOpen && <span>Create Blog</span>}
          </NavLink>
        </nav>

        {isOpen && (
          <div className="sidebar-footer">
            <p className="admin-note">Keep content consistent and concise.</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
