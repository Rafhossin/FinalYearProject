import React, { useEffect, useState, useContext } from "react";

import UserContext from "../UserContext"; // Path to the UserContext

import PredictionResults from "../components/PredictionResult";
import PredictionQuestion from "../components/PredictionQuestion";
import Header from "../components/Header";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Image1 from "../assets/images/riskTest/weightLoss.png"; // Import the image
import Image2 from "../assets/images/riskTest/highHunger.png"; // Import the image
import Image3 from "../assets/images/riskTest/urination.png"; // Import the image
import Image4 from "../assets/images/riskTest/thirsty.png"; // Import the image
import Image5 from "../assets/images/riskTest/muscleWeakness.png"; // Import the image
import Image6 from "../assets/images/riskTest/bluredVision.png"; // Import the image
import Image7 from "../assets/images/riskTest/moodChange.png"; // Import the image
import Image8 from "../assets/images/riskTest/fatigue.png"; // Import the image
import Image9 from "../assets/images/riskTest/woundHealing.png"; // Import the image
import Image10 from "../assets/images/riskTest/hairLoss.png"; // Import the image
import Image11 from "../assets/images/riskTest/itching.png"; // Import the image
import HighRisk from "../assets/images/riskTest/highRisk.png"; // Import the image
import LowRisk from "../assets/images/riskTest/lowRisk.png"; // Import the image
import { serverEndpoint } from "../config/constants";

