import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Tienda Online",
  description: "Compra productos fácilmente con Next.js y NestJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <div className="container mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
