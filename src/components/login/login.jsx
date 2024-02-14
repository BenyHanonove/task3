import React, { useState } from "react";
import "./login.css";

//Import Components
import PasswordInput from "../inputs/passwordInput/password-input.jsx";
import TextInput from "../inputs/textInput/text-input.jsx";
import BaseButton from "../buttons/baseButton/base-button.jsx";

//Import logic
import { loginUser } from "../../utils/storageHandler";

export default function Login() {
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
    const login = await loginUser(loginData.email, loginData.password);
    console.log(login);
    if (login) {
      window.location.reload();
    } else {
      alert("bad");
    }
  };

  return (
    <div className="form-container">
      <form className="login-form">
        {errorMessage ? (
          <div className="error-div">
            <h3 className="error-text">{errorMessage}</h3>
          </div>
        ) : null}
        <h2 className="form-header">Login</h2>
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
  );
}
