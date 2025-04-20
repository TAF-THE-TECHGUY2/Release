import React from "react";
import { FaClipboardList, FaCheckCircle, FaFileAlt } from "react-icons/fa";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="dashboard-cards">
        <div className="card">
          <FaClipboardList className="card-icon" />
          <h3>Total Blogs</h3>
          <p>15</p>
        </div>
        <div className="card">
          <FaCheckCircle className="card-icon published" />
          <h3>Published Blogs</h3>
          <p>12</p>
        </div>
        <div className="card">
          <FaFileAlt className="card-icon drafts" />
          <h3>Drafts</h3>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
