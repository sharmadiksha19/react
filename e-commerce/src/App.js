import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Context from "./Context";

export default function App() {
  const [state, setState] = useState({
    user: null,
    cart: {},
    products: [],
    showMenu: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function fetchProducts() {
    try {
      const response = await fetch("/db.json"); // Assuming the file is in the public directory
      const data = await response.json();
      const products = data.products;
      setState({ ...state, products });
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  }

  function addProduct(product, callback) {
    const products = this.state.products.slice();
    product.id = products.length + 1; // Assign a unique ID (you can use a more robust method)
    products.push(product);
    this.setState({ products }, () => callback && callback());
  }

  async function login(username, password) {
    // Fetch user data from db.json
    const response = await fetch("/db.json"); // Assuming the file is in the public directory
    const data = await response.json();
    const users = data.users;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Authentication successful
      const accessLevel = getAccessLevel(user.usertype);
      const authenticatedUser = {
        username: user.username,
        usertype: user.usertype,
      };

      setState({ user: authenticatedUser });
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      return true;
    } else {
      // Authentication failed
      return false;
    }
  }

  function getAccessLevel(usertype) {
    switch (usertype) {
      case "customer":
        return 0;
      case "salesman":
        return 1;
      case "storemanager":
        return 2;
      default:
        return 0; // Default to customer access level
    }
  }

  function logout(e) {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  }

  function addToCart(cartItem) {
    const cart = { ...state.cart };
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setState({ cart });
  }

  function removeFromCart(cartItemId) {
    const cart = { ...state.cart };
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    setState({ cart });
  }

  function clearCart() {
    let cart = {};
    localStorage.removeItem("cart");
    setState({ cart });
  }

  function checkout() {
    if (!state.user) {
      navigate("/login"); // Use navigate directly to navigate to "/login"
      return;
    }

    const cart = state.cart;

    const products = state.products.map((p) => {
      if (cart[p.name]) {
        p.stock -= cart[p.name].amount; // Update stock
      }
      return p;
    });

    setState({ products });
    clearCart();
  }

  return (
    <Context.Provider
      value={{
        ...state,
        addProduct,
        login,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        logout,
      }}
    >
      <div className="App">
        <nav
          className="navbar container"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <b className="navbar-item is-size-4 ">Smart Homes</b>
            <label
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
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
            <Link to="/products" className="navbar-item">
              Products
            </Link>
            {state.user && state.user.accessLevel < 1 && (
              <Link to="/add-product" className="navbar-item">
                Add Product
              </Link>
            )}
            <Link to="/cart" className="navbar-item">
              Cart
              <span className="tag is-primary" style={{ marginLeft: "5px" }}>
                {Object.keys(state.cart).length}
              </span>
            </Link>
            {!state.user ? (
              <Link to="/login" className="navbar-item">
                Login
              </Link>
            ) : (
              <Link to="/" onClick={logout} className="navbar-item">
                Logout
              </Link>
            )}
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route exact path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}
