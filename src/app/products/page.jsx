"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);

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
              <button>Comprar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
