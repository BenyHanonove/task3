import React from "react";
import "./base-button.css";

export default function BaseButton({ text, clickHandler }) {
  return (
    <div className="btn-container">
      <button className="base-button" onClick={clickHandler}>
        {text}
      </button>
    </div>
  );
}
