import React from "react";

export default function AutoCompleteInput({
  label,
  hintText,
  value,
  setValue,
}) {
  return (
    <div className="flex-item">
      <p>{label}</p>
      <input
        style={{ width: "180px" }}
        value={value}
        placeholder={hintText}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
}
