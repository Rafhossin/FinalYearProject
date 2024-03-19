import React from "react";
import "../styles/HomepagePrimary.css"; // Import the CSS file for styling

const AboutDiabPrimary = ({
  heading1,
  heading2,
  paragraph,
  imagePath,
  altText,
  color,
}) => {
  return (
    <div className="main-container1" style={{ backgroundColor: color }}>
      <div className="text-container1">
        <h2 className="title2">{heading1}</h2>
        <h2 className="title1">{heading2}</h2>
        <p className="subtitle1">{paragraph}</p>
      </div>

      <div className="image-container1">
        <img src={imagePath} alt={altText} />
      </div>
    </div>
  );
};

export default AboutDiabPrimary;
