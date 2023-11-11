import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ handleLogout }) {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    handleLogout();
    navigate("/home");
  };

  const handleCancelLogout = () => {
    navigate(-1); // Go back to the previous page.
  };

  return (
    <div className="logout-alert">
      <div className="alert-content">
        <div className="row">
          <p>Are you sure you want to logout?</p>
          <button onClick={handleConfirmLogout}>Yes</button>
          <button onClick={handleCancelLogout}>No</button>
        </div>
      </div>
    </div>
  );
}
