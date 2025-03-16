"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Bloque izquierdo: Nombre de la tienda y enlaces */}
      <div className="navbar-left">
        {/* El título se convierte en enlace a la página principal */}
        <Link href="/" className="navbar-title">
          Tienda Online
        </Link>
        <div className="navbar-links">
          <Link href="/" className="navbar-link">
            Inicio
          </Link>
          <Link href="/products" className="navbar-link">
            Productos
          </Link>
          <Link href="/cart" className="navbar-link">
            Carrito
          </Link>
          <Link href="/aboutus" className="navbar-link">
            About Us
          </Link>
          <Link href="/siteadmin" className="navbar-link">
            Admin Site
          </Link>
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
