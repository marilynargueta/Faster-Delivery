import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "../models/product";
import type { ProductResponse } from "../models/product";

interface ProductCardProps {
  product: ProductResponse
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const regularPrice = Number(product.regularPrice) || 0;
  const offerPrice = Number(product.offerPrice) || 0;
  const hasOffer = offerPrice > 0 && offerPrice < regularPrice;

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      {/* Imagen */}
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-32 w-full object-cover"
        />
      </div>

      <div className="p-3">
        {/* Nombre y precio */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-800">{product.name}</h3>
          {hasOffer ? (
            <div className="flex flex-col items-end">
              <span className="whitespace-nowrap text-xs font-bold text-red-600">
                ${offerPrice.toFixed(2)}
              </span>
              <span className="whitespace-nowrap text-[10px] text-slate-400 line-through">
                ${regularPrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="whitespace-nowrap text-xs font-bold">
              ${regularPrice.toFixed(2)}
            </span>
          )}
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