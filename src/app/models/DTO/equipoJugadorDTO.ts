export class EquipoJugadorDTO {
    idEquipo: number;
    idJugador: number;

    constructor(idEquipo: number, idJugador: number) {
        this.idEquipo = idEquipo;
        this.idJugador = idJugador;
    }
}