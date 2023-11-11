import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import Navigation from "../Navigation";

function OrderHistory() {
  const [orderCount, setOrderCount] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    // Fetch the user's order count from wherever it is stored (e.g., local storage or a backend)
    const userOrderCount = localStorage.getItem("userOrderCount") || 0;
    setOrderCount(parseInt(userOrderCount, 10));

    // Fetch and set order details
    const userOrderDetails = [];
    for (let i = 1; i <= userOrderCount; i++) {
      const orderDetail = JSON.parse(localStorage.getItem(`order${i}Details`));
      if (orderDetail) {
        userOrderDetails.push(orderDetail);
      }
    }
    setOrderDetails(userOrderDetails);
  }, []);

  const handleCancelOrder = (orderNumber) => {
    // Display a confirmation dialog before canceling the order
    if (
      window.confirm(
        `Are you sure you want to cancel order number ${orderNumber}?`
      )
    ) {
      // Assuming that orderDetails.orderNumber is a valid order number
      const canceledOrder = orderDetails.find(
        (order) => order.orderNumber === orderNumber
      );
      // Update order count in localStorage
      const userOrderCount = localStorage.getItem("userOrderCount") || 0;
      localStorage.setItem("userOrderCount", parseInt(userOrderCount, 10) - 1);

      // Remove the canceled order details from local storage
      localStorage.removeItem(`order${orderNumber}Details`);

      // Update state to reflect the canceled order
      setOrderDetails((prevOrderDetails) =>
        prevOrderDetails.filter(
          (order) => order.orderNumber !== canceledOrder.orderNumber
        )
      );

      alert("Order has been canceled.");
    }
  };

  const handleReorder = (orderNumber) => {
    // Display a confirmation dialog before reordering
    if (
      window.confirm(
        `Are you sure you want to reorder items from order number ${orderNumber}?`
      )
    ) {
      const reorderedOrder = orderDetails.find(
        (order) => order.orderNumber === orderNumber
      );

      // Update state to reflect the reordered order
      setOrderDetails((prevOrderDetails) => [
        ...prevOrderDetails,
        { ...reorderedOrder, orderNumber: orderCount + 1 },
      ]);

      // Update order count in localStorage
      localStorage.setItem("userOrderCount", orderCount + 1);

      // Update state to reflect the incremented order count
      setOrderCount(orderCount + 1);
    }
  };

  return (
    <div>
      <Navigation />
      <h2>Order History</h2>
      <p>Total Orders: {orderCount}</p>
      {orderCount > 0 && (
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Confirmation Number</th>
              <th>Pickup/Delivery Date</th>
              <th>Method</th>
              <th>Store Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{order.confirmationNumber}</td>
                <td>{new Date(order.pickupDate).toDateString()}</td>
                <td>{order.deliveryMethod}</td>
                <td>{order.storeLocation}</td>
                <td>
                  <button onClick={() => handleCancelOrder(order.orderNumber)}>
                    Cancel
                  </button>
                  <button onClick={() => handleReorder(order.orderNumber)}>
                    Reorder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
