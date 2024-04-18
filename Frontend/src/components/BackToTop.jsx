import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <FaArrowCircleUp
      onClick={scrollToTop}
      style={{
        position: "fixed",
        width: "40px",
        height: "40px",
        bottom: "50px",
        right: "30px",
        backgroundColor: "red", // Temporarily set to red to ensure visibility
        color: "white",
        cursor: "pointer",
        borderRadius: "50%",
        zIndex: 9999, // Set high to ensure visibility
      }}
    />
  ) : null;
};

export default BackToTop;
