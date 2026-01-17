import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchBlogById, updateBlog, uploadImage } from "../api/blogService";
import AdminHeader from "./AdminHeader";
import "../styles/createBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const stored = localStorage.getItem("categories");
    if (stored) {
      setCategories(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    fetchBlogById(id)
      .then((res) => {
        const blog = res.data;
        setTitle(blog.title || "");
        setAuthor(blog.author || "");
        setCategory(blog.category || "");
        setDescription(blog.description || "");
        setBackgroundColor(blog.backgroundColor || "#3f593e");
        setImagePreview(blog.image || "");
      })
      .catch(() => {
        setErrorMessage("Failed to load blog");
      });
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
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
      let imageUrl = imagePreview || "";
      if (image) {
        const response = await uploadImage(image);
        imageUrl = response.data.url;
      }

      await updateBlog(id, {
        title: title.trim(),
        author: author.trim(),
        category: category || "Uncategorized",
        description: description.trim(),
        image: imageUrl,
        backgroundColor,
      });

      navigate("/admin/manage");
    } catch (err) {
      const msg = err.response?.data?.error || "Error updating blog";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <AdminHeader
        title="Edit Blog"
        subtitle="Update content, imagery, and category details."
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
              <label htmlFor="edit-title">Title</label>
              <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="edit-author">Author</label>
              <input
                id="edit-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="edit-category">Category</label>
              <select
                id="edit-category"
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
              <label htmlFor="edit-new-category">Add category</label>
              <div className="add-category">
                <input
                  id="edit-new-category"
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
              <label htmlFor="edit-image">Upload Image</label>
              <input
                id="edit-image"
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
              <label htmlFor="edit-color">Background Color</label>
              <input
                id="edit-color"
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
