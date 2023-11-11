import React, { useState, useEffect } from "react";

const Storemanager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    manufacturer: "",
    condition: "",
    discount: 0,
  });

  useEffect(() => {
    // Fetch product data from the JSON file
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products.doorbells);
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  // Function to add a new product
  const addProduct = () => {
    setProducts([...products, newProduct]);
  };

  // Function to delete a product
  const deleteProduct = (product) => {
    setProducts(products.filter((p) => p !== product));
  };

  // Function to update a product
  const updateProduct = (product) => {
    setProducts(products.map((p) => (p === product ? newProduct : p)));
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <div>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        {/* Add input fields for other product properties */}
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div>
        <h2>Products List</h2>
        {products.map((product) => (
          <div key={product.name}>
            <p>{product.name}</p>
            {/* Display other product details */}
            <button onClick={() => deleteProduct(product)}>Delete</button>
            <button onClick={() => updateProduct(product)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Storemanager;
