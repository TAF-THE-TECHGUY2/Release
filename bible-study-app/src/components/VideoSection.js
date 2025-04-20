import React from "react";
import "../index.css"; // Ensure styles are linked

const VideoSection = () => {
  return (
    <section className="video-section">
      <h2 className="video-heading">
        We envision a generation of young adults who are proud of their Christian identity and empowered to make an impact in the world.
      </h2>
      <div className="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/8Z0QkoAq-EM?si=VN1yErO2mjR7QmKa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>      </div>
    </section>
  );
};

export default VideoSection;
