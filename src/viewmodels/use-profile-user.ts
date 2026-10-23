import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { udpateUserProfile } from "../services/user_service";
import type { UserRequest } from "../models/user";

export function useProfileViewModel() {
  const { user, updateUser, token } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const submit = async () => {
    if (!user?.id) {
      setError("No hay usuario logueado");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      const payload: UserRequest = {
        name: form.name,
        lastName: form.lastName,
        phone: form.phone,
      };

      const updateUserResponse = await udpateUserProfile(user.id, payload, token);
      updateUser({
        ...user,
        ...updateUser,
        name: updateUserResponse.name ?? form.name,
        lastName: updateUserResponse.lastName ?? updateUserResponse.lastname ?? form.lastName,
        phone: updateUserResponse.phone ?? form.phone,
      });
      setSuccess("Perfil actualizado con exito ");
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError("no se pudo actualizar el usuario ");
    } finally {
      setIsLoading(false);
     }   
    };
     return{
      form,
      handleChange,
      submit,
      isLoading,
      error,
      success,
  }
}
