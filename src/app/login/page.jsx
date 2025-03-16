"use client";  // Marca este archivo como componente de cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./login.css";


export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Verificar si el usuario está logueado al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Si el token existe, verificamos que el usuario sea válido
      fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            setIsAuthenticated(true);
            router.push("/");  // Si está autenticado, redirige al home
          } else {
            setIsAuthenticated(false);  // Si no es válido, dejar como no autenticado
          }
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
          setIsAuthenticated(false);  // Si hay un error en la verificación, dejar como no autenticado
        });
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hacer la solicitud al backend para el login
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Guardar el token
        localStorage.setItem("access_token", data.access_token);

        // Obtener el usuario autenticado
        const userRes = await fetch("http://localhost:5000/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        const userData = await userRes.json();
        if (userRes.ok) {
          const userId = userData.id;

          // Crear un carrito asociado al usuario con precioTotal en 0
          await fetch("http://localhost:5000/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.access_token}`,
            },
            body: JSON.stringify({
              userId: userId,
              precioTotal: 0,
            }),
          });

          alert("Login exitoso");
          router.push("/");  // Redirige a la página principal después de un login exitoso
        } else {
          alert("No se pudo obtener la información del usuario");
        }
      } else {
        alert("Error al iniciar sesión: " + (data.message || "Credenciales incorrectas"));
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un error en la solicitud. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="register1-form">
      {isAuthenticated ? (
        <p>Ya estás logueado, redirigiendo...</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h2 className="form1-title">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="input1-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input1-field"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            <div className="input1-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input1-field"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="submit1-btn">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
