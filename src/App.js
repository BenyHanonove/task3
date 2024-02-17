import React, { useEffect, useState } from "react";
import "./App.css";

// Import Components
import Register from "./components/register/register";
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import SystemAdmin from "./components/systemAdmin/system-admin";
import { loadUser, loginAsAdmin } from "./utils/storageHandler";

function App() {
  const [user, setUser] = useState(null);
  const [isBusy, setBusy] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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

  // Render a loading state if isBusy is true
  if (isBusy) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Login />
      <Register />
      {user && !isAdmin && (
        <Profile userData={user} updateUser={updateUserProfile} />
      )}
      {isAdmin && <SystemAdmin />}
    </div>
  );
}

export default App;
