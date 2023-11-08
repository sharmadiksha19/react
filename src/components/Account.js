import React from "react";
import "./Account.css";

const Account = () => {
  return (
    <div className="account-page">
      <div className="sidebar">
        <h2>Navigation</h2>
        <ul>
          <li>Cart</li>
          <li>Orders</li>
        </ul>
      </div>
      <div className="account-info">
        <h1>Welcome, Diksha</h1>
      </div>
    </div>
  );
};

export default Account;
