// OrderHistory.js
import React, { useEffect, useState } from "react";
import "./OrderHistory.css";

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
  }, [orderCount]);

  return (
    <div>
      <h2>Order History</h2>
      <p>Total Orders: {orderCount}</p>
      {orderCount > 0 && (
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Confirmation Number</th>
              <th>Pickup/Delivery Date</th>
              {/* Add more table headers for additional order details */}
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNumber}</td>
                <td>{order.confirmationNumber}</td>
                <td>{new Date(order.pickupDate).toDateString()}</td>
                {/* Add more table cells for additional order details */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderHistory;
