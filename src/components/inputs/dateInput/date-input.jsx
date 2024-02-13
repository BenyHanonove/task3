import React from "react";

export default function DateInput({ label, value, setValue }) {
  return (
    <div className="flex-item">
      <p>{label}</p>
      <input
        style={{ width: "180px" }}
        type="date"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
}
