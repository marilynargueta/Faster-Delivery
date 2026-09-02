import { API_BASE_URL } from "../api/apiBase";
import type { RegisterPayload } from "../models/register";

export async function registerUser(payload: RegisterPayload) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        lastname: payload.lastName,
        phone: payload.phone,
        email: payload.email,
        password: payload.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message ?? error.Message ?? "Error a registrar usuario");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}