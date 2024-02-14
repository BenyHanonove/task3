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

export const loadUsers = async () => {
  const usersFromLocalStorage = JSON.parse(localStorage.getItem(arrayKey));
  if (usersFromLocalStorage) {
    return usersFromLocalStorage;
  } else {
    return [];
  }
};

export const registerUser = async (user) => {
  const currentUser = await loadUsers();
  currentUser.push(user);
  await saveUsers(currentUser);
  return true;
};

export const loginUser = async (email, password) => {
  const users = await loadUsers();
  for (const user of users) {
    if (user.email === email && user.password === password) {
      sessionStorage.setItem(connectionKey, JSON.stringify(user));
      return true;
    }
  }
  return false;
};

export const logoutUser = async () => {
  sessionStorage.removeItem(connectionKey);
  return true;
};

export const deleteUser = async (user) => {
  const users = await loadUsers();
  const updatedUsers = [];
  for (const currentUser of users) {
    if (currentUser.email !== user.email) {
      updatedUsers.push(currentUser);
    }
  }
  await saveUsers(updatedUsers);
};

export const updateUser = async (updatedUser) => {
  await deleteUser(updatedUser);
  await registerUser(updatedUser);
  await loginUser(updatedUser.email, updatedUser.password);
};
