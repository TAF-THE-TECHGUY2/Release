// src/components/ManageBlogs.jsx

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogs, deleteBlog } from "../api/blogService";
import "../styles/ManageBlog.css";

const ManageBlogs = () => {
  const queryClient = useQueryClient();

  // ✅ useQuery in object form
  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs().then((res) => res.data),
  });

  // ✅ useMutation in object form
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  if (isLoading) {
    return (
      <div className="manage-blogs loading">
        <div className="spinner" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="manage-blogs error">
        <p>{error.message || "Could not load blogs."}</p>
        <button onClick={() => refetch()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

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
                    <img
                      src={blog.image}
                      className="blog-thumbnail"
                      alt={blog.title}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  {blog.description
                    .split(" ")
                    .slice(0, 10)
                    .join(" ")}…
                </td>
                <td className="actions">
                  <button className="edit-btn">✏️</button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMutation.mutate(blog.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="7">No blogs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBlogs;
