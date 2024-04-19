import React from "react";
import "../styles/ContactStyles.css"; // Path to the CSS file
import Header from "../components/Header"; // Path to the contact component

const Contact = () => {
  return (
    <>
      <Header headingTitle2={"Contact Us"} headerColor={"#008080"} />
      <div className="contact-container">
        <h2>Project by: Khandakar Raf Hossin</h2>
        <p>
          This Final year project is a result of comprehensive coursework
          undertaken for the BEng Software Engineering program at the{" "}
          <strong>University of Westminster</strong>.
        </p>

        <section className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            For further information regarding this project or to discuss
            potential collaborations, please do not hesitate to contact at the
            following email address:
          </p>
          <p>
            <strong>Email:</strong> w1785478@my.westminster.ac.uk
          </p>
        </section>

        <section className="follow-work">
          <h2>Explore Other Projects</h2>
          <a
            href="https://www.linkedin.com/in/khandakar-hossin-364622207/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Rafhossin?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </section>

        <section className="disclaimer">
          <h2>Disclaimer</h2>
          <p>
            AIBetic 2 is designed to demonstrate capabilities in Type 2 Diabetes
            detection and is intended for educational and demonstrational
            purposes only.
          </p>
          <p>
            As a project application, AIBetic 2 is in a developmental stage and
            may not have the same level of functionality or reliability as a
            commercially released software product. Users are advised to use
            this application understanding these constraints.
          </p>
          <p>
            The support and updates for AIBetic 2 may be limited following the
            completion of the academic course.
          </p>
        </section>

        <section className="university-contact">
          <h2>University Contact</h2>
          <p>
            For academic verification, please contact the University Department-
            <a
              href="https://www.westminster.ac.uk/about-us/our-people/directory/roubert-francois"
              target="_blank"
              rel="noopener noreferrer"
            >
              Project Supervisor
            </a>
          </p>
        </section>
      </div>
    </>
  );
};

export default Contact;
