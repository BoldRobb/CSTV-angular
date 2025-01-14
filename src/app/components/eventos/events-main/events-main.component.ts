import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TorneoModel } from '../../../models/torneo-model';
import { TorneoService } from '../../../services/torneo.service';
import { RecentActivityComponent } from '../../foros/recent-activity/recent-activity.component';
import { EventContainerComponent } from '../event-container/event-container.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-events-main',
  standalone: true,
  imports: [RecentActivityComponent, CommonModule, EventContainerComponent, RouterModule],
  templateUrl: './events-main.component.html',
  styleUrl: './events-main.component.css',
})
export class EventsMainComponent {

  constructor(private torneoService: TorneoService) { }
  torneoMain?: TorneoModel;
  torneos?: TorneoModel[];
  torneosProximos: TorneoModel[] = [];
  torneosActuales: TorneoModel[] = [];
  torneosTerminados: TorneoModel[] = [];
  ngOnInit() {
    this.torneoService.getTorneoMain().subscribe((data) => {
      this.torneoMain = data;
    });
    this.torneoService.getTorneos().subscribe((data) => {
      this.torneos = data;
      const today = new Date();
      if (this.torneos) {
        this.torneosProximos = this.torneos.filter(torneo => new Date(torneo.fechaInicial) > today);
        this.torneosActuales = this.torneos.filter(torneo => new Date(torneo.fechaInicial) <= today && new Date(torneo.fechaFinal) >= today);
        this.torneosTerminados = this.torneos.filter(torneo => new Date(torneo.fechaFinal) < today);

      }
    });

  }
}
