import React, { useState, useContext } from "react";

import { ChakraProvider, Alert, AlertIcon } from "@chakra-ui/react";
import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "../styles/PredictionQuestion.css";

import infoImage from "../assets/images/riskTest/info.png"; // Import the image

const PredictionQuestion = ({ data, handleNextPost, handlePrevPost }) => {
  return (
    <ChakraProvider>
      <div className="main-container-pred">
        <div className="pred-container">
          <div className="merged-container">
            <div className="merged-sub-container">
              <div className="left-container-prediction">
                <h1>{data.symptom}</h1>
                <div className="why-important">
                  <img src={infoImage} alt=""></img>
                  <h3>Why is this important?</h3>
                </div>
                <h2>{data.description}</h2>
                <div className="buttons-prediction">
                  <Button colorScheme="teal" size="lg" onClick={handlePrevPost}>
                    <ArrowBackIcon boxSize={8} />
                  </Button>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => handleNextPost(1, data.type)}
                  >
                    YES
                  </Button>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => handleNextPost(0, data.type)}
                  >
                    NO
                  </Button>
                </div>
              </div>
              <div className="right-container-prediction">
                <img src={data.src} alt={data.alt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default PredictionQuestion;
