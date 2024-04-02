import React from "react";
import { useNavigate } from "react-router-dom";

import thristyImage from "../assets/images/aboutDiabPage/thirsty.webp"; // Path to  image
import symtomImage from "../assets/images/aboutDiabPage/symtom.png"; // Path to  image
import PredictionImage from "../assets/images/aboutDiabPage/predictionTest.jpg"; // Path to  image
import ToolsCalPrimary from "../components/ToolsCalPrimary";
import AboutDiabPrimary from "../components/AboutDiabPrimary";
import AboutDiabetesSecondary from "../components/AboutDiabSecondary";

const aboutDiabPage = () => {
  const navigate = useNavigate(); // Create the navigate function

  // Function to handle the button click
  const handleRiskTestClick = () => {
    navigate("/start-cancelPred"); // Navigate to the Start cancel Prediction page
  };

  return (
    <>
      <div className="main-container">
        <AboutDiabPrimary
          heading1={"About Diabetes"}
          heading2={"Recognising Early Indicators and Symptoms"}
          paragraph={
            "It's essential to be aware of the early warning signs and symptoms of diabetes and its complications, enabling you to take proactive steps for better health management."
          }
          imagePath={thristyImage}
          altText={"thristy image"}
          color={"#1b2324"}
        />

        <AboutDiabetesSecondary
          heading1={"About Diabetes"}
          heading2={"Type 2 Symptoms"}
          paragraph={
            "The symptoms listed below are commonly associated with type 2 diabetes, but they can be so mild in some individuals with the condition that they remain undetected.                     Frequent signs of diabetes include :"
          }
          // paragraph2={"Frequent signs of diabetes include :"}
          listItems={[
            "Increased urination",
            "Excessive thirst",
            "Intense hunger despite eating",
            "Severe tiredness",
            "Blurred vision",
            "Slow healing of cuts and bruises",
            "Weight loss even with increased appetite",
            "Tingling, discomfort, or loss of feeling in the   hands and feet( type 2 diabetes )",
          ]}
          paragraph3={
            "Identifying and managing diabetes early can significantly reduce the risk of developing its complications."
          }
          imagePath={symtomImage}
          imageHeight={"800px"}
          altText={"symtom image"}
          bgcolor={"#008080"}
        />

        <ToolsCalPrimary
          heading1={"About Diabetes"}
          heading2={"Type 2 Diabetes Risk Assessment"}
          paragraph={
            "Determine your risk of developing type 2 diabetes using our quick, 60- second Type 2 Diabetes Prediction Test."
          }
          btnText={"Take the Prediction Test"}
          imagePath={PredictionImage}
          altText={"risk test image"}
          onClick={handleRiskTestClick} // Pass the navigation function to the onClick prop
          color={"#3F6697"}
        />
      </div>
    </>
  );
};

export default aboutDiabPage;
