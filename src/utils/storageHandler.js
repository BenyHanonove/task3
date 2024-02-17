const arrayKey = "users";
const connectionKey = "loggedInUser";

const saveUsers = async (users) => {
  const usersWithImageData = await Promise.all(
    users.map(async (user) => {
      if (user.image instanceof File) {
        const reader = new FileReader();
        const imagePromise = new Promise((resolve) => {
          reader.onload = () => {
            user.image = reader.result;
            resolve(user);
          };
        });

        reader.readAsDataURL(user.image);
        await imagePromise;
      }
      return user;
    })
  );

  localStorage.setItem(arrayKey, JSON.stringify(usersWithImageData));
};

export const loadUsers = () => {
  try {
    const usersFromLocalStorage = JSON.parse(localStorage.getItem(arrayKey));
    const usersArray = Array.isArray(usersFromLocalStorage)
      ? usersFromLocalStorage
      : [];
    return usersArray;
  } catch (error) {
    console.error("Error loading users from local storage:", error);
    return [];
  }
};

export const loadUser = (email, password) => {
  const users = loadUsers();
  const matchedUser = users.find(
    (user) => user.email === email && user.password === password
  );
  return matchedUser || null;
};

const saveInSession = (savedEmail, savedPassword) => {
  const user = { email: savedEmail, password: savedPassword };
  sessionStorage.setItem(connectionKey, JSON.stringify(user));
};

export const registerUser = (user) => {
  delete user.verify;
  const currentUser = loadUsers();
  currentUser.push(user);
  saveUsers(currentUser);
  return true;
};

export const loginUser = (email, password) => {
  const users = loadUsers();
  for (const user of users) {
    if (user.email === email && user.password === password) {
      saveInSession(email, password);
      return true;
    }
  }
  return false;
};

export const logoutUser = () => {
  sessionStorage.removeItem(connectionKey);
  return true;
};

export const deleteUser = (user) => {
  const users = loadUsers();
  const updatedUsers = [];
  let userDeleted = false;
  for (const currentUser of users) {
    if (!userDeleted && currentUser.email === user.email) {
      userDeleted = true;
      continue; // Skip this user, effectively deleting it
    }
    updatedUsers.push(currentUser);
  }
  saveUsers(updatedUsers);
};

export const updateUser = async (updatedUser) => {
  await deleteUser(updatedUser);
  await registerUser(updatedUser);
};

export const loginAsAdmin = (email, password) => {
  const admin = { email: "admin", password: "1" };
  if (admin.email === email) {
    if (admin.password === password) {
      saveInSession(email, password);
      return true;
    }
  }
  return false;
};
