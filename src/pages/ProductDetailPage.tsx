import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  Star,
  StarHalf,
  Minus,
  Plus,
  ChevronDown,
  ShoppingBasket,
} from "lucide-react";

const PRODUCT = {
  name: "Truffle Umami Burger",
  category: "Fast Food",
  reviews: "1.2k",
  price: 18.5,
  description:
    "A masterclass in savory flavors. Our signature Wagyu beef blend, hand-pressed and seared, layered with house-made black truffle aioli, sautéed balsamic wild mushrooms, and melted aged Gruyère. All cradled in a toasted, buttered artisan brioche bun.",
  images: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200",
  ],
  toppings: [
    { id: "aioli", name: "Extra Truffle Aioli", price: 1.5 },
    { id: "bacon", name: "Crispy Bacon Stripes", price: 2.5 },
    { id: "egg", name: "Fried Egg", price: 2.0 },
  ],
  sides: [
    { label: "Truffle Parmesan Fries (Included)", price: 0 },
    { label: "Sweet Potato Fries (+$1.00)", price: 1.0 },
    { label: "House Side Salad (+$1.50)", price: 1.5 },
    { label: "Crispy Onion Rings (+$2.00)", price: 2.0 },
  ],
};

const sectionLabel = "font-mono text-sm font-semibold uppercase tracking-[0.12em] text-slate-800";

export const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [side, setSide] = useState(PRODUCT.sides[0].label);
  const [isFavorite, setIsFavorite] = useState(false);

  const toppingsTotal = PRODUCT.toppings
    .filter((t) => selectedToppings.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);
  const sidePrice = PRODUCT.sides.find((s) => s.label === side)?.price ?? 0;
  const total = (PRODUCT.price + toppingsTotal + sidePrice) * quantity;

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const changeQuantity = (value: number) => {
    setQuantity((prev) => Math.min(20, Math.max(1, prev + value)));
  };

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-5 flex items-center gap-1.5 text-sm text-slate-500">
        <Link to="/catalog" className="hover:text-indigo-600">Home</Link>
        <ChevronRight size={14} />
        <Link to="/catalog" className="hover:text-indigo-600">{PRODUCT.category}</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-slate-800">{PRODUCT.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-lg">
            <img
              src={PRODUCT.images[selectedImage]}
              alt={PRODUCT.name}
              className="aspect-[1.12] w-full object-cover"
            />
          </div>

          <div className="mt-4 flex gap-4">
            {PRODUCT.images.map((img, index) => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`h-[72px] w-[72px] overflow-hidden rounded-md border-2 ${
                  selectedImage === index ? "border-indigo-600" : "border-slate-200"
                }`}
              >
                <img src={img} alt={`${PRODUCT.name} ${index + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
              {PRODUCT.name}
            </h1>
            <button
              type="button"
              onClick={() => setIsFavorite((prev) => !prev)}
              aria-label="Agregar a favoritos"
              className="mt-1 text-slate-700"
            >
              <Heart size={22} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} size={14} className="fill-amber-800 text-amber-800" />
              ))}
              <span className="relative inline-flex">
                <Star size={14} className="text-amber-800" />
                <StarHalf size={14} className="absolute inset-0 fill-amber-800 text-amber-800" />
              </span>
            </div>
            <span className="text-slate-600">({PRODUCT.reviews} Reviews)</span>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-sky-800">{PRODUCT.category}</span>
          </div>

          <p className="mt-4 text-base leading-relaxed text-slate-600">{PRODUCT.description}</p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-indigo-50/50 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-slate-600">Price</p>
                <p className="text-4xl font-extrabold tracking-tight text-indigo-700">
                  ${PRODUCT.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white p-1">
                <button
                  type="button"
                  onClick={() => changeQuantity(-1)}
                  aria-label="Disminuir cantidad"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-800"
                >
                  <Minus size={16} />
                </button>
                <span className="w-5 text-center text-base">{quantity}</span>
                <button
                  type="button"
                  onClick={() => changeQuantity(1)}
                  aria-label="Aumentar cantidad"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <p className={`${sectionLabel} mt-6`}>Add Extra Toppings</p>
            <div className="mt-3 space-y-2">
              {PRODUCT.toppings.map((topping) => {
                const checked = selectedToppings.includes(topping.id);
                return (
                  <label
                    key={topping.id}
                    className={`flex cursor-pointer items-center justify-between rounded-md border bg-white px-3 py-3 ${
                      checked ? "border-indigo-500" : "border-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleTopping(topping.id)}
                        className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
                      />
                      <span className="text-sm text-slate-800">{topping.name}</span>
                    </span>
                    <span className="text-sm font-semibold text-sky-800">+${topping.price.toFixed(2)}</span>
                  </label>
                );
              })}
            </div>

            <p className={`${sectionLabel} mt-6`}>Choose a Side</p>
            <div className="relative mt-3">
              <select
                value={side}
                onChange={(e) => setSide(e.target.value)}
                className="w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-3 pr-10 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                {PRODUCT.sides.map((s) => (
                  <option key={s.label} value={s.label}>{s.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600" />
            </div>

            <button
              type="button"
              className="mt-10 flex w-full items-center justify-center gap-2.5 rounded-xl bg-indigo-600 py-3.5 text-base font-medium text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
            >
              <ShoppingBasket size={20} />
              Add to Cart — ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};