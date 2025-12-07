import "../styles/sections/Services.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SERVICE_CAROUSEL_ITEMS } from "../constants/services";
import type { ServiceCarouselItem } from "../types/content";
import { Button } from "../components";

import AOS from "aos";
import "aos/dist/aos.css";

const CAROUSEL_ITEMS: ServiceCarouselItem[] = SERVICE_CAROUSEL_ITEMS;

export default function Services() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => setActive((a) => (a + 1) % CAROUSEL_ITEMS.length),
      6000,
    );
    return () => clearTimeout(timer);
  }, [active]);

  const prev = () =>
    setActive((prev) => (prev === 0 ? CAROUSEL_ITEMS.length - 1 : prev - 1));

  const next = () =>
    setActive((prev) => (prev === CAROUSEL_ITEMS.length - 1 ? 0 : prev + 1));

  const getTransform = (i: number) => {
    const offset = i - active;

    if (offset === 0) return "translateX(0) scale(1.1) rotateY(0deg)";
    if (offset === -1 || (active === 0 && i === CAROUSEL_ITEMS.length - 1))
      return "translateX(-65%) scale(0.92) rotateY(22deg)";
    if (offset === 1 || (active === CAROUSEL_ITEMS.length - 1 && i === 0))
      return "translateX(65%) scale(0.92) rotateY(-22deg)";
    if (offset === -2 || (active <= 1 && i === CAROUSEL_ITEMS.length - 2))
      return "translateX(-130%) scale(0.8) rotateY(40deg)";
    if (offset === 2 || (active >= CAROUSEL_ITEMS.length - 2 && i === 0))
      return "translateX(130%) scale(0.8) rotateY(-40deg)";

    return "translateX(0) scale(0.7) rotateY(0deg)";
  };

  return (
    <section
      id="productos"
      className="services-hero"
      data-aos="fade-up"
      data-aos-delay="150"
      style={{
        backgroundImage: `
          linear-gradient(90deg, #0000009c 40%, transparent 100%),
          url('${CAROUSEL_ITEMS[active].image}')`,
      }}
    >
      <div className="services-overlay" />

      <div className="services-content">
        <h1
          className="services-title"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          {CAROUSEL_ITEMS[active].title}
        </h1>

        <p className="services-desc" data-aos="fade-right" data-aos-delay="450">
          {CAROUSEL_ITEMS[active].desc}
        </p>

        <Button
          className="services-btn"
          data-aos="fade-right"
          data-aos-delay="600"
          onClick={() => navigate("/saber-mas")}
        >
          <span>SABER MÁS</span>
        </Button>

        <div
          className="carousel-nav coverflow-nav"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <Button
            className="carousel-arrow left"
            onClick={prev}
            aria-label="Previous"
          >
            <FiChevronLeft size={50} />
          </Button>

          <div className="services-carousel coverflow-carousel">
            {CAROUSEL_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`carousel-img-wrapper coverflow-card${
                  i === active ? " active" : ""
                }`}
                style={{
                  transform: getTransform(i),
                  zIndex: i === active ? 2 : 1,
                  opacity:
                    Math.abs(i - active) > 2 &&
                    !(active === 0 && i === CAROUSEL_ITEMS.length - 1) &&
                    !(active === CAROUSEL_ITEMS.length - 1 && i === 0)
                      ? 0
                      : 1,
                }}
                onClick={() => setActive(i)}
                tabIndex={0}
                aria-label={`Show service ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(i);
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="carousel-img"
                />

                <div className="carousel-info">
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="carousel-arrow right"
            onClick={next}
            aria-label="Next"
          >
            <FiChevronRight size={50} />
          </Button>
        </div>
      </div>
    </section>
  );
}
