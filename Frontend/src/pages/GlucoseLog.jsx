import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext"; // Path to the UserContext
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChakraProvider,
  Input,
  Button,
  Flex,
  Box,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";

import {
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import logGlucoseImage from "../assets/images/logGlucose/logGlucose.jpeg"; // Path to image
import glucoseRange2Image from "../assets/images/logGlucose/glucoseRange2.png"; // Path to image
import glucoseRange1Image from "../assets/images/logGlucose/glucoseRange1.png"; // Path to image
import Header from "../components/Header";

import DiabetesComPrimary from "../components/DiabetesComPrimary";
// import "../styles/DiabetesComplication.css"; // Path to CSS file

import "../styles/GlucoseLog.css"; // Path to CSS file
import BackToTop from "../components/BackToTop";

const GlucoseLog = () => {
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
  const [dropDownErrorMessage, setDropDownErrorMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [successMessage2, setSuccessMessage2] = useState("");
  const [glucoseReading, setGlucoseReading] = useState("");

  // Add two new state variables for the user's input
  const [inputDate, setInputDate] = useState("");
  const [inputTime, setInputTime] = useState("");

  let [tableData, setTableData] = useState([...existingGlucoseReadings]);

  const [filteredReading, setFilteredReadings] = useState([]);

  useEffect(() => {
    setTableData(
      filteredReading.map((reading) => {
        const [date, fullTime] = reading.date_time.split("T");
        const [time] = fullTime.split(".");
        return { ...reading, date, time };
      })
    );
  }, [filteredReading]);

  const handleDelete = async (index) => {
    // Store the item to delete
    const itemToDelete = tableData[index];

    console.log("Item to delete-----: ", itemToDelete.glucose_level);

    // Delete the row at the given index
    tableData.splice(index, 1);
    setTableData([...tableData]);

    // Send a DELETE request to the backend
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/deleteTableRow",
        {
          data: {
            date: itemToDelete.date,
            time: itemToDelete.time,
            glucose_level: itemToDelete.glucose_level,
          },
        }
      );
      // Update the UserContext with the returned user data
      setUser(response.data.user);

      const data = response.data;
      if (response.status == 404) {
        console.log("User does not exist, please input the correct user Id.");
      }
      if (response.status == 200) {
        console.log(data.result);
        console.log(data.message);

        setSuccessMessage2(data.message);
      }
      if (data.success) {
        // The sign up was successful, continue with the sign up process
        console.log(response.data);
        // Log Employee Id
      }
    } catch (error) {
      if (error.response.status == 500) {
        console.log("Server Error");
        setServerError(
          "An error occurred while trying to delete your glucose readings. Please try again later."
        );
        return;
      } else {
        console.error("Error: ", error);
        setServerError(
          "An error occurred while trying to delete your glucose readings. Please try again later."
        );
      }
      return;
    }
  };

  // Function to handle the button click
  const handleHbA1cTestClick = () => {
    navigate("/HbA1c-test"); // Navigate to the Risk Test page
  };

  // Set the time period to daily by default
  const [timePeriod, setTimePeriod] = useState(null);

  // Handle the time period change
  const handleTimePeriodChange = (event) => {
    const selectedValue = event.target.value;
    setTimePeriod(selectedValue);

    if (selectedValue === "daily") {
      const todaysDate = new Date().toISOString().slice(0, 10);
      const todaysReadings = existingGlucoseReadings.filter(
        (reading) =>
          new Date(reading.date_time).toISOString().slice(0, 10) === todaysDate
      );
      if (todaysReadings.length === 0) {
        setDropDownErrorMessage("No readings for today");
      } else {
        setDropDownErrorMessage(""); // clear the error message if there are readings for today
      }
    } else {
      if (existingGlucoseReadings.length === 0) {
        setDropDownErrorMessage(
          "Please enter glucose reading, profile is empty"
        );
      } else {
        setDropDownErrorMessage(""); // clear the error message if there are existing readings
      }
    }
  };

  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toLocaleTimeString("it-IT").slice(0, 5);

  // Filter the readings for chosen date
  const readingsForchosenDate = existingGlucoseReadings.filter(
    (reading) =>
      // new Date(reading.date_time).toISOString().slice(0, 10) === currentDate
      new Date(reading.date_time).toISOString().slice(0, 10) === inputDate
  );

  // Filter the readings for today
  const readingsForToday = existingGlucoseReadings.filter(
    (reading) =>
      // new Date(reading.date_time).toISOString().slice(0, 10) === currentDate
      new Date(reading.date_time).toISOString().slice(0, 10) === currentDate
  );

  // Get the date 7 days ago
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneWeekAgoDate = oneWeekAgo.toISOString().slice(0, 10);

  // Get the date 30 days ago
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
  const oneMonthAgoDate = oneMonthAgo.toISOString().slice(0, 10);

  // Filter the readings based on the selected time period
  let filteredReadings = [];
  if (timePeriod === "daily") {
    filteredReadings = readingsForToday;
  } else if (timePeriod === "weekly") {
    filteredReadings = existingGlucoseReadings.filter(
      (reading) =>
        new Date(reading.date_time).toISOString().slice(0, 10) >= oneWeekAgoDate
    );
  } else if (timePeriod === "monthly") {
    filteredReadings = existingGlucoseReadings.filter(
      (reading) =>
        new Date(reading.date_time).toISOString().slice(0, 10) >=
        oneMonthAgoDate
    );
  }

  // Map the readings to include the date and time separately
  tableData = filteredReadings.map((reading) => {
    const [date, fullTime] = reading.date_time.split("T");
    const [time] = fullTime.split(".");
    return { ...reading, date, time };
  });
  console.log("Table Data: ", tableData);

  const handleGlucoseLog = async () => {
    console.log("Readings for today: ", readingsForToday);
    if (readingsForchosenDate.length > 3) {
      setErrorMessage("You can input at most 4 readings per day.");
      return;
    }
    if (!glucoseReading || !inputDate || !inputTime) {
      setErrorMessage("Please enter a glucose reading, date, and time");
      return;
    } else if (glucoseReading < 0) {
      setErrorMessage("Glucose reading cannot be negative");
      return;
    }

    const newReading = {
      date: inputDate,
      time: inputTime,
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
        setServerError(
          "An error occurred while trying to log your glucose reading. Please try again later."
        );
        return;
      } else {
        console.error("Error: ", error);
        setServerError(
          "An error occurred while trying to log your glucose reading. Please try again later."
        );
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
          headingTitle2={"Daily Glucose Log"}
          headerColor={"#008080"}
        />

        {/* New container for Diabetes Plate Method */}
        <div className="glucose-log-container">
          <div className="mgLevel">
            <h1>Monitoring your glucose levels</h1>
            <p>
              Regular monitoring allows you to recognise the onset of low blood
              sugar episodes (hypoglycemia) or spikes in blood sugar
              (hyperglycemia). This process aids in understanding your body's
              responses and functions.
            </p>
          </div>

          <div className="bsLvel">
            <h1>Why test blood sugar levels</h1>
            <p>
              Being aware of your glucose readings is key to controlling your
              diabetes and minimizing the likelihood of severe health issues,
              both immediately and long-term.
            </p>
          </div>
          <div className="cbsLevel">
            <h1>How to check your blood sugar levels</h1>
            <div className="cbsLevel1">
              Checking your blood sugar levels, also known as blood glucose
              monitoring, is a straightforward process that can be done at home
              using a glucose meter. Here's a basic guide on how to do it:{" "}
              <ul>
                <li>
                  {" "}
                  Wash your Hands: Make sure your hands are clean to avoid
                  infection and to prevent food or other substances from
                  affecting the test result.
                </li>
                <li>
                  Prepare the Lancing Device: Insert a new, clean lancet into
                  the lancing device. This is the tool that will prick your
                  finger to get a drop of blood.
                </li>
                <li>
                  Insert a Test Strip: Place a new test strip into the glucose
                  meter. Ensure the meter is on and ready to read the blood
                  sample.
                </li>
                <li>
                  Prick your Finger: Use the lancing device to prick the side of
                  your fingertip. Sides of the fingers are recommended because
                  they are less used and less sensitive.
                </li>
                <li>
                  Get a Drop of Blood: Gently squeeze or press near the area of
                  the finger you pricked to get a small drop of blood.
                </li>
                <li>
                  Apply Blood to the Test Strip: Touch the edge of the test
                  strip to the drop of blood. The strip will absorb the blood
                  and the meter will begin to process the reading.
                </li>

                <li>
                  Read the Result: Wait for the meter to display your blood
                  sugar level. This usually takes just a few seconds.
                </li>
                <li>
                  Dispose of the Lancet and Test Strip Safely: Use a sharps
                  container to dispose of the lancet, and follow local
                  guidelines for disposal of medical waste for the test strip.
                </li>
                <li>
                  Record the Result: Log your results in a glucose monitoring
                  diary or an app. Keeping track of your levels over time will
                  help you and your healthcare provider make informed decisions
                  about your diabetes management plan.
                </li>
              </ul>
            </div>
          </div>

          <div className="target-range">
            <h1>What’s my target range?</h1>
            <div className="glucoseRangeImage">
              <img src={glucoseRange2Image} alt="A1C Image" />
              <img src={glucoseRange1Image} alt="A1C Image" />

              <p>
                <strong>
                  These are blood sugar level targets for adults with type 1 and
                  type 2 diabetes. Your individual targets may differ.
                </strong>
              </p>
            </div>

            <h1>Log your glucose below:</h1>
            <div className="glucose-meter">
              <h2>Blood Glucose Monitor</h2>
              <p className="dp1">
                Input your glucose reading of the test.{" "}
                <span className="red-text">
                  You can input at most 4 readings per day.
                </span>
              </p>
              <div className="dp1">
                <ChakraProvider>
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
                  {(serverError || errorMessage) && (
                    <Alert
                      status="error"
                      variant="left-accent"
                      style={{ width: "800px" }}
                      marginTop="40px"
                    >
                      <AlertIcon />
                      {errorMessage || serverError}
                    </Alert>
                  )}

                  <Flex direction="row" justify="space-between" wrap="wrap">
                    <Box w="30%">
                      <label>
                        Enter your glucose reading (in mmol/L):
                        <Input
                          mt={1}
                          type="number"
                          id="glucose"
                          name="glucose"
                          placeholder="Enter your glucose reading"
                          required
                          value={glucoseReading}
                          onChange={(e) => {
                            setGlucoseReading(e.target.value);
                            setErrorMessage(null);
                            setSuccessMessage(null);
                            setSuccessMessage2(null);
                            setDropDownErrorMessage(null);
                            setServerError(null);
                          }}
                        />
                      </label>
                    </Box>
                    <Box w="30%">
                      <label>
                        Glucose Reading Date:
                        <Input
                          mt={1}
                          type="date"
                          value={inputDate}
                          onChange={(e) => {
                            setInputDate(e.target.value);
                            setErrorMessage(null);
                            setSuccessMessage(null);
                            setSuccessMessage2(null);
                            setServerError(null);
                          }}
                          max={new Date().toISOString().slice(0, 10)} // Prevent future dates from being selected
                        />
                      </label>
                    </Box>
                    <Box w="30%">
                      <label>
                        Glucose Reading Time:
                        <Input
                          mt={1}
                          type="time"
                          value={inputTime}
                          onChange={(e) => {
                            setInputTime(e.target.value);
                            setErrorMessage(null);
                            setSuccessMessage(null);
                            setSuccessMessage2(null);
                            setServerError(null);
                          }}
                        />
                      </label>
                    </Box>
                  </Flex>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    mt={4}
                    onClick={handleGlucoseLog}
                  >
                    Submit
                  </Button>
                </ChakraProvider>
              </div>
            </div>

            <h1>Table view of your glucose reading:</h1>
            <ChakraProvider>
              {dropDownErrorMessage && (
                <Alert
                  status="error"
                  variant="left-accent"
                  style={{ width: "800px" }}
                  marginTop="40px"
                >
                  <AlertIcon />
                  {dropDownErrorMessage}
                </Alert>
              )}
              <Select
                placeholder="Select time period"
                onChange={(event) => {
                  handleTimePeriodChange(event);
                  setErrorMessage(null);
                  setSuccessMessage2(null);
                  setServerError(null);
                }}
                width="200px"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
            </ChakraProvider>
            {timePeriod && existingGlucoseReadings.length > 0 ? (
              <div className="glucose-meter">
                <ChakraProvider>
                  <TableContainer>
                    {successMessage2 && (
                      <Alert
                        status="success"
                        variant="left-accent"
                        style={{ width: "800px" }}
                        marginTop="40px"
                      >
                        <AlertIcon />
                        {successMessage2}
                      </Alert>
                    )}
                    {serverError && (
                      <Alert
                        status="error"
                        variant="left-accent"
                        style={{ width: "800px" }}
                        marginTop="40px"
                      >
                        <AlertIcon />
                        {serverError}
                      </Alert>
                    )}

                    <Table variant="striped" colorScheme="teal" size="md">
                      <TableCaption
                        fontSize={16}
                        fontWeight="bold"
                      >{`Table View of ${
                        timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)
                      } Glucose Readings`}</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Glucose Level</Th>
                          <Th>Time</Th>
                          <Th>Date</Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {(tableData || []).map((item, index) => (
                          <Tr key={index}>
                            <Td>{item.glucose_level}</Td>
                            <Td>{item.time}</Td>
                            <Td>{item.date}</Td>
                            <Td>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Button
                                  style={{ backgroundColor: "#bb4d4a" }}
                                  onClick={() => {
                                    handleDelete(index);
                                    setServerError(null);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Box
                    d="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    marginTop={35}
                    bg="gray.200"
                  >
                    <LineChart width={1000} height={400} data={tableData}>
                      <Line
                        type="monotone"
                        dataKey="glucose_level"
                        stroke="teal"
                      />
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                    <Text
                      mt={4}
                      fontSize={16}
                      textAlign="center"
                      fontWeight="bold"
                    >
                      {`LineChart View of ${
                        timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)
                      } Glucose Readings`}
                    </Text>
                  </Box>
                </ChakraProvider>
              </div>
            ) : (
              <div>{}</div>
            )}
          </div>
        </div>

        <DiabetesComPrimary
          showButton={true}
          heading1={"Tools& Resources"}
          heading2={"HbA1c Test"}
          paragraph={
            "In addition to your routine blood sugar self-checks, your medical team will typically require you to undergo an HbA1c blood test at least annually. The HbA1c test measures your average blood glucose levels over the past three months, providing you and your healthcare providers with insights into long-term glucose trends.This test is a crucial part of your diabetes health care routine, and comprehending your results is vital. Elevated HbA1c levels indicate excessive sugar in your bloodstream, increasing the likelihood of complications related to diabetes, such as severe eye and foot conditions. Therefore, it's essential to get this test done consistently. Doing so will help you make informed adjustments to your diabetes management plan, aiming to decrease the chances of complications."
          }
          btnText={"Forcast Your HbA1c Test"}
          imagePath={logGlucoseImage}
          altText={"Log Glucose Image"}
          color={"#D0E1EE"}
          onClick={handleHbA1cTestClick} // Pass the navigation function to the onClick prop
        />
      </div>
      <div>
        <BackToTop />
      </div>
    </>
  );
};

export default GlucoseLog;
