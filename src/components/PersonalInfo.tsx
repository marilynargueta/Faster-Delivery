import type { UserResponse } from "../models/user";
import { useEffect } from "react";
import toast from "react-hot-toast";


interface PersonalInfoProps {
  user: UserResponse | null;
  name: string;
  lastName: string;
  phone: string | undefined; 
  onChange:(field: "name" | "lastName" | "phone", value: string) => void;
  onSave:() => void;
  isLoading: boolean;
  error?: string;
  success?: string;
}
export const PersonalInfo = ({
   user,
   name,
   lastName,
   phone,
   onChange,
   onSave,
   isLoading,
   error,
   success,
   }: PersonalInfoProps) => {
    useEffect(() => {
      if(success){
        toast.success(success);
      }
    }, [success]);

    useEffect(() => {
      if(error){
        toast.error(error);
      }
    }, [error]);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">Datos personales</h2>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Información obtenida de la sesión actual
          </p>
        </div>

        <button
          onClick={onSave}
          disabled={isLoading}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          {isLoading ? "Guardando..." : "Editar perfil"}
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        <div className="grid grid-cols-1 items-center gap-1 md:grid-cols-[140px_1fr] md:gap-4">
          <label className="text-xs font-medium text-slate-700">Nombre</label>
          <input
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-1 md:grid-cols-[140px_1fr] md:gap-4">
          <label className="text-xs font-medium text-slate-700">Apellido</label>
          <input
            value={lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-1 md:grid-cols-[140px_1fr] md:gap-4">
          <label className="text-xs font-medium text-slate-700">
            Correo electrónico
          </label>
          <input
            readOnly
            value={user?.email ?? ""}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-1 md:grid-cols-[140px_1fr] md:gap-4">
          <label className="text-xs font-medium text-slate-700">
            Número telefónico
          </label>
          <input
            value={phone ?? ""}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-700"
          />
        </div>
      </div>
    </section>
  );
};