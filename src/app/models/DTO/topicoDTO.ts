export class TopicoDTO{

    id: number;
    idUsuario: number;
    idForo: number;
    titulo: string;
    descripcion: string;
    fecha: Date;
    latest: Date;

    constructor(id: number, idUsuario: number, idForo: number, titulo: string, descripcion: string, fecha: Date, latest: Date){
        this.id = id;
        this.idUsuario = idUsuario;
        this.idForo = idForo;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.latest = latest;
    }
}