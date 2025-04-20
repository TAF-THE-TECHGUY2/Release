
import React from "react";
import "../index.css"; // Ensure styles are linked

const features = [
  {
    id: 1,
    title: "Devotionals",
    description: "Our devotionals provide godly advice for you to reflect on and be encouraged.",
    image: "/assets/home4.jpg", // Ensure this path is correct
    button: "Sign up",
  },
  {
    id: 2,
    title: "Bible Studies",
    description: "Learn foundational, biblical knowledge with others in our virtual Bible study series.",
    image: "/assets/home4.jpg",
    button: "Learn More",
  },
  {
    id: 3,
    title: "Media",
    description: "Listen or watch our podcasts, and more, to be challenged or learn something new!",
    image: "/assets/home4.jpg",
    button: "Learn More",
  },
  {
    id: 4,
    title: "Events",
    description: "Don’t be a stranger. Meet the community at an in-person event like our Poetry Jams!",
    image: "/assets/home4.jpg",
    button: "Learn More",
  },
];

const FeatureCards = () => {
  return (
    <section className="feature-section">
      <h2 className="feature-heading">Get connected with our community</h2>
      <div className="feature-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <h3>{feature.id < 10 ? `0${feature.id}.` : `${feature.id}.`} {feature.title}</h3>
            <p>{feature.description}</p>
            <img src={feature.image} alt={feature.title} />
            <button>{feature.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
