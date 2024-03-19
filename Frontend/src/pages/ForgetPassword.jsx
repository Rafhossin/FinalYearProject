import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import { ChakraProvider, Input, Button, Text } from "@chakra-ui/react";
import Header from "../components/Header"; // Path to the contact component
import "../styles/ForgetPasswordStyles.css";
import { Link as ChakraLink } from "@chakra-ui/react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validate = (email) => {
    return {
      email:
        email.length === 0 ||
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
    };
  };

  const handleforgetPassword = async (event) => {
    event.preventDefault();

    const errors = validate(email);
    const isEnabled = !Object.keys(errors).some((x) => errors[x]);

    if (!isEnabled) {
      setError(errors.email ? "Invalid email" : "");
      alert("Please fill out all fields correctly.");
      return;
    }

    // Make a request to your server to reset the password
    try {
      const response = await axios.post(
        "http://localhost:3000/api/forget-password",
        {
          email,
        }
      );

      const data = response.data;

      if (response.status === 200) {
        // The reset password request was successful, show a success message
        setMessage(
          "Please check your registered email inbox for further instruction"
        );
        setError("");
      } else {
        setError("An unexpected error occurred,please try again later.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 402) {
          setError("User not registered");
        } else if (error.response.status === 404) {
          setError(
            "An unexpected error occurred while sending email.Please try again later."
          );
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        console.error("Error: ", error);
        setError("Error reseting password.");
      }
      return;
    }
    // Clear the form
    setEmail("");
  };

  return (
    <ChakraProvider>
      <div className="main-container-forget-password">
        <Header headingTitle2={"My Account"} headerColor={"#008080"} />
        <div className="container">
          <div className="merged-container">
            <div className="color-container"></div>
            <div className="forget-password">
              <h1>Forget Password</h1>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleforgetPassword}>
                <label>
                  {message && (
                    <Alert status="success" variant="left-accent">
                      <AlertIcon />
                      {message}
                    </Alert>
                  )}
                  Email:
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={() => {
                      setError("");
                      setMessage("");
                    }}
                    required
                  />
                </label>
                <div className="forget-password-btn">
                  <Button colorScheme="teal" size="lg" type="submit">
                    Submit
                  </Button>
                  <p className="login-btn">
                    Don't want to reset the password now?{" "}
                    <ChakraLink
                      as={Link}
                      to="/login"
                      _hover={{ color: "#d9534f" }}
                      color="teal"
                    >
                      Sign In{" "}
                    </ChakraLink>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <ChakraLink
                      as={Link}
                      to="/signup"
                      _hover={{ color: "#d9534f" }}
                      color="teal"
                    >
                      Sign Up{" "}
                    </ChakraLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default ForgetPassword;
