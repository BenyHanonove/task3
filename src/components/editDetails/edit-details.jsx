import React, { useState } from "react";
import "./edit-details.css";

// Components for form inputs
import TextInput from "../inputs/textInput/text-input.jsx";
import ImageInput from "../inputs/imageInput/image-input.jsx";
import AutoCompleteInput from "../inputs/autoCompleteInput/auto-complete-input.jsx";
import HebrewTextInput from "../inputs/hebrewTextInput/hebrew-text-input.jsx";
import NumberInput from "../inputs/numberInput/number-input.jsx";
import DateInput from "../inputs/dateInput/date-input.jsx";

// Function to handle user update
import { updateUser } from "../../utils/storageHandler.js";
import BaseButton from "../buttons/baseButton/base-button.jsx";

export default function EditDetails({ userData }) {
  // State to handle edited user data
  const [editedUserData, setEditedUserData] = useState(userData);

  // Function to handle data update for edited user
  const handleUserDataUpdate = (prop, value) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      [prop]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUser(editedUserData);
    window.location.reload();
  };

  return (
    <div className="form-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2 className="form-header">Edit Profile</h2>
        {/* Load user data into form inputs */}
        <ImageInput
          preImage={editedUserData.image}
          setValue={(value) => handleUserDataUpdate("image", value)}
        />
        <TextInput
          label="Username"
          value={editedUserData.username}
          setValue={(value) => handleUserDataUpdate("username", value)}
        />
        <TextInput
          label="First Name"
          value={editedUserData.firstName}
          setValue={(value) => handleUserDataUpdate("firstName", value)}
        />
        <TextInput
          label="Last Name"
          value={editedUserData.lastName}
          setValue={(value) => handleUserDataUpdate("lastName", value)}
        />
        <DateInput
          label="Enter Birthday"
          value={editedUserData.birthday}
          setValue={(value) => handleUserDataUpdate("birthday", value)}
        />
        <AutoCompleteInput
          label="Enter City"
          value={editedUserData.city}
          setValue={(value) => handleUserDataUpdate("city", value)}
        />
        <HebrewTextInput
          label="Street Name"
          value={editedUserData.street}
          setValue={(value) => handleUserDataUpdate("street", value)}
        />
        <NumberInput
          label="House Number"
          value={editedUserData.number}
          setValue={(value) => handleUserDataUpdate("number", value)}
        />
        <BaseButton
          text="Save Changes"
          clickHandler={(event) => handleSubmit(event)}
        />{" "}
      </form>
    </div>
  );
}
