"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function loadCart() {
      const token = localStorage.getItem("access_token");

      try {
        const res = await fetch("http://localhost:5000/cart_product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al cargar el carrito");

        const data = await res.json();
        setCart(data.cartProducts); // Asumiendo que la respuesta contiene los productos del carrito
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      }
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
              <li key={item.id} className="cart-item">
                <img src={item.product.imagen} alt={item.product.nombreproducto} width="100" />
                <span>{item.product.nombreproducto}</span>
                <span>{item.quantity}</span>
                <span>${item.product.precio}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
