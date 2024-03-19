import React from "react";
import "../styles/HeaderStyles.css"; // Import the CSS file for styling

const Header = ({ headingTitle1, headingTitle2, headerColor }) => {
  return (
    <div className="header-container" style={{ backgroundColor: headerColor }}>
      <div className="header-text1">
        {headingTitle1 && <h2 className="hTitle1">{headingTitle1}</h2>}
        <h2 className="hTitle2">{headingTitle2}</h2>
      </div>
    </div>
  );
};

export default Header;
