import "../styles/sections/Gallery.css";
import {
  dahyun,
  img_uno,
  jyhoyo,
  mermelada,
  mina,
  nayeon,
  tzuyu,
} from "../assets";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const videos = [
  {
    img: nayeon,
    title: "Mermelada de Betabel-Manzana y Coco-Maracuyá",
    subtitle: "Dos sabores artesanales, disfruta lo mejor de Delvia",
  },
  {
    img: tzuyu,
    title: "Variedad Artesanal Delvia",
    subtitle: "Sabor natural: Coco-Maracuyá y Betabel-Manzana",
  },
  {
    img: dahyun,
    title: "Sano y Artesanal al Aire Libre",
    subtitle: "Ingredientes frescos, ideales para tu picnic",
  },
  {
    img: jyhoyo,
    title: "Betabel-Manzana en tu Día de Campo",
    subtitle: "Lleva el sabor natural a cualquier lugar",
  },
  {
    img: mina,
    title: "Sabor Casero Todo el Año",
    subtitle: "Disfruta Delvia en tus desayunos",
  },
  {
    img: mermelada,
    title: "Frescura Artesanal en Cada Frasco",
    subtitle: "Coco-Maracuyá y Betabel-Manzana, perfectos para compartir",
  },
  {
    img: img_uno,
    title: "Mermelada de Coco con Maracuyá",
    subtitle: "Dulzura tropical, 100% natural",
  },
];

export default function GalleryGrid() {
  useEffect(() => {
    AOS.init({ duration: 1800, once: true });
  }, []);

  // Estado para el carrusel móvil
  const [current, setCurrent] = useState(0);

  // Detecta si es mobile (menor a 900px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Navegación carrusel
  const next = () => setCurrent((c) => (c + 1) % videos.length);
  const prev = () => setCurrent((c) => (c - 1 + videos.length) % videos.length);

  return (
    <section
      className="gallery-grid-section"
      id="galeria"
      data-aos="fade-right"
      data-aos-delay="200"
    >
      <h2 className="gallery-grid-title">Galería</h2>

      {/* MODO DESKTOP: GRID */}
      {!isMobile && (
        <div className="gallery-grid">
          {videos.map((video, idx) => (
            <div className="gallery-grid-item" key={idx}>
              <img src={video.img} alt={video.title} />
              <div className="gallery-grid-overlay" />
              <div className="gallery-grid-info">
                <div className="gallery-grid-text">
                  <div className="gallery-grid-title-main">{video.title}</div>
                  <div className="gallery-grid-title-sub">{video.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODO MOBILE: CARRUSEL */}
      {isMobile && (
        <div className="gallery-carousel">
          <button
            className="carousel-arrow left"
            onClick={prev}
            aria-label="Anterior"
            type="button"
          >
            &#8592;
          </button>

          <div className="gallery-carousel-item">
            <img src={videos[current].img} alt={videos[current].title} />
            <div className="gallery-carousel-overlay" />
            <div className="gallery-carousel-info">
              <div className="gallery-grid-title-main">
                {videos[current].title}
              </div>
              <div className="gallery-grid-title-sub">
                {videos[current].subtitle}
              </div>
            </div>
          </div>

          <button
            className="carousel-arrow right"
            onClick={next}
            aria-label="Siguiente"
            type="button"
          >
            &#8594;
          </button>
        </div>
      )}
    </section>
  );
}
