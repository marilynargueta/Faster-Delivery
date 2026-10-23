import { useState } from "react";
import type { FormEvent } from "react";
import type { RegisterPayload } from "../models/register";
import { registerUser } from "../services/registerService";

export function useRegisterViewModel() {
  const [form, setForm] = useState<RegisterPayload>({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof RegisterPayload, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = (): string => {
    if (!form.name || !form.lastName || !form.phone || !form.email || !form.password) {
      return "Completa todos los campos";
    }
    if (form.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    if (form.password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }
    return "";
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const validationMessage = validate();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser(form);
      console.log(response);
      setSuccess("Usuario registrado correctamente");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al registrar");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    error,
    success,
    handleChange,
    submit,
  };
}