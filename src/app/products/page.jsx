"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Error al obtener productos");

        const data = await res.json();
        const sortedData = data.sort((a, b) => a.id - b.id); // Ordenar por ID ascendente
        setProducts(sortedData);

        // Agregar productos uno por uno con retraso
        sortedData.forEach((product, index) => {
          setTimeout(() => {
            setVisibleProducts((prev) => {
              if (!prev.find((p) => p.id === product.id)) {
                return [...prev, product];
              }
              return prev;
            });
          }, index * 500);
        });
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }
    loadProducts();
  }, []);

  const handleBuy = async (product) => {
    // Obtener el ID del carrito desde el localStorage
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) {
      // Si no existe un carrito, redirigir al carrito para crearlo
      router.push("/cart");
      return;
    }

    // Enviar el producto al backend para guardarlo en la tabla cart_product
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch("http://localhost:5000/cart/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartId,
          productId: product.id,
          quantity: 1, // La cantidad por defecto es 1
        }),
      });

      if (res.ok) {
        alert("Producto agregado al carrito");
        router.push("/cart"); // Redirigir al carrito
      } else {
        const data = await res.json();
        alert(data.message || "Error al agregar el producto al carrito");
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
        {visibleProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className="product-card">
            <img
              src={product.imagen}
              alt={product.nombreproducto}
            />
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
