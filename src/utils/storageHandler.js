//Const to handle the storage
const arrayKey = "users";
const connectionKey = "loggedInUser";

//Const to handel the admin data
const admin = { email: "admin", password: "1" };

//Function to save users array inside local storage
const saveUsers = async (users) => {
  // Process each user in the array concurrently
  const usersWithImageData = await Promise.all(
    users.map(async (user) => {
      // Check if the image property of the user is a File object
      if (user.image instanceof File) {
        // If it's a File object, create a new FileReader instance
        const reader = new FileReader();

        // Create a promise to resolve once the FileReader has loaded the image
        const imagePromise = new Promise((resolve) => {
          // Set up an onload event listener for the FileReader
          reader.onload = () => {
            // Once the image is loaded, set the image property of the user to the base64 data URL
            user.image = reader.result;
            // Resolve the promise with the modified user object
            resolve(user);
          };
        });

        // Read the contents of the File object as a data URL
        reader.readAsDataURL(user.image);

        // Wait for the imagePromise to resolve before continuing to the next user
        await imagePromise;
      }
      // Return the user object, whether it has been modified or not
      return user;
    })
  );

  // Store the array of users with image data in the local storage
  localStorage.setItem(arrayKey, JSON.stringify(usersWithImageData));
};

//Function to load the users array from local storage
export const loadUsers = () => {
  try {
    // Attempt to retrieve the users data from local storage and parse it as JSON
    const usersFromLocalStorage = JSON.parse(localStorage.getItem(arrayKey));

    // Check if the parsed data is an array, if not, initialize an empty array
    const usersArray = Array.isArray(usersFromLocalStorage)
      ? usersFromLocalStorage
      : [];

    // Return the array of users
    return usersArray;
  } catch (error) {
    // If an error occurs during parsing or retrieval, log the error and return an empty array
    console.error("Error loading users from local storage:", error);
    return [];
  }
};

//Function to load one user from local storage
export const loadUser = (email, password) => {
  // Load the array of users from local storage
  const users = loadUsers();

  // Find a user in the array whose email and password match the provided parameters
  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  // If a matching user is found, return it, otherwise return null
  return matchedUser || null;
};

//Function to save email and password in the session storage
const saveInSession = (savedEmail, savedPassword) => {
  // Create a user object with the provided email and password
  const user = { email: savedEmail, password: savedPassword };

  // Convert the user object to a JSON string and store it in session storage
  sessionStorage.setItem(connectionKey, JSON.stringify(user));
};

//Function to register user
export const registerUser = (user) => {
  // Remove the 'verify' property from the user object
  delete user.verify;

  // Convert the email to lowercase
  user.email = user.email.toLowerCase();

  // Load the current list of users
  const currentUser = loadUsers();

  // Add the new user to the list of current users
  currentUser.push(user);

  // Save the updated list of users
  saveUsers(currentUser);

  // Return true to indicate successful registration
  return true;
};

//Function to login user
export const loginUser = (email, password) => {
  // Load the array of users from local storage
  const users = loadUsers();

  // Iterate through each user in the array
  for (const user of users) {
    // Check if the user's email and password match the provided credentials
    if (user.email === email && user.password === password) {
      // If the credentials match, save the user's email and password in session storage
      saveInSession(email, password);
      // Return true to indicate successful login
      return true;
    }
  }

  // If no matching user is found, return false
  return false;
};

//Function to logout user base session storage
export const logoutUser = () => {
  // Remove the user's session data from session storage
  sessionStorage.removeItem(connectionKey);

  // Return true to indicate successful logout
  return true;
};

//Function to delete one user from local storage users array
export const deleteUser = (user) => {
  // Load the array of users from local storage
  const users = loadUsers();

  // Initialize an empty array to store updated user list after deletion
  const updatedUsers = [];

  // Initialize a flag to track if the user has been deleted
  let userDeleted = false;

  // Iterate through each user in the array
  for (const currentUser of users) {
    // Check if the current user matches the user to be deleted and the user hasn't been deleted yet
    if (!userDeleted && currentUser.email === user.email) {
      // If the user is found, mark as deleted and continue to the next user
      userDeleted = true;
      continue;
    }
    // If the user is not the one to be deleted or if it's already deleted, add it to the updated user list
    updatedUsers.push(currentUser);
  }

  // Save the updated user list
  saveUsers(updatedUsers);
};

//Function to update user data inside local storage
export const updateUser = async (updatedUser) => {
  // Load the array of users from local storage
  const users = loadUsers();

  // Find the index of the user to be updated
  const index = users.findIndex((user) => user.email === updatedUser.email);

  // If the user is found
  if (index !== -1) {
    // Update the user's information
    users[index] = updatedUser;

    // Save the updated list of users
    saveUsers(users);
  }
};

//Function to check if the login is admin
export const loginAsAdmin = (email, password) => {
  // Check if the provided email matches the admin's email
  if (admin.email === email) {
    // If the email matches, check if the provided password matches the admin's password
    if (admin.password === password) {
      // If both email and password match, save the admin's email and password in session storage
      saveInSession(email, password);
      // Return true to indicate successful login as admin
      return true;
    }
  }
  // If either the email or password doesn't match, return false
  return false;
};
