import React from "react";

import "../styles/HomepageSecondary.css"; // Import the CSS file for styling

const AboutDiabetesSecondary = ({
  heading1,
  heading2,
  paragraph,
  paragraph2,
  paragraph3,
  imagePath,
  altText,
  bgcolor,
  listItems, // New prop for the list items
}) => {
  return (
    <>
      {/* Logs the color prop when the component renders */}
      <div className="main-container2" style={{ backgroundColor: bgcolor }}>
        <div className="image-container2">
          <img src={imagePath} alt={altText} />
        </div>
        <div className="text-container2">
          <h2 className="title">{heading1}</h2>
          <h2 className="title1">{heading2}</h2>
          {paragraph && <p className="subtitle">{paragraph}</p>}
          {/* <p className="subtitle2">{paragraph2}</p> */}
          <ul>
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {paragraph3 && <p className="subtitle">{paragraph3}</p>}
        </div>
      </div>
    </>
  );
};

export default AboutDiabetesSecondary;
