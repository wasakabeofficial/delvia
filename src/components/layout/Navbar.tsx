import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../styles/layout/Navbar.css";
import Button from "../ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper para scroll a ancla solo en home, navegación SPA si no
  const handleNav = (anchor: string) => {
    setOpen(false);
    if (location.pathname === "/") {
      // Espera al cerrar menú antes de hacer scroll
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      navigate(`/#${anchor}`);
      // Espera el cambio y luego scroll al ancla
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  };

  return (
    <nav className={`navbar${scrolled ? " navbar-scrolled" : ""}`}>
      <div className="navbar-brand">
        <img src={logo} alt="Logo Delvia" className="navbar-logo" />
        <span className="navbar-title">Delvia</span>
      </div>

      {/* Mobile menu button */}
      {!open && (
        <button
          className="navbar-menu-btn"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <FaBars size={38} color="#b3031b" />
        </button>
      )}

      {/* Mobile drawer */}
      <div className={`navbar-drawer${open ? " navbar-drawer-open" : ""}`}>
        <Button
          variant="delete"
          className="navbar-close-btn"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        >
          <FaTimes size={34} color="#b3031b" />
        </Button>
        <ul className="navbar-links">
          <li>
            <a
              href={location.pathname === "/" ? "#acerca" : "/#acerca"}
              onClick={(e) => {
                e.preventDefault();
                handleNav("acerca");
              }}
            >
              ¿Quiénes somos?
            </a>
          </li>
          <li>
            <a
              href={location.pathname === "/" ? "#productos" : "/#productos"}
              onClick={(e) => {
                e.preventDefault();
                handleNav("productos");
              }}
            >
              Productos
            </a>
          </li>
          <li>
            <a
              href={location.pathname === "/" ? "#galeria" : "/#galeria"}
              onClick={(e) => {
                e.preventDefault();
                handleNav("galeria");
              }}
            >
              Galería
            </a>
          </li>
          <li>
            <a
              href={location.pathname === "/" ? "#contacto" : "/#contacto"}
              onClick={(e) => {
                e.preventDefault();
                handleNav("contacto");
              }}
            >
              Contacto
            </a>
          </li>
        </ul>
      </div>

      {/* Desktop navigation */}
      <ul className="navbar-links-desktop">
        <li>
          <a
            href={location.pathname === "/" ? "#acerca" : "/#acerca"}
            onClick={(e) => {
              e.preventDefault();
              handleNav("acerca");
            }}
          >
            ¿Quiénes somos?
          </a>
        </li>
        <li>
          <a
            href={location.pathname === "/" ? "#productos" : "/#productos"}
            onClick={(e) => {
              e.preventDefault();
              handleNav("productos");
            }}
          >
            Productos
          </a>
        </li>
        <li>
          <a
            href={location.pathname === "/" ? "#galeria" : "/#galeria"}
            onClick={(e) => {
              e.preventDefault();
              handleNav("galeria");
            }}
          >
            Galería
          </a>
        </li>
        <li>
          <a
            href={location.pathname === "/" ? "#contacto" : "/#contacto"}
            onClick={(e) => {
              e.preventDefault();
              handleNav("contacto");
            }}
          >
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
}
