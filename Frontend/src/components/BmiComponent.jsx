import React from "react";

import "../styles/BmiStyles.css"; // Import the CSS file for styling

const AboutDiabetesSecondary = ({
  paragraph,
  imagePath,
  altText,
  bgcolor,
  listItems, // New prop for the list items
}) => {
  return (
    <>
      {/* {console.log({ bgcolor })} */}
      {/* Logs the color prop when the component renders */}
      <div className="main-container3" style={{ backgroundColor: bgcolor }}>
        <div className="text-container3">
          {paragraph && <p className="list">{paragraph}</p>}
          {/* <p className="subtitle2">{paragraph2}</p> */}
          <p className="subtitle4">Steps to follow:</p>
          <ol>
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="image-container3">
          <img src={imagePath} alt={altText} />
        </div>
      </div>
    </>
  );
};

export default AboutDiabetesSecondary;
