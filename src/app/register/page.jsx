"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/users", { // Ruta corregida
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }), // Asegurar que coincida con backend
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        setError(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="register-form">
      <div className="form-content">
        <h2 className="form-title">Registrarse</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="submit-btn">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
