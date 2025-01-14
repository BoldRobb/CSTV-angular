import { Component } from '@angular/core';
import { PartidoModel } from '../../../models/partido-model';
import { JugadorModel } from '../../../models/jugador-model';
import { BanlistModel } from '../../../models/banlist-model';
import { MapaModel } from '../../../models/mapa-model';
import { MapaStatsModel } from '../../../models/mapa-stats-model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapasService } from '../../../services/mapas.service';
import { PartidoService } from '../../../services/partido.service';
import { EquipoService } from '../../../services/equipo.service';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';

@Component({
  selector: 'app-match-live',
  standalone: true,
  imports: [CommonModule, RouterModule, ScoreboardComponent],
  templateUrl: './match-live.component.html',
  styleUrl: './match-live.component.css'
})
export class MatchLiveComponent {
  isLoading=true;
  pageNotFound=false;
  id = 6;
  match?: PartidoModel;
  jugadores1: JugadorModel[] = [];
  jugadores2: JugadorModel[] = [];
  formattedDate: string = '';
  defaultPlayers: JugadorModel[] = Array(5).fill({ foto: 'icons/defaultPlayer.png', mote: '? ?', pais: 'MX' });
  banList: BanlistModel[] = [];
  mapas: MapaModel[] = [];
  stats: MapaStatsModel[] = [];
  mapaFound=false;
  statsFound=false;

  constructor(private mapaService: MapasService, private partidoService: PartidoService, private equipoService: EquipoService){

  }

  ngOnInit(){

  }

  getMatch(): void{
    if(this.id!=null){
    this.partidoService.getPartidoById(this.id).subscribe(
      (data) => {
        this.match = data;
        this.getPlayers();
        this.getBanlist();
        this.getMapas();
        this.formattedDate = this.formatDateWithSuffix(new Date(this.match.fecha));
      },
      (error) => {
        this.pageNotFound = true;
        this.isLoading = false;
      }
    );
    }
  }

  getBanlist(): void{
    if(this.match?.torneo?.id!=null){
    this.partidoService.getBanlistPartido(this.match.id).subscribe(
      (data) => {
        this.banList = data;
      },
      (error) => {
        
      }
    );
    }
  }

  getPlayers(): void{
    if(this.id!=null){

      if(this.match?.equipo1?.id!=null && this.match?.equipo2?.id!=null){

    this.equipoService.getJugadoresEquipo(this.match.equipo2.id).subscribe(
      (data) => {
        this.jugadores2 = data;
        
      },
      (error) => {
        
      });
    this.equipoService.getJugadoresEquipo(this.match.equipo1.id).subscribe(
      (data) => {
        this.jugadores1 = data;
        ;
      },
      (error) => {
      }
    );
    }
  }
  this.isLoading = false;
  }
  getMapas(): void{
    if(this.id!=null){
    this.mapaService.getMapasByPartidoId(this.id).subscribe(
      (data) => {
        this.mapas = data;

        this.mapaFound = true;
      }
    );
    this.mapaService.getMapasStatsByPartidoId(this.id).subscribe(
      (data) => {
        this.stats = data;
        this.statsFound = true;
      }
    );


  }
  }

  formatDateWithSuffix(date: Date): string {
    const day = date.getDate();
    const suffix = this.getDaySuffix(day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + suffix;
  }

  getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  getResult(equipo: number, match: MapaModel): number{
      if(equipo==1){
        return match.equipo1CT+match.equipo1T;
  }else{
    return match.equipo2CT+match.equipo2T;
  }
}

}
