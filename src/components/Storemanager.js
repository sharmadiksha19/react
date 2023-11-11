import React, { useState } from "react";
import "./Storemanager.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const StoreManager = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    discount: 0,
    manufacturer: "",
    condition: "",
    image: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  const handleAddProduct = () => {
    setProducts((prevProducts) => [...(prevProducts || []), newProduct]);
    setNewProduct({
      name: "",
      price: 0,
      discount: 0,
      manufacturer: "",
      condition: "",
      image: "",
    });
  };

  const handleDeleteProduct = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...(prevProducts || [])];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };

  const handleUpdateProduct = () => {
    if (updateIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[updateIndex] = newProduct;
      setProducts(updatedProducts);
      setIsUpdating(false);
      setUpdateIndex(null);
      setNewProduct({
        name: "",
        price: 0,
        discount: 0,
        manufacturer: "",
        condition: "",
        image: "",
      });
    }
  };

  const handleUpdateClick = (index) => {
    setIsUpdating(true);
    setUpdateIndex(index);
    setNewProduct(products[index]);
  };

  return (
    <div>
      <div className="navbar-end">
        <Link to="/login" className="navbar-item">
          Logout
        </Link>
      </div>
      <div className="store-manager">
        <h2>Store Manager</h2>
        <div>
          <h3>{isUpdating ? "Update Product" : "Add New Product"}</h3>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />

          <button onClick={isUpdating ? handleUpdateProduct : handleAddProduct}>
            {isUpdating ? "Update Product" : "Add Product"}
          </button>
        </div>
        <div>
          <h3>Product List</h3>
          <ul>
            {(products || []).map((product, index) => (
              <li key={index}>
                {product.name} (
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
                )
                <button onClick={() => handleDeleteProduct(index)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateClick(index)}>Update</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoreManager;
