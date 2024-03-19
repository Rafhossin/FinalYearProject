// InfoButtons.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/InfoButtons.css"; // Import the CSS file for styling
import prediabetesIcon from "../assets/icons/prediabetes.png";
import diagnosingIcon from "../assets/icons/diagnosing.png";
import livingIcon from "../assets/icons/living.png";
import complicationsIcon from "../assets/icons/complications.png";

const InfoButtons = () => {
  return (
    <div className="info-buttons-container">
      <Link to="/prediabetes" className="info-button">
        <img src={prediabetesIcon} alt="Prediabetes" />
        <span>Prediabetes</span>
      </Link>
      <Link to="/diagnosing" className="info-button">
        <img src={diagnosingIcon} alt="Diagnosing Diabetes" />
        <span>Diagnosing Diabetes</span>
      </Link>
      <Link to="/living" className="info-button">
        <img src={livingIcon} alt="Life With Diabetes" />
        <span>Life With Diabetes</span>
      </Link>
      <Link to="/complications" className="info-button">
        <img src={complicationsIcon} alt="Diabetes Complications" />
        <span>Diabetes Complications</span>
      </Link>
    </div>
  );
};

export default InfoButtons;
