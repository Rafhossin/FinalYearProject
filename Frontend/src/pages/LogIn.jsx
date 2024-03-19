import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { ChakraProvider, Alert, AlertIcon } from "@chakra-ui/react";
import { Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import "../styles/LoginStyles.css";
import { Link as ChakraLink } from "@chakra-ui/react";
import UserContext from "../UserContext"; // Import UserContext

const SignIn = () => {
  const { setUser } = useContext(UserContext); // Access setUser from UserContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validate = (email, password) => {
    return {
      email:
        email.length === 0 ||
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
      password: password.length === 0,
    };
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  axios.defaults.withCredentials = true;
  const handleSignIn = async (event) => {
    event.preventDefault();

    const errors = validate(email, password);
    const isEnabled = !Object.keys(errors).some((x) => errors[x]);

    if (!isEnabled) {
      alert("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );

      const data = response.data;
      if (response.status === 200 && data.token) {
        // Checking for successful response and existence of the token
        // Assuming  backend response includes the user object with a name
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userName", data.user.user_first_name); // Make sure the user object has a firstName property

        setUser(data.user); // Set the user state in the UserContext

        // Redirect the user to the homepage
        navigate("/");
      } else {
        setError("An unexpected error occurred,please try again later");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 402) {
          setError("Email does not exist");
        } else if (error.response.status === 403) {
          setError("Password is not correct");
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        console.error("Error: ", error);
        setError("An error occurred while attempting to sign in.");
      }
      return;
    }

    // Clear the form
    setEmail("");
    setPassword("");
  };

  return (
    <ChakraProvider>
      <div className="main-container-signin">
        <Header headingTitle2={"My Account"} headerColor={"#008080"} />
        <div className="container">
          <div className="merged-container">
            <div className="color-container"></div>
            <div className="signin">
              <h1>Sign In</h1>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSignIn}>
                <label>
                  Email:
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null); // Reset the error state
                    }}
                    required
                  />
                </label>
                <label>
                  Password:
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null); // Reset the error state
                      }}
                      required
                    />
                    <InputRightElement width="4rem">
                      <Button h="1.20rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </label>
                <div className="signin-btn">
                  <Button colorScheme="teal" size="lg" type="submit">
                    Sign In
                  </Button>
                  <p className="resetPass-btn">
                    Forget password?{" "}
                    <ChakraLink
                      as={Link}
                      to="/forget-password"
                      _hover={{ color: "#d9534f" }}
                      color="teal"
                    >
                      Reset{" "}
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

export default SignIn;
