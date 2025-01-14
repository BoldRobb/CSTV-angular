import { EquipoModel } from "./equipo-model";
import { RondaModel } from "./rondaModel";
import { TorneoModel } from "./torneo-model";

export class PartidoModel{

    id!: number;
    equipo1: EquipoModel;
    equipo2: EquipoModel;
    torneo: TorneoModel;
    idGanador: EquipoModel;
    formato: string;
    marcador:string;
    fecha: Date;
    tipo: string;
    ronda: RondaModel;
    constructor(
        id: number,
        equipo1: EquipoModel,
        equipo2: EquipoModel,
        idTorneo: TorneoModel,
        idGanador: EquipoModel,
        formato: string,
        marcador: string,
        fecha: Date,
        tipo: string,
        ronda: RondaModel

    ) {
        this.id = id;
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.torneo = idTorneo;
        this.idGanador = idGanador;
        this.formato = formato;
        this.marcador = marcador;
        this.fecha = fecha;
        this.tipo = tipo;
        this.ronda = ronda;
    }


}