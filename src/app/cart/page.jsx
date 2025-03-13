"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadCart() {
      const token = localStorage.getItem("access_token");
      const cartId = localStorage.getItem("cart_id");

      try {
        const res = await fetch(`http://localhost:5000/cart-products/${cartId}/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener los productos del carrito");

        const data = await res.json();
        setCart(data.cartProducts);
        setTotal(data.total); // Establecemos el total recibido desde el backend
      } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
      }
    }

    loadCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    const token = localStorage.getItem("access_token");
    const cartId = localStorage.getItem("cart_id");

    try {
      const res = await fetch(`http://localhost:5000/cart-products/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartId, productId }),
      });

      if (!res.ok) throw new Error("Error al eliminar el producto");

      // Refrescar carrito después de eliminar
      loadCart();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="cart-page">
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>

        {cart.length === 0 ? (
          <p className="text-lg">Tu carrito está vacío.</p>
        ) : (
          <div>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item border-b p-4 flex items-center">
                  <img
                    src={item.product.imagen}
                    alt={item.product.nombreproducto}
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <div className="cart-item-details flex-1">
                    <h3 className="text-xl font-semibold">{item.product.nombreproducto}</h3>
                    <p className="text-gray-600">Cantidad: {item.cantidad}</p>
                    <p className="text-gray-600">Precio unitario: ${item.product.precio}</p>
                  </div>
                  <div className="cart-item-total text-right">
                    <p className="font-semibold">
                      ${item.product.precio * item.cantidad}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-500 hover:underline mt-2"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary mt-6 p-4 border-t text-right">
              <h2 className="text-2xl font-semibold">Total: ${total}</h2>
              <button className="mt-4 py-2 px-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400">
                Proceder a la compra
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
