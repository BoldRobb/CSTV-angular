import { Component, Input } from '@angular/core';
import { TorneoModel } from '../../../models/torneo-model';
import { EventContainerComponent } from '../../eventos/event-container/event-container.component';
import { CommonModule } from '@angular/common';
import { TorneoEquiposModel } from '../../../models/torneo-equipos-model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-events',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './team-events.component.html',
  styleUrl: './team-events.component.css'
})
export class TeamEventsComponent {
  @Input() eventos: TorneoEquiposModel[] = [];
  upcomingEvents: TorneoEquiposModel[] = [];
  endedEvents: TorneoEquiposModel[] = [];
  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.upcomingEvents = this.eventos.filter(evento => new Date(evento.idTorneo.fechaFinal) >= today);
    this.endedEvents = this.eventos.filter(evento => new Date(evento.idTorneo.fechaFinal) < today);
  }
  formatPosition(position: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = position % 100;
    return position + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]) + " place";
  }
}
