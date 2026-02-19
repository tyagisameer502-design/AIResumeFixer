import AsyncStorage from "@react-native-async-storage/async-storage";

// Keys
const USERS_KEY = "USERS";
const SESSION_KEY = "SESSION_USER";

// Helpers
async function getUsers() {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function saveUsers(users) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ✅ SESSION
export async function getSessionUser() {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function setSessionUser(user) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

// ✅ SIGNUP (store user)
export async function registerUser({ name, email, password }) {
  const users = await getUsers();

  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("Email already exists");

  const newUser = {
    id: String(Date.now()),
    name,
    email,
    password, // later we will hash this
    createdAt: new Date().toISOString(),
  };

  const updated = [newUser, ...users];
  await saveUsers(updated);

  return newUser;
}

// ✅ LOGIN
export async function loginUser({ email, password }) {
  const users = await getUsers();

  const found = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!found) throw new Error("Invalid credentials");

  await setSessionUser(found);
  return found;
}

// ✅ UPDATE PROFILE (EditProfile)
export async function updateProfile({ name }) {
  const session = await getSessionUser();
  if (!session) throw new Error("Not logged in");

  const users = await getUsers();

  const updatedUsers = users.map((u) =>
    u.id === session.id ? { ...u, name } : u
  );

  const updatedSession = { ...session, name };

  await saveUsers(updatedUsers);
  await setSessionUser(updatedSession);

  return updatedSession;
}

// ✅ LOGOUT
export async function logoutUser() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
