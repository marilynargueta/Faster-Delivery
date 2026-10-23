import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCategoryViewModel } from "../viewmodels/use-category";

interface CategoryFormProps {
  onCancel: () => void;
  onSuccess: () => void;


}

export const CategoryForm = ({ onCancel, onSuccess }: CategoryFormProps) => {

const {
  form,
  handleChange,
  submit,
  isLoading,
  error,
  success,
} = useCategoryViewModel(onSuccess);

useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);

useEffect(() => {
  if (success) {
    toast.success(success);
  }
}, [success]);

  return (
    
    
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden max-w-4xl">
        <div className="border-b border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800">Crear Categoria</h3>
          <p className="text-xs text-slate-400 mt-1">Define los datos principales de la nueva sección</p>
        </div>

        <form className="p-6 space-y-6" action="" onSubmit={submit}>
          <div>
            <label htmlFor="nombre" className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Nombre de la categoria
            </label>
            <input
              id="nombre"
              type="text"
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ej. Pizza Artesanales"
              className="w-full rounded-lg border border-slate-200 py-3 px-4 text-xs placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Este nombre aparecerá visible en el catálogo para tus clientes
            </p>
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Descripcion
            </label>
            <textarea
              id="descripcion"
              required
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe los productos incluidos en esta categoria"
              className="w-full h-32 rounded-lg border border-slate-200 py-3 px-4 text-xs placeholder-slate-400 focus:border-indigo-600 focus:outline-none"
            />
            <p className="mt-1.5 text-xs text-slate-400">
              Máximo 200 caracteres. Ayuda a los clientes a entender qué incluye esta categoría
            </p>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}
          {success && <p className="text-xs text-green-600">{success}</p>}

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
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-xs font-semibold text-white"
            >
              {isLoading ? "Cargando...": "Crear Categoria"}
            </button>
          </div>
        </form>
      </div>
  );
};