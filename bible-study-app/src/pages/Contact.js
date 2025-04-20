import React, { useState } from "react";
import "./Contact.css";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 sec
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Let's Connect!</h1>
        <p>Join Our weekly podcast.</p>
      </div>

      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form">
          {submitted ? (
            <div className="success-message">✅ Your message has been sent! We’ll get back to you soon.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
              <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
              <textarea name="message" placeholder="How Can We Help?" required onChange={handleChange} />
              <button type="submit">Send Message</button>
            </form>
          )}
        </div>

        {/* Alternative Contact Options */}
        <div className="contact-info">
          <div className="info-card">
            <h3>📧 Email</h3>
            <p><a href="mailto:contact@example.com">contact@example.com</a></p>
          </div>
          <div className="info-card">
            <h3>📍 Address</h3>
            <p>123 Street, City, Country</p>
          </div>
          <div className="info-card">
            <h3>📞 Phone</h3>
            <p><a href="tel:+1234567890">+1 234 567 890</a></p>
          </div>

          {/* Social Media */}
          <div className="social-icons">
            <a href="#" className="facebook">Facebook</a>
            <a href="#" className="twitter">Twitter</a>
            <a href="#" className="linkedin">LinkedIn</a>
            <a href="#" className="instagram">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;

