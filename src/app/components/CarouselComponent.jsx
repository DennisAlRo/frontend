"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import styles from "./estilocrrs.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Flecha de siguiente personalizada
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.nextArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

// Flecha de anterior personalizada
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export default function ProductSlider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error retrieving products:", error);
      }
    }
    fetchProducts();
  }, []);

  const settings = {
    dots: true, // Indicadores de navegación
    arrows: true, // Flechas de navegación
    infinite: true, // Loop infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Una diapositiva a la vez
    slidesToScroll: 1, // Desplaza una diapositiva a la vez
    autoplay: true, // Autoplay activado
    autoplaySpeed: 15000, // 15 segundos por diapositiva
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!products || products.length === 0) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className={styles.productSlide}>
            <Link
              href={`/products/${product.id}`}
              className={styles.productLink}
            >
              <div className={styles.productContainer}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className={styles.productImage}
                  />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.nombreproducto}</h3>
                  <p className={styles.productCaption}>{product.caption}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
