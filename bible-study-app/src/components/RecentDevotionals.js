import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../api/blogService";
import { excerpt } from "../utils/text";
import "../index.css"; // Make sure this has your styles

const RecentDevotionals = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs({ page: 1, limit: 4 })
      .then((res) => {
        setRecentBlogs(res.data.items || []);
      })
      .catch(() => {
        setRecentBlogs([]);
      });
  }, []);

  return (
    <section className="devotionals-section">
      <h2 className="devotionals-heading">Recent Devotionals</h2>
      <div className="devotionals-grid">
        {recentBlogs.map((item) => (
          <div
            key={item.id}
            className="devotional-card"
            onClick={() => navigate(`/post/${item.id}`)}
          >
              <img src={item.image} alt={item.title} className="devotional-image" />
              <div className="devotional-text">
                <h3>{item.title}</h3>
                <p>{excerpt(item.description, 20)}...</p>
                <button className="read-more">Read More</button>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentDevotionals;
