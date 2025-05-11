import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList, FaCheckCircle, FaFileAlt } from "react-icons/fa";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);

  useEffect(() => {
    axios.get("http://13.245.13.243:5000/blogs").then((res) => {
      const blogs = res.data;
      setTotalBlogs(blogs.length);
      // You can extend this if you add a "status" field (e.g. "published", "draft")
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <FaClipboardList className="card-icon" />
          <h3>Total Blogs</h3>
          <p>{totalBlogs}</p>
        </div>
        <div className="card">
          <FaCheckCircle className="card-icon published" />
          <h3>Published Blogs</h3>
          <p>{totalBlogs}</p>
        </div>
        <div className="card">
          <FaFileAlt className="card-icon drafts" />
          <h3>Drafts</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
