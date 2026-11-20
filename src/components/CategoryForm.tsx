import { useState } from "react";
import type { FormEvent } from "react";
import { useCategoryViewModel } from "../viewmodels/use-category";
import { FormAlert, FieldError } from "./FormAlert";
import { getInputError, hasErrors } from "../core/validators";

interface CategoryFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

type CategoryErrors = { name?: string; description?: string };

const MAX_DESCRIPTION = 200;

const labelClass = "block text-xs font-bold text-slate-700 uppercase mb-2";
const inputBase =
  "w-full rounded-lg border py-3 px-4 text-xs placeholder-slate-400 focus:outline-none";

const withBorder = (error?: string) =>
  `${inputBase} ${error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-indigo-600"}`;

export const CategoryForm = ({ onCancel, onSuccess }: CategoryFormProps) => {
  const {
    form,
    handleChange,
    submit,
    isLoading,
    error,
    success,
  } = useCategoryViewModel(onSuccess);

  const [fieldErrors, setFieldErrors] = useState<CategoryErrors>({});
  const [formError, setFormError] = useState("");

  const onNameChange = (value: string) => {
    const message = getInputError("letters", value);
    if (message) {
      setFieldErrors((prev) => ({ ...prev, name: message }));
      return;
    }
    setFieldErrors((prev) => ({ ...prev, name: "" }));
    setFormError("");
    handleChange("name", value);
  };

  const onDescriptionChange = (value: string) => {
    setFieldErrors((prev) => ({ ...prev, description: "" }));
    setFormError("");
    handleChange("description", value);
  };

  const validate = (): CategoryErrors => {
    const errors: CategoryErrors = {};

    const name = form.name.trim();
    if (!name) errors.name = "El nombre de la categoría es obligatorio";
    else if (name.length < 3) errors.name = "El nombre debe tener al menos 3 letras";

    const description = form.description.trim();
    if (!description) errors.description = "La descripción es obligatoria";
    else if (description.length < 10) errors.description = "La descripción debe tener al menos 10 caracteres";

    return errors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (hasErrors(errors)) {
      setFormError("Revisa los campos marcados en rojo antes de guardar");
      return;
    }
    setFormError("");
    submit(event);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden max-w-4xl">
      <div className="border-b border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-800">Crear Categoria</h3>
        <p className="text-xs text-slate-400 mt-1">Define los datos principales de la nueva sección</p>
      </div>

      <form className="p-6 space-y-6" onSubmit={handleSubmit} noValidate>
        <FormAlert type="error" message={formError || error} />
        <FormAlert type="success" message={success} />

        <div>
          <label htmlFor="nombre" className={labelClass}>
            Nombre de la categoria
          </label>
          <input
            id="nombre"
            type="text"
            value={form.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ej. Pizza Artesanales"
            className={withBorder(fieldErrors.name)}
          />
          <FieldError message={fieldErrors.name} />
          {!fieldErrors.name && (
            <p className="mt-1.5 text-xs text-slate-400">
              Solo letras. Este nombre aparecerá visible en el catálogo para tus clientes
            </p>
          )}
        </div>

        <div>
          <label htmlFor="descripcion" className={labelClass}>
            Descripcion
          </label>
          <textarea
            id="descripcion"
            maxLength={MAX_DESCRIPTION}
            value={form.description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Describe los productos incluidos en esta categoria"
            className={`${withBorder(fieldErrors.description)} h-32`}
          />
          <FieldError message={fieldErrors.description} />
          <div className="mt-1.5 flex justify-between gap-4 text-xs text-slate-400">
            <span>Mínimo 10 y máximo 200 caracteres</span>
            <span>{form.description.length} / {MAX_DESCRIPTION}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg bg-slate-100 hover:bg-slate-200 px-5 py-2 text-xs font-semibold text-slate-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 px-5 py-2 text-xs font-semibold text-white"
          >
            {isLoading ? "Cargando..." : "Crear Categoria"}
          </button>
        </div>
      </form>
    </div>
  );
};