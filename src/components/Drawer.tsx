import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, Pizza, Salad, Cake, Coffee, X, FolderPlus, Loader2, Tag } from "lucide-react";
import { PackagePlus } from "lucide-react";
import { useCategoriesList } from "../viewmodels/use-category";
import { useNavigate, useSearchParams } from "react-router-dom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategoryId?: number | string | null;
  onSelectCategory?: (categoryId: number | string | null) => void;
}

const menuItems = [
  { label: "Todas las categorías", icon: <LayoutGrid size={18} /> },
  { label: "Fast Food", icon: <Pizza size={18} /> },
  { label: "Healthy", icon: <Salad size={18} /> },
  { label: "Desserts", icon: <Cake size={18} /> },
  { label: "Beverages", icon: <Coffee size={18} /> },
];

const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.includes("pizza") || lower.includes("fast") || lower.includes("comida")) return Pizza
  if (lower.includes("salad") || lower.includes("healthy") || lower.includes("saludable")) return Salad
  if (lower.includes("cake") || lower.includes("dessert") || lower.includes("postre")) return Cake
  if (lower.includes("coffee") || lower.includes("beverage") || lower.includes("bebida")) return Coffee
  return Tag
}

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    selectedCategoryId = null,
    onSelectCategory,
}) => {

  const navigate = useNavigate();
  const  [searParams] = useSearchParams();
  const currentCategoryId = searParams.get("categoryId") || null;
  
    const { categories, isLoading, error } = useCategoriesList()

    const handleSelectCategory = (categoryId: number | string | null) => {
        if (categoryId === null) {
            navigate("/catalog");
        } else {
            navigate(`/catalog?categoryId=${categoryId}`);
        }
        
    }

  return (

    <Fragment>
      {isOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 h-screen w-64 border-r border-slate-200 bg-white
        transition-transform duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Encabezado del drawer */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <div>
            <p className="text-xs font-semibold text-slate-400">Delivery</p>
            <h2 className="text-lg font-bold text-slate-800">Categorías</h2>
          </div>

          {/* Botón de cerrar, solo visible en móvil */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-6">

{/** GESTIÓN: menú de redireccionamiento de las páginas de acciones */}
<div>
  <p className="mb-3 text-xs font-bold uppercase text-slate-400">Gestión</p>

  <NavLink
    to="/categories/create"
    onClick={onClose}
    className={({ isActive }) =>
      `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
        isActive
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-100"
      }`
    }
  >
    <FolderPlus size={18} />
    Crear Categoria
  </NavLink>
    <NavLink
    to="/products/create"
    onClick={onClose}
    className={({ isActive }) =>
      `flex w-full mb-2 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
        isActive
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-100"
      }`
    }
  >
    <PackagePlus size={18} />
    Crear Producto
  </NavLink>
</div>

{/** Menu de filtros */}
<div>
  <p className="mb-3 text-xs font-bold uppercase text-slate-400">Filters</p>
  <ul className="space-y-1">
    <li>
      <button
        type="button"
        onClick={() => handleSelectCategory(1)}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
          selectedCategoryId === null
            ? "bg-cyan-100 font-semibold text-cyan-700"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <LayoutGrid size={18} />
        All categories
      </button>
    </li>

    {isLoading && (
      <li className="flex items-center gap-2 px-3 py-3 text-xs text-slate-400">
        <Loader2 className="animate-spin" size={16} />
        Cargando categorías...
      </li>
    )}

    {error && !isLoading && (
      <li className="px-3 py-2 text-xs text-red-500">
        {error}
      </li>
    )}

    {!isLoading && !error && categories.map((category) => {
      const Icon = getCategoryIcon(category.name)
      const isSelected = currentCategoryId === String (category.id)
      return (
        <li key={category.id}>
          <button
            type="button"
            onClick={() => handleSelectCategory(category.id)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
              isSelected
                ? "bg-cyan-100 font-semibold text-cyan-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon size={18} />
            <span className="truncate">{category.name}</span>
          </button>
        </li>
      )
    })}
  </ul>
</div>

        </nav>
      </aside>
    </Fragment>
  );
};