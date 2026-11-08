import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import type { ProductPayload } from "../models/product";
import { createProduct } from "../services/product-service";
import { getCategories } from "../services/category-service";
import type { CategoryResponse } from "../models/category";
import type { ProductResponse } from "../models/product";
import { getProductsByCategoryId } from "../services/product-service";
import { getInputError, hasErrors } from "../core/validators";
import type { FieldRule } from "../core/validators";

export interface ProductFormState {
  name: string;
  categoryId: string | number;
  sku: string;
  description: string;
  regularPrice: string;
  offerPrice: string;
  initialStock: string;
  minStockAlert: string;
}

export type ProductErrors = Partial<Record<keyof ProductFormState, string>>;

const initialFormState: ProductFormState = {
  name: "",
  categoryId: "",
  sku: "",
  description: "",
  regularPrice: "",
  offerPrice: "",
  initialStock: "",
  minStockAlert: "",
};

/** Qué tipo de caracteres acepta cada campo mientras se escribe */
const productRules: Record<keyof ProductFormState, FieldRule> = {
  name: "letters",
  categoryId: "free",
  sku: "digits",
  description: "free",
  regularPrice: "decimal",
  offerPrice: "decimal",
  initialStock: "digits",
  minStockAlert: "digits",
};

/** Validación completa antes de enviar el formulario */
function validateProduct(form: ProductFormState): ProductErrors {
  const errors: ProductErrors = {};

  const name = form.name.trim();
  if (!name) errors.name = "El nombre del producto es obligatorio";
  else if (name.length < 3) errors.name = "El nombre debe tener al menos 3 letras";
  else if (getInputError("letters", name)) errors.name = "El nombre solo acepta letras";

  if (!String(form.categoryId)) errors.categoryId = "Selecciona una categoría";

  const sku = form.sku.trim();
  if (!sku) errors.sku = "El código de barra es obligatorio";
  else if (!/^\d{8,13}$/.test(sku)) errors.sku = "El código de barra debe tener entre 8 y 13 números";

  const description = form.description.trim();
  if (!description) errors.description = "La descripción es obligatoria";
  else if (description.length < 10) errors.description = "La descripción debe tener al menos 10 caracteres";

  const regularPrice = parseFloat(form.regularPrice);
  const offerPrice = parseFloat(form.offerPrice);
  if (!form.regularPrice) errors.regularPrice = "El precio regular es obligatorio";
  else if (isNaN(regularPrice) || regularPrice <= 0) errors.regularPrice = "El precio regular debe ser mayor a 0";

  if (!form.offerPrice) errors.offerPrice = "El precio de oferta es obligatorio";
  else if (isNaN(offerPrice) || offerPrice <= 0) errors.offerPrice = "El precio de oferta debe ser mayor a 0";
  else if (!errors.regularPrice && offerPrice > regularPrice)
    errors.offerPrice = "El precio de oferta no puede ser mayor al precio regular";

  const initialStock = parseInt(form.initialStock, 10);
  const minStockAlert = parseInt(form.minStockAlert, 10);
  if (!form.initialStock) errors.initialStock = "El stock inicial es obligatorio";
  if (!form.minStockAlert) errors.minStockAlert = "El stock mínimo es obligatorio";
  else if (!errors.initialStock && minStockAlert > initialStock)
    errors.minStockAlert = "El stock mínimo no puede ser mayor al stock inicial";

  return errors;
}

export function useProductViewModel(categoryId?: number | string | null) {
  const { token } = useAuth();
  const [form, setForm] = useState(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<ProductErrors>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);

  const fetchProducts = useCallback(async () => {
    if (!categoryId) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const data = await getProductsByCategoryId(categoryId, token);
      setProducts(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al cargar los productos",
      );
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoadingCategories(true);
        const data = await getCategories(token);
        setCategories(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error al cargar categorias",
        );
      } finally {
        setIsLoadingCategories(false);
      }
    }

    fetchCategories();
  }, [token]);

  /** Bloquea los caracteres no permitidos y muestra el mensaje debajo del campo */
  const handleChange = (field: keyof ProductFormState, value: string) => {
    const inputError = getInputError(productRules[field], value);
    if (inputError) {
      setFieldErrors((prev) => ({ ...prev, [field]: inputError }));
      return;
    }
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSuccess("");

    /** VALIDAR TODOS LOS CAMPOS ANTES DE ENVIAR */
    const errors = validateProduct(form);
    setFieldErrors(errors);
    if (hasErrors(errors)) {
      setError("Revisa los campos marcados en rojo antes de guardar");
      return;
    }

    /**PARSEAR ALGUNOS DATOS DE PRECIOS */
    const payload: ProductPayload = {
      name: form.name.trim(),
      categoryId: String(form.categoryId),
      sku: form.sku.trim(),
      description: form.description.trim(),
      regularPrice: parseFloat(form.regularPrice),
      offerPrice: parseFloat(form.offerPrice),
      initialStock: parseInt(form.initialStock, 10),
      minStockAlert: parseInt(form.minStockAlert, 10),
    };

    try {
      setIsLoading(true);
      setError("");

      await createProduct(payload, token);
      setSuccess("Producto creado con éxito");
      setForm(initialFormState);
      setFieldErrors({});
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "No se pudo crear el producto",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleChange,
    submit,
    error,
    success,
    fieldErrors,
    isLoading,
    categories,
    isLoadingCategories,
    products,
    refetch: fetchProducts,
  };
}