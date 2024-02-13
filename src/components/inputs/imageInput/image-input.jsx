import React, { useRef, useState } from "react";
import "./image-input.css";

export default function ImageInput({ setValue }) {
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["jpg", "jpeg"];

    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        alert("Invalid file format. Please upload a JPG or JPEG file.");
        event.target.value = "";
        return;
      }
      const imageUrl = URL.createObjectURL(file); // Create URL for preview
      setPreviewUrl(imageUrl);
      setValue(file);
    }
  };

  const handleLabelClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-input-container">
      <div className="image-preview-container">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="preview-image"
          />
        ) : (
          <div className="default-profile-image" onClick={handleLabelClick}>
            <p>Profile Image</p>
          </div>
        )}
      </div>
      <input
        type="file"
        id="image-upload"
        onChange={handleFileChange}
        accept=".jpg,.jpeg"
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}
