import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Make sure this has your styles

const RecentDevotionals = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      const parsed = JSON.parse(stored);
      const sorted = parsed.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      );
      const recent = sorted.slice(0, 4); // Get latest 4
      setRecentBlogs(recent);
    }
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
              <p>{item.description.split(" ").slice(0, 20).join(" ")}...</p>
              <button className="read-more">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentDevotionals;
