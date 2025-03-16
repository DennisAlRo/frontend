"use client";
import CarouselComponent from "./components/CarouselComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenido a la Tienda Online</h1>
        <p className={styles.description}>
          Explora nuestros productos y gestiona tu carrito de compras.
        </p>
        <CarouselComponent />
      </main>
    </div>
  );
}
