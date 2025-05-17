import React from "react";
import { Typewriter } from "react-simple-typewriter";
// import "../AnimatedIntro.css";
import "../App.css";

const AnimatedIntro = () => {
  return (
    <div className="intro-container">
      <h1 className="intro-title">🥗 Nutrition Help</h1>
      <h2 className="typewriter-text">
        <Typewriter
          words={[
            "Eat Clean 🌱",
            "Stay Healthy 💪",
            "Balance is Key ⚖️",
            "Fuel Your Body 🍎",
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </h2>
    </div>
  );
};

export default AnimatedIntro;

