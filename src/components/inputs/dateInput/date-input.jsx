import React from "react";
import "./date-input.css";

export default function DateInput({ label, value, setValue }) {
  return (
    <div className="flex-item">
      <p>{label}</p>
      <input
        className="date-input"
        type="date"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
}
