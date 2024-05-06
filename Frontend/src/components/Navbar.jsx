import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/NavbarStyles.css";
import logoImage from "../assets/logos/logo.png";
import accountImage from "../assets/icons/account.png";
import loginIcon from "../assets/icons/login.png";
import signupIcon from "../assets/icons/signup.png";
import resetPasswordIcon from "../assets/icons/reset.png";
import updateProfileIcon from "../assets/icons/update.png";
import logoutIcon from "../assets/icons/logout.png";
import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { serverEndpoint } from "../config/constants";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext); // Access user and setUser from UserContext
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  axios.defaults.withCredentials = true;
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Helper function to convert string to camel case
  const toCamelCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleLogout = () => {
    // Remove token and user data from session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    axios
      .get(`${serverEndpoint}/api/logout`)
      .then((res) => {
        if (res.status == 200) {
          navigate("/login");
          setUser(null); // Update the user state to null
        }
      })
      .catch((error) => {
        console.error("Failed to log out");
      });
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img
              src={logoImage}
              alt="AI Betic Logo"
              className="navbar-logo-image"
            />
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about-diabetes">About Diabetes</Link>
          <Link to="/health-wellness">Health & Wellness</Link>
          <Link to="/food-nutrition">Food & Nutrition</Link>
          <Link to="/tools-resources">Tools & Resources</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
        <div className="navbar-account">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {/* <img src={accountImage} alt="Account" className="account-image" /> */}
            <CgProfile size={25} color="black" style={{ padding: 5 }} />
            Account
          </button>
          <div
            className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}
            onMouseLeave={closeMenu}
          >
            {user ? (
              <>
                <div className="account-info">
                  <div className="account-name">
                    {toCamelCase(user.user_first_name)}{" "}
                    {toCamelCase(user.user_last_name)}
                  </div>
                  <div className="account-email">
                    {toCamelCase(user.user_email)}
                  </div>
                </div>
                <Link to="/update-profile">
                  <img
                    src={updateProfileIcon}
                    alt="Update Profile"
                    className="menu-icon"
                  />
                  Update Profile
                </Link>
                <Link
                  to=""
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <img src={logoutIcon} alt="Log Out" className="menu-icon" />
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <img src={loginIcon} alt="Login" className="menu-icon" />
                  Log In
                </Link>
                <Link to="/signup">
                  <img src={signupIcon} alt="Sign Up" className="menu-icon" />
                  Sign Up
                </Link>
                <Link to="/forget-password">
                  <img
                    src={resetPasswordIcon}
                    alt="Forget Password"
                    className="menu-icon"
                  />
                  Forget Password
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
