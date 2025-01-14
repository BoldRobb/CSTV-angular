import { TorneoModel } from "./torneo-model";
import { UsuarioModel } from "./usuario-model";

export class NoticiaModel {
  id: number;
  usuario: UsuarioModel;
  imagen: string;
  html: string;
  fecha: Date;
  titulo: string;
  equipos: TorneoModel[];
  torneos: TorneoModel[];
  jugadores: TorneoModel[];
  constructor(id: number, usuario: UsuarioModel, imagen: string, html: string, fecha: Date, titulo: string, equipos: TorneoModel[], torneos: TorneoModel[], jugadores: TorneoModel[]) {
    this.id = id;
    this.usuario = usuario;
    this.imagen = imagen;
    this.html = html;
    this.fecha = fecha;
    this.titulo = titulo;
    this.equipos = equipos;
    this.torneos = torneos;
    this.jugadores = jugadores;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getUsuario(): UsuarioModel {
    return this.usuario;
  }

  setUsuario(usuario: UsuarioModel): void {
    this.usuario = usuario;
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
