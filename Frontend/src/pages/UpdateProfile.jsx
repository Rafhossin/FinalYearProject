import React, { useState, useContext } from "react";

import axios from "axios";
import {
  ChakraProvider,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import UserContext from "../UserContext"; // Path to the UserContext

import { Link, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import "../styles/UpdateProfileStyles.css";
import Header from "../components/Header"; // Path to the contact component

const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(null);

  const [emailUpdated, setEmailUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [show, setShow] = React.useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext); // Get the user data from the UserContext
  const handleClick = () => setShow(!show);

  const validate = (email, password) => {
    const errors = {
      email:
        email.length > 0 &&
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
      password:
        password.length > 0 &&
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
          password
        ),
    };

    setEmailError(errors.email ? "Please enter a valid email address." : "");
    setPasswordError(
      errors.password
        ? "Password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and special characters."
        : ""
    );

    return errors.email || errors.password;
  };

  const handleUpdateEmail = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token"); // Change this line
    console.log(token);
    console.log(user._id);

    if (!validate(email, "")) {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/profile/update-profile",
          {
            email,
            userId: user._id, // Include the user id in the request body
          },
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const data = response.data;

        if (response.status == 200) {
          console.log(data.result);
          // Redirect the user to the login page
          setEmailUpdated(true);
          setTimeout(() => setEmailUpdated(false), 5000);
          setEmail(""); // Clear the email field
        } else {
          setError("An unexpected error occurred,please try again later");
        }
        if (data.success) {
          // The sign up was successful, continue with the sign up process
          console.log(`email: ${email}`);
        }

        // Handle response...
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            setError("An unexpected error occurred,please try again later");
          }
        }
        console.error(
          "Error updating email: ",
          error.response ? error.response.data : error
        );
      }
    }
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    console.log(token);
    console.log(user._id);
    if (!validate("", password)) {
      try {
        const response = await axios.put(
          "http://localhost:3000/api/profile/update-profile",
          { password, userId: user._id },
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        const data = response.data;

        if (response.status == 200) {
          console.log(data.result);
          // Redirect the user to the login page
          setPasswordUpdated(true);
          setTimeout(() => setPasswordUpdated(false), 5000);
          setPassword(""); // Clear the password field
        } else {
          setError("An unexpected error occurred,please try again later");
        }
        if (data.success) {
          // The sign up was successful, continue with the sign up process
          console.log(`Password: ${password}`);
        }

        // Handle response...
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            setError("An unexpected error occurred,please try again later");
          }
        }
        console.error(
          "Error updating password: ",
          error.response ? error.response.data : error
        );
      }
    }
  };

  return (
    <ChakraProvider>
      <div className="main-container-signup">
        <Header headingTitle2={"My Account"} headerColor={"#008080"} />

        <div className="container">
          <div className="merged-container">
            <div className="color-container"></div>
            <div className="update-profile">
              <h1>Update Profile</h1>
              <Text mb="5" fontSize="lg">
                Update your email and password
              </Text>
              <form>
                <label>
                  {emailUpdated && (
                    <Alert status="success" variant="left-accent">
                      <AlertIcon />
                      Your email has been updated successfully!
                    </Alert>
                  )}
                  {error ||
                    (emailError && (
                      <Alert status="error">
                        <AlertIcon />
                        {emailError || error}
                      </Alert>
                    ))}
                  Email:
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(null);
                    }}
                  />
                  {email && (
                    <Button
                      colorScheme="teal"
                      size="lg"
                      onClick={handleUpdateEmail}
                    >
                      Update Email
                    </Button>
                  )}
                </label>
                <label>
                  <div className="signup-border-box">
                    <ul>
                      <li>Minimum 8 characters long</li>
                      <li>Mixed of uppercase and lowercase letters</li>
                      <li>Should include special characters like: @, #, %</li>
                    </ul>
                  </div>
                  {passwordUpdated && (
                    <Alert status="success" variant="left-accent">
                      <AlertIcon />
                      Your Password has been updated successfully!
                    </Alert>
                  )}
                  {error ||
                    (passwordError && (
                      <Alert status="error">
                        <AlertIcon />
                        {error || passwordError}
                      </Alert>
                    ))}
                  Password:
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(null);
                      }}
                    />
                    <InputRightElement width="4rem">
                      <Button h="1.20rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {password && (
                    <Button
                      colorScheme="teal"
                      size="lg"
                      onClick={handleUpdatePassword}
                    >
                      Update Password
                    </Button>
                  )}
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default UpdateProfile;
