import { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Premium Wagyu Burger",
    description: "Extra pickles, no onions, brioche bun.",
    price: 18.5,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    id: 2,
    name: "Superfood Harvest Bowl",
    description: "Gluten-free, vegan, maple-tahini dressing.",
    price: 14.2,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  },
  {
    id: 3,
    name: "Signature Cold Brew",
    description: "Large (16oz), Oat milk, Vanilla syrup.",
    price: 5.5,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
  },
];

const TAX_RATE = 0.0802;

export const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const changeQuantity = (id: number, value: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(20, Math.max(1, item.quantity + value)) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-10 text-5xl font-extrabold tracking-tight text-slate-900">
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500">
              Your cart is empty.
            </div>
          )}

          {items.map((item) => (
            <article
              key={item.id}
              className="flex gap-6 rounded-xl border border-slate-200 bg-white p-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-32 w-32 shrink-0 rounded-md object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                  <span className="whitespace-nowrap text-xl font-bold text-indigo-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-5 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2">
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, -1)}
                      aria-label="Disminuir cantidad"
                      className="text-indigo-700"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-4 text-center text-sm font-medium text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, 1)}
                      aria-label="Aumentar cantidad"
                      className="text-indigo-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1.5 font-mono text-sm font-semibold text-red-700 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Order Summary</h2>

          <div className="mt-6 space-y-3 text-base">
            <div className="flex justify-between text-slate-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Delivery Fee</span>
              <span className="text-sky-700">Free</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="my-6 border-t border-slate-200" />

          <p className="font-mono text-sm font-semibold text-slate-800">Promo Code</p>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="w-full rounded-md border border-slate-300 bg-indigo-50/40 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="button"
              className="rounded-md bg-sky-400 px-4 font-mono text-sm font-semibold text-slate-900 hover:bg-sky-500"
            >
              Apply
            </button>
          </div>

          <div className="my-6 border-t border-slate-200" />

          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-slate-900">Total</span>
            <span className="text-4xl font-extrabold tracking-tight text-indigo-700">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 py-3.5 text-base font-medium text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>

          <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500">
            <ShieldCheck size={16} />
            Secure checkout powered by Fast Delivery
          </p>
        </aside>
      </div>
    </div>
  );
};