// api/blogService.js
import axios from "axios";

// Remove the extra slash before :5000
const API_BASE_URL = "http://13.245.13.243:5000";

export const fetchBlogs      = () => axios.get(`${API_BASE_URL}/blogs`);
export const fetchBlogById   = (id) => axios.get(`${API_BASE_URL}/blogs/${id}`);
export const createBlog      = (data) => axios.post(`${API_BASE_URL}/blogs`, data);
export const deleteBlog      = (id) => axios.delete(`${API_BASE_URL}/blogs/${id}`);
export const updateBlog      = (id, data) => axios.put(`${API_BASE_URL}/blogs/${id}`, data);
