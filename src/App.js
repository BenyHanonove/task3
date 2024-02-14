import React, { useEffect, useState } from "react";
import "./App.css";

// Import Components
import Register from "./components/register/register";
import Login from "./components/login/login";
import EditDetails from "./components/editDetails/edit-details";

function App() {
  const [user, setUser] = useState(null);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const userData = sessionStorage.getItem("loggedInUser");
    if (userData) {
      const parseUser = JSON.parse(userData);
      setUser(parseUser);
    }
    // Set isBusy to false after useEffect completes
    setBusy(false);
  }, []);

  // Render a loading state if isBusy is true
  if (isBusy) {
    return null;
  }

  return (
    <div className="App">
      {user === null ? (
        <div>
          <Login />
          <Register />
        </div>
      ) : (
        <EditDetails userData={user} />
      )}
    </div>
  );
}

export default App;
