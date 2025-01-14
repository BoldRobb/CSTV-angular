export class TorneoEquiposDTO{
    idTorneo: number;
    idEquipo: number;
    posicion?: number;
    premio?: number;

    constructor(idTorneo: number, idEquipo: number, posicion?: number, premio?: number){
        this.idTorneo = idTorneo;
        this.idEquipo = idEquipo;
        this.posicion = posicion;
        this.premio = premio;
    }
}