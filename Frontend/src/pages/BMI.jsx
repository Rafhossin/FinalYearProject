import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext"; // Path to the UserContext
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/BmiStyles.css";
import BmiImage from "../assets/images/calcpage/bmiCal.jpeg"; // Path to  image

import BmiComponent from "../components/BmiComponent";
import { ChakraProvider, Alert, AlertIcon } from "@chakra-ui/react";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import axios from "axios";
import { Box, Flex, Stack, Radio, RadioGroup } from "@chakra-ui/react";

const BMI = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the user data from the UserContext
  console.log("User: ", user);
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

  // Add state variables for height, weight, and error messages
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [heightCentimeter, setHeightCentimeter] = useState(0);
  const [weight, setWeight] = useState(0);
  const [emptyFieldErrorMessage, setEmptyFieldErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [value, setValue] = React.useState(0);
  const handleChange = (value) => setValue(value);
  const [successMessage, setSuccessMessage] = useState("");
  const [unitSystem, setUnitSystem] = useState("metric"); // "metric" or "imperial"
  // Add a new state variable for showing the result box
  const [showResultBox, setShowResultBox] = useState(false);

  // Add a new state variable
  const [bmiCategory, setBmiCategory] = useState("");

  // const toggleUnitSystem = () => {
  //   setUnitSystem(unitSystem === "metric" ? "imperial" : "metric");
  // };

  // Function to handle the button click
  const calculateBMI = async () => {
    // Clear previous error or success messages and hide the result box
    setErrorMessage("");
    setSuccessMessage("");
    setEmptyFieldErrorMessage("");
    setShowResultBox(false); // Hide the result box initially

    if (unitSystem === "metric") {
      if (!heightCentimeter || weight < 40) {
        setEmptyFieldErrorMessage(
          "Please fill in all fields correctly. Weight must be at least 40 kg in the metric system."
        );
        return;
      }
    } else if (unitSystem === "imperial") {
      if (!heightFeet || weight < 88) {
        setEmptyFieldErrorMessage(
          "Please fill in all fields correctly. Weight must be at least 88 lbs in the imperial system."
        );
        return;
      }
    }

    let totalHeightInMeters;
    let calculatedWeight = weight;

    if (unitSystem === "metric") {
      totalHeightInMeters = parseFloat((heightCentimeter / 100).toFixed(2)); // Convert cm to meters
    } else {
      // For imperial system
      totalHeightInMeters = parseFloat(
        ((heightFeet * 12 + heightInches) * 0.0254).toFixed(2)
      ); // Convert feet and inches to meters
      calculatedWeight = parseFloat((weight * 0.453592).toFixed(2)); // Convert pounds to kg for calculation
    }

    const bmi = parseFloat(
      (calculatedWeight / totalHeightInMeters ** 2).toFixed(2)
    );

    // Determine the BMI category and show the result box
    let category;
    if (bmi < 18.5) {
      category = "underweight";
      setErrorMessage(
        `Your BMI is ${bmi.toFixed(2)}.Your BMI is in the underweight category.`
      );
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "healthy";
      setSuccessMessage(
        `Your BMI is ${bmi.toFixed(2)}. Your BMI is in the healthy category.`
      );
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "overweight";
      setErrorMessage(
        `Your BMI is ${bmi.toFixed(2)}. Your BMI is in the overweight category.`
      );
    } else {
      category = "obese";
      setErrorMessage(
        `Your BMI is ${bmi.toFixed(2)}. Your BMI is in the obese category.`
      );
    }

    try {
      const response = await axios.put("http://localhost:3000/api/bmi", {
        bmi,
        height: totalHeightInMeters,
        weight,
      });

      const data = response.data;
      if (response.status == 404) {
        console.log("User does not exist, please input the correct user Id.");
        // Redirect the user to the login page
      }
      if (response.status == 200) {
        console.log(data.result);
        console.log(data.message);
        // Redirect the user to the login page
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

    setBmiCategory(category);

    // Show the result box after successful calculation
    setShowResultBox(true);
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
              "Select your preferred unit system (metric or imperial).",
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
              <h2
                style={{
                  fontSize: "2em",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                Calculate your body mass index (BMI) for adults
              </h2>
              <RadioGroup
                onChange={(value) => {
                  setUnitSystem(value);
                  setErrorMessage(null);
                  setEmptyFieldErrorMessage(null);
                  setShowResultBox(false);
                  setSuccessMessage(null);
                }}
                value={unitSystem}
              >
                <Stack direction="row">
                  <Radio value="metric">Metric</Radio>
                  <Radio value="imperial">Imperial</Radio>
                </Stack>
              </RadioGroup>
              {emptyFieldErrorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {emptyFieldErrorMessage}
                </Alert>
              )}
              {unitSystem === "metric" ? (
                <>
                  <label>
                    Enter your height (in centimeters)
                    <NumberInput
                      style={{ backgroundColor: "white" }}
                      defaultValue={heightCentimeter}
                      min={140}
                      max={244}
                      marginTop="10px"
                      clampValueOnBlur={false}
                      onChange={(valueAsString, valueAsNumber) => {
                        setHeightCentimeter(valueAsNumber);
                        setErrorMessage(null);
                        setEmptyFieldErrorMessage(null);
                        setShowResultBox(false);
                        setSuccessMessage(null);
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </label>
                  <label>
                    Move the slider to match your current weight, measured in
                    Kilogram(kg).
                    {/* <div className="input-container"> */}
                    <div id="weight-label">{weight} kg</div>
                    <input
                      id="weight-slider"
                      type="range"
                      min="0"
                      max="200"
                      marginTop="10px"
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value);
                        setErrorMessage(null);
                        setEmptyFieldErrorMessage(null);
                        setShowResultBox(false);
                        setSuccessMessage(null);
                      }}
                      placeholder="Weight (kg)"
                    />
                    <div className="slider-labels">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                      <span>150</span>
                      <span>200</span>
                    </div>
                    {/* </div> */}
                  </label>
                </>
              ) : (
                <>
                  <Flex direction="row" justify="space-between">
                    <label>
                      Enter your height (in feet)
                      <NumberInput
                        style={{ backgroundColor: "white" }}
                        defaultValue={heightFeet}
                        min={4}
                        max={8}
                        marginTop="10px"
                        clampValueOnBlur={false}
                        onChange={(valueAsString, valueAsNumber) => {
                          setHeightFeet(valueAsNumber);
                          setErrorMessage(null);
                          setEmptyFieldErrorMessage(null);
                          setShowResultBox(false);
                          setSuccessMessage(null);
                        }}
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
                        marginTop="10px"
                        clampValueOnBlur={false}
                        onChange={(valueAsString, valueAsNumber) => {
                          setHeightInches(valueAsNumber);
                          setErrorMessage(null);
                          setEmptyFieldErrorMessage(null);
                          setShowResultBox(false);
                          setSuccessMessage(null);
                        }}
                      >
                        <NumberInputField
                          style={{ backgroundColor: "white" }}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </label>
                  </Flex>

                  <label>
                    Move the slider to match your current weight, measured in
                    pounds.
                    {/* <div className="input-container"> */}
                    <div id="pound-label">{weight} pounds</div>
                    <input
                      id="weight-slider"
                      type="range"
                      min="0"
                      max="400"
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value);
                        setErrorMessage(null);
                        setEmptyFieldErrorMessage(null);
                        setShowResultBox(false);
                        setSuccessMessage(null);
                      }}
                      placeholder="Weight (in pounds)"
                    />
                    <div className="slider-labels">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                      <span>150</span>
                      <span>200</span>
                      <span>250</span>
                      <span>300</span>
                      <span>350</span>
                      <span>400</span>
                    </div>
                    {/* </div> */}
                  </label>
                </>
              )}
            </div>
            <div className="bmi-btn">
              <button colorScheme="teal" size="lg" onClick={calculateBMI}>
                Calculate
              </button>
            </div>
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
            {showResultBox && (
              <Box
                borderWidth="1px"
                borderRadius="lg"
                padding="40px"
                marginTop="20px"
                style={{
                  width: "800px",
                  border: "1px solid #bc5858",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  boxShadow: "#000 0px 0px 10px",
                }}
              >
                <p className="subtitle4">What your result means</p>
                {bmiCategory === "underweight" && (
                  <p>
                    A BMI of 18.4 or below is classed as underweight. This
                    suggests you could benefit from gaining weight. Working
                    towards a healthier weight range could strengthen your
                    immune system and help prevent bone fractures.
                  </p>
                )}
                {bmiCategory === "healthy" && (
                  <p>
                    A BMI between 18.5 and 24.9 is classed as healthy. This
                    suggests you are in a good weight range. Keep up the good
                    work!
                  </p>
                )}
                {bmiCategory === "overweight" && (
                  <div>
                    <p>
                      A BMI of 25 to 29.9 is classed as overweight. This
                      suggests you could benefit from losing weight. Working
                      towards a healthier weight range could reduce your risk of
                      certain health conditions.
                    </p>
                    <h3>Suggestions:</h3>
                    <ul>
                      <li>
                        Try to incorporate more physical activity into your
                        daily routine.
                      </li>
                      <li>
                        Consider a balanced diet rich in fruits, vegetables,
                        lean proteins, and whole grains.
                      </li>
                      <li>
                        Limit your intake of processed foods and sugary drinks.
                      </li>
                      <li>
                        Consult with a healthcare professional or a dietitian
                        for personalized advice.
                      </li>
                    </ul>
                  </div>
                )}
                {bmiCategory === "obese" && (
                  <div>
                    <p>
                      A BMI of 30 or above is classed as obese. This suggests
                      you could benefit from losing weight. Working towards a
                      healthier weight range could significantly reduce your
                      risk of serious health conditions.
                    </p>
                    <h3>Suggestions:</h3>
                    <ul>
                      <li>
                        Engage in regular physical activity. Aim for at least
                        150 minutes of moderate-intensity or 75 minutes of
                        vigorous-intensity aerobic activity a week.
                      </li>
                      <li>
                        Adopt a healthy eating plan. Focus on low-calorie,
                        nutrient-dense foods such as fruits, vegetables, and
                        whole grains.
                      </li>
                      <li>
                        Avoid sugary drinks, and limit intake of high-sugar and
                        high-fat foods.
                      </li>
                      <li>
                        Consider seeking help from a registered dietitian or a
                        healthcare professional for a personalized weight loss
                        plan.
                      </li>
                    </ul>
                  </div>
                )}
              </Box>
            )}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
};

export default BMI;
