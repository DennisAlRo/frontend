// pages/api/register.js
import { users } from "../../data"; // Supón que tienes un archivo para guardar usuarios temporalmente

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    // Validar los datos o realizar cualquier lógica adicional
    const newUser = { id: users.length + 1, name, password };
    users.push(newUser); // Guardar al nuevo usuario
    return res.status(200).json({ message: "Usuario registrado exitosamente" });
  }
  res.status(405).json({ message: "Método no permitido" });
}
