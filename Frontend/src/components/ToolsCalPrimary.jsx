import React from "react";
import "../styles/HomepagePrimary.css"; // Import the CSS file for styling

const ToolsCalPrimary = ({
  heading1,
  heading2,
  heading3,
  paragraph,
  btnText,
  imagePath,
  altText,
  onClick,
  color,
  showButton = true,
}) => {
  return (
    <div className="main-container1" style={{ backgroundColor: color }}>
      <div className="text-container1">
        <h2 className="title2">{heading1}</h2>
        <h2 className="title1">{heading2}</h2>
        {heading3 && <h2 className="title3">{heading3}</h2>}{" "}
        {/* heading3 is conditionally rendered */}
        <p className="subtitle1">{paragraph}</p>
        {showButton && <button onClick={onClick}>{btnText}</button>}
      </div>

      <div className="image-container1">
        <img src={imagePath} alt={altText} />
      </div>
    </div>
  );
};

export default ToolsCalPrimary;
