import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/createBlog.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#3f593e");
  const [categories, setCategories] = useState(["All", "Faith", "Mental Health"]);

  const navigate = useNavigate();
  const API_URL = "http://13.49.23.100:5000";

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const addCategory = () => {
    if (category && !categories.includes(category)) {
      const updatedCategories = [...categories, category];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setCategory("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageBase64 = "";

    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        imageBase64 = reader.result;
        await saveBlog(imageBase64);
      };
    } else {
      await saveBlog("");
    }
  };

  const saveBlog = async (imageBase64) => {
    const newBlog = {
      title,
      category,
      author,
      description,
      image: imageBase64,
      backgroundColor,
    };

    try {
      await axios.post(`${API_URL}/blogs`, newBlog);
      navigate("/category");
    } catch (err) {
      console.error("Failed to save blog:", err);
      alert("Error saving blog");
    }
  };

  return (
    <div className="create-blog">
      <h1>Create New Blog</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
        </select>
        <div className="add-category">
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="New Category" />
          <button type="button" onClick={addCategory}>+ Add</button>
        </div>
        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <label>Background Color:</label>
        <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
        <label>Content:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Publish Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
