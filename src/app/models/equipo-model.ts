export class EquipoModel {
    id: number;
    nombre: string;
    rankingActual: number;
    rankingMaximo: number;
    twitter: string;
    instagram: string;
    foto: string;

    constructor( id: number,nombre: string, rankingA: number, rankingM: number, twitter: string, instagram: string, foto: string){
         this.id=id;
        this.nombre=nombre;
        this.rankingActual=rankingA;
        this.rankingMaximo=rankingM;
        this.twitter=twitter;
        this.instagram=instagram;
        this.foto=foto;
     }

     getId(): number{
        return this.id ?? 0;
     }
     setId(id: number): void{
        this.id=id;
     }

     getNombre(): string{
        return this.nombre;
     }

     setNombre(nombre: string){
        this.nombre=nombre;
     }

     getRankingActual(): number{
        return this.rankingActual;
     }

     setRankingActual(ranking:  number){
        this.rankingActual=ranking;
     }

     getRankingMaximo(): number{
        return this.rankingMaximo;
     }

     setRankingMaximo(ranking:  number){
        this.rankingMaximo=ranking;
     }

     getTwitter(): string{
        return this.twitter;
     }

     settwitter(twitter: string){
        this.twitter=twitter;
     }
     
     getInstagram(): string{
        return this.instagram;
     }

     setInstagram(instagram: string){
        this.nombre=instagram;
     }
     getFoto(): string{
        return this.foto;
     }

     setFoto(foto: string){
        this.foto=foto;
     }

}
