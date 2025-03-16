"use client"; // Marca este archivo como componente de cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./administracion.module.css";


export default function AdminSite() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombreproducto: "",
    detalle: "",
    precio: "",
    imagen: "",
  });
  const [errorMessage, setErrorMessage] = useState(null); // Estado para mostrar el mensaje de error
  const router = useRouter();

  // Verificar si el usuario está autenticado (cualquier usuario válido)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // Si no existe un token, redirigir al login
      router.push("/login");
    } else {
      // Si el token existe, verificar si es válido
      fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Se permite el acceso a cualquier usuario que tenga un id válido de usuario
          if (!data.id) {
            setErrorMessage("No estás autenticado para acceder a esta página.");
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          }
        })
        .catch(() => {
          router.push("/login");
        });
    }
  }, [router]);

  // Cargar productos existentes
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Error al obtener productos");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    }
    loadProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error("Error al agregar el producto");
      }

      const addedProduct = await res.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      setNewProduct({
        nombreproducto: "",
        detalle: "",
        precio: "",
        imagen: "",
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const res = await fetch(`http://localhost:5000/products/${productId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Error al eliminar el producto");
        }

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  return (
    <div className={styles.adminSiteContainer}>
      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>{errorMessage}</p>
        </div>
      )}
      <h1 className={styles.adminSiteTitle}>Admin Dashboard</h1>
      <p>
        Bienvenido al panel de administración. Aquí podrás gestionar todos los
        aspectos de la tienda online.
      </p>

      {/* Formulario de añadir producto */}
      <h2>Añadir Producto</h2>
      <form className={styles.addProductForm} onSubmit={handleAddProduct}>
        <table>
          <thead>
            <tr>
              <th>Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nombre del Producto</td>
              <td>
                <input
                  type="text"
                  name="nombreproducto"
                  value={newProduct.nombreproducto}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Detalle</td>
              <td>
                <input
                  type="text"
                  name="detalle"
                  value={newProduct.detalle}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Precio</td>
              <td>
                <input
                  type="number"
                  name="precio"
                  value={newProduct.precio}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Imagen URL</td>
              <td>
                <input
                  type="text"
                  name="imagen"
                  value={newProduct.imagen}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Añadir Producto</button>
      </form>

      {/* Tabla de productos existentes */}
      <h2>Productos Existentes</h2>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.imagen} alt={product.nombreproducto} />
            <div className={styles.productCardContent}>
              <h2>{product.nombreproducto}</h2>
              <p>{product.detalle}</p>
              <p className={styles.price}>${product.precio}</p>
              <button onClick={() => handleDeleteProduct(product.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
