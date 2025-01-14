import { JugadorModel } from "./jugador-model";
import { EquipoModel } from "./equipo-model";

export class JugadorTeamlistModel {
    idJugador: JugadorModel;
    idEquipo: EquipoModel;
    fechaInicio: Date;
    fechaFinal: Date;

    constructor(
        idJugador: JugadorModel,
        idEquipo: EquipoModel,
        fechaInicio: Date,
        fechaFinal: Date
    ) {
        this.idJugador = idJugador;
        this.idEquipo = idEquipo;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
    }
}