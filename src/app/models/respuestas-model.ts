import { UsuarioModel } from "./usuario-model";
import { TopicoModel } from "./topico-model";

export class RespuestasModel {
    id!: number;
    usuario: UsuarioModel;
    topico: TopicoModel;
    respuestaPadre: RespuestasModel;
    respuesta: string;
    fecha: Date;

    constructor(
        id: number,
        usuario: UsuarioModel,
        topico: TopicoModel,
        respuestaPadre: RespuestasModel,
        respuesta: string,
        fecha: Date
    ) {
        this.id = id;
        this.usuario = usuario;
        this.topico = topico;
        this.respuestaPadre = respuestaPadre;
        this.respuesta = respuesta;
        this.fecha = fecha;
    }
}