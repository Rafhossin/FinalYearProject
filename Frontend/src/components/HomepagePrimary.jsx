import React from "react";
import "../styles/HomepagePrimary.css"; // Import the CSS file for styling

const HomepagePrimary = ({
  heading,
  paragraph,
  btnText,
  imagePath,
  altText,
  onClick,
  color,
}) => {
  return (
    <div className="main-container1" style={{ backgroundColor: color }}>
      <div className="text-container1">
        <h2 className="title1">{heading}</h2>
        <p className="subtitle1">{paragraph}</p>
        <button onClick={onClick}>{btnText}</button>
      </div>

      <div className="image-container1">
        <img src={imagePath} alt={altText} />
      </div>
    </div>
  );
};

export default HomepagePrimary;
