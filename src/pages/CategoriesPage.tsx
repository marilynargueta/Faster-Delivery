import type React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryForm } from "../components/CategoryForm";

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Gestión de Categorías</h2>
        <p className="mt-1 text-sm text-slate-500">
          Administra, define y segmenta las opciones de productos para tus restaurantes y clientes
        </p>
      </div>

   <CategoryForm onCancel={() => navigate("/catalog")} onSuccess={() => {}} />
    </div>
  );
};