import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nayeon } from "../assets";
import { Paragraph, Title, Button } from "../components";
import "../styles/sections/Header.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  return (
    <header className="header-hero">
      <div className="hero-img-container" data-aos="fade-right">
        <img src={nayeon} alt="Mermelada Delvia" className="hero-img" />
      </div>
      <div className="hero-content">
        <Title as="h1" data-aos="fade-up" data-aos-delay="600">
          Regálate
          <br />
          momentos dulces,
          <br />
          disfruta lo natural
        </Title>
        <Paragraph
          className="hero-desc"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Descubre el placer auténtico de lo natural.
          <br />
          Mermeladas Delvia: frutas reales, sabor artesanal y alegría para tu
          día. Transforma tus desayunos y snacks en experiencias únicas, llenas
          de bienestar.
        </Paragraph>
        <div className="hero-actions" data-aos="fade-up" data-aos-delay="600">
          <Button variant="primary" onClick={() => navigate("/comprar")}>
            Comprar
          </Button>

          <Button
            variant="secondary"
            style={{ marginLeft: "1rem" }}
            onClick={() => navigate("/saber-mas")}
          >
            Saber más
          </Button>
        </div>
      </div>
    </header>
  );
}
