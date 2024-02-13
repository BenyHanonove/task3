import React from "react";

export default function NumberInput({ label, hintText, value, setValue }) {
  const handleChange = (event) => {
    const inputValue = parseInt(event.target.value);
    // Check if the input value is a valid number and greater than 0
    if (!isNaN(inputValue) && inputValue > 0) {
      // Update the value using setValue
      setValue(inputValue.toString());
    }
  };

  return (
    <div className="flex-item">
      <p>{label}</p>
      <input
        style={{ width: "180px" }}
        type="number"
        value={value}
        placeholder={hintText}
        onChange={handleChange}
      />
    </div>
  );
}
