import type { UserResponse } from "../models/user";


// GRABAR LA INFORMACIÓN
const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

export function saveAuth(token: string, user: UserResponse, remember: boolean) {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  storage.setItem(USER_KEY, JSON.stringify(user));
}

//TRAER LA INFORMACIÓN
export function getAuth() {
  const token = localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
  const rawUser = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);

  if (!token || !rawUser) {
    return null;
  }

  try {
    const user = JSON.parse(rawUser) as UserResponse;
    return { token, user };
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}