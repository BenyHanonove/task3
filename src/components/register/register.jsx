import React, { useState } from "react";
import "./register.css";

//Components for form
import TextInput from "../inputs/textInput/text-input.jsx";
import BaseButton from "../buttons/baseButton/base-button.jsx";
import PasswordInput from "../inputs/passwordInput/password-input.jsx";
import ImageInput from "../inputs/imageInput/image-input.jsx";
import AutoCompleteInput from "../inputs/autoCompleteInput/auto-complete-input.jsx";
import HebrewTextInput from "../inputs/hebrewTextInput/hebrew-text-input.jsx";
import NumberInput from "../inputs/numberInput/number-input.jsx";
import DateInput from "../inputs/dateInput/date-input.jsx";

//Function to handel the validation for complex tasks
import { ValidateRegisterForm } from "../../utils/formValidation.js";
import { registerUser } from "../../utils/storageHandler.js";

export default function Register() {
  //State to handel the data inside the form
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    verify: "",
    image: null,
    firstName: "",
    lastName: "",
    email: "",
    birthday: new Date(),
    city: "",
    street: "",
    number: "",
  });

  //State to display error message when the form is invalid
  const [errorMessage, setErrorMessage] = useState("");

  //Function to handel the state of the form data
  const registerDataUpdate = (prop, value) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [prop]: value,
    }));
  };

  //Function to handel the submit of register form
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const formCheck = ValidateRegisterForm(registerData);
    if (formCheck !== null) {
      setErrorMessage(formCheck);
    } else {
      await registerUser(registerData);
      window.location.reload();
    }
  };

  return (
    <div className="form-container">
      <form className="register-form">
        {errorMessage ? (
          <div className="error-div">
            <h3 className="error-text">{errorMessage}</h3>
          </div>
        ) : null}

        <ImageInput
          setValue={(value) => {
            registerDataUpdate("image", value);
          }}
        />
        <h2 className="form-header">Register</h2>

        <TextInput
          label="Username"
          hintText="Enter Username..."
          value={registerData.username}
          setValue={(value) => {
            registerDataUpdate("username", value);
          }}
        />
        <TextInput
          label="Email"
          hintText="Enter Email address..."
          value={registerData.email}
          setValue={(value) => {
            registerDataUpdate("email", value);
          }}
        />
        <TextInput
          label="First Name"
          hintText="Enter First Name..."
          onlyLetters={true}
          value={registerData.firstName}
          setValue={(value) => {
            registerDataUpdate("firstName", value);
          }}
        />
        <TextInput
          label="Last Name"
          hintText="Enter Last Name..."
          onlyLetters={true}
          value={registerData.lastName}
          setValue={(value) => {
            registerDataUpdate("lastName", value);
          }}
        />
        <PasswordInput
          label="Password"
          hintText="Enter Password..."
          value={registerData.password}
          setValue={(value) => {
            registerDataUpdate("password", value);
          }}
        />
        <PasswordInput
          label="Verify Password"
          hintText="Enter Password again..."
          value={registerData.verify}
          setValue={(value) => {
            registerDataUpdate("verify", value);
          }}
        />
        <DateInput
          label="Enter Birthday"
          value={registerData.birthday}
          setValue={(value) => {
            registerDataUpdate("birthday", value);
          }}
        />
        <AutoCompleteInput
          label="Enter City"
          hintText="Enter City name ..."
          value={registerData.city}
          setValue={(value) => {
            registerDataUpdate("city", value);
          }}
        />
        <HebrewTextInput
          label="Street Name"
          hintText="Enter street name in hebrew"
          value={registerData.street}
          setValue={(value) => {
            registerDataUpdate("street", value);
          }}
        />
        <NumberInput
          label="House Number"
          hintText="Enter House Number..."
          value={registerData.number}
          setValue={(value) => {
            registerDataUpdate("number", value);
          }}
        />
        <BaseButton
          text="Register"
          clickHandler={(event) => formSubmitHandler(event)}
        />
      </form>
    </div>
  );
}
