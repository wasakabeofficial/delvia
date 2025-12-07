import { chaeyoung, foto_producto_pasto } from "../assets";
import { type ServiceCarouselItem } from "../types/content";

export const SERVICE_CAROUSEL_ITEMS: ServiceCarouselItem[] = [
  {
    image: foto_producto_pasto,
    title: "Coco con Maracuyá",
    desc: "Mermelada artesanal con pulpa de coco, miel y maracuyá. Sabor tropical, cremoso y exótico, hecha solo con ingredientes naturales y sin conservadores.",
    url: "/productos/coco-maracuya",
  },
  {
    image: chaeyoung,
    title: "Betabel, Manzana y Naranja",
    desc: "Una fusión original de betabel fresco, manzana y jugo de naranja. Dulce y cítrica, llena de color y energía natural. Perfecta para untar o usar en postres.",
    url: "/productos/betabel-manzana-naranja",
  },
];
