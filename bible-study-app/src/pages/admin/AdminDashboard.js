import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/blogs").then((response) => {
      setBlogs(response.data);
    });
  }, []);

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:5000/blogs/${id}`).then(() => {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <Link to="/admin/create-blog" className="create-button">
          + Create New Blog
        </Link>
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.author}</td>
                  <td>{new Date(blog.date_created).toLocaleDateString()}</td>
                  <td className="actions">
                    <Link to={`/post/${blog.id}`} className="view-btn">
                      📖 View
                    </Link>
                    <button onClick={() => deleteBlog(blog.id)} className="delete-btn">
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No blogs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
