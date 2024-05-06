import React, { useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

import happyImage from "../assets/images/homepage/happy.jpg"; // Path to  image
import healthWellbing from "../assets/images/homepage/hw.jpeg"; // Import the image

import livingWithType2 from "../assets/images/homepage/lwt2.jpeg"; // Import the image
import foodAndDiabetes from "../assets/images/homepage/d&f.jpg"; // Import the image
import testsAndCalculator from "../assets/images/homepage/t&c.webp"; // Import the image
import diabetesByNum from "../assets/images/homepage/dbynum.jpeg"; // Import the image

import "../styles/HomepageStyles.css"; // Path to CSS file
import InfoButtons from "../components/InfoButtons";
import HomepagePrimary from "../components/HomepagePrimary";
import HomepageSecondary from "../components/HomepageSecondary";
import BackToTop from "../components/BackToTop";

const homePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Create the navigate function

  // Helper function to convert string to camel case
  const toCamelCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Function to handle the button click
  const handleRiskTestClick = () => {
    // navigate("/risk-test"); // Navigate to the Risk Test page
    navigate("/start-cancelPred"); // Navigate to the Start cancel Prediction page
  };

  // Function to handle the button click
  const handleLivingWithDiabetesClick = () => {
    navigate("/living-with-diabetes"); // Navigate to the Living With Diabetes page
  };

  // Function to handle the button click
  const handleHealthWellnessClick = () => {
    navigate("/health-wellness"); // Navigate to the Health & Wellness page
  };

  // Function to handle the button click
  const handleFoodNutritionClick = () => {
    navigate("/food-nutrition"); // Navigate to the Food & Nutrition page
  };
  // Function to handle the button click
  const handleToolsResourcesClick = () => {
    navigate("/tools-resources"); // Navigate to the Tools & Resources page
  };

  return (
    <>
      <div className="content-container">
        <div className="text-section">
          <div className="welcome-message">
            {user
              ? `Welcome,  ${toCamelCase(user.user_first_name)} ${toCamelCase(
                  user.user_last_name
                )}`
              : ""}
          </div>
          <h1 className="title">Our Fight Starts in 2024!</h1>
          <h3 className="subtitle">
            Kickstart 2024 by making a commitment to stand with us in the fight
            to end type 2 diabetes.
          </h3>
          {/* Include any additional text or buttons here */}
        </div>
        <div className="image-section">
          <img src={happyImage} alt="Happy People" />
        </div>
      </div>

      <InfoButtons />
      <div className="diabetes-section">
        <div className="diabetes-text">
          <h2>Diabetes By-the-Numbers</h2>
          <p>
            The numbers are staggering. diabetes isn't just a disease - it's an
            epidemic, affecting over 5 million British with devastating
            consequences.
          </p>
          <p>
            <strong className="highlighted-number">422 Millions </strong>
            people worldwide have diabetes.
          </p>
          <p>
            <strong className="highlighted-number">1.5 Million </strong>
            deaths are directly attributed to diabetes each year.
          </p>
          {/* ... other text and elements */}
        </div>
        <div className="diabetes-image">
          <img src={diabetesByNum} alt="Diabetes Imagery" />
        </div>
      </div>

      <div className="risk-section">
        <div className="risk-text">
          <h2>Are You At Risk Of Type 2 Diabetes?</h2>
          <p>
            Learning your risk is the first step in taking action against type 2
            diabetes. Take our 2 minutes Type 2 Diabetes Prediction Test today
            to receive actionable next steps in your health journey.
          </p>
          <button
            onClick={() => {
              handleRiskTestClick();
            }}
          >
            Take the Prediction Test
          </button>
        </div>
      </div>

      <HomepageSecondary
        heading={"Life with Diabetes"}
        paragraph={
          " Whether you're newly diagnosed, have been living with type 2 for years, or are helping out a loved one, the path to understanding diabetes starts here."
        }
        btnText={"Living with Type 2 Diabetes"}
        imagePath={livingWithType2}
        altText={"living With Type2 image"}
        onClick={handleLivingWithDiabetesClick} // Pass the navigation function to the onClick prop
        bgcolor={"#CA3D3D"}
      />

      <HomepagePrimary
        heading={"Health & Wellness"}
        paragraph={
          "Find the tools, tips, and insights you need to take action and live life to the fullest from understanding your prescriptions to starting a new exercise regimen."
        }
        btnText={"Diabetes and Your Health"}
        imagePath={healthWellbing}
        altText={"health and wellness image"}
        onClick={handleHealthWellnessClick} // Pass the navigation function to the onClick prop
        color={"#387b82"}
      />

      <HomepageSecondary
        heading={"Food & Nutrition"}
        paragraph={
          "Eating right is a powerful tool in the management of your diabetes .But it doesn't have to be boring- it's all about finding a delicious balance."
        }
        btnText={"Diabetes & Food"}
        imagePath={foodAndDiabetes}
        altText={"food and diabetes image"}
        onClick={handleFoodNutritionClick} // Pass the navigation function to the onClick prop
        bgcolor={"#4c7ead"}
      />

      <HomepagePrimary
        heading={"Tools & Resources"}
        paragraph={
          "When it comes to diabetes, you don't have to do this alone. Get help with the resources you need to navigate a diagnosis."
        }
        btnText={"Tests & Calculator"}
        imagePath={testsAndCalculator}
        altText={"tests and calculator  image"}
        onClick={handleToolsResourcesClick} // Pass the navigation function to the onClick prop
        color={"black"}
      />
      <div>
        <BackToTop />
      </div>
    </>
  );
};

export default homePage;
