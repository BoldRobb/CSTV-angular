import { Component } from '@angular/core';
import { RecentActivityComponent } from '../../foros/recent-activity/recent-activity.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JugadorModel } from '../../../models/jugador-model';
import { JugadorService } from '../../../services/jugador.service';
import { PlayerInformationComponent } from '../player-information/player-information.component';
import { PlayerNewsComponent } from '../player-news/player-news.component';
import { PlayerMatchesComponent } from '../player-matches/player-matches.component';
import { PlayerTeamsComponent } from "../player-teams/player-teams.component";
import { MapasService } from '../../../services/mapas.service';
import { EquipoService } from '../../../services/equipo.service';
import { JugadorTeamlistModel } from '../../../models/jugador-teamlist-model';
import { NoticiaService } from '../../../services/noticia-service.service';
import { NoticiaModel } from '../../../models/noticia-model';
import { MapaStatsModel } from '../../../models/mapa-stats-model';
import { EquipoModel } from '../../../models/equipo-model';
import { MapaModel } from '../../../models/mapa-model';
import { PartidoService } from '../../../services/partido.service';
import { PartidoModel } from '../../../models/partido-model';

@Component({
  selector: 'app-player-layout',
  standalone: true,
  imports: [RecentActivityComponent, CommonModule, RouterModule, PlayerInformationComponent, PlayerMatchesComponent, PlayerNewsComponent, PlayerNewsComponent, PlayerTeamsComponent],
  templateUrl: './player-layout.component.html',
  styleUrl: './player-layout.component.css'
})
export class PlayerLayoutComponent {
  isLoading = true;
  pageNotFound = false;
  id?: number;
  player?: JugadorModel;
  currentComponent: string = "information";
  teamHistory: JugadorTeamlistModel[] = [];
  noticias: NoticiaModel[] = [];
  stats: MapaStatsModel[] = [];
  matches: PartidoModel[] = [];
  currentTeam: EquipoModel | undefined;
  constructor(private route: ActivatedRoute, 
    private jugadorService: JugadorService, private mapaService: MapasService,
    private equipoService: EquipoService, private noticiaService: NoticiaService,
    private partidoService: PartidoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (isNaN(this.id)) {
        this.pageNotFound = true;
        this.isLoading = false;
      } else {
        this.getPlayer();

      }
    });
  }

  getPlayer(): void {
  
    if (this.id != null) {
      this.jugadorService.getPlayer(this.id).subscribe(
        (data) => {
          this.player = data;
          this.getMapas();
        },
        (error) => {
          this.pageNotFound = true;
          this.isLoading = false;
        });  
        this.jugadorService.getPlayerTeamlist(this.id).subscribe(
          (data) => {
            this.teamHistory = data;
          });
        this.noticiaService.getNoticiasForJugador(this.id).subscribe(
          (data) => {
            this.noticias = data;
          });
  

        
      }
  }
  getMapas(): void {
    if(this.player?.equipoActual!=null){
      this.equipoService.getEquipos(this.player.equipoActual.id).subscribe(
        (data) => {
          this.currentTeam = data;
        });

        this.partidoService.getPartidoByEquipoId(this.player.equipoActual.id).subscribe(
          (data) => {
            
            this.matches = data;
            this.isLoading = false;
          });

      }
  }
  openComponent(componente: string ): void{
    this.currentComponent = componente;
  }
}
