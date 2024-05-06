import React from "react";

import "../styles/HomepageSecondary.css"; // Import the CSS file for styling

const ToolsCalSecondary = ({
  heading1,
  heading2,
  paragraph,
  btnText,
  imagePath,
  altText,
  onClick,
  bgcolor,
  showButton = true,
}) => {
  return (
    <>
      {/* Logs the color prop when the component renders */}
      <div className="main-container2" style={{ backgroundColor: bgcolor }}>
        <div className="image-container2">
          <img src={imagePath} alt={altText} />
        </div>
        <div className="text-container2">
          <h2 className="title2">{heading1}</h2>
          <h2 className="title1">{heading2}</h2>
          <p className="subtitle2">{paragraph}</p>
          {showButton && <button onClick={onClick}>{btnText}</button>}
        </div>
      </div>
    </>
  );
};

export default ToolsCalSecondary;
