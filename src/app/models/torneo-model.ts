export class TorneoModel {

    id: number;
    nombre: string;
    fechaInicial: Date;
    fechaFinal: Date;
    logo: string;
    tipoBracket: string;
    prizepool: number;
    equipos_cant: number;
    localizacion: string;
    tipo: string;


    constructor(id: number, nombre: string, fechaInicial: Date, fechaFinal: Date, logo: string, tipo_bracket: string, prizepool: number, equipos_cant: number, localizacion: string, tipo: string) {
        this.id=id;
        this.nombre=nombre;
        this.fechaFinal=fechaFinal;
        this.fechaInicial=fechaInicial;
        this.logo=logo;
        this.tipoBracket=tipo_bracket;
        this.prizepool=prizepool;
        this.equipos_cant=equipos_cant;
        this.localizacion=localizacion;
        this.tipo=tipo;

    }

}
