import { useEffect } from "react";
import { logo } from "../assets";
import "../styles/sections/About.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1800, once: true });
  }, []);

  return (
    <section className="about" id="acerca">
      <div className="about-content">
        <h2 className="about-title" data-aos="fade-right">
          ¿Quiénes somos?
        </h2>
        <p className="about-tagline" data-aos="fade-right" data-aos-delay="200">
          Tradición y sabor natural en cada frasco
        </p>
        <p className="about-text" data-aos="fade-up" data-aos-delay="350">
          En Delvia somos una marca dedicada a crear mermeladas artesanales
          elaboradas con frutas seleccionadas y recetas tradicionales. Creemos
          en los sabores auténticos, por eso cada frasco está hecho con
          dedicación, ingredientes naturales y procesos cuidados que respetan el
          sabor original de la fruta.
          <br />
          <br />
          Nuestro compromiso es ofrecer productos honestos, frescos y llenos de
          calidad, pensando siempre en brindar una experiencia deliciosa y
          casera. En Delvia trabajamos con pasión para que cada mermelada sea un
          detalle especial en tu mesa.
        </p>
        {/* Puedes agregar valores, testimonios, etc aquí */}
      </div>
      <div className="about-image" data-aos="zoom-in" data-aos-delay="250">
        <img src={logo} alt="Equipo Delvia" />
      </div>
    </section>
  );
}
