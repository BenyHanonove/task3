import React from "react";
import "./profile-button.css";

export default function ProfileButton({ text, clickHandler, ButtonColor }) {
  return (
    <button
      className="profile-button"
      onClick={clickHandler}
      style={{ background: ButtonColor }}
    >
      {text}
    </button>
  );
}
