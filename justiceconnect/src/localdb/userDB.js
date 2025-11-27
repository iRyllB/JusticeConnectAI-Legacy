import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "LOCAL_USERS_DB";

// 📌 Fetch all users
export async function getAllUsers() {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// 📌 Save users
export async function saveUsers(users) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// 📌 Create user
export async function createLocalUser({ username, email, password }) {
  const users = await getAllUsers();

  // check if email already exists
  if (users.some((u) => u.email === email)) {
    throw new Error("Email already exists");
  }

  users.push({ username, email, password });
  await saveUsers(users);
}

// 📌 Login user
export async function loginLocalUser({ username, password }) {
  const users = await getAllUsers();

  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!found) {
    throw new Error("Invalid username or password");
  }

  return found;
}
