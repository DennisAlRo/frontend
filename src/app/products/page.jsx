"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Error al obtener productos");

        const data = await res.json();
        const sortedData = data.sort((a, b) => a.id - b.id); // Ordenar por ID ascendente
        setProducts(sortedData);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }
    loadProducts();
  }, []);

  const handleBuy = async (product) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Debes iniciar sesión para comprar productos");
      router.push("/login");
      return;
    }

    try {
      // Obtener el ID del usuario autenticado desde el backend
      const userRes = await fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await userRes.json();
      if (!userRes.ok || !userData.id) {
        alert("No se pudo obtener la información del usuario.");
        return;
      }

      const userId = userData.id;

      // Obtener o crear el carrito del usuario
      const cartRes = await fetch(`http://localhost:5000/cart/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let cartData = await cartRes.json();

      if (!cartRes.ok || !cartData.id) {
        // Si el carrito no existe, crearlo
        const createCartRes = await fetch("http://localhost:5000/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });

        cartData = await createCartRes.json();

        if (!createCartRes.ok || !cartData.id) {
          alert("Error al crear el carrito.");
          return;
        }
      }

      const cartId = cartData.id;
      localStorage.setItem("cart_id", cartId); // Guardar el cartId en localStorage

      // Cambiar la URL de la solicitud para que coincida con la nueva ruta del backend
      const addToCartRes = await fetch(`http://localhost:5000/cart/${cartId}/add-product`, {  // Actualizar la ruta aquí
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1, // Cantidad por defecto
        }),
      });

      if (addToCartRes.ok) {
        alert("Producto agregado al carrito");
        router.push("/cart"); // Redirigir a la página del carrito
      } else {
        const errorData = await addToCartRes.json();
        alert(errorData.message || "Error al agregar el producto al carrito");
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      alert("Hubo un error al agregar el producto al carrito.");
    }
  };

  return (
    <div className="products-page">
      <h1>Productos</h1>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imagen} alt={product.nombreproducto} />
            <div className="product-card-content">
              <h2>{product.nombreproducto}</h2>
              <p>{product.detalle}</p>
              <p className="price">${product.precio}</p>
              <button onClick={() => handleBuy(product)}>Comprar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
