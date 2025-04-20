import React, { useEffect, useState } from "react";
import "../styles/ManageBlog.css";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs)); // Update local storage
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
                  {blog.image ? <img src={blog.image} alt={blog.title} className="blog-thumbnail" /> : "No Image"}
                </td>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>
                <td>{new Date(blog.date_created).toLocaleDateString()}</td>
                <td>{blog.description.split(" ").slice(0, 20).join(" ")}...</td>
                <td className="actions">
                  <button className="edit-btn">✏️ Edit</button>
                  <button className="delete-btn" onClick={() => deleteBlog(blog.id)}>🗑 Delete</button>
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
