// TestimoniosSection.tsx
import { cara_dos, cara_uno } from "../assets";
import "../styles/sections/TestimoniosSection.css";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Puedes reemplazar los avatares por fotos reales, logos, etc.
const testimonios = [
  {
    nombre: "Alejandra Gutiérrez",
    cargo: "Chef y Cliente habitual",
    texto:
      "Las mermeladas Delvia superaron mis expectativas. El sabor natural y la textura son perfectos, ¡me encanta usarlas en mis recetas!",
    avatar: cara_uno,
  },
  {
    nombre: "Luis Martínez",
    cargo: "Padre de familia",
    texto:
      "Ideal para el desayuno de mis hijos. Sin conservadores y con ingredientes naturales, ¡por fin un producto saludable y delicioso!",
    avatar: cara_dos,
  },
  {
    nombre: "Sofía Torres",
    cargo: "Emprendedora de repostería",
    texto:
      "El toque artesanal de Delvia marca la diferencia en mis postres. Mis clientes lo notan y siempre preguntan por la mermelada.",
    avatar: cara_uno,
  },
];

export default function TestimoniosSection() {
  useEffect(() => {
    AOS.init({ duration: 1800, once: true });
  }, []);
  // Slider automático para mobile
  const [current, setCurrent] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 900;

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonios.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <section
      className="testimonios-section"
      id="testimonios"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2 className="testimonios-title">Lo que opinan nuestros clientes</h2>

      {/* Desktop: Grid 3 columnas */}
      {!isMobile && (
        <div
          className="testimonios-grid"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          {testimonios.map((testi, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-avatar">
                <img src={testi.avatar} alt={testi.nombre} />
              </div>
              <div className="testi-text">“{testi.texto}”</div>
              <div className="testi-name">{testi.nombre}</div>
              <div className="testi-role">{testi.cargo}</div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile: Carrusel */}
      {isMobile && (
        <div
          className="testimonios-carousel"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <div className="testi-card">
            <div className="testi-avatar">
              <img
                src={testimonios[current].avatar}
                alt={testimonios[current].nombre}
              />
            </div>
            <div className="testi-text">“{testimonios[current].texto}”</div>
            <div className="testi-name">{testimonios[current].nombre}</div>
            <div className="testi-role">{testimonios[current].cargo}</div>
          </div>
          <div className="testi-dots">
            {testimonios.map((_, i) => (
              <span
                key={i}
                className={i === current ? "active" : ""}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
