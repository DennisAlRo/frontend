"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hacer la solicitud al backend
      const res = await fetch("http://localhost:5000/auth/login", { // Cambia esta URL si es necesario
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      // Verificar si la respuesta es exitosa
      const data = await res.json();
      if (res.ok) {
        // Si el login es exitoso, guardamos el token
        localStorage.setItem("access_token", data.access_token);
        alert("Login exitoso");
        router.push("/"); // Redirigir a la página principal
      } else {
        // Si el login falla, mostramos el mensaje de error
        alert("Error al iniciar sesión: " + (data.message || "Credenciales incorrectas"));
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error en la solicitud. Por favor, intenta nuevamente.");
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
