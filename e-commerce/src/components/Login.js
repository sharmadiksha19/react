import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("customer");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Here you can call your login function with the username, password, and usertype.
    // For example, you can call login(username, password, usertype) here.

    // After successful login, you can navigate to the desired page.
    navigate("/"); // Navigate to the homepage or any other page you prefer.
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>User Type:</label>
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
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
