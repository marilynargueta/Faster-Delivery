import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { Drawer } from "../components/Drawer";

export const DashboardPage = () => {
  const { user, token, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="md:ml-64">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Abrir menú"
            className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
          >
            <Menu size={20} />
          </button>

          <span className="font-bold text-slate-900">Faster Delivery</span>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Contenido del dashboard */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

          <p className="mt-4">
            <strong>Token:</strong> {token}
          </p>
          <p className="mt-2">
            <strong>Nombres:</strong> {user?.name} {user?.lastName}
          </p>
          <p className="mt-2">
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </main>
    </div>
  );
};