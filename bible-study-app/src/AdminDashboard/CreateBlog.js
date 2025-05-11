import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createBlog
} from "../api/blogService"; // Make sure the path is correct
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

  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const addCategory = () => {
    if (category && !categories.includes(category)) {
      const updated = [...categories, category];
      setCategories(updated);
      localStorage.setItem("categories", JSON.stringify(updated));
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
      await createBlog(newBlog);
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
