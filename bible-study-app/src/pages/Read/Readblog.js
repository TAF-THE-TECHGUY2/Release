import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Readblog.css";

const ReadBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  const formatDescription = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words
      .reduce((acc, word, index) => {
        if (index % 50 === 0 && index !== 0) {
          acc.push("\n\n");
        }
        acc.push(word);
        return acc;
      }, [])
      .join(" ");
  };

  return (
    <div className="read-blog-container">
      {blog && (
        <>
          <h1 className="blog-title">{blog.title}</h1>
          <p className="blog-meta">
            By <span>{blog.author}</span> | {new Date(blog.createdAt).toLocaleString()}
          </p>
          <div className="blog-image-container">
            <img src={blog.image} alt={blog.title} className="blog-image" />
          </div>
          <div className="blog-content">
            <p>{formatDescription(blog.description)}</p>
          </div>
          
          {/* Back Button */}
          <button className="back-button" onClick={() => navigate("/blog")}>
            ← Back to Blogs
          </button>

          {/* Social Sharing Icons */}
          <div className="social-share">
            <p>Share this blog:</p>
            <FaFacebook className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaLinkedin className="social-icon" />
          </div>
        </>
      )}
    </div>
  );
};

export default ReadBlog;
