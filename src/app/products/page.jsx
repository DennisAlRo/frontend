"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <div>
      <main className="p-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <h2 className="text-xl">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
