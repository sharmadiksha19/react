// Salesman.js
import React, { useState } from "react";
import "./Salesman.css"; // Import your CSS file
import Navigation from "../Navigation";

const Salesman = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    password: "",
    usertype: "",
  });

  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    productName: "",
    quantity: 0,
  });

  const handleAddCustomer = () => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    setNewCustomer({ name: "", password: "", usertype: "" });
  };

  const handleDeleteCustomer = (index) => {
    const updatedCustomers = [...customers];
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);
  };

  const handleAddOrder = () => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setNewOrder({ customerName: "", productName: "", quantity: 0 });
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  return (
    <div className="salesman">
      <Navigation />
      <h2>Salesman Dashboard</h2>

      {/* Add Customer Section */}
      <div>
        <h3>Add Customer</h3>
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={newCustomer.password}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, password: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="UserType"
          value={newCustomer.usertype}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, usertype: e.target.value })
          }
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>

      {/* Customer List Section */}
      <div>
        <h3>Customer List</h3>
        <ul>
          {customers.map((customer, index) => (
            <li key={index}>
              {customer.name} ({customer.usertype})
              <button onClick={() => handleDeleteCustomer(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Order Section */}
      <div>
        <h3>Add Order</h3>
        <input
          type="text"
          placeholder="Customer Name"
          value={newOrder.customerName}
          onChange={(e) =>
            setNewOrder({ ...newOrder, customerName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Product Name"
          value={newOrder.productName}
          onChange={(e) =>
            setNewOrder({ ...newOrder, productName: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) =>
            setNewOrder({ ...newOrder, quantity: e.target.value })
          }
        />
        <button onClick={handleAddOrder}>Add Order</button>
      </div>

      {/* Order List Section */}
      <div>
        <h3>Order List</h3>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              {order.customerName} - {order.productName} (Qty: {order.quantity})
              <button onClick={() => handleDeleteOrder(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Salesman;
