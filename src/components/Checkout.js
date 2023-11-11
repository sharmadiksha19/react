import React, { useState } from "react";
import "./Checkout.css";
import Navigation from "../Navigation";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    creditCard: "",
    deliveryMethod: "homeDelivery",
    storeLocation: "",
  });

  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [isOrderCancellable, setIsOrderCancellable] = useState(false);
  const navigate = useNavigate();

  const storeLocations = [
    { name: "Store A", zipCode: "10001" },
    { name: "Store B", zipCode: "20002" },
    { name: "Store C", zipCode: "30003" },
    { name: "Store D", zipCode: "40004" },
    { name: "Store E", zipCode: "50005" },
    { name: "Store F", zipCode: "60006" },
    { name: "Store G", zipCode: "70007" },
    { name: "Store H", zipCode: "80008" },
    { name: "Store I", zipCode: "90009" },
    { name: "Store J", zipCode: "10010" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = () => {
    const orderNumber = getOrderNumber();
    const confirmationNumber = generateConfirmationNumber();
    const pickupDate = generatePickupDate();

    const today = new Date();
    const fiveBusinessDaysBeforePickup = new Date(pickupDate);
    fiveBusinessDaysBeforePickup.setDate(
      fiveBusinessDaysBeforePickup.getDate() - 5
    );

    setIsOrderCancellable(today <= fiveBusinessDaysBeforePickup);
    setConfirmationNumber(confirmationNumber);
    setPickupDate(pickupDate);

    // Convert pickupDate to a string before saving to localStorage
    const orderDetails = {
      orderNumber,
      confirmationNumber,
      pickupDate: pickupDate.toISOString(), // Convert to string
      isOrderCancellable,
      name: formData.name,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      creditCard: formData.creditCard,
      deliveryMethod: formData.deliveryMethod,
      storeLocation: formData.storeLocation,
    };

    // Increment the order count for the user
    const userOrderCount = localStorage.getItem("userOrderCount") || 0;
    localStorage.setItem("userOrderCount", parseInt(userOrderCount, 10) + 1);

    // Store order details in local storage
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    // Save order details to localStorage
    saveOrderDetails(orderNumber, orderDetails);

    navigate("/vieworder", {
      state: orderDetails,
    });
  };

  const handleCancelOrder = () => {
    alert("Order has been canceled.");
    navigate("/vieworder");
  };

  const getOrderNumber = () => {
    const orderCount = localStorage.getItem("orderCount") || 0;
    const newOrderNumber = parseInt(orderCount, 10) + 1;
    localStorage.setItem("orderCount", newOrderNumber);
    return newOrderNumber;
  };

  const saveOrderDetails = (orderNumber, orderDetails) => {
    localStorage.setItem(
      `order${orderNumber}Details`,
      JSON.stringify(orderDetails)
    );
  };

  const generateConfirmationNumber = (orderNumber) => {
    // Implement your logic to generate a confirmation number
    return `CONFIRM${orderNumber}${Math.floor(Math.random() * 1000)}`;
  };

  const generatePickupDate = () => {
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() + 14);
    return orderDate;
  };

  return (
    <div>
      <Navigation />
      <div className="container">
        <h2>Checkout</h2>
        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Credit Card</label>
            <input
              type="text"
              name="creditCard"
              value={formData.creditCard}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Delivery Method</label>
            <select
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onChange={handleInputChange}
            >
              <option value="homeDelivery">Home Delivery</option>
              <option value="inStorePickup">In-Store Pickup</option>
            </select>
          </div>
          {formData.deliveryMethod === "inStorePickup" && (
            <div>
              <label>Store Location</label>
              <select
                name="storeLocation"
                value={formData.storeLocation}
                onChange={handleInputChange}
              >
                <option value="">Select a store location</option>
                {storeLocations.map((location, index) => (
                  <option key={index} value={location.zipCode}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button type="button" onClick={handleCheckout}>
            Checkout
          </button>
        </form>
        <hr className="separator" />
      </div>
    </div>
  );
}

export default Checkout;
