// src/api/blogService.js
import axios from "axios";

// In production, Amplify injects REACT_APP_API_BASE_URL.
// Locally, we default to a relative path (so calls go to the same origin/protocol).
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // Ensures cookies (if any) are sent along—optional
  withCredentials: true,
});

// List all blogs
export const fetchBlogs = () => api.get("/blogs");

// Get a single blog by ID
export const fetchBlogById = (id) =>
  api.get(`/blogs/${id}`);

// Create a new blog
export const createBlog = (data) =>
  api.post("/blogs", data);

// Update an existing blog
export const updateBlog = (id, data) =>
  api.put(`/blogs/${id}`, data);

// Delete a blog
export const deleteBlog = (id) =>
  api.delete(`/blogs/${id}`);

export default {
  fetchBlogs,
  fetchBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
