"use client";

import "./aboutus.css";

export default function AboutUs() {
  return (
    <div className="about-us-container">
      <h2 className="about-us-title">Sobre Nosotros</h2>
      
      <div className="about-us-content">
        <p className="about-us-text">
          <strong>Dennis:</strong> Hola, soy Dennis. Me apasiona el desarrollo de aplicaciones web y la tecnología en general. 
          A lo largo de mi carrera, he trabajado en diferentes proyectos de e-commerce y me he centrado en ofrecer experiencias de usuario 
          fluidas y agradables. Es un placer poder compartir con ustedes este proyecto de Tienda Online.
        </p>
        
        <p className="about-us-text">
          <strong>Antonio:</strong> Soy Antonio, un entusiasta del diseño web y la creación de interfaces intuitivas. Mi enfoque es crear 
          experiencias de usuario que no solo sean visualmente atractivas, sino también funcionales. Estoy emocionado de formar parte de este 
          proyecto y de contribuir a hacer de esta tienda en línea algo único para todos los usuarios.
        </p>

        <p className="about-us-text">
          <strong>Franco:</strong> Soy Franco, un apasionado de la programación y la mejora continua en todo lo que hago. Mi objetivo es 
          garantizar que nuestra tienda en línea ofrezca una experiencia óptima tanto en funcionalidad como en rendimiento. Me complace 
          mucho formar parte de este equipo y ayudar a brindar un excelente servicio a nuestros usuarios.
        </p>
      </div>
    </div>
  );
}
