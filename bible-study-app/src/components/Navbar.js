import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav mask">
      <a  className="nav-title">
        Release Bible Study
      </a>
      <ul className="list">
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/Blog">Blogs</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
