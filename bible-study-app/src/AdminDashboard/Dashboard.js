import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaCheckCircle, FaFileAlt } from "react-icons/fa";
import { fetchBlogs } from "../api/blogService";
import AdminHeader from "./AdminHeader";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs({ page: 1, limit: 1 })
      .then((res) => {
        const total = res.data?.total ?? res.data?.items?.length ?? 0;
        setTotalBlogs(total);
      })
      .catch(() => {
        setTotalBlogs(0);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="admin-page">
      <AdminHeader
        title="Admin Dashboard"
        subtitle="Track content performance and manage your latest updates."
        actions={
          <Link className="btn primary" to="/admin/create">
            Create Blog
          </Link>
        }
      />

      <section className="dashboard-cards">
        <div className={`card ${isLoading ? "is-loading" : ""}`}>
          <div className="card-header">
            <FaClipboardList className="card-icon" />
            <span>Total Blogs</span>
          </div>
          <p className="card-value">{isLoading ? "--" : totalBlogs}</p>
          <p className="card-subtitle">All published devotionals</p>
        </div>
        <div className={`card ${isLoading ? "is-loading" : ""}`}>
          <div className="card-header">
            <FaCheckCircle className="card-icon published" />
            <span>Published</span>
          </div>
          <p className="card-value">{isLoading ? "--" : totalBlogs}</p>
          <p className="card-subtitle">Visible to visitors</p>
        </div>
        <div className={`card ${isLoading ? "is-loading" : ""}`}>
          <div className="card-header">
            <FaFileAlt className="card-icon drafts" />
            <span>Drafts</span>
          </div>
          <p className="card-value">{isLoading ? "--" : "0"}</p>
          <p className="card-subtitle">Not yet published</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
