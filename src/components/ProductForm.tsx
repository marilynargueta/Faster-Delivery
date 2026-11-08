import type React from "react";
import { Check } from "lucide-react";
import { useProductViewModel } from "../viewmodels/use-product";
import { useCategoryViewModel } from "../viewmodels/use-category";
import { FormAlert, FieldError } from "./FormAlert";

interface ProductFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

const MAX_DESCRIPTION = 500;

const labelClass = "block text-xs font-bold text-slate-700 uppercase mb-2";
const inputClass =
  "w-full rounded-lg border py-3 px-4 text-xs text-slate-700 placeholder-slate-400 focus:outline-none";
const moneyInputClass =
  "w-full rounded-lg border py-3 pl-8 pr-4 text-xs text-slate-700 placeholder-slate-400 focus:outline-none";
const moneySymbolClass =
  "absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-700";

/** Pone el borde rojo si el campo tiene error */
const withBorder = (base: string, error?: string) =>
  `${base} ${error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-indigo-600"}`;

export const ProductForm: React.FC<ProductFormProps> = ({
  onCancel,
}) => {

  const {
    form,
    handleChange,
    submit,
    isLoading,
    error,
    success,
    fieldErrors,
  } = useProductViewModel();

  const { categories, isLoading: loadingCategories } = useCategoryViewModel();

  return (
    <form onSubmit={submit} noValidate className="max-w-4xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800">
            Crear nuevo producto
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Ingresa los datos esenciales del producto para registrarlos en el
            catalogo
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* ALERTAS GENERALES DEL FORMULARIO */}
          <FormAlert type="error" message={error} />
          <FormAlert type="success" message={success} />

          <div>
            <label htmlFor="nombre" className={labelClass}>
              Nombre del producto
            </label>
            <input
              id="nombre"
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ej. Hamburguesa Doble Carne"
              className={withBorder(inputClass, fieldErrors.name)}
            />
            <FieldError message={fieldErrors.name} />
            {!fieldErrors.name && (
              <p className="mt-1.5 text-xs text-slate-400">
                Solo letras. Este nombre aparecerá visible en el catálogo para tus clientes
              </p>
            )}
          </div>

          <div>
            <label htmlFor="categoria" className={labelClass}>
              Categoria
            </label>
            <select
              id="categoria"
              value={form.categoryId}
              onChange={(e) => handleChange("categoryId", e.target.value)}
              className={withBorder(inputClass, fieldErrors.categoryId)}
            >
              <option value="">
                {loadingCategories
                  ? "Cargando categorías..."
                  : "Selecciona una categoría"}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </option>
              ))}
            </select>
            <FieldError message={fieldErrors.categoryId} />
          </div>

          <div>
            <label htmlFor="codigo" className={labelClass}>
              Codigo de Barra
            </label>
            <input
              id="codigo"
              type="text"
              inputMode="numeric"
              maxLength={13}
              value={form.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
              placeholder="Ej. 752145897525"
              className={withBorder(inputClass, fieldErrors.sku)}
            />
            <FieldError message={fieldErrors.sku} />
            {!fieldErrors.sku && (
              <span className="text-[10px] text-slate-400 block mt-1">
                Solo números, entre 8 y 13 dígitos
              </span>
            )}
          </div>

          <div>
            <label htmlFor="descripcion" className={labelClass}>
              Descripcion Detallada
            </label>
            <textarea
              id="descripcion"
              maxLength={MAX_DESCRIPTION}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe la presentacion y notas de preparacion"
              className={`${withBorder(inputClass, fieldErrors.description)} h-32`}
            />
            <FieldError message={fieldErrors.description} />
            <div className="flex items-start justify-between gap-4 mt-1">
              <span className="text-[10px] text-slate-400">
                Mínimo 10 caracteres. Incluye advertencias o especificaciones de
                porciones para los repartidores
              </span>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                {form.description.length} / {MAX_DESCRIPTION}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="precioRegular" className={labelClass}>
                Precio Regular
              </label>
              <div className="relative">
                <span className={moneySymbolClass}>$</span>
                <input
                  id="precioRegular"
                  type="text"
                  inputMode="decimal"
                  value={form.regularPrice}
                  onChange={(e) => handleChange("regularPrice", e.target.value)}
                  placeholder="0.00"
                  className={withBorder(moneyInputClass, fieldErrors.regularPrice)}
                />
              </div>
              <FieldError message={fieldErrors.regularPrice} />
            </div>

            <div>
              <label htmlFor="precioOferta" className={labelClass}>
                Precio Oferta
              </label>
              <div className="relative">
                <span className={moneySymbolClass}>$</span>
                <input
                  id="precioOferta"
                  type="text"
                  inputMode="decimal"
                  value={form.offerPrice}
                  onChange={(e) => handleChange("offerPrice", e.target.value)}
                  placeholder="0.00"
                  className={withBorder(moneyInputClass, fieldErrors.offerPrice)}
                />
              </div>
              <FieldError message={fieldErrors.offerPrice} />
            </div>

            <div>
              <label htmlFor="stockInicial" className={labelClass}>
                Stock Inicial
              </label>
              <input
                id="stockInicial"
                type="text"
                inputMode="numeric"
                value={form.initialStock}
                onChange={(e) => handleChange("initialStock", e.target.value)}
                placeholder="0"
                className={withBorder(inputClass, fieldErrors.initialStock)}
              />
              <FieldError message={fieldErrors.initialStock} />
            </div>

            <div>
              <label htmlFor="stockMinimo" className={labelClass}>
                Stock Minimo
              </label>
              <input
                id="stockMinimo"
                type="text"
                inputMode="numeric"
                value={form.minStockAlert}
                onChange={(e) => handleChange("minStockAlert", e.target.value)}
                placeholder="0"
                className={withBorder(inputClass, fieldErrors.minStockAlert)}
              />
              <FieldError message={fieldErrors.minStockAlert} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg bg-slate-100 hover:bg-slate-200 px-5 py-2 text-xs font-semibold text-slate-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 px-5 py-2 text-xs font-semibold text-white"
            >
              <Check size={14} />
              {isLoading ? "Creando..." : "Crear Producto"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};