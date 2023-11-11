// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import rh from "./r-architecture-T6d96Qrb5MY-unsplash.jpg";

const Home = () => {
  return (
    <div className="home">
      <div className="navbar">
        <div className="logo">SmartHomes</div>
        <Link to="/login" className="login-button">
          Login
        </Link>
      </div>
      <div className="welcome-note">
        <h1>Welcome to Our Store</h1>
        <p>Discover a wide range of products for your home.</p>
      </div>
      <div className="slider">
        <img src={rh} alt="" />
      </div>
    </div>
  );
};

export default Home;
