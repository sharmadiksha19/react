import "./Navigation.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Navigation() {
  const [state, setState] = useState({
    user: null,
    cart: {},
    products: [],
    showMenu: false,
  });

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item is-size-4">
          Smart Homes
        </Link>
        <label
          role="button"
          className={`navbar-burger burger ${
            state.showMenu ? "is-active" : ""
          }`}
          aria-label="menu"
          aria-expanded={state.showMenu}
          data-target="navbarBasicExample"
          onClick={(e) => {
            e.preventDefault();
            setState({ showMenu: !state.showMenu });
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </label>
      </div>
      <div className={`navbar-menu ${state.showMenu ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link to="/products" className="navbar-item">
            Products
          </Link>
          <Link to="/vieworder" className="navbar-item">
            View Order
          </Link>
          <Link to="/orderhistory" className="navbar-item">
            Order History
          </Link>
        </div>
        <div className="navbar-end">
          <Link to="/login" className="navbar-item">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
