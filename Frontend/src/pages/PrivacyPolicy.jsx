import React from "react";
import "../styles/PrivacyPolicyStyles.css"; // Path to the CSS file, similar to ContactStyles.css
import Header from "../components/Header"; // Reusing the same header component

const PrivacyPolicy = () => {
  return (
    <>
      <Header headingTitle2={"Privacy Policy"} headerColor={"#008080"} />
      <div className="privacy-container">
        <h2>About AIBetic 2</h2>
        <p>
          AIBetic 2 is an application designed to assist in the detection of
          Type 2 Diabetes. This policy outlines the data handling practices and
          privacy measures we take.
        </p>

        <section className="data-use">
          <h2>Data Use and Collection</h2>
          <p>
            We collect only the necessary health data to analyse risk factors
            associated with Type 2 Diabetes. All data is securely stored and
            processed in accordance with relevant legislation.
          </p>
          <p>
            Email for inquiries:<strong> aibetic2projectteam@gmail.com</strong>
          </p>
        </section>

        <section className="data-protection">
          <h2>Data Protection and Security</h2>
          <p>
            Our application uses advanced encryption and security measures to
            protect your data from unauthorized access.
          </p>
        </section>

        <section className="user-rights">
          <h2>Your Rights</h2>
          <p>
            Users have the right to access, correct, and delete their personal
            data. For more details on these processes, please contact our
            support team.
          </p>
        </section>
        <section className="ethical-considerations">
          <h2>Ethical Considerations</h2>
          <p>
            We are committed to ethical data practices that ensure fairness,
            transparency, and respect for user rights. Our application adheres
            to the highest standards of data use, focusing on user empowerment
            and security. We ensure all our data handling processes are in
            compliance with applicable laws and ethical guidelines.
          </p>
          <p>
            For more information or to report a concern, please contact our
            Ethics and Compliance Officer at{" "}
            <strong>aibetic2projectteam@gmail.com</strong>
          </p>
        </section>

        <section className="additional-info">
          <h2>Additional Information</h2>
          <p>
            For more detailed information about our privacy practices, please
            contact our Privacy Officer at{" "}
            <strong>aibetic2projectteam@gmail.com</strong>
          </p>
        </section>

        <section className="disclaimer">
          <h2>Disclaimer</h2>
          <p>
            AIBetic 2 is a final year project developed by Khandakar Raf Hossin
            as part of the BEng Software Engineering coursework at the
            University of Westminster. This application is designed to
            demonstrate capabilities in Type 2 Diabetes detection and is
            intended for educational and demonstrational purposes only.
          </p>
          <p>
            As a project application, AIBetic 2 is in a developmental stage and
            may not have the same level of functionality or reliability as a
            commercially released software product. Users are advised to use
            this application understanding these constraints.
          </p>
          <p>
            The support and updates for AIBetic 2 may be limited following the
            completion of the academic course. For any queries or feedback,
            please contact <strong>w1785478@my.westminster.ac.uk</strong>
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
