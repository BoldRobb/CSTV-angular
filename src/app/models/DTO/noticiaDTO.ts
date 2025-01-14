import { EquipoModel } from "../equipo-model";

export class NoticiaDTO {
  usuarioId: number;
  imagen: string;
  html: string;
  fecha: Date;
  titulo: string;
  equiposIds?: number[];
  torneosIds?: number[];
  jugadoresIds?: number[];
  constructor( usuario: number, imagen: string, html: string, fecha: Date, titulo: string, equipos?: number[], torneos?: number[], jugadores?: number[]) {
    this.usuarioId = usuario;
    this.imagen = imagen;
    this.html = html;
    this.fecha = fecha;
    this.titulo = titulo;
    this.equiposIds = equipos;
    this.torneosIds = torneos;
    this.jugadoresIds = jugadores;
  }



  getImagen(): string {
    return this.imagen;
  }

  setImagen(imagen: string): void {
    this.imagen = imagen;
  }

  getHtml(): string {
    return this.html;
  }

  setHtml(html: string): void {
    this.html = html;
  }

  getFecha(): Date {
    return this.fecha;
  }

  setFecha(fecha: Date): void {
    this.fecha = fecha;
  }

  getTitulo(): string {
    return this.titulo;
  }

  setTitulo(titulo: string): void {
    this.titulo = titulo;
  }
}
