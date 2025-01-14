import { EquipoModel } from "./equipo-model";
import { TorneoModel } from "./torneo-model";

export class TorneoEquiposModel {
    idEquipo: EquipoModel;
    idTorneo: TorneoModel;
    posicion: number;
    premio: number;

    constructor(
        idEquipo: EquipoModel,
        idTorneo: TorneoModel,
        posicion: number,
        premio: number
    ) {
        this.idEquipo = idEquipo;
        this.idTorneo = idTorneo;
        this.posicion = posicion;
        this.premio = premio;
    }
}