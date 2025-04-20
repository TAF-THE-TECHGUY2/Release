import React, { useState, useEffect } from "react";
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

  const getStoredBlogs = () => {
    const storedBlogs = localStorage.getItem("blogs");
    return storedBlogs ? JSON.parse(storedBlogs) : [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageBase64 = "";
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        imageBase64 = reader.result;
        saveBlog(imageBase64);
      };
      return;
    }

    saveBlog("");
  };

  const saveBlog = (imageBase64) => {
    const newBlog = {
      id: Date.now(),
      title,
      category,
      author,
      description,
      image: imageBase64,
      backgroundColor,
      date_created: new Date().toISOString(),
    };

    const updatedBlogs = [...getStoredBlogs(), newBlog];
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    navigate("/category");
  };

  return (
    <div className="create-blog">
      <h1>Create New Blog</h1>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Author:</label>
        <input
          type="text"
          placeholder="Enter Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="add-category">
          <input
            type="text"
            placeholder="New Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="button" onClick={addCategory}>+ Add</button>
        </div>

        <label>Upload Cover Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        <label>Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />

        <label>Content:</label>
        <textarea
          placeholder="Write your blog here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Publish Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
