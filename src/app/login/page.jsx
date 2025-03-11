"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirigir al usuario

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí haces una petición a tu backend para autenticar al usuario
    const res = await fetch("/api/login", { // API backend para login
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });
    if (res.ok) {
      router.push("/"); // Redirigir al inicio si el login es exitoso
    } else {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      <div className="login-form-container">
        <h2 className="form-title">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
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
              required
            />
          </div>
          <button type="submit" className="submit-btn">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}
