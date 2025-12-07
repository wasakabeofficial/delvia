export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  color: string;
};

export const PRODUCTOS: Producto[] = [
  {
    id: 1,
    nombre: "Mermelada de Coco con Maracuyá",
    descripcion:
      "Contiene pulpa de coco, miel, maracuyá y agua natural. Sin colorantes ni conservadores artificiales. Cocción lenta para conservar nutrientes.",
    precio: 95,
    color: "var(--color-yellow)", // Ajusta si deseas otro color
  },
  {
    id: 2,
    nombre: "Mermelada de Betabel con Manzana y Naranja",
    descripcion:
      "Elaborada con betabel fresco, manzana verde, jugo natural de naranja y miel. 100% natural y artesanal, sin saborizantes artificiales.",
    precio: 95,
    color: "var(--color-red)", // Ajusta si deseas otro color
  },
];
