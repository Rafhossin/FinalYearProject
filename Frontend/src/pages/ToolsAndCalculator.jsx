import React from "react";
import { useNavigate } from "react-router-dom";

import riskImage from "../assets/images/calcpage/risk.webp"; // Path to image
import bmiImage from "../assets/images/calcpage/bmi.jpeg"; // Path to image
import glucoseImage from "../assets/images/calcpage/glucoseMeter.jpeg"; // Path to image
import ToolsCalPrimary from "../components/ToolsCalPrimary";
import ToolsCalSecondary from "../components/ToolsCalSecondary";

const toolsPage = () => {
  const navigate = useNavigate(); // Create the navigate function

  // Function to handle the button click
  const handleRiskTestClick = () => {
    navigate("/risk-test"); // Navigate to the Risk Test page
  };

  // Function to handle the button click
  const handleBMIClick = () => {
    navigate("/bmi"); // Navigate to the BMI page
  };

  // Function to handle the button click
  const handleGlucoseLogClick = () => {
    navigate("/glucose-log"); // Navigate to the Glucose Log page
  };
  return (
    <>
      <div className="main-container">
        <ToolsCalPrimary
          showButton={true}
          heading1={"Tools & Resources"}
          heading2={"Type 2 Diabetes Risk Assessment"}
          paragraph={
            "Determine your risk of developing type 2 diabetes using our quick, 60- second Type 2 Diabetes Prediction Test."
          }
          btnText={"Take the Prediction Test"}
          imagePath={riskImage}
          altText={"risk image"}
          onClick={handleRiskTestClick} // Pass the navigation function to the onClick prop
          color={"#1b2324"}
        />

        <ToolsCalSecondary
          showButton={true}
          heading1={"Tools & Resources"}
          heading2={"BMI Calculator"}
          paragraph={
            "Your Body Mass Index( BMI) is determined through a simple calculation involving your weight and height. Using the BMI Calculator, you can ascertain if weight loss is necessary and the extent of weight you might need to shed. Understanding this can assist you in establishing a target for weight loss."
          }
          btnText={"BMI Calculator"}
          imagePath={bmiImage}
          altText={"bmi image"}
          onClick={handleBMIClick} // Pass the navigation function to the onClick prop
          bgcolor={"#008080"}
        />

        <ToolsCalPrimary
          showButton={true}
          heading1={"Tools & Resources"}
          heading2={"Daily Glucose Log"}
          paragraph={
            "Track your daily blood glucose levels to manage your diabetes more effectively. Consistent monitoring can help in maintaining optimal health."
          }
          btnText={"Monitor Your Glucose"}
          imagePath={glucoseImage}
          altText={"glucose meter image"}
          onClick={handleGlucoseLogClick} // Pass the navigation function to the onClick prop
          color={"#3F6697"}
        />
      </div>
    </>
  );
};

export default toolsPage;
