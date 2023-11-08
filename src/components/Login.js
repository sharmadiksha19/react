import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("customer");
  const navigate = useNavigate();

  const allowedUsers = [
    {
      username: "cust",
      password: "cust",
      usertype: "customer",
    },
    {
      username: "sman",
      password: "sman",
      usertype: "salesman",
    },
    {
      username: "store",
      password: "store",
      usertype: "storemanager",
    },
  ];

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const authenticatedUser = allowedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (authenticatedUser) {
      navigate(`/${authenticatedUser.usertype}`);
    } else {
      alert("Invalid user. Please check your credentials.");
    }
  };

  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
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
            <button type="button" onClick={handleLogin}>
              Login
            </button>
            <p className="register-link">
              <a href="/register">
                New user? <span>Register</span>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login; // Export the Login component
