import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../BlogPage.css";

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      const blogs = JSON.parse(stored);
      setBlogPosts(blogs);
      const unique = ["All", ...new Set(blogs.map((b) => b.category))];
      setCategories(unique);
    }
  }, []);

  const filteredBlogs = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((b) => b.category === selectedCategory);

  return (
    <div className="blog-page">
      <h2 className="category-title">Devotionals on Community</h2>

      {/* Blog Navigation Tabs */}
      <nav className="blog-nav">
        {categories.map((category, index) => (
          <button
            key={index}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

  
      {/* Blog Grid */}
      <section className="blog-grid">
        {filteredBlogs.slice(1).map((post) => (
          <div key={post.id} className="blog-card" onClick={() => navigate(`/post/${post.id}`)}>
            <img src={post.image} alt={post.title} />
            <h3>{post.title}</h3>
            <p className="date">{new Date(post.date_created).toLocaleDateString()}</p>
            <p>{post.description.split(" ").slice(0, 20).join(" ")}...</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BlogPage;
