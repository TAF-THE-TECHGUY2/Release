import axios from "axios";

const meta = document.querySelector('meta[name="api-base-url"]');
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || (meta ? meta.getAttribute("content") : "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const login = (email, password) =>
  api.post("/auth/login", { email, password });
