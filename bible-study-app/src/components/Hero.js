import React from "react";
import "../index.css";// Ensure the CSS file is included

const Hero = () => {
  return (
    <div className="hero-container">
      <img src="/assets/hero-image.png" alt="Worship" className="hero-image" />
      <div className="hero-text">
        <h2>Step #1: Know who you are in Christ</h2>
       <p className="hero-description">
  Release Bible study is a community for individuals who seek to cultivate their identity in Christ.
</p>
        <button>Get Connected</button>
      </div>
    </div>
  );
};

export default Hero;
