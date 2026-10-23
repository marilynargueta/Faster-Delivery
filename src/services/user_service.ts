import { API_BASE_URL } from "../api/apiBase";
import type { LoginPayload, UserRequest } from "../models/user";

export async function loginUser(payload: LoginPayload) {
  let message = "Error al iniciar sesión";
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      message = error.Message ?? error.message ?? message;
      console.log(error);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error(message);
  }
}

export async function udpateUserProfile(
  userId: number,
  payload: UserRequest,
  token: string | null
) {
  console.log("TOKEN", token);
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("lastname", payload.lastName);
  formData.append("phone", payload.phone);
  const headerToken = token?.startsWith("Bearer ") ? token : `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}/users/upload/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: headerToken,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Error al actualizar usuario");
  }
  return response.json();
}

