import { Fragment } from "react";
import { LayoutGrid, Pizza, Salad, IceCream2, CupSoda, X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Todas las categorías", icon: <LayoutGrid size={18} /> },
  { label: "Fast Food", icon: <Pizza size={18} /> },
  { label: "Healthy", icon: <Salad size={18} /> },
  { label: "Desserts", icon: <IceCream2 size={18} /> },
  { label: "Beverages", icon: <CupSoda size={18} /> },
];

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
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
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white
        transition-transform duration-300 md:static md:z-auto md:block md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Encabezado del drawer */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <div>
            <p className="text-xs font-semibold text-slate-400">Faster Delivery</p>
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

        {/* Menú de categorías */}
        <nav className="p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
            Filters
          </p>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors
                  ${
                    index === 0
                      ? "bg-cyan-100 font-semibold text-cyan-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </Fragment>
  );
};