import { ForoModel } from "./foro-model";
import { UsuarioModel } from "./usuario-model";

export class TopicoModel {
    id: number;
    usuario: UsuarioModel;
    foro: ForoModel;
    titulo: string;
    descripcion: string;
    fecha: Date;
    latest: Date;

    constructor(id: number, usuario: UsuarioModel, foro: ForoModel, titulo: string, descripcion: string, fecha: Date, latest: Date) {
        this.id = id;
        this.usuario = usuario;
        this.foro = foro;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.latest = latest;
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

    getForo(): ForoModel {
        return this.foro;
    }

    setForo(foro: ForoModel): void {
        this.foro = foro;
    }

    getTitulo(): string {
        return this.titulo;
    }

    setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    getDescripcion(): string {
        return this.descripcion;
    }

    setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    getFecha(): Date {
        return this.fecha;
    }

    setFecha(fecha: Date): void {
        this.fecha = fecha;
    }
    getLatest(): Date {
        return this.latest;
    }
    setLatest(latest: Date): void {
        this.latest = latest;
    }
}
