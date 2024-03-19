import React, { useState, useContext } from "react";

import { ChakraProvider, Alert, AlertIcon } from "@chakra-ui/react";

import "../styles/PredictionResult.css";

import infoImage from "../assets/images/riskTest/info.png"; // Import the image

const PredictionResults = ({
  heading1,
  paragraph1,
  heading2,
  paragraph2,
  imagePath,
  altText,
  color,
}) => {
  return (
    <ChakraProvider>
      <div className="main-container-pred1">
        <div className="pred-container1">
          <div className="merged-container1">
            <div className="merged-sub-container1">
              <div className="left-container-prediction1">
                <h1 style={{ color: color }}>{heading1}</h1>
                <h2>{paragraph1}</h2>
                {(heading2 || paragraph2) && (
                  <div className="left-sub-container-prediction1">
                    {heading2 && <h3>{heading2}</h3>}
                    {paragraph2 && <h2>{paragraph2}</h2>}
                  </div>
                )}
              </div>
              <div className="right-container-prediction1">
                <img src={imagePath} alt={altText} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default PredictionResults;
