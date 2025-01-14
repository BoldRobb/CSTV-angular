import { Component } from '@angular/core';
import { RecentActivityComponent } from '../../foros/recent-activity/recent-activity.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TorneoService } from '../../../services/torneo.service';
import { TorneoEquiposModel } from '../../../models/torneo-equipos-model';
import { TorneoModel } from '../../../models/torneo-model';
import { EventGeneralComponent } from '../event-general/event-general.component';
import { EventResultsComponent } from '../event-results/event-results.component';
import { EventStatisticsComponent } from '../event-statistics/event-statistics.component';
import { EventMatchesComponent } from '../event-matches/event-matches.component';
import { PartidoModel } from '../../../models/partido-model';
import { PartidoService } from '../../../services/partido.service';
import { RondaModel } from '../../../models/rondaModel';

@Component({
  selector: 'app-event-inidividual',
  standalone: true,
  imports: [RecentActivityComponent, CommonModule, RouterModule, EventGeneralComponent, EventResultsComponent, EventStatisticsComponent, EventMatchesComponent],
  templateUrl: './event-inidividual.component.html',
  styleUrl: './event-inidividual.component.css'
})
export class EventInidividualComponent {
  id?: number;
  isLoading=true;
  pageNotFound=false;
  torneo?: TorneoModel;
  partidos: PartidoModel[] = [];
  equipos: TorneoEquiposModel[] = [];
  rondas: RondaModel[] = [];
  currentComponent: string = "general";
  constructor(private route: ActivatedRoute,
    private torneoService: TorneoService,
    private partidoService: PartidoService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getTorneo();
  }

  getTorneo(): void{
    if(this.id!=null){
    this.torneoService.getTorneo(this.id).subscribe(
      (data) => {
        
        this.torneo = data;
        this.getDataTorneo();
      },
      (error) => {
        this.pageNotFound = true;
        this.isLoading = false;
      }
    );

  }

}

  getDataTorneo(): void {
    if(this.id!=null){
    this.partidoService.getPartidoByTorneoId(this.id).subscribe(
      (data) => {
        this.partidos = data;
        
      },
      (error) => {
        console.error('Error loading main torneo', error);
      }
    );
    this.torneoService.getEquiposTorneo(this.id).subscribe(
      (data) => {
        this.equipos = data;
      },
      (error) => {
        console.error('Error loading main torneo', error);
      }
      );
    this.torneoService.getRondaTorneo(this.id).subscribe(
      (data) => {
        this.rondas = data;
        this.isLoading = false;
      },
      (error) => {
      console.error('Error loading main torneo', error);
      }

      );
    }
  }
openComponent(component: string): void{
  this.currentComponent = component;
};
}
