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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const generatePDF = (user) => {
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
      }
    } catch (error) {
      if (error.response.status == 500) {
        console.log("Server Error");
        setServerError(
          "An error occurred while trying to generate your health report. Please try again later."
        );
      } else {
        console.error("Failed to fetch user data:", error);
        setServerError(
          "An error occurred while trying to generate your health report. Please try again later."
        );
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="main-container">
        <Header
          headingTitle1={"Tools& Resources"}
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

        {/* New container for Diabetes Plate Method */}
        <div className="glucose-log-container">
          <div className="target-range">
            <h1>Your Medical Report:</h1>
            <div className="glucose-meter">
              <div className="dp1">
                {console.log(pdfUrl)}
                {pdfUrl && (
                  <Document file={pdfUrl}>
                    <Page
                      pageNumber={1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
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
                      onClick={handleSaveReport} // This should probably be a different function for emailing the report
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
