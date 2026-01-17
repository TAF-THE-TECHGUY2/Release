import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../../api/blogService";
import { excerpt } from "../../utils/text";
import "../../BlogPage.css";

const BlogPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data } = useQuery({
    queryKey: ["blogs-landing", selectedCategory, search, page],
    queryFn: () =>
      fetchBlogs({
        page,
        limit,
        search,
        category: selectedCategory,
      }).then((res) => res.data),
  });

  const blogPosts = data?.items || [];
  const totalPages = data?.pages || 1;
  const categories = ["All", ...new Set(blogPosts.map((b) => b.category))];

  return (
    <div className="blog-page">
      <h2 className="category-title">Devotionals on Community</h2>

      <nav className="blog-nav">
        {categories.map((category, index) => (
          <button
            key={index}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => {
              setSelectedCategory(category);
              setPage(1);
            }}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="blog-search">
        <input
          type="text"
          placeholder="Search devotionals..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <section className="blog-grid">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="blog-card"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post.image && <img src={post.image} alt={post.title} />}
            <h3>{post.title}</h3>
            <p className="date">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
            </p>
            <p>{excerpt(post.description, 20)}...</p>
          </div>
        ))}
      </section>

      <div className="blog-pagination">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
