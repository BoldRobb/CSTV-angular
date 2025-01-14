export class jugadorDTO{
 nombreReal: string;
 mote: string;
 estatus: string;
foto: string;
idEquipoActual: number;
pais: string;

    constructor(nombreReal: string, mote: string, estatus: string, foto: string, idEquipoActual: number, pais: string){
        this.nombreReal = nombreReal;
        this.mote = mote;
        this.estatus = estatus;
        this.foto = foto;
        this.idEquipoActual = idEquipoActual;
        this.pais = pais;

    }
}