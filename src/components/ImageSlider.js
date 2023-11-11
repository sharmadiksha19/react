// ImageSlider.js
import React, { useState, useEffect } from "react";
import "./ImageSlider.css"; // Import the CSS file for styling

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto transition between images
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change 3000 to the desired interval in milliseconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]); // Run effect whenever currentImageIndex or images.length changes

  return (
    <div className="image-slider">
      <img
        src={`/images/${images[currentImageIndex]}`}
        alt={`Image ${currentImageIndex + 1}`}
      />
    </div>
  );
};

export default ImageSlider;
