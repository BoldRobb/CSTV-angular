import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EquipoService } from '../../../services/equipo.service';
import { EquipoModel } from '../../../models/equipo-model';
import { JugadorModel } from '../../../models/jugador-model';
import { CommonModule } from '@angular/common';
import { RecentActivityComponent } from '../../foros/recent-activity/recent-activity.component';
import { TeamEventsComponent } from '../team-events/team-events.component';
import { TeamInformationComponent } from '../team-information/team-information.component';
import { TeamMatchesComponent } from '../team-matches/team-matches.component';
import { TeamResultsComponent } from '../team-results/team-results.component';
import { TeamNewsComponent } from '../team-news/team-news.component';
import { TeamRosterComponent } from '../team-roster/team-roster.component';
import { RankingComponent } from '../../ranking/ranking/ranking.component';
import { RankingService } from '../../../services/ranking.service';
import { RankingModel } from '../../../models/ranking-model';
import { TorneoService } from '../../../services/torneo.service';
import { TorneoModel } from '../../../models/torneo-model';
import { TorneoEquiposModel } from '../../../models/torneo-equipos-model';
import { PartidoModel } from '../../../models/partido-model';
import { PartidoService } from '../../../services/partido.service';
import { NoticiaModel } from '../../../models/noticia-model';
import { NoticiaService } from '../../../services/noticia-service.service';

@Component({
  selector: 'app-team-layout',
  standalone: true,
  imports: [CommonModule, RecentActivityComponent, RouterModule, TeamEventsComponent, TeamInformationComponent,
    TeamMatchesComponent, TeamResultsComponent, TeamNewsComponent, TeamRosterComponent
  ],
  templateUrl: './team-layout.component.html',
  styleUrl: './team-layout.component.css'
})
export class TeamLayoutComponent implements OnInit{

  isLoading=true;
  pageNotFound = false;
  id? : number;
  equipo?:EquipoModel;
  jugadores: JugadorModel[] = [];
  currentComponent: string = "information"
  ranking: RankingModel[] = [];
  eventos: TorneoEquiposModel[] = [];
  defaultPlayers: JugadorModel[] = Array(5).fill({ foto: 'icons/defaultPlayer.png', mote: '? ?', pais: 'MX' });
  partidos: PartidoModel[] = [];
  noticias: NoticiaModel[] = [];

  constructor(private route: ActivatedRoute, private equipoService: EquipoService,
    private rankingService: RankingService, private torneoService: TorneoService,
    private partidoService: PartidoService, private noticiaService: NoticiaService
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (isNaN(this.id)) {
        this.pageNotFound = true;
      } else {
        this.getTeam();
        this.getRanking();
        
      }
    });
  }

  getTeam():void{
    if(this.id!=null){
        this.equipoService.getEquipos(this.id).subscribe(data =>{
          this.equipo=data;
          this.isLoading=false;
        },
      error=>{
        this.pageNotFound=true;
        this.isLoading=false;
      });
      this.equipoService.getJugadoresEquipo(this.id).subscribe(data=>{
        this.jugadores=data;
      });

      this.torneoService.getTorneosByEquipo(this.id).subscribe(data=>{
        this.eventos=data;
      });
      this.partidoService.getPartidoByEquipoId(this.id).subscribe(data=>{
        this.partidos=data;

      });
      this.noticiaService.getNoticiasForEquipo(this.id).subscribe(data=>{
        this.noticias=data;
      });


    }
  }
  getRanking():void{
    if(this.id!=null){
      this.rankingService.getRankingTeam(this.id).subscribe(data=>{
        this.ranking=data;
      })
    }
  }


  openComponent(componente: string ): void{
    this.currentComponent = componente;
  }
}



