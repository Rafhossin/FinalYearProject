import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header"; // Path to the contact component
import {
  Input,
  Select,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import "../styles/SignUpStyles.css";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { serverEndpoint } from "../config/constants";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [employeeId, setEmployeeId] = useState(""); // New state variable for Employee Id

  const navigate = useNavigate();

  // Updated validate function to include Employee Id
  const validate = (
    firstName,
    surname,
    gender,
    dob,
    email,
    password,
    confirmPassword,
    employeeId
  ) => {
    return {
      firstName: firstName.length === 0,
      surname: surname.length === 0,
      gender: gender.length === 0,
      dob: dob.length === 0,
      email:
        email.length === 0 ||
        !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
      password:
        password.length === 0 ||
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
          password
        ),
      confirmPassword:
        confirmPassword.length === 0 || password !== confirmPassword,
      employeeId: employeeId.length === 0, // New validation for Employee Id
    };
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // state variables for error messages
  const [firstNameError, setFirstNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [employeeIdError, setEmployeeIdError] = useState("");
  // state variable for userExistsError
  const [userExistsError, setUserExistsError] = useState(false);

  const minDate = "1900-01-01";
  const minDateObj = new Date(minDate);

  const today = new Date();
  const sixteenYearsAgo = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = `${sixteenYearsAgo.getFullYear()}-${String(
    sixteenYearsAgo.getMonth() + 1
  ).padStart(2, "0")}-${String(sixteenYearsAgo.getDate()).padStart(2, "0")}`;

  // Update your handleSignUp function like this
  const handleSignUp = async (event) => {
    event.preventDefault();

    const errors = validate(
      firstName,
      surname,
      gender,
      dob,
      email,
      password,
      confirmPassword,
      employeeId
    );
    const isEnabled = !Object.keys(errors).some((x) => errors[x]);

    if (!isEnabled) {
      setFirstNameError(errors.firstName ? "First name is required" : "");
      setSurnameError(errors.surname ? "Surname is required" : "");
      setGenderError(errors.gender ? "Gender is required" : "");
      setDobError(errors.dob ? "Date of birth is required" : "");
      setEmailError(errors.email ? "Invalid email" : "");
      setPasswordError(
        errors.password
          ? "Password must be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and special characters."
          : ""
      );
      setConfirmPasswordError(
        errors.confirmPassword ? "Passwords do not match" : ""
      );
      setEmployeeIdError(errors.employeeId ? "Employee Id is required" : "");
      return;
    }
    // Check if the employee ID exists
    try {
      const response = await axios.post(
        `${serverEndpoint}/api/employees/check-employee-id`,
        {
          employeeId,
        }
      );

      const data = response.data;

      if (response.status == 200) {
        console.log(data.message);
      }
    } catch (error) {
      if (error.response.status == 404) {
        // The employee ID does not exist, show an error message and stop the sign up process
        setEmployeeIdError("The employee ID does not exist");
        // console.log(employeeIdError);
        return;
      } else {
        console.error("Error: ", error);
      }
      return;
    }

    // Make a request to your server to sign up the user
    try {
      const response = await axios.post(`${serverEndpoint}/api/users/signup`, {
        email,
        password,
        firstName,
        surname,
        gender,
        dob,
        employeeId,
      });

      const data = response.data;

      if (response.status == 201) {
        console.log(data.result);
        // Redirect the user to the login page
        navigate("/login");
      }
      if (data.success) {
        // The sign up was successful, continue with the sign up process
        console.log(
          `Email: ${email}, Password: ${password}, First Name: ${firstName}, Surname: ${surname}, Gender: ${gender}, Date of Birth: ${dob}, Employee Id: ${employeeId}`
        ); // Log Employee Id
      }
    } catch (error) {
      if (error.response.status == 400) {
        setUserExistsError(true);
        return;
      } else {
        console.error("Error: ", error);
      }
      return;
    }

    // Clear the form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setSurname("");
    setGender("");
    setDob("");
    setEmployeeId(""); // Clear Employee Id
  };

  useEffect(() => {
    let timer;
    if (userExistsError) {
      timer = setTimeout(() => {
        setUserExistsError(false);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
    return () => clearTimeout(timer); // This will clear the timeout if the component unmounts before the timeout finishes
  }, [userExistsError]);

  return (
    <ChakraProvider>
      <div className="main-container-signup">
        <Header headingTitle2={"My Account"} headerColor={"#008080"} />

        <div className="container">
          <div className="merged-container">
            <div className="color-container"></div>

            <div className="signup">
              <h1>Sign Up</h1>
              <form onSubmit={handleSignUp}>
                <label>
                  First Name:
                  <Input
                    placeholder=""
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {firstNameError && (
                    <p className="error-message">{firstNameError}</p>
                  )}
                </label>
                <label>
                  Surname:
                  <Input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                  />
                  {surnameError && (
                    <p className="error-message">{surnameError}</p>
                  )}
                </label>
                <label>
                  Gender:
                  <Select
                    placeholder="Select option"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                  {genderError && (
                    <p className="error-message">{genderError}</p>
                  )}
                </label>
                <label>
                  Date of Birth:
                  <Input
                    type="date"
                    value={dob}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      if (selectedDate > sixteenYearsAgo) {
                        setDobError("You must be at least 16 years old");
                      } else if (selectedDate < minDateObj) {
                        setDobError("Date of birth cannot be before 1900");
                      } else {
                        setDobError("");
                      }
                      setDob(e.target.value);
                    }}
                    min={minDate}
                    max={maxDate}
                    required
                  />
                  {dobError && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>{dobError}</AlertDescription>
                    </Alert>
                  )}
                </label>
                <label>
                  Email:
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={() => setEmailError("")}
                    required
                  />
                  {emailError && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>{emailError}</AlertDescription>
                    </Alert>
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
                  Password:
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyUp={() => setPasswordError("")}
                      required
                    />

                    <InputRightElement width="4rem">
                      <Button h="1.20rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {passwordError && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}
                </label>
                <label>
                  Confirm Password:
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyUp={() => setConfirmPasswordError("")}
                      required
                    />
                    <InputRightElement width="4rem">
                      <Button h="1.20rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {confirmPasswordError && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>
                        {confirmPasswordError}
                      </AlertDescription>
                    </Alert>
                  )}
                </label>
                <label>
                  Employee Id: {/* New label for Employee Id */}
                  <Input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    onKeyUp={() => setEmployeeIdError("")}
                    required
                  />
                  {employeeIdError && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertDescription>{employeeIdError}</AlertDescription>
                    </Alert>
                  )}
                </label>
                {userExistsError && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>User already exists!</AlertDescription>
                  </Alert>
                )}
                <div className="signup-btn">
                  <Button colorScheme="teal" size="lg" type="submit">
                    Sign Up
                  </Button>
                  <p>
                    Already have an account?{" "}
                    <ChakraLink
                      as={Link}
                      to="/login"
                      _hover={{ color: "#d9534f" }}
                      color="teal"
                    >
                      {" "}
                      Log in
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

export default SignUp;
