import { UserRound, MapPin, CreditCard, Bell } from "lucide-react";

const profileOptions = [
  { label: "Información personal", icon: UserRound },
  { label: "Direcciones de entrega", icon: MapPin },
  { label: "Métodos de pago", icon: CreditCard },
  { label: "Historial de pedidos", icon: Bell },
];

export const ProfileSidebar = () => {
  return (
    <aside className="h-fit rounded-xl border border-slate-200 bg-white p-3.5">
      <h2 className="text-xs font-bold text-slate-800">Gestión de cuenta</h2>
      <p className="mb-3 text-[11px] text-slate-500">
        Configuración y accesos rápidos
      </p>

      <nav>
        <ul className="space-y-0.5">
          {profileOptions.map((option, index) => {
            const Icon = option.icon;
            const isActive = index === 0;

            return (
              <li key={option.label}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                    isActive
                      ? "border-l-4 border-indigo-600 bg-indigo-50 font-semibold text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={14} />
                  <span>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};