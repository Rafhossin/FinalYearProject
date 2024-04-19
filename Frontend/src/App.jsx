import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; // Import Navbar component
import Footer from "./components/Footer"; // Import Footer component
import HomePage from "./pages/Homepage"; // Import HomePage component
import "./App.css"; // Import App.css file
// Import other pages
import ToolsAndCalculator from "./pages/ToolsAndCalculator";
import AboutDiabetes from "./pages/AboutDiabetes";
import HealthAndWellness from "./pages/HealthAndWellness";
import FoodAndNutrition from "./pages/FoodAndNutrition";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import LifeWithDiabetes from "./pages/LifeWithDiabetes";
//Aunthentication pages
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateProfile from "./pages/UpdateProfile";
//Diabetes pages
import PreDiabetes from "./pages/PreDiabetes";
import DiagnosingDiabetes from "./pages/DiagnosingDiabetes";
import DiabetesComplication from "./pages/DiabetesComplication";

import StartCancelPrediction from "./pages/StartCancelPredictionPage";
import RiskPredictionTest from "./pages/RiskPredictionTest";
import BMI from "./pages/BMI"; // Import BMI page
import GlucoseLog from "./pages/GlucoseLog"; // Import Glucose Log page
import HbA1cPredictionTest from "./pages/HbA1cTest"; // Import HbA1c Test page
import HealthReport from "./pages/HealthReport"; // Import Medical Report page

const App = () => {
  const [user, setUser] = useState(null); // // Create user state and Set user state to null
  // Load user data from localStorage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    // <ChakraProvider>
    <UserContext.Provider value={{ user, setUser }}>
      {" "}
      {/* Provide user and setUser */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />

          <Route path="/prediabetes" element={<PreDiabetes />} />
          <Route path="/diagnosing" element={<DiagnosingDiabetes />} />
          <Route path="/complications" element={<DiabetesComplication />} />

          <Route path="/tools-resources" element={<ToolsAndCalculator />} />
          <Route path="/start-cancelPred" element={<StartCancelPrediction />} />
          <Route path="/risk-test" element={<RiskPredictionTest />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/glucose-log" element={<GlucoseLog />} />
          <Route path="/HbA1c-test" element={<HbA1cPredictionTest />} />
          <Route path="/health-report" element={<HealthReport />} />

          <Route path="/about-diabetes" element={<AboutDiabetes />} />
          <Route path="/health-wellness" element={<HealthAndWellness />} />
          <Route path="/food-nutrition" element={<FoodAndNutrition />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/living-with-diabetes" element={<LifeWithDiabetes />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </Router>
    </UserContext.Provider>
    // </ChakraProvider>
  );
};

export default App;
