// pages/api/login.js
import { users } from "../../data"; // Supón que tienes un archivo para guardar usuarios temporalmente

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    const user = users.find((u) => u.name === name && u.password === password);
    if (user) {
      return res.status(200).json({ message: "Login exitoso" });
    }
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
  res.status(405).json({ message: "Método no permitido" });
}
