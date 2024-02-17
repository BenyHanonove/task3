import React, { useState } from "react";
import "./login.css";

//Import Components
import PasswordInput from "../inputs/passwordInput/password-input.jsx";
import TextInput from "../inputs/textInput/text-input.jsx";
import BaseButton from "../buttons/baseButton/base-button.jsx";

//Import logic
import { loginAsAdmin, loginUser } from "../../utils/storageHandler";

export default function Login({ setAdmin }) {
  //State to collect information from the login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  //State to display error message when the form is invalid
  const [errorMessage, setErrorMessage] = useState("");

  //Function to handel the state of the form data
  const loginDataUpdate = (prop, value) => {
    setLoginData((prevData) => ({
      ...prevData,
      [prop]: value,
    }));
  };

  const handelLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const admin = loginAsAdmin(loginData.email, loginData.password);

    if (admin) {
      window.location.reload();
      return;
    }

    const login = await loginUser(loginData.email, loginData.password);
    if (login) {
      window.location.reload();
    } else {
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <div>
        <h2 className="form-header">Login</h2>
        <form className="login-form">
          {errorMessage ? (
            <div className="error-div">
              <p className="error-text">{errorMessage}</p>
            </div>
          ) : null}
          <TextInput
            label="Email"
            hintText="Enter Email address..."
            value={loginData.email}
            setValue={(value) => {
              loginDataUpdate("email", value);
            }}
          />
          <PasswordInput
            label="Password"
            hintText="Enter Password..."
            value={loginData.password}
            setValue={(value) => {
              loginDataUpdate("password", value);
            }}
          />

          <BaseButton text="Login" clickHandler={handelLogin} />
        </form>
      </div>
    </div>
  );
}
