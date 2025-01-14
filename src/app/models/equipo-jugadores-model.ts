import { EquipoModel } from "./equipo-model";
import { JugadorModel } from "./jugador-model";

export class EquipoJugadoresModel {
    equipo: EquipoModel;
    jugador: JugadorModel;

    constructor(
        equipo: EquipoModel,
        jugador: JugadorModel
    ) {
        this.equipo = equipo;
        this.jugador = jugador;
    }
}