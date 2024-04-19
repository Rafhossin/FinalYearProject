import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import PredictionTest from "../assets/images/riskTest/PredictionTest.webp"; // Import the image
import StartCancelPredComponent from "../components/StartCancelPrediction";
import { serverEndpoint } from "../config/constants";

const StartCancelPrediction = () => {
  let navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`${serverEndpoint}/api/verifyUser`)
      .then((res) => {
        if (res.status == 200) {
          console.log("User is verified");
        } else {
          console.log("User is not verified");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error verifying user: ", error);
        navigate("/login");
      });
  }, []);

  // Function to handle the button click
  const handleRiskTestClick = () => {
    navigate("/risk-test"); // Navigate to the Risk Test page
  };
  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <Header
          headingTitle1={"Tools and Resources"}
          headingTitle2={"Take The Type 2 Diabetes Prediction Test"}
          headerColor={"#008080"}
        />
        <StartCancelPredComponent
          heading2={
            "Welcome to Our Machine Learning Type 2 Diabetes Prediction Test!"
          }
          heading3={
            "This test consists of 11 carefully designed questions, each backed by extensive medical research. Completing this test will provide you with a personalised prediction assessment and it will only take about 2 minutes of your time. Let's get started!"
          }
          onClick={handleRiskTestClick}
          onClick1={navigateToHome}
          btnText={"Start"}
          btnText1={"Cancel"}
          imagePath={PredictionTest}
          altText={"Prediction Test image"}
        />
      </div>
    </>
  );
};

export default StartCancelPrediction;
