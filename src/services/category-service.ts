import { API_BASE_URL } from "../api/apiBase";
import type { CategoryPayload, CategoryResponse } from "../models/category";


export async function createCategory(
  payload: CategoryPayload,
  token: string | null,
): Promise<CategoryResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/categories/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  console.log(response);

  if (!response.ok) {
    let message = "Error al crear la categoria";
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

export async function getCategories(
  token: string | null,
): Promise<CategoryResponse[]> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    let message = "Error al obtenner las categorias";
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