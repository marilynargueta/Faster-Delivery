import { API_BASE_URL } from "../api/apiBase";
import type { LoginPayload } from "../models/login";

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