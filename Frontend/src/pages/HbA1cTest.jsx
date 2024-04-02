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

const HbA1cPredictionTest = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the user data from the UserContext
  const { setUser } = useContext(UserContext);
  let existingGlucoseReadings = []; // Initialize the existing glucose readings
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/verifyUser")
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

  console.log("User: ", user);
  if (user && user.health_profile) {
    existingGlucoseReadings = user.health_profile.glucose_readings;
  }

  console.log("Existing Glucose Readings: ", existingGlucoseReadings);

  const [glucoseReadings, setGlucoseReadings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [glucoseReading, setGlucoseReading] = useState("");

  // Function to handle the button click
  const handleHealthReport = () => {
    navigate("/health-report"); // Navigate to the Risk Test page
  };

  const handleHbA1cPrediction = async () => {
    if (readingsForToday.length > 2) {
      setErrorMessage("You can input at most 3 readings per day.");
      return;
    }
    if (glucoseReading === "") {
      setErrorMessage("Please enter a glucose reading");
      return;
    } else if (glucoseReading < 0) {
      setErrorMessage("Glucose reading cannot be negative");
      return;
    }
    // Create a new reading object
    const newReading = {
      date: currentDate,
      time: currentTime,
      reading: glucoseReading,
    };

    console.log(newReading);
    try {
      const response = await axios.post("http://localhost:3000/api/glucose", {
        date: newReading.date,
        time: newReading.time,
        reading: newReading.reading,
      });
      // Update the UserContext with the returned user data
      setUser(response.data.user);

      const data = response.data;
      if (response.status == 404) {
        console.log("User does not exist, please input the correct user Id.");
        // Redirect the user to the login page
      }
      if (response.status == 200) {
        console.log(data.result);
        console.log(data.message);
        // Redirect the user to the login page
        setSuccessMessage(data.message);
      }
      if (data.success) {
        // The sign up was successful, continue with the sign up process
        console.log(response.data);
        // Log Employee Id
      }
    } catch (error) {
      if (error.response.status == 500) {
        console.log("Server Error");
        return;
      } else {
        console.error("Error: ", error);
      }
      return;
    }

    setGlucoseReadings([...glucoseReadings, newReading]);
    setGlucoseReading("");
  };

  return (
    <>
      <div className="main-container">
        <Header
          headingTitle1={"Tools& Resources"}
          headingTitle2={"HbA1c Forcasting Test"}
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

        {/* New container for Diabetes Plate Method */}
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
              <h2>Blood Glucose Monitor</h2>
              <p className="dp1">
                To forcast your HbA1c click the button below
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
                  {successMessage && (
                    <Alert
                      status="success"
                      variant="left-accent"
                      style={{ width: "800px" }}
                      marginTop="40px"
                    >
                      <AlertIcon />
                      {successMessage}
                    </Alert>
                  )}
                </ChakraProvider>
                <p>
                  Your HbA1c level is 6.5% or above, indicating that your blood
                  sugar has been consistently higher than the recommended levels
                  over the past few months. It's important to discuss these
                  results with your healthcare provider. They can help you with
                  strategies to lower your HbA1c, such as adjustments in diet,
                  exercise, medication, or other lifestyle changes to reduce the
                  risk of diabetes complications.
                </p>
              </div>
            </div>

            <h1>Health Report:</h1>
            <div className="glucose-meter">
              <div className="dp1">
                <p>To view your Health report click the button below</p>
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
