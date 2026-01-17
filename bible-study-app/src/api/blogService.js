import axios from "axios";

// Read the <meta name="api-base-url"> content
const meta = document.querySelector('meta[name="api-base-url"]');
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || (meta ? meta.getAttribute("content") : "");

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchBlogs = (params) => api.get("/blogs", { params });
export const fetchBlogById = (id) => api.get(`/blogs/${id}`);
export const createBlog = (data) => api.post("/blogs", data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return api.post("/uploads/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
