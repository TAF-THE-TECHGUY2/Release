import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ManageBlog.css";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const API_URL = "http://13.49.23.100:5000";

  useEffect(() => {
    axios.get(`${API_URL}/blogs`).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const deleteBlog = async (id) => {
    await axios.delete(`${API_URL}/blogs/${id}`);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="manage-blogs">
      <h1>Manage Blogs</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date Created</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.image ? <img src={blog.image} className="blog-thumbnail" alt={blog.title} /> : "No Image"}</td>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>{blog.description?.split(" ").slice(0, 10).join(" ")}...</td>
                <td className="actions">
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn" onClick={() => deleteBlog(blog.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlogs;
