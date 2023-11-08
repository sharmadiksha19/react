import React, { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    creditCard: "",
    deliveryMethod: "homeDelivery", // Default to home delivery
    storeLocation: "", // Only used for in-store pickup
  });

  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [isOrderCancellable, setIsOrderCancellable] = useState(false);

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
    const confirmationNumber = generateConfirmationNumber();
    const pickupDate = generatePickupDate();

    // Check if the order is cancellable
    const today = new Date();
    const fiveBusinessDaysBeforePickup = new Date(pickupDate);
    fiveBusinessDaysBeforePickup.setDate(
      fiveBusinessDaysBeforePickup.getDate() - 5
    );

    setIsOrderCancellable(today <= fiveBusinessDaysBeforePickup);
    setConfirmationNumber(confirmationNumber);
    setPickupDate(pickupDate);
  };

  const handleCancelOrder = () => {
    // Implement order cancellation logic here
    // Notify the customer that the order has been canceled
    alert("Order has been canceled.");
  };

  const generateConfirmationNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 8; // You can adjust the length as needed

    let confirmationNumber = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      confirmationNumber += characters.charAt(randomIndex);
    }

    return confirmationNumber;
  };

  const generatePickupDate = () => {
    // Calculate the delivery/pickup date logic here
    // Two weeks after the order date
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() + 14);
    return orderDate;
  };

  return (
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
      {confirmationNumber && pickupDate && (
        <div>
          <p>Confirmation Number: {confirmationNumber}</p>
          <p>Pickup/Delivery Date: {pickupDate.toDateString()}</p>
          {isOrderCancellable && (
            <button type="button" onClick={handleCancelOrder}>
              Cancel Order
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Checkout;
