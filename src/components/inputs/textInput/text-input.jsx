import React from "react";

export default function TextInput({
  label,
  hintText,
  value,
  setValue,
  onlyLetters = false,
}) {
  const handleChange = (event) => {
    const value = event.target.value;
    // If onlyLetters prop is true, apply validation for letters only
    if (onlyLetters) {
      // Regular expression to allow only letters (a-z, A-Z), Hebrew characters, and spaces
      const regex = /^[a-zA-Z\u0590-\u05FF\s]*$/;
      // Check if the input value matches the regular expression
      if (regex.test(value)) {
        // If it matches, update the value using setValue
        setValue(value);
      }
    } else {
      // If onlyLetters prop is not true, update the value without validation
      setValue(value + "");
    }
  };

  return (
    <div className="flex-item">
      <p>{label}</p>
      <input
        style={{ width: "180px" }}
        value={value}
        placeholder={hintText}
        onChange={handleChange}
      />
    </div>
  );
}
