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
          This project is part of my final year BEng Software Engineering
          coursework at <strong>University of Westminster</strong>.
        </p>

        <section className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            For inquiries about this project or potential collaborations, reach
            out to me:
          </p>
          <p>
            <strong>Email:</strong> w1785478@my.westminster.ac.uk
          </p>
        </section>

        <section className="follow-work">
          <h2>Follow My Work</h2>
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
          <p>This contact page is part of a university project.</p>
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
          {/* Link to the department or advisor's contact information */}
        </section>
      </div>
    </>
  );
};

export default Contact;
