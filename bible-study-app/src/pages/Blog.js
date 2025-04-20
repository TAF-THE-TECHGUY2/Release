import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./blog.css";

const BlogPage = () => {
  const [latestBlog, setLatestBlog] = useState(null);
  const [olderBlogs, setOlderBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/blogs").then((response) => {
      const blogs = response.data;
      setLatestBlog(blogs[0]); 
      setOlderBlogs(blogs.slice(1, 3)); 
    });
  }, []);

  return (
    <div className="blog-container">
      <div className="older-blogs">
        {olderBlogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} />
            <div className="blog-info">
              <span className="blog-category">{blog.category}</span>
              <h3>{blog.title}</h3>
              <p>{blog.description.split(" ").slice(0, 30).join(" ")}...</p>
              <Link to={`/read/${blog.id}`} className="read-more">Read More →</Link>
            </div>
          </div>
        ))}
      </div>

      {/* Center Column - Latest Blog */}
      {latestBlog && (
        <div className="latest-blog">
          <img src={latestBlog.image} alt={latestBlog.title} />
          <div className="latest-overlay">
            <span className="blog-category">{latestBlog.category}</span>
            <h2>{latestBlog.title}</h2>
            <p>{latestBlog.description.split(" ").slice(0, 50).join(" ")}...</p>
            <Link to={`/read/${latestBlog.id}`} className="read-more">Read More →</Link>
          </div>
        </div>
      )}

      
      <div className="most-read">
        <h3>Most Read</h3>
        <ul>
          {olderBlogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/read/${blog.id}`}>{blog.title}</Link>
            </li> 
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPage;
