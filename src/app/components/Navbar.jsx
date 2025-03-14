"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Bloque izquierdo: Nombre de la tienda y enlaces */}
      <div className="navbar-left">
        <h1 className="navbar-title">Tienda Online</h1>
        <div className="navbar-links">
          <Link href="/" className="navbar-link">Inicio</Link>
          <Link href="/products" className="navbar-link">Productos</Link>
          <Link href="/cart" className="navbar-link">Carrito</Link>
          <Link href="/aboutus" className="navbar-link">About Us</Link> {/* Nueva ruta */}
          <Link href="/siteadmin" className="navbar-link">Admin Site</Link> {/* Nueva ruta */}
        </div>
      </div>

      {/* Bloque derecho: Botones de Login y Register */}
      <div className="navbar-auth-buttons">
        <Link href="/login">
          <button className="navbar-login-button">Login</button>
        </Link>
        <Link href="/register">
          <button className="navbar-register-button">Register</button>
        </Link>
      </div>
    </nav>
  );
}
