// src/api/blogService.js
import axios from "axios";

// Point this at your running backend
const API_BASE_URL = "http://13.245.13.243:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// List all
export const fetchBlogs    = () => api.get("/blogs");
// Single by ID
export const fetchBlogById = (id) => api.get(`/blogs/${id}`);
// Other ops...
export const createBlog    = (data) => api.post("/blogs", data);
export const updateBlog    = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog    = (id) => api.delete(`/blogs/${id}`);
