import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import "./password-input.css";

export default function PasswordInput({ label, hintText, value, setValue }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex-item">
      <p>{label}</p>
      <div style={{ position: "relative" }}>
        <input
          style={{ width: "180px" }}
          value={value}
          type={showPassword ? "text" : "password"}
          placeholder={hintText}
          onChange={handleChange}
        />
        {value && (
          <button
            className="password-button "
            type="button"
            onClick={toggleShowPassword}
            style={{}}
          >
            {showPassword ? (
              <MdVisibilityOff className="password-icon" />
            ) : (
              <MdVisibility className="password-icon" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
