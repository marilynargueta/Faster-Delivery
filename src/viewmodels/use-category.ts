import { useCallback, useState } from "react";
import { useAuth } from "../context/useAuth";
import type { CategoryPayload } from "../models/category";
import { createCategory } from "../services/category-service";
import { getCategories } from "../services/category-service";
import type { CategoryResponse } from "../models/category";
import { useEffect } from "react";



export function useCategoryViewModel(onSuccessCallback?: () => void) {
  const { token } = useAuth();

  const [form, setForm] = useState<CategoryPayload>({
    name: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  const handleChange = (field: keyof CategoryPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!form.name.trim()) {
      setError("El nombre de la categoria debe ser obligatorio");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      await createCategory(
        {
          name: form.name.trim(),
          description: form.description.trim(),
        },
        token,
      );
      setSuccess("Categoria creada con exito ");
      window.dispatchEvent(new Event("categories:changed"));
      setForm({ name: "", description: "" });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se puedo crear la categoria",
      );
    } finally {
      setIsLoading(false);
    }
  };

const fetchCategories = useCallback(async () => {
  if (!token) return;
  try {
    setIsLoading(true);
    setError("");
    const data = await getCategories(token);
    setCategories(data);
  } catch (error) {
    setError(
      error instanceof Error ? error.message : "Error al cargar la data",
    );
  } finally {
    setIsLoading(false);
  }
}, [token]);

useEffect(() => {
  fetchCategories();
}, [fetchCategories]);

  return {
    form,
    handleChange,
    submit,
    isLoading,
    error,
    success,
    categories,
    refreshCategories:fetchCategories
  }
}

export function useCategoriesList() {
    const { token } = useAuth()
    const [categories, setCategories] = useState<CategoryResponse[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const fetchCategories = useCallback(async () => {
        try {
            setIsLoading(true)
            setError("")
            const data = await getCategories(token)
            setCategories(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al obtener las categorias")
        } finally {
            setIsLoading(false)
        }
    }, [token])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories])

    useEffect(() => {
        window.addEventListener("categories:changed", fetchCategories)
        return () => window.removeEventListener("categories:changed", fetchCategories)
    }, [fetchCategories])

    return {
        categories,
        isLoading,
        error,
        refetch: fetchCategories
    }
}