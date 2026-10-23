import type React from "react";
import { useAuth } from "../context/useAuth";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900">
          Comida lista para entregar a la puerta de tu casa
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Descubre los mejores productos para ti, {user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};