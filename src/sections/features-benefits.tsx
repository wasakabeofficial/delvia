import { useEffect } from "react";
import "../styles/sections/Feature.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  mermelada,
  premium,
  proceso_artesanal,
  sabores_unicos,
  saludable,
} from "../assets";

export default function FeaturesBenefits() {
  useEffect(() => {
    AOS.init({ duration: 1600, once: true });
  }, []);

  return (
    <section
      className="features-benefits"
      id="caracteristicas"
      data-aos="fade-up"
    >
      <h2 className="features-title" data-aos="fade-up" data-aos-delay="100">
        ¿Por qué elegir nuestras mermeladas?
      </h2>
      <div className="features-list">
        <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
          <img src={mermelada} alt="Natural" />
          <h3>100% Naturales</h3>
          <p>
            Elaboradas solo con frutas frescas, sin conservadores, colorantes ni
            saborizantes artificiales.
          </p>
        </div>
        <div className="feature-card" data-aos="zoom-in" data-aos-delay="350">
          <img src={proceso_artesanal} alt="Artesanal" />
          <h3>Proceso Artesanal</h3>
          <p>
            Cocción lenta que mantiene textura, sabor y nutrientes originales de
            los ingredientes.
          </p>
        </div>
        <div className="feature-card" data-aos="zoom-in" data-aos-delay="500">
          <img src={saludable} alt="Saludable" />
          <h3>Saludables</h3>
          <p>
            Bajo en azúcares añadidos, ideales para desayunos, snacks y postres
            equilibrados.
          </p>
        </div>
        <div className="feature-card" data-aos="zoom-in" data-aos-delay="650">
          <img src={sabores_unicos} alt="Variedad" />
          <h3>Sabores Únicos</h3>
          <p>
            Fusiones como Coco con Maracuyá y Betabel, Manzana y Naranja.
            ¡Diferentes y deliciosas!
          </p>
        </div>
        <div className="feature-card" data-aos="zoom-in" data-aos-delay="800">
          <img src={premium} alt="Presentación" />
          <h3>Presentación Premium</h3>
          <p>
            Frascos de vidrio reutilizables, dos tamaños, etiqueta moderna y
            atractiva.
          </p>
        </div>
      </div>
    </section>
  );
}
