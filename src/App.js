import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Context from "./Context";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Products from "./components/Products";
import Home from "./components/Home";
import Account from "./components/Account";
import Storemanager from "./components/Storemanager";
import Customer from "./components/Customer";
import Salesman from "./components/Salesman";
import Checkout from "./components/Checkout";
import ViewOrder from "./components/Vieworder";
import OrderHistory from "./components/OrderHistory";

export default function App() {
  const [state, setState] = useState({
    user: null,
    cart: {},
    products: [],
    showMenu: false,
  });

  //const navigate = useNavigate();

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/vieworder" element={<ViewOrder />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/account" element={<Account />} />
          <Route path="/salesman" element={<Salesman />} />
          <Route path="/storemanager" element={<Storemanager />} />
        </Routes>
      </div>
      <Footer />
    </Context.Provider>
  );
}
