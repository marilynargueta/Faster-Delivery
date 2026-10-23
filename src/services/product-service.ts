import type { ProductPayload } from "../models/product";
import { API_BASE_URL } from "../api/apiBase";

export async function createProduct(
  payload: ProductPayload,
  token: string | null,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/products/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  console.log(response);

  if (!response.ok) {
    let message = "Error al crear el producto";
    try {
      const err = await response.json();
      message = err?.message ?? message;
    } catch (error) {
      console.log("Error", error);
    }
    throw new Error(message);
  }
  return response.json();
}
