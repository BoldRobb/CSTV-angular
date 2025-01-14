import { TorneoModel } from "./torneo-model";

export class RondaModel{
    id: number;
    torneo: TorneoModel;
    nombre: string;
    orden: number;
    constructor(
        id: number,
        torneo: TorneoModel,
        nombre: string,
        orden: number
    ) {
        this.id = id;
        this.nombre = nombre;
        this.orden = orden;
        this.torneo = torneo;
    }
}