import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import "../styles/sections/ContactoSection.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Modal } from "../components";

export default function ContactoSection() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1800, once: true });
  }, []);

  return (
    <section
      className="contact-split-section"
      id="contacto"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="contact-split-container">
        {/* COLUMNA IZQUIERDA */}
        <div className="contact-info">
          <h2>Contáctanos</h2>

          <div className="contact-info-block">
            <span className="contact-label">Correo electrónico:</span>
            <span>delvia.contacto@gmail.com</span>
          </div>

          <div className="contact-info-block">
            <span className="contact-label">Teléfono:</span>
            <span>+52 812‑345‑6789</span>
          </div>

          <div className="contact-info-block">
            <span className="contact-label">Dirección:</span>
            <span>
              Calle Sabores Naturales #456
              <br />
              Barrio Artesanal, Monterrey, NL <br />
              México
            </span>
          </div>

          <div className="contact-info-block">
            <span className="contact-label">Síguenos</span>
            <div className="contact-socials">
              <a
                href="https://www.facebook.com/share/17rx1jbVR2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/mermeladas_delvia?igsh=MWhwODRib2kwNmI1NQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA – FORMULARIO */}
        <form
          className="contact-form-split"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            setShowModal(true);
            // Limpia campos si lo necesitas
            e.currentTarget.reset();
          }}
        >
          <div className="contact-row-split">
            <div className="contact-field-split">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Escribe tu nombre"
                autoComplete="name"
              />
            </div>

            <div className="contact-field-split">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                placeholder="ejemplo@correo.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="contact-field-split">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              placeholder="Cuéntanos cómo podemos ayudarte..."
              rows={5}
            />
          </div>

          <button className="contact-btn-split" type="submit">
            Enviar mensaje
          </button>
        </form>
      </div>

      {/* MODAL DE REGISTRO EXITOSO */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Mensaje enviado correctamente"
        showCloseButton={true}
      >
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          Tu mensaje ha sido recibido. Nos pondremos en contacto pronto.
          <br />
        </div>
      </Modal>
    </section>
  );
}
