import { Component, Input } from '@angular/core';
import { JugadorModel } from '../../../models/jugador-model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MapasService } from '../../../services/mapas.service';
import { MapaStatsDTO } from '../../../models/DTO/MapaStatsDTO';
import { MapaStatsModel } from '../../../models/mapa-stats-model';

@Component({
  selector: 'app-team-roster',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './team-roster.component.html',
  styleUrl: './team-roster.component.css'
})
export class TeamRosterComponent {
@Input() jugadores: JugadorModel[] = [];
stats: { [jugadorId: number]: MapaStatsModel[] } = {};
constructor(private mapaService: MapasService) { }

ngOnInit(): void {
  this.getStats();
}
getStats(): void {
  for (let jugador of this.jugadores) {
    this.mapaService.getMapaStatsByJugadorId(jugador.id).subscribe(
      (data) => {
        this.stats[jugador.id] = data;
      }
    );
  }
}

getKDpromedio(jugadorId: number): number {
  if (this.stats[jugadorId] != null) {
    const kdr = this.stats[jugadorId].map(stat => stat.kd);
    return kdr.reduce((a, b) => a + b, 0) / kdr.length;
  }
  return 0;
}
}
