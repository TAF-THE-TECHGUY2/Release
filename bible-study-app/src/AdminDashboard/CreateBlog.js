// src/components/CreateBlog.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlog, uploadImage } from "../api/blogService";
import AdminHeader from "./AdminHeader";
import "../styles/createBlog.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#3f593e");
  const [categories, setCategories] = useState(["Faith", "Mental Health"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Load any saved categories
  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updated = [...categories, newCategory.trim()];
      setCategories(updated);
      localStorage.setItem("categories", JSON.stringify(updated));
      setNewCategory("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      let imageUrl = "";
      if (image) {
        const response = await uploadImage(image);
        imageUrl = response.data.url;
      }
      await saveBlog(imageUrl);
    } catch (err) {
      const msg = err.response?.data?.error || "Error saving blog";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveBlog = async (imageUrl) => {
    const newBlog = {
      title: title.trim(),
      author: author.trim(),
      category: category || "Uncategorized",
      description: description.trim(),
      image: imageUrl,
      backgroundColor,
    };

    try {
      await createBlog(newBlog);
      navigate("/category");
    } catch (err) {
      console.error("Failed to save blog:", err);
      // Show server-side error if present, otherwise generic
      const msg = err.response?.data?.error || "Error saving blog";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="admin-page">
      <AdminHeader
        title="Create New Blog"
        subtitle="Draft a new devotional and publish it to your community."
      />

      <div className="form-shell card-surface">
        {errorMessage && (
          <div className="form-error" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="field">
              <label htmlFor="blog-title">Title</label>
              <input
                id="blog-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="blog-author">Author</label>
              <input
                id="blog-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="blog-category">Category</label>
              <select
                id="blog-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Uncategorized</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="field inline-field">
              <label htmlFor="blog-new-category">Add category</label>
              <div className="add-category">
                <input
                  id="blog-new-category"
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                />
                <button type="button" className="btn ghost" onClick={addCategory}>
                  Add
                </button>
              </div>
            </div>

            <div className="field">
              <label htmlFor="blog-image">Upload Image</label>
              <input
                id="blog-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <p className="helper">Recommended: 1200x800px</p>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              )}
            </div>

            <div className="field">
              <label htmlFor="blog-color">Background Color</label>
              <input
                id="blog-color"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Content</label>
            <ReactQuill theme="snow" value={description} onChange={setDescription} />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
