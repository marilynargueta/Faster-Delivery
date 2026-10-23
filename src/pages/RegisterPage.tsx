import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRegisterViewModel } from "../viewmodels/use-register";

type RegisterPageProps = {
  onNavigateToLogin: () => void;
};

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onNavigateToLogin,
}) => {
  const {
    form,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    error,
    success,
    handleChange,
    submit,
  } = useRegisterViewModel();

  // "address" no forma parte del RegisterPayload que espera el backend,
  // así que se maneja como estado local aparte.
  const [address, setAddress] = useState("");

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="w-full border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <span className="font-bold text-lg">Faster Delivery</span>

          <nav className="hidden md:flex items-center gap-6 font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Inicio
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Información
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Comunidad
            </a>
          </nav>

          <button
            type="button"
            onClick={onNavigateToLogin}
            className="text-sm font-semibold text-indigo-700 hover:text-indigo-800 transition-colors"
          >
            Loguearse
          </button>
        </div>
      </header>

      {/* Main / Card */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Crear Cuenta
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Regístrate para empezar a pedir
            </p>
          </div>

          <form onSubmit={submit} className="w-full space-y-4">
            {/* Nombre */}
            <div>
              <label className="block mb-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                Nombre
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Juan"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-colors"
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block mb-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                Apellido
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Pérez"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-colors"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block mb-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                Teléfono
              </label>
              <input
                type="text"
                required
                placeholder="Ej. 7000-0000"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-colors"
              />
            </div>

            {/* Correo electrónico */}
            <div>
              <label className="block mb-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-colors"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block mb-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                Contraseña
              </label>
              <input
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-colors"
              />
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block mb-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-colors"
              />
            </div>

            {/* Dirección de envío principal */}
            <div>
              <label className="block mb-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                Dirección de envío principal
              </label>
              <input
                type="text"
                required
                placeholder="Ciudad, provincia o urbanización"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 mb-2 border border-slate-200 rounded-lg outline-none placeholder-slate-400 focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Botón de envío */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-700 hover:bg-indigo-800 hover:shadow-lg text-white rounded-lg font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500 font-semibold">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-indigo-700 hover:text-indigo-800 transition-colors"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};