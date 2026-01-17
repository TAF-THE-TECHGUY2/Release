import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, TextField } from "@mui/material";
import { fetchBlogs, deleteBlog } from "../api/blogService";
import { excerpt } from "../utils/text";
import AdminHeader from "./AdminHeader";
import "../styles/ManageBlog.css";

const ManageBlogs = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["blogs", page, search],
    queryFn: () =>
      fetchBlogs({ page, limit, search }).then((res) => res.data),
  });

  const blogs = data?.items || [];
  const totalPages = data?.pages || 1;

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="manage-blogs loading card-surface">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="admin-page">
        <div className="manage-blogs error card-surface">
          <p>{error.message || "Could not load blogs."}</p>
          <button onClick={() => refetch()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminHeader
        title="Manage Blogs"
        subtitle="Review, edit, and publish devotionals from one place."
        actions={
          <>
            <Link className="btn ghost" to="/admin/create">
              New Blog
            </Link>
          </>
        }
      />

      <div className="manage-blogs card-surface">
        <div className="table-controls">
          <div className="search-group">
            <label className="search-label" htmlFor="blog-search">
              Search
            </label>
            <TextField
              id="blog-search"
              size="small"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search title, category, author"
              inputProps={{ "aria-label": "Search blogs" }}
            />
            {search && (
              <button
                type="button"
                className="btn ghost"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="table-container">
          <table>
            <caption className="table-caption">Blog list</caption>
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
                  <td data-label="Image">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        className="blog-thumbnail"
                        alt={blog.title}
                      />
                    ) : (
                      <span className="muted">No image</span>
                    )}
                  </td>
                  <td data-label="Title">{blog.title}</td>
                  <td data-label="Category">{blog.category}</td>
                  <td data-label="Author">{blog.author}</td>
                  <td data-label="Date Created">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td data-label="Description">
                    {excerpt(blog.description, 10)}
                  </td>
                  <td data-label="Actions" className="actions">
                    <button
                      className="btn ghost"
                      onClick={() => navigate(`/admin/edit/${blog.id}`)}
                      aria-label={`Edit ${blog.title}`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn danger"
                      onClick={() => deleteMutation.mutate(blog.id)}
                      aria-label={`Delete ${blog.title}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <h4>No blogs found</h4>
                      <p>Try adjusting your search or create a new blog.</p>
                      <Link className="btn primary" to="/admin/create">
                        Create Blog
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <Pagination
            page={page}
            count={totalPages}
            onChange={(_e, value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
