import React, { useEffect, useState } from "react";
import "./App.css";

// Import Components
import Register from "./components/register/register";
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import SystemAdmin from "./components/systemAdmin/system-admin";
import Switch from "./components/buttons/switch/switch";

//Import logic
import { loadUser, loginAsAdmin } from "./utils/storageHandler";

function App() {
  const [user, setUser] = useState(null);
  const [isBusy, setBusy] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegisterMode, setRegisterMode] = useState(false); // State to track register mode

  const updateUserProfile = (updatedUserData) => {
    setUser(updatedUserData);
  };

  useEffect(() => {
    const userDataString = sessionStorage.getItem("loggedInUser");
    if (userDataString) {
      const { email, password } = JSON.parse(userDataString);
      const admin = loginAsAdmin(email, password);
      if (admin) {
        setIsAdmin(true);
      }

      const userData = loadUser(email, password);
      setUser(userData);
    }
    setBusy(false);
  }, []);

  // Function to handle toggle event from Switch component
  const handleSwitchToggle = (isLeft) => {
    setRegisterMode(!isLeft);
  };

  // Render a loading state if isBusy is true
  if (isBusy) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Switch
        leftText={"Login"}
        rightText={"Register"}
        onToggle={handleSwitchToggle}
      />

      <div className="auth-container">
        {isRegisterMode ? <Register /> : <Login />}
      </div>

      <div className="user-container">
        {user && !isAdmin && (
          <Profile userData={user} updateUser={updateUserProfile} />
        )}
        {isAdmin && <SystemAdmin />}
      </div>
    </div>
  );
}

export default App;
