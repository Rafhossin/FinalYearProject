import React from "react";

import "../styles/HomepageSecondary.css"; // Import the CSS file for styling

const HomepageSecondary = ({
  heading,
  paragraph,
  btnText,
  imagePath,
  altText,
  onClick,
  bgcolor,
}) => {
  return (
    <>
      {/* Logs the color prop when the component renders */}
      <div className="main-container2" style={{ backgroundColor: bgcolor }}>
        <div className="image-container2">
          <img src={imagePath} alt={altText} />
        </div>
        <div className="text-container2">
          <h2 className="title1">{heading}</h2>
          <p className="subtitle2">{paragraph}</p>
          <button onClick={onClick}>{btnText}</button>
        </div>
      </div>
    </>
  );
};

export default HomepageSecondary;
