export class MapaDTO{
    id: number;
    idPartido: number;
    mapa: string;
    equipo1T: number;
    equipo1CT: number;
    equipo2T: number;
    equipo2CT: number;

    constructor(id: number, idPartido: number, mapa: string, equipo1T: number, equipo1CT: number, equipo2T: number, equipo2CT: number) {
        this.id = id;
        this.idPartido = idPartido;
        this.mapa = mapa;
        this.equipo1T = equipo1T;
        this.equipo1CT = equipo1CT;
        this.equipo2T = equipo2T;
        this.equipo2CT = equipo2CT;
    }
}