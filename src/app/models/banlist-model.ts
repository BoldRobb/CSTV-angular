export class BanlistModel {
    idPartido: number;
    mapa: string;
    estatus: string;
    idEquipo: number;

    constructor(
        idPartido: number,
        mapa: string,
        estatus: string,
        idEquipo: number
    ) {
        this.idPartido = idPartido;
        this.mapa = mapa;
        this.estatus = estatus;
        this.idEquipo = idEquipo;
    }
}