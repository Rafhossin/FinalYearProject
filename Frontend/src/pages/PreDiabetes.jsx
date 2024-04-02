import React from "react";
import { useNavigate } from "react-router-dom";
import prediabeticImage from "../assets/images/infoButtonPages/prediabetic.webp"; // Path to image

import healthierImage from "../assets/images/infoButtonPages/healthier.jpeg"; // Path to image
import ToolsCalPrimary from "../components/ToolsCalPrimary";
import ToolsCalSecondary from "../components/ToolsCalSecondary";
import "../styles/InformationContainer.css"; // Path to CSS file

const PreDiabetes = () => {
  const navigate = useNavigate(); // Create the navigate function
  // Function to handle the button click
  const handleFoodNutritionClick = () => {
    navigate("/food-nutrition"); // Navigate to the Food & Nutrition page
  };
  return (
    <>
      <div className="main-container">
        <ToolsCalPrimary
          textColor="black"
          showButton={false}
          heading1={"Pre-diabetes"}
          heading2={"Action is Key When Facing Pre-diabetes"}
          paragraph={
            "Being diagnosed with pre-diabetes might seem overwhelming, as if your life has taken a significant turn and things won't ever return to normal.However,it's important to realize that this isn't true ."
          }
          imagePath={prediabeticImage}
          altText={"pre-diabetic image"}
          color={"#627073"}
        />
        <div className="info-container">
          <h2>Empower Yourself Against Pre-diabetes</h2>
          <p>
            You hold the capability to make a difference in your health. In many
            cases, individuals with pre-diabetes can restore their blood glucose
            levels to normal through early intervention and moderate lifestyle
            adjustments, thereby preventing or postponing the onset of type 2
            diabetes. Engage actively with your doctor, ask questions,and heed
            their advice. Boost your physical activity and adopt a healthy diet
            to regain control over your life .
          </p>

          <h2>Understanding Pre-diabetes and Your Action Plan</h2>
          <p>
            Pre-diabetes often doesn't present clear symptoms, so it's possible
            to have it without realizing. Most people who develop type 2
            diabetes first experience pre-diabetes, a state where blood glucose
            levels are elevated but not high enough for a diabetes diagnosis.You
            may experience some symptoms or even complications associated with
            diabetes. If you suspect you might have diabetes or pre-diabetes,
            consult your doctor for testing .
          </p>
          <p>
            Upon confirming a pre-diabetes diagnosis, it's crucial to remember
            that it doesn't automatically lead to type 2 diabetes, especially if
            you adhere to a treatment plan and make lifestyle changes in your
            diet and physical activity. Even minor alterations can significantly
            delay or prevent the development of diabetes. Collaborate with
            healthcare professionals to devise a plan suitable for you, or
            participate in a lifestyle change program recognized by NHS .
          </p>
        </div>
        <ToolsCalSecondary
          showButton={true}
          heading1={"Prediabetes"}
          heading2={"Create a Brighter, Healthier Tomorrow"}
          paragraph={
            "If you're dealing with pre-diabetes, you can take straightforward and effective steps to make a difference, like modifying your diet and enhancing your daily physical activity. These changes can lead to weight loss if necessary, setting you on the path to a healthier future ."
          }
          btnText={"Fuel Your Success Daily"}
          imagePath={healthierImage}
          altText={"Healthier Image"}
          onClick={handleFoodNutritionClick} // Pass the navigation function to the onClick prop
          bgcolor={"#387b82"}
        />
      </div>
    </>
  );
};

export default PreDiabetes;
