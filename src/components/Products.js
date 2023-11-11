import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";
import Navigation from "../Navigation";
import Footer from "./Footer";

const db = require("./db.json");
const productsData = db.products[0];

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("doorbells");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const product of cart) {
      const discountedPrice =
        product.price - (product.price * product.discount) / 100;
      totalPrice += discountedPrice;
    }
    return totalPrice.toFixed(2);
  };

  const displayProducts = () => {
    const products = productsData[selectedCategory];

    if (!products) {
      return <p>Category not found.</p>;
    }

    return products.map((product, index) => {
      const discountedPrice =
        product.price - (product.price * product.discount) / 100;

      const addToCart = () => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        console.log(`Added "${product.name}" to the cart.`);
      };

      return (
        <div key={index} className="product-card">
          <img src={`${product.image}`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Discounted Price: ${discountedPrice.toFixed(2)}</p>
          <p>Manufacturer: {product.manufacturer}</p>
          <p>Condition: {product.condition}</p>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      );
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bs">
      <Navigation />
      <h1> Products on Smart Homes</h1>
      <div className="category-buttons">
        <button onClick={() => changeCategory("doorbells")}>Doorbells</button>
        <button onClick={() => changeCategory("doorlocks")}>Door Locks</button>
        <button onClick={() => changeCategory("lights")}>Lights</button>
        <button onClick={() => changeCategory("speakers")}>Speakers</button>
        <button onClick={() => changeCategory("thermostats")}>
          Thermostats
        </button>
      </div>
      <div className="product-container">{displayProducts()}</div>
      <div className="cart-container">
        <hr className="separator" />
        <h2>Shopping Cart</h2>
        {cart.length > 0 ? (
          <div>
            <ul>
              {cart.map((product, index) => (
                <li key={index}>
                  {product.name} (
                  {(
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)}
                  )
                </li>
              ))}
            </ul>
            <p>Total Price: ${calculateTotalPrice()}</p>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
