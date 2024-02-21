import React from "react";

export default function HebrewTextInput({ label, hintText, value, setValue }) {
  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Regular expression to allow only Hebrew characters
    const regex = /^[\u0590-\u05FF\s]*$/;
    // Check if the input value matches the regular expression
    if (regex.test(inputValue)) {
      // If it matches, update the value using setValue
      setValue(inputValue);
    }
  };

  return (
    <div className="flex-item">
      <p>{label}</p>
      <input
        className="flex-item"
        value={value}
        placeholder={hintText}
        onChange={handleChange}
      />
    </div>
  );
}
