import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "../models/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      {/* Imagen */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-32 w-full object-cover"
        />
      </div>

      <div className="p-3">
        {/* Nombre y precio */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-800">{product.name}</h3>
          <span className="whitespace-nowrap text-xs font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Descripción */}
        <p className="mt-2 h-10 overflow-hidden text-xs">
          {product.description}
        </p>

        {/* Botones */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded bg-indigo-600 px-2 py-2 text-xs font-bold text-white hover:bg-indigo-700"
          >
            <ShoppingCart size={14} />
            Agregar al carrito
          </button>

          <button
            type="button"
            className="rounded border border-slate-300 px-3 text-slate-500 hover:bg-slate-100"
          >
            <Heart size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};
