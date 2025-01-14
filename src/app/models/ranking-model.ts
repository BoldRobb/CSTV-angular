import { EquipoModel } from "./equipo-model";

export class RankingModel {

    id: number;
    equipo: EquipoModel;
    ranking: number;
    fechaInicio: Date;
    fechaFin: Date;
    puntos: number;

    constructor(id: number, equipo: EquipoModel, ranking: number, fechaInicio: Date,fechaFin: Date,  puntos: number){
        this.id=id;
        this.equipo=equipo;
        this.ranking=ranking;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
        this.puntos=puntos;
    }

    getId(): number {
        return this.id;
      }
    
      setId(id: number): void {
        this.id = id;
      }
    
      getEquipo(): EquipoModel {
        return this.equipo;
      }
    
      setUsuario(equipo: EquipoModel): void {
        this.equipo = equipo;
      }
      getRanking(): number{
        return this.ranking;
      }
      setRanking( ranking: number){
        this.ranking = ranking;
      }

      getFechaInicio(): Date{
        return this.fechaInicio;
      }
      setFechaInicio(fechaInicio: Date){
        this.fechaInicio = fechaInicio;
      }
      getFechaFin(): Date{
        return this.fechaFin;
      }
      setFechaFin(fechaFin: Date){
        this.fechaFin = fechaFin;
      }
    getPuntos(): number{
        return this.puntos;
    }

    setPuntos(puntos: number){
        this.puntos = puntos;
    }
}
