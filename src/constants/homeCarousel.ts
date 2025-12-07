import { nayeon } from "../assets";

export type HomeCarouselItem = {
  image: string;
  title: string;
  desc: string;
  target?: string;
  background?: string;
};

export const HOME_CAROUSEL_ITEMS: HomeCarouselItem[] = [
  {
    image: nayeon,
    title: "Sabor 100% Natural",
    desc: "Mermeladas artesanales hechas solo con fruta real, sin conservadores.",
    target: "productos",
  },
  {
    image: nayeon,
    title: "Directo a tu mesa",
    desc: "Entrega rápida y fresca en la puerta de tu casa o negocio.",
    target: "contacto",
  },
  {
    image: nayeon,
    title: "Variedad Delvia",
    desc: "Descubre todos nuestros sabores: mango, fresa, frutos rojos y más.",
    target: "galeria",
  },
];
