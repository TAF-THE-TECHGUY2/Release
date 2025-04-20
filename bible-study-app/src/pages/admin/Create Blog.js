import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./createBlog.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const createBlog = async (e) => {
    e.preventDefault();
    const newBlog = { title, category, author, description, date_created: new Date().toISOString() };

    await axios.post("http://localhost:5000/blogs", newBlog);
    navigate("/admin");
  };

  return (
    <div className="create-blog-container">
      <h1>Create Blog</h1>
      <form onSubmit={createBlog}>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
