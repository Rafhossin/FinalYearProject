import React from "react";

import A1CImage from "../assets/images/infoButtonPages/A1C_1.png"; // Path to image
import Header from "../components/Header";
import FPGImage from "../assets/images/infoButtonPages/FPG.png"; // Path to image
import OGTTImage from "../assets/images/infoButtonPages/OGTT.png"; // Path to image

import "../styles/DiagnosingDiabetes.css"; // Path to CSS file

const DiagnosingDiabetes = () => {
  return (
    <>
      <div className="main-container">
        <Header
          headingTitle1={"BLOOD GLUCOSE & A1C"}
          headingTitle2={"Diagnosis"}
          headerColor={"#008080"}
        />

        {/* New container for Diabetes Plate Method */}
        <div className="diabetes-diagonisis-container">
          <p>
            Diabetes can be diagnosed through various methods, and typically,
            these tests need to be repeated on a separate day to confirm a
            diabetes diagnosis . These tests are best conducted in a healthcare
            setting, like your doctor's office or a lab. If your blood glucose
            levels are exceedingly high , or if you exhibit classic symptoms of
            high blood glucose along with a positive test result, your doctor
            might not deem it necessary to perform a second test for a
            diagnosis.
          </p>

          <div className="A1C">
            <h1>A1C Test</h1>
            <div className="diagnosisImage">
              <img src={A1CImage} alt="A1C Image" />
            </div>
            <p>
              The A1C test gives an average of your blood glucose levels over
              the past two to three months. One of the benefits of being
              diagnosed by this method is that there's no need for fasting or
              consuming any specific drink.
            </p>
            <p>
              <strong>
                Diabetes is diagnosed when the A1C level is 6.5% or higher.
              </strong>
            </p>

            <div className="table-section1">
              <table>
                <thead>
                  <tr>
                    <th>Result</th>
                    <th>A1C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Normal</td>
                    <td>Less than 5.7%</td>
                  </tr>
                  <tr>
                    <td>Pre-Diabetes</td>
                    <td>5.7% to 6.4%</td>
                  </tr>
                  <tr>
                    <td>Diabetes</td>
                    <td>6.5% or higher</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h1>Fasting Plasma Glucose( FPG )</h1>
            <div className="diagnosisImage">
              <img src={FPGImage} alt="FPG Image" />
            </div>
            <p>
              This procedure involves assessing your fasting blood glucose
              levels. Fasting in this context means not consuming any food or
              drinks( apart from water) for at least 8 hours prior the test.
              Typically, this test is conducted the morning, before breakfast.
            </p>
            <p>
              <strong>
                A diagnosis of diabetes is made when the fasting blood glucose
                level is 126 mg/ dl or higher.
              </strong>
            </p>
            <div className="table-section2">
              <table>
                <thead>
                  <tr>
                    <th>Result</th>
                    <th>Fasting Plasma Glucose (FPG)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Normal</td>
                    <td>Less than 100 mg/dL</td>
                  </tr>
                  <tr>
                    <td>Pre-Diabetes</td>
                    <td>100 mg/dL to 125 mg/dL</td>
                  </tr>
                  <tr>
                    <td>Diabetes</td>
                    <td>126 mg/dL or higher</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h1>Oral Glucose Tolerance Test( OGTT )</h1>
            <div className="diagnosisImage">
              <img src={OGTTImage} alt="OGTT Image" />
            </div>
            <p>
              The Oral Glucose Tolerance Test( OGTT) is a two- hour examination
              that measures your blood glucose levels before and two hours after
              you consume a specially formulated sweet drink. This test provides
              insight into how your body metabolizes sugar.
            </p>
            <p>
              <strong>
                A diabetes diagnosis is made if the blood glucose level is 200
                mg/ dl or higher two hours after drinking the solution .
              </strong>
            </p>
            <div className="table-section3">
              <table>
                <thead>
                  <tr>
                    <th>Result</th>
                    <th>Oral Glucose Tolerance Test (OGTT)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Normal</td>
                    <td>Less than 140 mg/dL</td>
                  </tr>
                  <tr>
                    <td>Pre-Diabetes</td>
                    <td>140 to 199 mg/dL</td>
                  </tr>
                  <tr>
                    <td>Diabetes</td>
                    <td>200 mg/dL or higher</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pre-diabetes">
              <h1>Pre-diabetes Explained</h1>
              <p>
                Pre-diabetes is a condition typically preceding type 2 diabetes,
                characterised by blood glucose levels that are elevated but not
                yet high enough for a diabetes diagnosis . This condition may
                also be referred to as impaired glucose tolerance( IGT) or
                impaired fasting glucose( IFG), depending on the test used for
                detection. Pre-diabetes increases the risk of developing type 2
                diabetes and cardiovascular diseases .
              </p>
            </div>

            <div className="symptoms">
              <h1>Symptoms</h1>
              <p>
                Pre-diabetes often doesn't present clear symptoms, meaning you
                can have it without being aware . However, some individuals with
                pre- diabetes might experience symptoms similar to diabetes or
                may already be facing complications associated with diabetes.
                Pre-diabetes is usually discovered during diabetes screening
                tests . It's recommended that those with pre-diabetes undergo
                testing for type 2 diabetes every one to two years . Indicators
                of pre-diabetes include :{" "}
                <ul>
                  <li>An A1C level between 5.7% and 6.4%</li>
                  <li>
                    Fasting blood glucose levels ranging from 100 to 125 mg/dL
                  </li>
                  <li>
                    A two-hour blood glucose level between 140 and 199 mg/dL
                    after an OGTT
                  </li>
                </ul>
              </p>
            </div>

            <div className="prevention">
              <h1>Type 2 Diabetes Prevention</h1>
              <p>
                Having pre-diabetes doesn't mean you're destined to develop type
                2 diabetes. Early intervention in pre-diabetes can sometimes
                normalise blood glucose levels. Studies indicate that the risk
                of developing type 2 diabetes can be reduced by 58% through :
                <ul>
                  <li>
                    Losing 7% of your body weight, which equates to 15 pounds
                    for a 200-pound individual.
                  </li>
                  <li>
                    Engaging in moderate exercise, like brisk walking, for 30
                    minutes daily, five times a week.
                  </li>
                </ul>
                Remember, achieving your ideal body weight isn't a prerequisite;
                even a weight loss of 10 to 15 pounds can have a significant
                impact .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiagnosingDiabetes;
