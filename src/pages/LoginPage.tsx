import React from "react";
import { useLoginViewModel } from "../viewmodels/use-login";

type LoginPageProps = {
  onNavigateToRegister: () => void;
};

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateToRegister,
}) => {
  const { form, isLoading, error, handleChange, submit } = useLoginViewModel();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative w-full border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <span className="font-bold text-slate-950">Faster Delivery</span>

          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Explorar
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Ofertas
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Historial
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Ayuda
            </a>
          </nav>

          <div className="flex items-center">
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="px-5 py-3 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-indigo-100"
            >
              Registrarse
            </button>
          </div>
        </div>
      </header>

      {/* Main / Card */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col flex-1 max-w-md space-y-8 w-full">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Bienvenido
            </h2>
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="mt-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Crear nueva cuenta
            </button>
          </div>

          <form onSubmit={submit} className="w-full">
            <input
              type="text"
              required
              placeholder="Usuario o correo"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-3 border border-slate-400 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors"
            />

            <input
              type="password"
              required
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-4 py-3 border border-slate-400 rounded-lg mt-2 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors"
            />

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border border-slate-300"
                />
                <span className="text-sm">Recuérdame</span>
              </label>

              <a
                href="#"
                className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
              >
                Olvidé mi contraseña
              </a>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-medium mt-3">{error}</p>
            )}

            <div className="mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-800 hover:bg-blue-900 hover:shadow-lg text-white rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Ingresando..." : "Loguearse"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};