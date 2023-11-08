import "./Home.css"; // Import your CSS file
import React from "react";
import rh from "./r-architecture-T6d96Qrb5MY-unsplash.jpg";
// Import your image

const Home = () => {
  return (
    <div className="home">
      <div className="welcome-note">
        <h1>Welcome to Our Store</h1>
        <p>Discover a wide range of products for your home.</p>
      </div>
      <div className="slider">
        <img src={rh} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
    </div>
  );
};

export default Home;
