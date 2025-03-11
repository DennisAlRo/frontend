"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirigir al usuario

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes hacer una petición a tu backend para crear un usuario
    const res = await fetch("/api/register", { // API backend para registrar
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });
    if (res.ok) {
      router.push("/login"); // Redirigir al login después del registro exitoso
    }
  };

  return (
    <div className="container">
      <div className="register-form-container">
        <h2 className="form-title">Registrarse</h2>
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
          <button type="submit" className="submit-btn">Registrar</button>
        </form>
      </div>
    </div>
  );
}
