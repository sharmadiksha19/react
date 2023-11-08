import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Context from "./Context";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Bestseller from "./components/Bestseller";
import Home from "./components/Home";
import Account from "./components/Account";
import Storemanager from "./components/Storemanager";
import Customer from "./components/Customer";
import Salesman from "./components/Salesman";
import Checkout from "./components/Checkout";

export default function App() {
  const [state, setState] = useState({
    user: null,
    cart: {},
    products: [],
    showMenu: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  //FETCH
  async function fetchProducts() {
    try {
      const response = await fetch("./db.json");
      const data = await response.json();
      const products = data.products;
      setState((prevState) => ({ ...prevState, products }));
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  }

  return (
    <Context.Provider
      value={{
        ...state,
      }}
    >
      <div className="App">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/home" className="navbar-item is-size-4">
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
              <Link to="/bestseller" className="navbar-item">
                Products
              </Link>
            </div>
            <div className="navbar-end">
              {!state.user ? (
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
              ) : (
                <Link to="/logout" className="navbar-item">
                  Logout
                </Link>
              )}
            </div>
          </div>
        </nav>
        <body></body>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bestseller" element={<Bestseller />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/salesman" element={<Salesman />} />
          <Route path="/storemanager" element={<Storemanager />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            &copy; {new Date().getFullYear()} Smart Homes. All rights reserved.
          </p>
        </div>
      </footer>
    </Context.Provider>
  );
}
