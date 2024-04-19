import React from "react";
import "../styles/TermsOfUseStyles.css"; // Ensure to create and style similarly to other pages
import Header from "../components/Header"; // Reusing the same header component

const TermsOfUse = () => {
  return (
    <>
      <Header headingTitle2={"Terms of Use"} headerColor={"#008080"} />
      <div className="terms-container">
        <h2>General Conditions</h2>
        <p>
          By accessing and using the AIBetic 2 application, you agree to be
          bound by these terms. If you do not agree with any part of the terms,
          you are prohibited from using the app.
        </p>

        <section className="access-requirements">
          <h2>Access Requirements</h2>
          <p>
            Access to the AIBetic 2 application is restricted to employees with
            a valid employee ID. You must verify your identity using your
            employee credentials to use this app.
          </p>
        </section>

        <section className="license">
          <h2>License to Use</h2>
          <p>
            AIBetic 2 grants you a personal, non-transferable, and non-exclusive
            right to access and use the app solely for your personal and
            non-commercial purposes within the enterprise, subject to these
            terms.
          </p>
        </section>

        <section className="user-responsibilities">
          <h2>User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and employee ID information and for all activities that
            occur under your account. You agree to notify us immediately of any
            unauthorized use of your account.
          </p>
        </section>

        <section className="prohibitions">
          <h2>Prohibited Activities</h2>
          <p>
            You are not allowed to use this app for any purposes that are
            illegal, infringe upon another person's rights, or further any
            criminal activities.
          </p>
        </section>

        <section className="modification-of-terms">
          <h2>Modification of Terms</h2>
          <p>
            AIBetic 2 reserves the right to modify these terms at any time. Your
            continued use of the app after such modifications will constitute
            your agreement to the new terms.
          </p>
        </section>

        <section className="contact-info">
          <h2>Contact Information</h2>
          <p>
            If you have any questions about these terms, please contact us at{" "}
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

export default TermsOfUse;
