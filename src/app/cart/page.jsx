"use client";
import { useEffect, useState } from "react";
import "./cart.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

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
      setTotal(data.total);
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  }

  async function handleRemoveItem(productId) {
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

      const responseData = await res.json();

      if (!res.ok) throw new Error(`Error al eliminar el producto: ${responseData.message || res.statusText}`);

      // Refrescar el carrito después de eliminar el producto
      loadCart();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  return (
    <div className="cart-page">
  <main className="cart-container">
    <h1 className="cart-title">Carrito de Compras</h1>

    {cart.length === 0 ? (
      <p className="cart-empty">Tu carrito está vacío.</p>
    ) : (
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.product.imagen}
                alt={item.product.nombreproducto}
                className="cart-item-img"
              />
              <div className="cart-item-details">
                <h3>{item.product.nombreproducto}</h3>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: ${item.product.precio}</p>
              </div>
              <div className="cart-item-total">
                <button
                  onClick={() => handleRemoveItem(item.product.id)}
                  className="cart-remove-btn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Total: ${total}</h2>
          <button className="checkout-btn">Proceder a la compra</button>
        </div>
      </div>
    )}
  </main>
</div>
  );
}
