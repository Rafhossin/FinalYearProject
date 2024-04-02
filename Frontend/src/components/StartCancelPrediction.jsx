import React from "react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import "../styles/StartCancelPrediction.css";

const StartCancelPredComponent = ({
  heading2,
  heading3,
  imagePath,
  altText,
  onClick,
  onClick1,
  btnText,
  btnText1,
}) => {
  return (
    <ChakraProvider>
      <div className="main-container-pred9">
        <div className="pred-container9">
          <div className="merged-container9">
            <div className="merged-sub-container9">
              <div className="left-container-prediction9">
                <h1>{heading2}</h1>
                <h2>{heading3}</h2>

                <div className="buttons-prediction9">
                  <Button colorScheme="teal" size="lg" onClick={onClick}>
                    {btnText}
                  </Button>
                  <Button colorScheme="teal" size="lg" onClick={onClick1}>
                    {btnText1}
                  </Button>
                </div>
              </div>
              <div className="right-container-prediction9">
                <img src={imagePath} alt={altText} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default StartCancelPredComponent;
