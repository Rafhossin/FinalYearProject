import React, { useState } from "react";

import Header from "../components/Header";
import "../styles/BmiStyles.css";
import BmiImage from "../assets/images/calcpage/bmiCal.jpeg"; // Path to  image

import BmiComponent from "../components/BmiComponent";
import {
  ChakraProvider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios";

const BMI = () => {
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [weight, setWeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [value, setValue] = React.useState(0);
  const handleChange = (value) => setValue(value);

  // Function to handle the button click
  const calculateBMI = () => {
    if (!heightFeet || !heightInches || !weight) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const totalHeightInMeters = heightFeet * 0.3048 + heightInches * 0.0254;
    const bmi = weight / (totalHeightInMeters * totalHeightInMeters);
    setBmiResult(bmi);

    axios
      .post("/api/bmi", {
        bmi,
        height: totalHeightInMeters,
        weight,
      }) // Send the data to the server
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setErrorMessage("");
  };

  return (
    <>
      <ChakraProvider>
        <div className="main-container">
          <Header
            headingTitle1={"Tools and Resources"}
            headingTitle2={"BMI Calculator"}
            headerColor={"#008080"}
          />

          <BmiComponent
            paragraph={
              "If you need to lose a significant amount of weight, your objectives might vary. For instance, if you're considerably overweight, your initial target could be to lose 10% of your current weight. Alternatively, you might set a more immediate goal to lose 10-15 pounds as a starting point. To calculate your BMI, use the tools provided below :"
            }
            // paragraph2={"Frequent signs of diabetes include :"}
            listItems={[
              "Input your height.",
              "Move the slider across the bar to align with your current weight.",
              "Click 'Calculate'.",
            ]}
            imagePath={BmiImage}
            altText={"BMI image"}
            bgcolor={"#CBDEEC"}
          />
          <div className="bmi-container">
            <div className="input-container">
              <h2 style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                Calculate your BMI
              </h2>

              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}

              <label>
                Enter your height (in feet)
                <NumberInput
                  style={{ backgroundColor: "white" }}
                  defaultValue={heightFeet}
                  min={3}
                  max={10}
                  clampValueOnBlur={false}
                  onChange={(valueAsString, valueAsNumber) =>
                    setHeightFeet(valueAsNumber)
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </label>
              <label>
                Enter your height (in inches)
                <NumberInput
                  style={{ backgroundColor: "white" }}
                  defaultValue={heightInches}
                  min={0}
                  max={12}
                  clampValueOnBlur={false}
                  onChange={(valueAsString, valueAsNumber) =>
                    setHeightInches(valueAsNumber)
                  }
                >
                  <NumberInputField
                    style={{ width: "100px", backgroundColor: "white" }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </label>
              <label>
                Move the slider to match your current weight, measured in
                Kilogram(kg).
                <div className="input-container">
                  <div id="weight-label">{weight} kg</div>
                  <input
                    id="weight-slider"
                    type="range"
                    min="0"
                    max="200"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight (kg)"
                  />
                  <div className="slider-labels">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150</span>
                    <span>200</span>
                  </div>
                </div>
              </label>
            </div>
            <div className="bmi-btn">
              <button colorScheme="teal" size="lg" onClick={calculateBMI}>
                Calculate
              </button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            {bmiResult && <p>Your BMI is {bmiResult.toFixed(2)}</p>}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
};

export default BMI;
