export class PartidoDTO{
     id: number;
     equipo1: number;
     equipo2: number;
     idTorneo: number;
     idGanador: number;
     formato: string;
     marcador: string;
     fecha: Date;
     tipo: string;
     ronda: number;
    constructor(
        id: number,
        equipo1: number,
        equipo2: number,
        idTorneo: number,
        idGanador: number,
        formato: string,
        marcador: string,
        fecha: Date,
        tipo: string,
        ronda: number
    ) {
        this.id = id;
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.idTorneo = idTorneo;
        this.idGanador = idGanador;
        this.formato = formato;
        this.marcador = marcador;
        this.fecha = fecha;
        this.tipo = tipo;
        this.ronda = ronda;
    }
}