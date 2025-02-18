import React from "react";
import "./home.css";
import releasemain from "../images/releasemain.jpg"; // Ensure correct path

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section (Background Image) */}
      <section className="hero-section">
      
       
      </section>

      {/* Introduction Section (Now Bigger with White Background) */}
      <section className="introduction-section">
        <div className="intro-content">
          <h2>About Release Bible Study</h2>
          <p>
            We are a passionate group dedicated to deepening faith, building a
            strong community, and growing in understanding through biblical
            discussions. Our mission is to create a safe space for reflection,
            encouragement, and spiritual growth.
          </p>
          <p>
            Whether you are seeking to strengthen your faith, connect with
            like-minded individuals, or explore thought-provoking topics,
            Release Bible Study welcomes you.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section">
        <div className="grid-container">
          <div className="grid-item">📖 Deep Bible Studies</div>
          <div className="grid-item">🗣 Engaging Discussions</div>
          <div className="grid-item">🙏 Spiritual Growth</div>
          <div className="grid-item">🎙 Podcasts & Teachings</div>
          <div className="grid-item">💡 Thought-Provoking Debates</div>
          <div className="grid-item">🤝 Community Outreach</div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
