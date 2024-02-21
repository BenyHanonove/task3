import React, { useState } from "react";
import "./switch.css";

const Switch = ({ leftText, rightText, onToggle }) => {
  const [isLeft, setIsLeft] = useState(true);

  const toggleSwitch = () => {
    setIsLeft(!isLeft);
    onToggle(!isLeft);
  };

  return (
    <div className="switch-container" onClick={toggleSwitch}>
      <div className="switch">
        <div className={` ${isLeft ? "switch-on" : "switch-off"}`}>
          {leftText}
        </div>
        <div className={` ${isLeft ? "switch-off" : "switch-on"}`}>
          {rightText}
        </div>
      </div>
    </div>
  );
};

export default Switch;
