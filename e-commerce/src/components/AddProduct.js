import React, { useState, useEffect } from "react";
import withContext from "../withContext";
import { useNavigate } from "react-router-dom";

const initState = {
  name: "",
  price: "",
  image: "",
  manufacturer: "",
  condition: "",
  discount: 0,
};

const AddProduct = (props) => {
  const [state, setState] = useState(initState);
  const [selectedCategory, setSelectedCategory] = useState("doorbells");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const fetchData = async (category) => {
    try {
      const response = await fetch("/db.json"); // Assuming the file is in the public directory
      const data = await response.json();

      if (data.products && data.products[category]) {
        setProducts(data.products[category]);
      }
    } catch (error) {
      console.error("Error fetching data from db.json: ", error);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    const { name, price, image, manufacturer, condition, discount } = state;

    if (name && price && image && manufacturer && condition && discount >= 0) {
      const newProduct = {
        name,
        price,
        image,
        manufacturer,
        condition,
        discount,
      };

      const addProductFunction = props.context.addProduct;
      if (addProductFunction) {
        addProductFunction(newProduct, () => setState(initState));
      } else {
        console.error("addProduct function not found in context");
      }

      // Show a success message
      // This should be replaced with appropriate feedback
      console.log("Product created successfully");
    } else {
      // Handle invalid input, e.g., display an error message
      console.error("Please fill in all required fields");
    }
  };

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value, error: "" });

  const { name, price, image, manufacturer, condition, discount } = state;
  const { user } = props.context;

  // Check if user access level is less than 1, otherwise, redirect
  if (!(user && user.accessLevel < 1)) {
    navigate("/");
    return null; // Return nothing if access level is not met
  }

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Add Product</h4>
        </div>
      </div>
      <br />
      <br />
      <div className="select">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="doorbells">Door Bells</option>
          <option value="doorlocks">Door Locks</option>
          <option value="lights">Lights</option>
          <option value="speakers">Speakers</option>
          <option value="thermostats">Thermostats</option>
        </select>
      </div>
      <form onSubmit={save}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Product Name: </label>
              <input
                className="input"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label">Price: </label>
              <input
                className="input"
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label">Image URL: </label>
              <input
                className="input"
                type="text"
                name="image"
                value={image}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label">Manufacturer: </label>
              <input
                className="input"
                type="text"
                name="manufacturer"
                value={manufacturer}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label">Condition (New or Used): </label>
              <input
                className="input"
                type="text"
                name="condition"
                value={condition}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label">Discount (%): </label>
              <input
                className="input"
                type="number"
                name="discount"
                value={discount}
                onChange={handleChange}
                required
              />
            </div>
            {state.flash && (
              <div className={`notification ${state.flash.status}`}>
                {state.flash.msg}
              </div>
            )}
            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
                type="submit"
                onClick={save}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default withContext(AddProduct);
