import { Categoria } from "./Categoria";

export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  descuento: number;
  fecha: Date;
  idCategoria: string;
  categoria?: Categoria;
}