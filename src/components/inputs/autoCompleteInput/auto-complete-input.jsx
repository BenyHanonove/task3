import React, { useState } from "react";
import "./auto-complete-input.css";

export default function AutoCompleteInput({
  label,
  hintText,
  value,
  setValue,
  options,
}) {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    // Filter options based on input value
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered.slice(0, 3)); // Limit to max 4 options
  };

  const handleOptionClick = (option) => {
    setValue(option);
    setFilteredOptions([]);
  };

  return (
    <div className="flex-item">
      <p>{label}</p>
      <input
        className="autocomplete-input"
        value={value}
        placeholder={hintText}
        onChange={handleInputChange}
      />
      {value.length > 0 && filteredOptions.length > 0 && (
        <div className="autocomplete-options-container">
          {filteredOptions.map((option, index) => (
            <div
              className="autocomplete-option-container"
              key={`${index} city`}
            >
              <p
                className="autocomplete-option"
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
