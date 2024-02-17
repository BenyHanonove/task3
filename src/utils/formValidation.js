const validateUsername = (username) => {
  // Check if the length of the username is between 3 and 60 characters
  if (username.length < 3 || username.length > 60) {
    return "Username has to be between 3 to 60 characters.";
  }

  // Regular expression to match only English letters, numbers, and special characters
  const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=,./<>?;':"[\]{}|\\`~]+$/;

  // Check if the username matches the regular expression
  if (!regex.test(username)) {
    return "User name can only contain English letters, numbers, and special characters.";
  }

  // Check if the username is "admin"
  if (username.toLowerCase() === "admin") {
    return "Username cannot be admin";
  }

  // If the username passes all validation checks, return null
  return null;
};

const validatePassword = (password) => {
  // Check if the length of the password is between 7 and 12 characters
  if (password.length < 7 || password.length > 12) {
    return "Password must be between 7 and 12 characters long.";
  }

  // Regular expressions to check for special characters, uppercase letters, and numbers
  const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;

  // Check if the password contains at least one special character, one uppercase letter, and one number
  if (
    !specialCharRegex.test(password) ||
    !uppercaseRegex.test(password) ||
    !numberRegex.test(password)
  ) {
    return "Password must contain at least one special character, one uppercase letter, and one number.";
  }

  // If the password passes all validation checks, return null
  return null;
};

const validateEmail = (email) => {
  // Regular expression for email validation with .com domain only
  const regex = /^[^\s@]+@[^\s@]+\.(?:com)$/i;

  // Check if the email matches the regular expression
  if (!regex.test(email)) {
    return "Invalid email format. Please enter a valid email address with .com domain.";
  }

  // If the email is valid, return null (indicating no error)
  return null;
};

const validateBirthday = (birthday) => {
  // Calculate the current date
  const currentDate = new Date();

  // Convert the birthday string to a Date object
  const birthdayDate = new Date(birthday);

  // Calculate the difference in years between the current date and the birthday
  const ageDifference = currentDate.getFullYear() - birthdayDate.getFullYear();

  // Check if the user is over 8 years old
  if (ageDifference < 8) {
    return "You must be at least 8 years old to register.";
  }

  // If the user is over 8 years old, return null (indicating no error)
  return null;
};

export const ValidateRegisterForm = (registerData) => {
  //Checks if a image is selected
  if (!registerData.image) {
    return "Please select a profile image.";
  }

  // Check if the username the user inserted is valid
  const usernameCheck = validateUsername(registerData.username);
  if (usernameCheck !== null) {
    return usernameCheck;
  }

  // Check if the email the user inserted is valid
  const emailCheck = validateEmail(registerData.email);
  if (emailCheck !== null) {
    return emailCheck;
  }

  // Check if the length of the first name is between 3 and 60 characters
  if (registerData.firstName.length < 3 || registerData.firstName.length > 60) {
    return "First name must be between 3 and 60 characters long.";
  }

  // Check if the length of the first name is between 3 and 60 characters
  if (registerData.lastName.length < 3 || registerData.lastName.length > 60) {
    return "Last name must be between 3 and 60 characters long.";
  }

  // Check if the password the user inserted is valid
  const passwordCheck = validatePassword(registerData.password);
  if (passwordCheck !== null) {
    return passwordCheck;
  }

  // Check if the passwords match
  if (registerData.password !== registerData.verify) {
    return "The passwords do not match. Please make sure to enter the same password in both fields.";
  }

  // Check if the birthday the user inserted is valid
  const birthdayCheck = validateBirthday(registerData.birthday);
  if (birthdayCheck !== null) {
    return birthdayCheck;
  }

  // Check if there is text in the city name
  if (registerData.city.length < 2) {
    return "City name must be at least 2 characters long.";
  }
  // Check if there is text in the street name
  if (registerData.street.length < 2) {
    return "Street name must be at least 2 characters long in Hebrew.";
  }

  // Check if there is a valid number inside house number
  if (registerData.number.length < 1) {
    return "Please insert house number.";
  }

  return null;
};
