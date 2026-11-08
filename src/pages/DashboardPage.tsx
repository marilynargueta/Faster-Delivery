import type React from "react";
import { useAuth } from "../context/useAuth";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useProductViewModel } from "../viewmodels/use-product";


export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get("categoryId")

  const {products,isLoading,error}= useProductViewModel(categoryId)
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-black text-slate-900">Comida lista para entregar a la puerta de tu casa</h2>
      <p className="mt-2 text-sm text-slate-600">
        Descubre los mejores prodcuctos para ti, {user?.name}
      </p>

      {isLoading&&(
        <div className="flex items-center justify-center py-20 ">
          <span>Cargando productos</span>
        </div>
      )}

      {error&& !isLoading && (
        <div className="my-8 rounded-lg bg-red-50 p-4">
          {error}
        </div>
      )}
      {!isLoading && !error && products.length === 0 && (
        <div>
          <span>No hay productos</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product)=>(
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
  );
};