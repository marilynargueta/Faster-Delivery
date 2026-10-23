import { ArrowLeft, Mail, Phone, UserRound } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { PersonalInfo } from "../components/PersonalInfo";
import { useProfileViewModel } from "../viewmodels/use-profile-user";

interface ProfilePageProps {
  onBackToDashboard: () => void;
}

export const ProfilePage= ({ onBackToDashboard }: ProfilePageProps) => {
  const { user } = useAuth();
  const {
    form,
    handleChange,
    submit,
    isLoading,
    error,
    success,
  }=useProfileViewModel();
  const fullName = `${user?.name ?? ""} ${user?.lastName ?? ""}`.trim();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={16} />
          <p>Volver al dashboard</p>
        </button>

        <section className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <UserRound size={20} />
              </div>

              <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
                <h1 className="text-base font-bold text-slate-800">
                  {fullName || "Usuario"}
                </h1>

                <div className="flex flex-col gap-1 text-xs text-slate-500 md:flex-row md:gap-3">
                  <span className="flex items-center gap-1">
                    <Mail size={12} />
                    {user?.email ?? "Correo no disponible"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={12} />
                    {user?.phone ?? "Teléfono no disponible"}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Compartir
            </button>
          </div>
        </section>

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[190px_1fr]">
          <ProfileSidebar />
          <PersonalInfo 
          user={user} 
          name={form.name}
          lastName={form.lastName}
          phone={form.phone}
          onChange={handleChange}
          onSave={submit}
          isLoading={isLoading}
          error={error}
          success={success}
          />
        </div>
      </div>
    </div>
  );
};