import { useState } from "react";
import type { FormEvent } from "react";
import type { LoginPayload } from "../models/login";
import { loginUser } from "../services/loginService";
import { useAuth } from "../context/useAuth";

export function useLoginViewModel() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof LoginPayload, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Completa todos los campos");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(form);
      login(response, true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    error,
    handleChange,
    submit,
  };
}