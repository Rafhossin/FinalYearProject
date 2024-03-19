import React from "react";

import healthyEatImage from "../assets/images/homepage/healthyEating.jpeg"; // Path to image

import plateMethodImage from "../assets/images/homepage/plateMethod.jpeg"; // Path to image

import ToolsCalPrimary from "../components/ToolsCalPrimary";

import "../styles/ DiabetesPlateContainer.css"; // Path to CSS file

const foodAndNutritionPage = () => {
  return (
    <>
      <div className="main-container">
        <ToolsCalPrimary
          showButton={false}
          heading1={"Food & Nutrition"}
          heading2={"Healthy Eating Guidelines"}
          heading3={"Feel Great by Eating Right"}
          paragraph={
            "Embrace easy, healthy eating with the Diabetes Plate Method, a straightforward way to manage portions that aid in diabetes management, without needing any tools."
          }
          imagePath={healthyEatImage}
          altText={"healthy eating image"}
          color={"#627073"}
        />
        {/* New container for Diabetes Plate Method */}
        <div className="diabetes-plate-container">
          <h1>Implement the Diabetes Plate Method</h1>
          <p>
            Healthy eating is vital, especially when managing diabetes, but it
            can be challenging to know what and how much to eat. For a simple
            starting point, consider the Diabetes Plate Method. This easy
            approach helps you portion your meals without the need for counting,
            calculating, or measuring.
          </p>

          <div className="image-section1">
            <img src={plateMethodImage} alt="plate method" />
          </div>
          <p>
            Imagine a plate divided into sections: half filled with non- starchy
            vegetables, a quarter with protein foods, and the remaining quarter
            with carbohydrate foods. Accompany this with a zero- calorie drink
            like water for a balanced meal This method simplifies meal planning,
            giving you more time to enjoy life.
          </p>
          <p>
            <strong>
              Here are the types of foods to include for a nutritious diet:
            </strong>
          </p>

          <h2>Non-Starchy Vegetables</h2>
          <p>
            Use the Diabetes Plate Method to fill half your plate with
            non-starchy vegetables. These veggies are low in calories and carbs,
            high in nutrients, and keep you full longer. Examples include
            broccoli, carrots, and cauliflower.
          </p>

          <h2>Protein</h2>
          <p>
            Protein is a key part of any diabetes meal plan. If you're following
            a plant-based diet, there are numerous protein-rich plant-based
            options like beans, hummus, lentils, and more.
          </p>

          <h2>Fruit</h2>
          <p>
            Fruits are definitely on the menu. They count as carbs but are
            packed with vitamins, minerals, and fiber. Fruits are a healthy way
            to satisfy your sweet cravings.
          </p>

          <h2>Fat</h2>
          <p>
            Healthy fats are essential. Choose monounsaturated and
            polyunsaturated fats found in olive oil, nuts, and fish.
          </p>

          <h2>Diabetes Superfoods</h2>
          <p>
            You might have heard about diabetes superfoods. These are foods rich
            in vitamins, minerals, and fiber, and they can enhance your meal
            plan significantly.
          </p>
        </div>
      </div>
    </>
  );
};

export default foodAndNutritionPage;
