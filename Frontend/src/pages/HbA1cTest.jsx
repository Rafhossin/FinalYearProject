import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext"; // Path to the UserContext
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChakraProvider, Button, Alert, AlertIcon } from "@chakra-ui/react";

import HbA1cImage from "../assets/images/logGlucose/hba1c.jpeg"; // Path to image

import Header from "../components/Header";

import DiabetesComPrimary from "../components/DiabetesComPrimary";
// import "../styles/DiabetesComplication.css"; // Path to CSS file

import "../styles/GlucoseLog.css"; // Path to CSS file
import { serverEndpoint } from "../config/constants";

const HbA1cPredictionTest = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the user data from the UserContext
  const { setUser } = useContext(UserContext);
  let existingGlucoseReadings = []; // Initialize the existing glucose readings
  // Set the base URL for the axios requests
  axios.defaults.withCredentials = true;

  // useEffect to verify the user
  useEffect(() => {
    axios
      .get(`${serverEndpoint}/api/verifyUser`)
      .then((res) => {
        if (res.status == 200) {
          console.log("");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error verifying user: ", error);
        navigate("/login");
      });
  }, []);

  // Check if the user has any existing glucose readings
  if (user && user.health_profile) {
    existingGlucoseReadings = user.health_profile.glucose_readings;
  }

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");

  // Define two state variables for the success messages
  const [successMessage1, setSuccessMessage1] = useState("");
  const [successMessage2, setSuccessMessage2] = useState("");
  const [predictedHbA1c, setPredictedHbA1c] = useState(null); // State for predicted HbA1c

  // Function to handle the health report
  const handleHealthReport = () => {
    if (
      user &&
      !user.health_profile &&
      user.health_profile.length === 0 &&
      user.health_profile.glucose_readings.length === 0 &&
      user.health_profile.HbA1c_readings.length === 0
    ) {
      setErrorMessage1(
        "Health profile is empty or incomplete. Please add some data."
      );
      return;
    } else {
      navigate("/health-report"); // Navigate to the Risk Test page
    }
  };

  // Function to generate the HbA1c message based on the predicted HbA1c
  const generateHbA1cMessage = () => {
    if (!predictedHbA1c) {
      return ""; // Default message
    }
    if (predictedHbA1c >= 6.5) {
      return "Your HbA1c level is 6.5% or above, indicating that your blood sugar has been consistently higher than the recommended levels over the past few months. It's important to discuss these results with your healthcare provider. They can help you with strategies to lower your HbA1c, such as adjustments in diet, exercise, medication, or other lifestyle changes to reduce the risk of diabetes complications.";
    } else if (predictedHbA1c >= 5.7) {
      return "Your HbA1c level is between 5.7% and 6.4%, indicating that your blood sugar levels are higher than normal but not high enough to be diagnosed as diabetes. It's important to discuss these results with your healthcare provider. They can help you with strategies to lower your HbA1c, such as adjustments in diet, exercise, medication, or other lifestyle changes to reduce the risk of developing diabetes.";
    } else {
      return "Your HbA1c level is below 5.7%, indicating that your blood sugar levels are within the normal range. Continue maintaining a healthy lifestyle to keep your blood sugar levels in check.";
    }
  };

  // Function to handle the HbA1c prediction
  const handleHbA1cPrediction = async () => {
    // Check if the user has enough readings
    if (existingGlucoseReadings.length < 20) {
      setErrorMessage(
        "Not enough glucose readings available. Exactly 20 readings are required."
      );
      return;
    }

    try {
      const userId = user._id; // Ensure the user object has the `_id` field available

      const response = await axios.post(
        `${serverEndpoint}/api/hba1c-prediction`,
        {
          userId: userId,
        }
      );

      // Update the UserContext with the returned user data
      setUser(response.data.user);

      if (response.status == 200) {
        setPredictedHbA1c(response.data.predicted_hba1c); // Update the predicted HbA1c state

        // Update the success messages separately
        setSuccessMessage1(`Predicted HbA1c: ${response.data.predicted_hba1c}`);
        setSuccessMessage2(`HbA1c risk score is: ${response.data.risk_score}`);
      }
      if (response.status == 404) {
        setErrorMessage(
          "We encountered an issue while trying to fetch your HbA1c prediction. Please try again later."
        );
        return;
      }
      if (response.status !== 200) {
        setErrorMessage(
          "We encountered an issue while trying to fetch your HbA1c prediction. Please try again later."
        );
        return;
      }
      if (data.success) {
        console.log("");
      }
    } catch (error) {
      if (error.response.status == 500) {
        console.log("");
        return;
      } else {
        console.error(" ");
      }
      return;
    }
  };

  return (
    <>
      <div className="main-container">
        <Header
          headingTitle1={"Tools& Resources"}
          headingTitle2={"HbA1c Forecasting Test"}
          headerColor={"#008080"}
        />
        <DiabetesComPrimary
          showButton={false}
          heading2={"What is HbA1c?"}
          paragraph={
            "HbA1c is your average blood glucose (sugar) levels for the last two to three months. If you have diabetes, an ideal HbA1c level is 48mmol/mol (6.5%) or below. If you're at risk of developing type 2 diabetes, your target HbA1c level should be below 42mmol/mol (6%)."
          }
          imagePath={HbA1cImage}
          altText={"HbA1c Image"}
          color={"#D0E1EE"}
        />

        <div className="glucose-log-container">
          <div className="mgLevel">
            <h1>What does HbA1c mean?</h1>
            <p>
              HbA1c is what’s known as glycated haemoglobin. This is something
              that’s made when the glucose (sugar) in your body sticks to your
              red blood cells. Your body can’t use the sugar properly, so more
              of it sticks to your blood cells and builds up in your blood. Red
              blood cells are active for around 2-3 months, which is why the
              reading is taken quarterly.A high HbA1c means you have too much
              sugar in your blood. This means you’re more likely to develop
              diabetes complications, like serious problems with your eyes and
              feet.Knowing your HbA1c level and what you can do to lower it will
              help you reduce your risk of devastating complications. This means
              getting your HbA1c checked regularly.
            </p>
          </div>

          <div className="target-range">
            <h1>Your HbA1c Results:</h1>
            <div className="glucose-meter">
              <h2>HbA1c Result Monitor</h2>
              <p className="dp1">
                To forecast your HbA1c click the button below
              </p>
              <div className="dp1">
                <ChakraProvider>
                  {errorMessage && (
                    <Alert
                      status="error"
                      variant="left-accent"
                      style={{ width: "800px" }}
                      marginTop="40px"
                    >
                      <AlertIcon />
                      {errorMessage}
                    </Alert>
                  )}
                  <Button
                    colorScheme="teal"
                    size="lg"
                    mt={4}
                    mb={8}
                    onClick={handleHbA1cPrediction}
                  >
                    Result
                  </Button>
                  {successMessage1 && (
                    <Alert
                      status="success"
                      variant="left-accent"
                      style={{ width: "800px", fontSize: "30px" }}
                      marginBottom="10px"
                    >
                      <AlertIcon />
                      {successMessage1}
                    </Alert>
                  )}
                  {successMessage2 && (
                    <Alert
                      status="success"
                      variant="left-accent"
                      style={{ width: "800px", fontSize: "30px" }}
                      marginBottom="20px"
                    >
                      <AlertIcon />
                      {successMessage2}
                    </Alert>
                  )}
                </ChakraProvider>
                <div>
                  <p>{generateHbA1cMessage()}</p>
                </div>
              </div>
            </div>

            <h1>Health Report:</h1>
            <div className="glucose-meter">
              <div className="dp1">
                <p>To view your Health report click the button below</p>
                <ChakraProvider>
                  {errorMessage1 && (
                    <Alert
                      status="error"
                      variant="left-accent"
                      style={{ width: "800px" }}
                      marginTop="40px"
                    >
                      <AlertIcon />
                      {errorMessage1}
                    </Alert>
                  )}
                  <Button
                    colorScheme="teal"
                    size="lg"
                    mt={4}
                    mb={8}
                    onClick={handleHealthReport}
                  >
                    View Health Report
                  </Button>
                </ChakraProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HbA1cPredictionTest;
