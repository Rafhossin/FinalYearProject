import React from "react";
import { useNavigate } from "react-router-dom";

import lifeWithDiabetesImage from "../assets/images/homepage/lifeWithDiabetes.jpeg"; // Path to image

import healthyEating1Image from "../assets/images/homepage/healthyEating1.jpg"; // Path to image

import fitnessPlanImage from "../assets/images/homepage/fitnessPlan.jpeg"; // Path to image

import ToolsCalPrimary from "../components/ToolsCalPrimary";
import ToolsCalSecondary from "../components/ToolsCalSecondary";
import LifeWithDiabetesPrimary from "../components/LifeWithDiabetesPrimary";
import "../styles/InformationContainer.css"; // Path to CSS file

const LifeWithDiabetes = () => {
  const navigate = useNavigate(); // Create the navigate function

  // Function to handle the button click
  const handleFoodNutritionClick = () => {
    navigate("/food-nutrition"); // Navigate to the Food & Nutrition page
  };

  return (
    <>
      <div className="LifeWithType2-container">
        <ToolsCalPrimary
          showButton={false}
          heading1={"Life With Diabetes"}
          heading2={"Having type 2 diabetes doesn't mean life stops."}
          paragraph={
            "Brighter days are still to come, and that's exactly why we're here to support you."
          }
          imagePath={lifeWithDiabetesImage}
          altText={"life with diabetes image"}
          color={"#627073"}
        />
        <div className="info-container">
          <h2>
            {" "}
            Whether you've recently received a type 2 diabetes diagnosis or have
            been managing it for some time.
          </h2>
          <h2>
            {" "}
            Remember: your journey is distinct and begins a new each day.
          </h2>
          <p>
            It's important to recognise that type 2 diabetes is the most
            prevalent form of the disease. It occurs when your body doesn't use
            insulin effectively. While some individuals can regulate their blood
            glucose levels through diet and exercise, others might require
            medication or insulin for management .
          </p>
        </div>

        <ToolsCalSecondary
          showButton={true}
          heading1={"Life With Diabetes"}
          heading2={"Enjoyable and Healthy Eating with Diabetes"}
          paragraph={
            "Maintaining a good diet with diabetes doesn't require sacrificing the foods you enjoy; it's about striking a balance between indulging in your preferred flavours and integrating essential nutrients for effective diabetes management. Simple changes, like choosing low- fat options for cheeses and dressings, selecting lean meat cuts, and opting for natural sweeteners, can significantly contribute to your health objectives while still delivering delicious tastes!"
          }
          imagePath={healthyEating1Image}
          altText={"healthy eating image"}
          btnText={"Access Helpful Advice"}
          onClick={handleFoodNutritionClick}
          bgcolor={"#008080"}
        />
        <div className="info-container">
          <h2>Begin Your Fitness Journey</h2>
          <p>
            Exercise plays a vital role in diabetes management, and the great
            news is, all it takes is to start moving. You don't need to aim for
            extreme sports like ultra- marathons . Begin with simple activities
            like a stroll around your neighbourhood or a leisurely bike ride.
            The most important aspect is to engage in activities you enjoy and
            incorporate them into your routine as much as possible .
          </p>
        </div>
        <LifeWithDiabetesPrimary
          heading1={"Life With Diabetes"}
          heading2={"Steps to Kickstart Your Fitness Plan: "}
          listItems={[
            "Collaborate with your healthcare provider to determine a suitable level physical activity for you.",
            "Allocate a specific amount of time each day for exercise.",
            "Establish clear fitness objectives to keep yourself motivated.",
            "Decide where you prefer to exercise- at a gym, around your neighbourhood, or in a park.",
            "Integrate a variety of activities into your daily life.",
            "Start at a comfortable pace and ensure you allow time for recovery.",
            "Monitor your activities and maintain focus on your goals.",
            "Pay attention to your body's signals and adjust accordingly.",
          ]}
          imagePath={fitnessPlanImage}
          altText={"fitness plan image"}
          bgcolor={"#008080"}
        />
      </div>
    </>
  );
};

export default LifeWithDiabetes;
