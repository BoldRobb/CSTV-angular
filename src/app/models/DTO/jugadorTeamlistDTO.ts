export class JugadorTeamlistDTO{

    idJugador: number;
    idEquipo: number;
    fechaInicio: Date;
    fechaFinal: Date;

    constructor(idJugador: number, idEquipo: number, fechaInicio: Date, fechaFinal: Date){
        this.idJugador = idJugador;
        this.idEquipo = idEquipo;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
    }
}