const RiskPredictionTest = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext); // Get the user data from the UserContext
  const { setUser } = useContext(UserContext);

  console.log("User: ", user);

  const [predictionResult, setPredictionResult] = useState(null);
  axios.defaults.withCredentials = true;

  // Verify the user and set the formData(age and gender) when the component mounts
  useEffect(() => {
    axios
      .get(`${serverEndpoint}/api/verifyUser`)
      .then((res) => {
        if (res.status == 200) {
          console.log("User is verified");
          // fetchGender(); // Call fetchGender after verifying the user
          // calculateAge(); // Call calculateAge after verifying the user
          const dob = new Date(user.date_of_birth); // Convert date_of_birth to a Date object
          const diff_ms = Date.now() - dob.getTime();
          const age_dt = new Date(diff_ms);
          const age = Math.abs(age_dt.getUTCFullYear() - 1970);

          const fetchedGender = user.gender; // Get gender from user
          const genderValue =
            typeof fetchedGender === "string" &&
            fetchedGender.trim().toLowerCase() === "male"
              ? 1
              : 0; // Set genderValue as 1 if male, 0 if female

          setFormData({ ...formData, age: age, gender: genderValue }); // Update formData with age and gender
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

  const [formData, setFormData] = useState({
    age: 0,
    gender: 0,
    suddenWeightLoss: 1,
    polyphagia: 1,
    polydipsia: 1,
    polyuria: 1,
    visualBlurring: 1,
    weakness: 1,
    delayedHealing: 1,
    alopecia: 1,
    itching: 1,
    irritability: 1,
    partialParesis: 1,
  });

  const [indexQuestion, setIndexQuestion] = useState(0);

  const questions = [
    {
      symptom: "Have you experienced any sudden weight loss recently?",
      description:
        "Sudden weight loss may indicate improper glucose utilisation, signalling the need for immediate medical evaluation and potential treatment adjustment.",
      src: Image1,
      alt: "Weight loss icon",
      type: "suddenWeightLoss",
    },
    {
      symptom:
        "Have you been experiencing an unusually high level of hunger increased appetite, also known as polyphagia, recently?",
      description:
        "Polyphagia, or excessive hunger, is important in diabetics as it can indicate uncontrolled blood sugar levels, signalling the need for an assessment by a medical practitioner.",
      src: Image2,
      alt: "High hunger icon",
      type: "polyphagia",
    },
    {
      symptom:
        "Have you noticed an increase in the frequency or volume of urination, a condition known as polyuria?",
      description:
        "Polyuria in diabetics is significant because it often indicates high blood sugar levels, necessitating a review by a medical practitioner.",
      src: Image3,
      alt: "Polyuria icon",
      type: "polyuria",
    },
    {
      symptom:
        "Have you been experiencing excessive thirst or a constant need to drink fluids than usual, a condition known as polydipsia?",
      description:
        "Polydipsia is a critical symptom for predicting diabetes, as excessive thirst often indicates elevated blood sugar levels, a hallmark of the condition.",
      src: Image4,
      alt: "Polydipsia icon",
      type: "polydipsia",
    },
    {
      symptom:
        "Have you been experiencing any partial weakness or partial paralysis in your muscles, a condition known as partial paresis?",
      description:
        "Partial paresis can be important in predicting diabetes as it may indicate diabetic neuropathy, a complication arising from prolonged high blood sugar levels affecting nerve function.",
      src: Image5,
      alt: "Partial Paresis icon",
      type: "partialParesis",
    },
    {
      symptom:
        "Have you noticed any recent issues with blurred vision or changes in your eyesight?",
      description:
        "Visual blurring is significant for predicting diabetes as it can be a symptom of high blood sugar levels affecting the eyes, a condition often associated with diabetes.",
      src: Image6,
      alt: "Blurred Vision icon",
      type: "visualBlurring",
    },
    {
      symptom:
        "Have you been experiencing increased irritability or sudden mood changes recently?",
      description:
        "Irritability can be an important indicator for predicting diabetes, as fluctuations in blood sugar levels can significantly impact mood and emotional stability.",
      src: Image7,
      alt: "Irritibility icon",
      type: "irritability",
    },
    {
      symptom: "Have you been feeling unusually weak or fatigued lately?",
      description:
        "Weakness is a key symptom for predicting diabetes, as it often reflects the body's inefficiency in using glucose for energy due to irregular blood sugar levels",
      src: Image8,
      alt: "Fatigue icon",
      type: "weakness",
    },
    {
      symptom:
        "Have you noticed that wounds or injuries are taking longer than usual to heal?",
      description:
        "Delayed wound healing is important for predicting diabetes because it often indicates poor blood circulation and high blood sugar levels, which can impair the body's natural healing processes.",
      src: Image9,
      alt: "Slow Healing icon",
      type: "delayedHealing",
    },
    {
      symptom:
        "Have you been experiencing any unexpected hair loss or balding, a condition known as alopecia?",
      description:
        "Alopecia can be significant in predicting diabetes as it may indicate underlying issues with blood circulation and hormonal imbalances often associated with diabetes.",
      src: Image10,
      alt: "Alopecia icon",
      type: "alopecia",
    },
    {
      symptom:
        "Have you been experiencing persistent or unusual itching, particularly in areas around the limbs or torso ?",
      description:
        "Itching is an important symptom for predicting diabetes, as it can be caused by poor blood flow and yeast infections, both common in individuals with high blood sugar levels.",
      src: Image11,
      alt: "Itching icon",
      type: "itching",
    },
  ];

  const submitForm = async () => {
    try {
      const response = await axios.post(
        `${serverEndpoint}/api/diabetes-prediction`,
        formData
      );

      // Update the UserContext with the returned user data
      setUser(response.data.user);

      if (response.status == 200) {
        console.log("Prediction: ", response.data.prediction);
        console.log("User: ", response.data.user);
        setPredictionResult(response.data.prediction);
      }
    } catch (error) {
      if (error.response.status == 500) {
        console.error("Error submitting form: ", error);
        return;
      } else {
        console.error("Error: ", error);
      }
      return;
    }
  };

  const handleNextPost = async (answer, type) => {
    if (indexQuestion === questions.length - 1) {
      // submit form
      setFormData({ ...formData, [type]: answer });
      await submitForm();
      return;
    }
    setFormData({ ...formData, [type]: answer });
    setIndexQuestion((prevIndex) => prevIndex + 1);
  };

  const handlePrevPost = () => {
    if (indexQuestion === 0) {
      return;
    }
    setIndexQuestion((prevIndex) => prevIndex - 1);
  };

  return (
    <div>
      <Header
        headingTitle1={"Tools and Resources"}
        headingTitle2={"Take The Type 2 Diabetes Prediction Test"}
        headerColor={"#008080"}
      />
      {console.log(formData)}
      {predictionResult === "positive" ? (
        <PredictionResults
          heading1={"You Are Highly Likely to Be Diabetic (Type 2)"}
          paragraph1={
            "Your likelihood of having type 2 diabetes is high, but only a medical professional can definitively diagnose diabetes or pre- diabetes. These conditions frequently present without symptoms, so it's important not to delay in scheduling a consultation with your doctor ."
          }
          heading2={"What are my next steps?"}
          paragraph2={
            "Starting can seem overwhelming, but the first action to take is to speak with your healthcare provider. Should you be diagnosed with pre- diabetes, it's advisable to participate in a diabetes prevention program recognised by the NHS or another reputable UK organization. These programs focus on lifestyle changes to help prevent or delay the onset of type 2 diabetes ."
          }
          imagePath={HighRisk}
          altText={"High Risk image"}
          color="rgb(221, 35, 35)"
        />
      ) : predictionResult === "negative" ? (
        <PredictionResults
          heading1={"You Are Unlikely to Be Diabetic (Type 2)"}
          paragraph1={
            "Your likelihood of having type 2 diabetes is low, but only a medical professional can definitively diagnose diabetes or pre- diabetes. These conditions frequently present without symptoms, so it's important not to delay in scheduling a consultation with your doctor ."
          }
          imagePath={LowRisk}
          altText={"Low Risk image"}
          color={"green"}
        />
      ) : (
        <PredictionQuestion
          handleNextPost={handleNextPost}
          handlePrevPost={handlePrevPost}
          data={questions[indexQuestion]}
        />
      )}
    </div>
  );
};

export default RiskPredictionTest;
