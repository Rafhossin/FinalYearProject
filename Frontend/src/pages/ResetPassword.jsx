import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChakraProvider,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import "../styles/ResetPasswordStyles.css";
import Header from "../components/Header"; // Path to the contact component
import { useParams } from "react-router-dom";
import { serverEndpoint } from "../config/constants";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setError] = useState("");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { token } = useParams();
  const navigate = useNavigate();

  // Now you can use the `token` in your component, for example:
  useEffect(() => {
    console.log(token); // Log the token from the URL
    //   // You might want to add logic here to verify the token before allowing a password reset
  }, [token]);

  const validate = (password) => {
    return {
      password:
        password.length === 0 ||
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
          password
        ),
    };
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const errors = validate(password);
    const isEnabled = !Object.keys(errors).some((x) => errors[x]);

    if (!isEnabled) {
      setError(errors.password ? "Invalid password" : "");
      return;
    }

    try {
      // const response = await axios.put(
      //   `http://localhost:3000/api/reset-password/${token}`,
      //   {
      //     password,
      //   }
      // );
      const response = await axios.put(
        `${serverEndpoint}/api/reset-password`,
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (response.status == 200) {
        console.log(` Password: ${password}`);
        setError("");
        // Redirect the user to the login page
        navigate("/login");
      } else {
        setError("An unexpected error occurred,please try again later");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setError(
            "An error occurred during reseting password.please try again later"
          );
        } else {
          setError("An unexpected error occurred");
          console.error("Error during reset password: ", error);
          // Other error handling...
        }
      } else {
        console.error("Error: ", error);
        setError("An error occurred during reseting password.");
      }
      return;
    }
    setPassword("");
  };

  return (
    <ChakraProvider>
      <div className="main-container-signup">
        <Header headingTitle2={"My Account"} headerColor={"#008080"} />

        <div className="container">
          <div className="merged-container">
            <div className="color-container"></div>
            <div className="reset-password">
              <h1>Reset Password</h1>

              <form onSubmit={handleResetPassword}>
                <label>
                  <div className="resetPass-border-box">
                    <ul>
                      <li>Minimum 8 characters long</li>
                      <li>Mixed of uppercase and lowercase letters</li>
                      <li>Should include special characters like: @, #, %</li>
                    </ul>
                  </div>
                  {passwordError && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}
                  Password:
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyUp={() => setError("")}
                      required
                    />
                    <InputRightElement width="4rem">
                      <Button h="1.20rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </label>
                <div className="resetPass-prof-btn">
                  <Button colorScheme="teal" size="lg" type="submit">
                    Reset
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default ResetPassword;
