import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usertype, setUsertype] = useState("customer");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    // Simulate a successful registration by showing an alert
    alert("Registration successful! You can now login.");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>User Type</label>
          <select
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="salesman">Salesman</option>
            <option value="storemanager">Store Manager</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
          <p className="login-link">
            <a href="/login">
              Already a user? <span>Login</span>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
