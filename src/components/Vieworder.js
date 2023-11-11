// Vieworder.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import "./Vieworder.css"; // Import the CSS file

function Vieworder() {
  // Inside the Vieworder component
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const navigate = useNavigate();

  const handleCancelOrder = () => {
    // Assuming that orderDetails.orderNumber is a valid order number
    const orderNumber = orderDetails.orderNumber;

    // Decrement the order count
    const userOrderCount = localStorage.getItem("userOrderCount") || 0;
    localStorage.setItem("userOrderCount", parseInt(userOrderCount, 10) - 1);

    // Remove the canceled order details from local storage
    localStorage.removeItem(`order${orderNumber}Details`);

    alert("Order has been canceled.");
    // Redirect to the order history page or any other appropriate page
    navigate("/orderhistory");
  };

  if (!orderDetails || !orderDetails.pickupDate) {
    // If orderDetails or pickupDate is null, redirect to checkout
    navigate("/checkout");
    return null;
  }

  // Convert pickupDate to a Date object
  const pickupDate = new Date(orderDetails.pickupDate);

  return (
    <div>
      <Navigation />
      <div className="container">
        <h2>View Order</h2>
        <div>
          <h2>Order Confirmation</h2>
          <p>Order Number: {orderDetails.orderNumber}</p>
          <p>Confirmation Number: {orderDetails.confirmationNumber}</p>
          <p>Pickup/Delivery Date: {pickupDate.toDateString()}</p>
          <p>Name: {orderDetails.name}</p>
          <p>Method: {orderDetails.deliveryMethod}</p>
          <p>Store Location: {orderDetails.storeLocation}</p>
          <hr className="separator" />
          <button type="button" onClick={handleCancelOrder}>
            Cancel Order
          </button>
          <Link to="/checkout">Go back to Checkout</Link>
        </div>
      </div>
    </div>
  );
}

export default Vieworder;
