"use client";
import { useEffect, useState } from "react";
import { fetchCart } from "../services/api";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function loadCart() {
      const data = await fetchCart();
      setCart(data);
    }
    loadCart();
  }, []);

  return (
    <div>
      <main className="p-6">
        <h1 className="text-2xl font-bold">Carrito de Compras</h1>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>{item.product.name} - {item.quantity}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
