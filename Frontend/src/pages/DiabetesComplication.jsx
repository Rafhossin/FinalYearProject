import React from "react";

import complecationImage from "../assets/images/infoButtonPages/complecation.webp"; // Path to image

import DiabetesComPrimary from "../components/DiabetesComPrimary";
import "../styles/DiabetesComplication.css"; // Path to CSS file

const DiabetesComplication = () => {
  return (
    <>
      <div className="main-container">
        <DiabetesComPrimary
          showButton={false}
          heading1={"Diabetes Complications"}
          heading2={"Potential Risks and Issues"}
          paragraph={"What you need to know about diabetes complications."}
          imagePath={complecationImage}
          altText={"Complecation Image"}
          color={"#D0E1EE"}
        />

        {/* New container for Diabetes Plate Method */}
        <div className="diabetes-complication-container">
          <h1>Taking Diabetes Seriously</h1>
          <p>
            Diabetes can result in serious, sometimes life- threatening
            complications. However, you can reduce the risk of diabetes-related
            issues such as heart, kidney, and eye diseases by adopting healthy
            lifestyle changes, being aware of warning signs, and maintaining
            regular appointments with your healthcare provider. Explore the
            details of each complication below to understand them better.
          </p>

          <div className="diseases-container">
            <h1>Understanding Complications of Diabetes</h1>

            <p>
              Diabetes heightens the risk of various severe health issues.
              Fortunately, through appropriate treatment and adopting
              recommended lifestyle modifications, numerous individuals with
              diabetes can successfully avert or postpone the development of
              these complications.
            </p>

            <div className="diseases-section1">
              <h1>Cardiovascular Disease</h1>
            </div>

            <p className="dp1">
              Cardiovascular disease( CVD) ranks as the primary cause of
              mortality among individuals with diabetes. However, adopting a
              healthy lifestyle, which encompasses regular exercise and a
              balanced diet, can significantly lower your risk of CVD and other
              diabetes- related complications .
            </p>

            <div className="diseases-section1">
              <h1>Chronic Kidney Disease</h1>
            </div>
            <p className="dp1">
              Diabetes stands as the foremost cause of chronic kidney disease(
              CKD). Various factors, such as genetics, the management of blood
              glucose levels, and blood pressure control, influence the
              likelihood of developing CKD. Investigating methods to prevent
              CKD's onset or to decelerate its progression is crucial for those
              with diabetes.
            </p>
            <div className="diseases-section1">
              <h1>Diabetes- Related Eye Disease</h1>
            </div>
            <p className="dp1">
              Diabetes is the primary cause of new instances of blindness in
              adults of working age. Understanding the importance of regular,
              comprehensive eye examinations is key, as they can lead to early
              detection and help prevent or delay vision loss. Gaining more
              knowledge about how to prevent diabetes- related eye diseases is
              essential for maintaining good eye health.
            </p>

            <div className="diseases-section1">
              <h1>Neuropathy</h1>
            </div>
            <p className="dp1">
              Diabetes is the primary cause of new instances of blindness in
              adults of working age. Understanding the importance of regular,
              comprehensive eye examinations is key, as they can lead to early
              detection and help prevent or delay vision loss. Gaining more
              knowledge about how to prevent diabetes- related eye diseases is
              essential for maintaining good eye health.
            </p>

            <div className="diseases-section1">
              <h1>Foot Complications</h1>
            </div>
            <p className="dp1">
              Diabetes can lead to nerve damage, reduced circulation, and even
              limb loss. You can lower your risk for serious foot complications
              by taking care of your feet, managing your diabetes, and talking
              to your doctor if you notice problems with your feet.
            </p>
            <div className="diseases-section1">
              <h1>Stroke</h1>
            </div>
            <p className="dp1">
              Individuals with diabetes face a stroke risk that is double that
              of those without diabetes. However, this risk can be reduced
              through healthy lifestyle modifications and by effectively
              managing blood pressure, blood glucose levels, and cholesterol.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiabetesComplication;
