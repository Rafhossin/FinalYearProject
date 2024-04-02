import React from "react";
import "../styles/DiabetesComPrimary.css"; // Import the CSS file for styling

const DiabetesComPrimary = ({
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
    <div className="dcp-main-container-com" style={{ backgroundColor: color }}>
      <div className="dcp-text-container-com">
        {heading1 && <h2 className="dcp-title2">{heading1}</h2>}{" "}
        <h2 className="dcp-title1">{heading2}</h2>
        {heading3 && <h2 className="dcp-title3">{heading3}</h2>}{" "}
        {/* heading3 is conditionally rendered */}
        <p className="dcp-subtitle1">{paragraph}</p>
        {showButton && <button onClick={onClick}>{btnText}</button>}
      </div>

      <div className="dcp-image-container-com">
        <img src={imagePath} alt={altText} />
      </div>
    </div>
  );
};

export default DiabetesComPrimary;
