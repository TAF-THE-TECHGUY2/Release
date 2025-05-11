import React, { useEffect, useState } from "react";
import {
  fetchBlogs,
  deleteBlog
} from "../api/blogService"; // Make sure the path is correct
import "../styles/ManageBlog.css";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await fetchBlogs();
      setBlogs(response.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
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
                <td>
                  {blog.image ? (
                    <img src={blog.image} className="blog-thumbnail" alt={blog.title} />
                  ) : "No Image"}
                </td>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>{blog.description?.split(" ").slice(0, 10).join(" ")}...</td>
                <td className="actions">
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(blog.id)}>🗑</button>
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
