// Customer.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Customer.css";
import Navigation from "../Navigation";
import ImageSlider from "./ImageSlider";
import Footer from "./Footer";

const Customer = () => {
  const images = [
    "db.jpg",
    "dl.jpg",
    "li.jpg",
    "sp.jpg",
    "doorbells.jpg",
    "doorlocks.jpg",
  ];

  // Replace "Cust" with the actual customer's name
  const customerName = "Cust";
  const navigate = useNavigate();

  return (
    <div className="customer-container">
      <div className="welcome-message">
        <h2>Welcome, {customerName}!</h2>
      </div>
      <hr className="separator" />
      <Navigation />
      <hr className="separator" />
      <ImageSlider images={images} />
    </div>
  );
};

export default Customer;
