import { PartidoModel } from "./partido-model";

export class MapaModel {
    id: number;
    partido: PartidoModel;
    mapa: string;
    equipo1T: number;
    equipo1CT: number;
    equipo2T: number;
    equipo2CT: number;

    constructor(
        id: number,
        partido: PartidoModel,
        mapa: string,
        equipo1T: number,
        equipo1CT: number,
        equipo2T: number,
        equipo2CT: number
    ) {
        this.id = id;
        this.partido = partido;
        this.mapa = mapa;
        this.equipo1T = equipo1T;
        this.equipo1CT = equipo1CT;
        this.equipo2T = equipo2T;
        this.equipo2CT = equipo2CT;
    }
}