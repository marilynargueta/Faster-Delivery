import { API_BASE_URL } from "../api/apiBase";
import type { CategoryPayload, CategoryResponse } from "../models/category";

const LOCAL_CATEGORIES_KEY = "local-categories";

function getLocalCategories(): CategoryResponse[] {
  try {
    const saved = localStorage.getItem(LOCAL_CATEGORIES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveLocalCategory(category: CategoryResponse) {
  try {
    const current = getLocalCategories();
    const exists = current.some((c) => c.id === category.id);
    if (!exists) {
      localStorage.setItem(
        LOCAL_CATEGORIES_KEY,
        JSON.stringify([...current, category]),
      );
    }
  } catch (error) {
    console.log("Error al guardar la categoria local", error);
  }
}

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

  const created: CategoryResponse = await response.json();
  saveLocalCategory(created);
  return created;
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

  const apiCategories: CategoryResponse[] = await response.json();
  const localCategories = getLocalCategories().filter(
    (local) => !apiCategories.some((api) => api.id === local.id),
  );

  return [...apiCategories, ...localCategories];
}