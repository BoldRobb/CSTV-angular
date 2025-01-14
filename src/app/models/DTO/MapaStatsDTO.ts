export class MapaStatsDTO{
    id: number;
     idMapa: number;
     idEquipo: number;
     idJugador: number;
     asesinatos: number;
     muertes: number;
     KD: number;
     ADR: number;

    constructor(
        id: number,
        idMapa: number,
        idEquipo: number,
        idJugador: number,
        asesinatos: number,
        muertes: number,
        KD: number,
        ADR: number
    ) {
        this.id = id;
        this.idMapa = idMapa;
        this.idEquipo = idEquipo;
        this.idJugador = idJugador;
        this.asesinatos = asesinatos;
        this.muertes = muertes;
        this.KD = KD;
        this.ADR = ADR;
    }
}