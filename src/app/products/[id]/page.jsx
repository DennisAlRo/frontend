"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./idpro.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (!res.ok) throw new Error("Error al obtener el producto");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="product-container">
      <h1 className="product-title">{product.nombreproducto}</h1>
      <img
        className="product-image"
        src={product.imagen}
        alt={product.nombreproducto}
      />
      <p className="product-details">{product.detalle}</p>
      <p className="product-price">Precio: ${product.precio}</p>
    </div>
  );
}
