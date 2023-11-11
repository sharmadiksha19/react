import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            &copy; {new Date().getFullYear()} Smart Homes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
