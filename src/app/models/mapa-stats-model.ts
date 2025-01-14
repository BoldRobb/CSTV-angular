import { MapaModel } from "./mapa-model";
import { EquipoModel } from "./equipo-model";
import { JugadorModel } from "./jugador-model";

export class MapaStatsModel {
    id: number;
    mapa: MapaModel;
    equipo: EquipoModel;
    jugador: JugadorModel;
    asesinatos: number;
    muertes: number;
    kd: number;
    adr: number;

    constructor(
        id: number,
        mapa: MapaModel,
        equipo: EquipoModel,
        jugador: JugadorModel,
        asesinatos: number,
        muertes: number,
        kd: number,
        adr: number
    ) {
        this.id = id;
        this.mapa = mapa;
        this.equipo = equipo;
        this.jugador = jugador;
        this.asesinatos = asesinatos;
        this.muertes = muertes;
        this.kd = kd;
        this.adr = adr;
    }
}