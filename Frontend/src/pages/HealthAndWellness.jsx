import React from "react";

import exerciseImage from "../assets/images/homepage/exercise.jpeg"; // Path to image

import healthImage from "../assets/images/homepage/health.jpeg"; // Path to image

import ToolsCalPrimary from "../components/ToolsCalPrimary";
import ToolsCalSecondary from "../components/ToolsCalSecondary";
import "../styles/InformationContainer.css"; // Path to CSS file

const healthWellbingPage = () => {
  return (
    <>
      <div className="main-container">
        <ToolsCalPrimary
          showButton={false}
          heading1={"Health & Wellness"}
          heading2={"Living Well with Diabetes is Possible"}
          paragraph={
            "Being diagnosed with diabetes isn't your defining characteristic.We provide the resources necessary to support you in leading a healthy and fulfilling life."
          }
          imagePath={healthImage}
          altText={"health image"}
          color={"#627073"}
        />
        <ToolsCalSecondary
          showButton={false}
          heading1={"Health & Wellness"}
          heading2={"Exercise"}
          paragraph={
            "Now is the Perfect Moment to Start Being Active.Regardless of your experience level, from beginner to seasoned athlete, incorporating regular exercise is a crucial aspect of managing diabetes."
          }
          imagePath={exerciseImage}
          altText={"exercise image"}
          bgcolor={"#008080"}
        />
        <div className="info-container">
          <h2>Exercise for Better Diabetes Control</h2>
          <p>
            Taking charge of your life is easier with regular exercise. If the
            thought of creating an exercise routine seems daunting, keep in mind
            that it's a crucial element in managing diabetes or pre-diabetes.
            Active lifestyles enhance insulin sensitivity, leading to more
            effective blood glucose control. Plus, exercise simply boosts your
            overall well-being. Whether it's regular neighbourhood walks,
            jogging, or training for a marathon, the key is to begin.
          </p>

          <h2>Starting Your Exercise Journey Safely</h2>
          <p>
            Your current fitness level doesn't matter. Even if you've never been
            to a gym, the important thing is to start moving now. Consult your
            doctor if you have health concerns or have been inactive, and begin
            at a comfortable pace.
          </p>

          <h2>Start with Simple Steps</h2>
          <p>
            Beginning with light walks is an excellent way to start, whether
            it's with a companion, a pet, or alone while enjoying an audio book
            or music.
          </p>

          <h2>Every Small Step Counts</h2>
          <p>
            If starting an active lifestyle seems overwhelming, remember that
            every small step helps in managing diabetes. Even a modest weight
            loss of 10-15 pounds can have a substantial positive impact on your
            health. You have the power to make a change, so start your journey
            towards a more active life today.
          </p>
        </div>
      </div>
    </>
  );
};

export default healthWellbingPage;
