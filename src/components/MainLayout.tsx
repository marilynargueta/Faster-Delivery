import type React from "react";
import { useState } from "react";
import { Menu, UserRound } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Drawer } from "../components/Drawer"; // ajusta la ruta

export const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <main className="min-h-screen md:ml-64 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Abrir menú"
              className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
            >
              <Menu size={20} />
            </button>

            <span className="font-bold text-lg text-slate-900">Fast Delivery</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              <UserRound size={17} />
              <span>{user?.name ?? "Mi perfil"}</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};