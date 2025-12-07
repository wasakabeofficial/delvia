import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import "../../styles/layout/Footer.css";

export default function Footer() {
  return (
    <footer className="delvia-footer">
      <div className="footer-content">
        {/* Branding y Slogan */}
        <div className="footer-brand">
          <div className="footer-logo">Delvia</div>
          <div className="footer-slogan">Vive dulce, vive feliz</div>
        </div>
        {/* Menú rápido */}
        <nav className="footer-nav">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#galeria">Galería</a>
          <a href="#testimonios">Testimonios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        {/* Redes sociales */}
        <div className="footer-socials">
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>
      {/* Derechos */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Delvia. Todos los derechos reservados.
      </div>
    </footer>
  );
}
