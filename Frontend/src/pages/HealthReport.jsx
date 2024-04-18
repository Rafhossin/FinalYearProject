import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChakraProvider, Button, Alert, AlertIcon } from "@chakra-ui/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import medicalReportImage from "../assets/images/logGlucose/medicalReport.jpeg";
import { saveAs } from "file-saver";
import Header from "../components/Header";
import DiabetesComPrimary from "../components/DiabetesComPrimary";
import "../styles/GlucoseLog.css";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const HealthReport = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get the user data from the UserContext
  const { setUser } = useContext(UserContext);

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

  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [pdfUrl, setPdfUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [showPagination, setShowPagination] = useState(false); // State to control pagination visibility

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };

  // const goToPreviousPage = () => {
  //   setPageNumber((prevPageNum) => Math.max(prevPageNum - 1, 1));
  // };

  // const goToNextPage = () => {
  //   setPageNumber((prevPageNum) => Math.min(prevPageNum + 1, numPages));
  // };

  useEffect(() => {
    if (pageNumber < 1) setPageNumber(1);
    else if (pageNumber > numPages) setPageNumber(numPages);
  }, [pageNumber, numPages]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const generatePDF = (user) => {
    setShowPagination(false); // Disable pagination controls while generating PDF
    const documentDefinition = {
      pageSize: { width: 1000, height: 800 },
      content: [
        { text: "AIBetic2", style: "header1" },
        { text: "Health Report", style: "header" },
        { text: "Personal Information", style: "subheader" },
        {
          text: `Name: ${capitalizeFirstLetter(
            user.user_first_name
          )} ${capitalizeFirstLetter(user.user_last_name)}`,
          style: "text",
        },
        { text: `Email: ${user.user_email}`, style: "text" },
        {
          text: `Gender: ${capitalizeFirstLetter(user.gender)}`,
          style: "text",
        },
        {
          text: `Date of Birth: ${new Date(
            user.date_of_birth
          ).toLocaleDateString()}`,
          style: "text",
        },
        { text: "Physical Information", style: "subheader" },
        { text: `Height: ${user.health_profile.height} m`, style: "text" },
        { text: `Weight: ${user.health_profile.weight} kg`, style: "text" },
        { text: `BMI: ${user.health_profile.bmi}`, style: "text" },

        { text: "Glucose Readings", style: "subheader" },
        {
          table: {
            widths: ["*", "*", "*"],
            body: [
              [
                { text: "Glucose Level", style: "text" },
                { text: "Date", style: "text" },
                { text: "Time", style: "text" },
              ],
              ...user.health_profile.glucose_readings.map((reading) => {
                const date = new Date(reading.date_time);
                return [
                  { text: reading.glucose_level, style: "table" },
                  { text: date.toLocaleDateString(), style: "table" },
                  { text: date.toLocaleTimeString(), style: "table" },
                ];
              }),
            ],
          },
        },
        { text: "HbA1c Readings", style: "subheader" },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: "HbA1c Value", style: "text" },
                { text: "Date", style: "text" },
              ],
              ...user.health_profile.HbA1c_readings.map((reading) => [
                { text: `${reading.HbA1c_value}%`, style: "table" },
                {
                  text: new Date(reading.date_time).toLocaleDateString(),
                  style: "table",
                },
              ]),
            ],
          },
        },
        { text: "HbA1c Assessment Results", style: "subheader" }, // New section header
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: "Date", style: "text" },
                { text: "Risk Score", style: "text" },
              ],
              ...user.health_profile.HbA1c_assessment_result.map((result) => [
                {
                  text: new Date(result.assessment_date).toLocaleDateString(),
                  style: "table",
                },
                { text: result.risk_score, style: "table" }, // Assuming 'risk_score' is the field you want to display
              ]),
            ],
          },
        },
        { text: "Diabetes Assessment Results", style: "subheader" },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: "Date", style: "text" },
                { text: "Prediction Result", style: "text" },
              ],
              ...user.health_profile.assessment_result.map((result) => [
                {
                  text: new Date(result.assessment_date).toLocaleDateString(),
                  style: "table",
                },
                { text: result.diabetes_prediction_result, style: "table" },
              ]),
            ],
          },
        },
        { text: "Ethical Acknowledgement", style: "subheader" }, // New Ethical Acknowledgement Section
        {
          text: [
            {
              text: "All data contained within this report is treated with the utmost confidentiality and respect for the privacy of the individual. This report is intended for the personal use of the individual only and may not be distributed without explicit consent from the subject.\n\n",
            },
            {
              text: "By using this report, you agree to maintain the confidentiality of the information contained herein and to use it only for the purposes intended by your healthcare provider.\n\n",
            },
            {
              text: "This report does not substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health providers with any questions you may have regarding a medical condition.\n\n",
            },
          ],
          style: "text",
        },
      ],

      styles: {
        header1: {
          fontSize: 30, // Increased font size
          bold: true,
          margin: [50, 0, 0, 10], // Added left padding
          alignment: "center",
        },
        header: {
          fontSize: 28, // Increased font size
          bold: true,
          margin: [50, 0, 0, 10], // Added left padding
          alignment: "center",
        },
        subheader: {
          fontSize: 24, // Increased font size
          bold: true,
          margin: [0, 10, 0, 15], // Added left padding
        },
        text: {
          fontSize: 20, // Increased font size
          margin: [0, 0, 0, 5], // Added left padding
        },
        table: {
          fontSize: 20, // Increased font size
          margin: [0, 0, 0, 5], // Added left padding
        },
      },
    };

    // Create a new PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    console.log(pdfDocGenerator);

    // Before generating the PDF, revoke the previous PDF blob URL to avoid duplicates
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }

    pdfDocGenerator
      .getBlob((blob) => {
        // Create a new blob URL and update the state
        setPdfUrl(URL.createObjectURL(blob));
        setShowPagination(true);
      })
      .catch((error) => {
        console.error("Error generating PDF blob: ", error);
      });
  };

  const handleSaveReport = () => {
    setServerError(null);
    if (pdfUrl) {
      saveAs(pdfUrl, "HealthReport.pdf");

      setSuccessMessage(
        "PDF Saved. Check your downloads folder or your selected download location."
      );
    } else {
      console.error("No PDF URL available to save");
    }
  };

  const handleGeneratePDF = async () => {
    setSuccessMessage(null);
    console.log("Generating PDF...");
    if (isGenerating) {
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.get(
        "http://localhost:3000/api/health-report"
      );
      const userData = response.data.user;
      setUser(userData);

      console.log("User data:", userData);

      if (response.status == 404) {
        console.log("User does not exist, please input the correct user Id.");
      }
      if (response.status == 200) {
        generatePDF(userData);
        setIsPdfGenerated(true);
      }
    } catch (error) {
      if (error.response.status == 500) {
        console.log("Server Error");
        setServerError(
          "An error occurred while trying to generate your health report. Please try again later."
        );
        setShowPagination(false); // Ensure pagination controls are hidden on error
      } else {
        console.error("Failed to fetch user data:", error);
        setServerError(
          "An error occurred while trying to generate your health report. Please try again later."
        );
        setShowPagination(false); // Ensure pagination controls are hidden on error
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="main-container">
        <Header
          headingTitle1={"Tools & Resources"}
          headingTitle2={"Your Health Report"}
          headerColor={"#008080"}
        />
        <DiabetesComPrimary
          showButton={false}
          heading2={"Personalised Health Report"}
          paragraph={
            "Unlock the secrets to a healthier you with your Health Report! Gain insights into your wellbeing, take control of your health journey, and pave the way for a vibrant, thriving future."
          }
          imagePath={medicalReportImage}
          altText={"Medical Report Image"}
          color={"#D0E1EE"}
        />

        <div className="glucose-log-container">
          <div className="target-range">
            <h1>Your Medical Report:</h1>
            <div className="glucose-meter">
              <div className="dp1">
                {pdfUrl && (
                  <Document
                    file={pdfUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  >
                    <Page
                      pageNumber={pageNumber}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                )}
                {showPagination && (
                  <ChakraProvider>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "300px", // Adjust this value as needed
                        margin: "20px auto",
                      }}
                    >
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                      >
                        Previous
                      </Button>
                      <p>{`Page ${pageNumber} of ${numPages}`}</p>
                      <Button
                        colorScheme="teal"
                        size="sm"
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber >= numPages}
                      >
                        Next
                      </Button>
                    </div>
                  </ChakraProvider>
                )}
                <ChakraProvider>
                  {successMessage && (
                    <Alert
                      status="success"
                      variant="left-accent"
                      style={{ width: "800px", margin: "40px auto" }}
                    >
                      <AlertIcon />
                      {successMessage}
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
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      colorScheme="teal"
                      size="lg"
                      mt={4}
                      mb={8}
                      mr={4}
                      onClick={handleGeneratePDF}
                    >
                      Generate PDF
                    </Button>
                    <Button
                      colorScheme="teal"
                      size="lg"
                      mt={4}
                      mb={8}
                      onClick={handleSaveReport}
                    >
                      Save The Report
                    </Button>
                  </div>
                </ChakraProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthReport;
