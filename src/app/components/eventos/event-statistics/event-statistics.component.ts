import { Component, Input } from '@angular/core';
import { TorneoModel } from '../../../models/torneo-model';
import { EquipoModel } from '../../../models/equipo-model';
import { MapaStatsDTO } from '../../../models/DTO/MapaStatsDTO';
import { MapaStatsModel } from '../../../models/mapa-stats-model';
import { TorneoEquiposModel } from '../../../models/torneo-equipos-model';
import { PartidoModel } from '../../../models/partido-model';
import { PartidoService } from '../../../services/partido.service';
import { MapasService } from '../../../services/mapas.service';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-event-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-statistics.component.html',
  styleUrl: './event-statistics.component.css',
  providers: [

    DecimalPipe

  ]
})
export class EventStatisticsComponent {
  @Input() torneo: TorneoModel | undefined;
  @Input() equipos: TorneoEquiposModel[] = [];
  @Input() partidos: PartidoModel[] = [];
  stats: MapaStatsModel[] = [];
  equiposStats: any[] = [];
  playersStats: any[] = [];
  isLoading = true;
  constructor( private partidoService: PartidoService, private mapasService: MapasService) { }
  ngOnInit(): void {
    this.getStats();
    console.log(this.stats);
  }

  getStats(): void {
  this.partidos.forEach(partido => {
    this.mapasService.getMapasStatsByPartidoId(partido.id).subscribe(stats => {
      this.stats = this.stats.concat(stats);
      if (this.partidos.indexOf(partido) === this.partidos.length - 1) {
        console.log(this.stats);
        if (this.stats.length > 0) {
          this.sumarStats();
          this.statsEquipos();
          this.isLoading = false;
        }
      }
    });
  });

  }

sumarStats(): void {
  const playerStatsMap: { [key: string]: { kills: number, deaths: number } } = {};

  this.stats.forEach(mapaStats => {
    
      if (!playerStatsMap[mapaStats.jugador.id]) {
        playerStatsMap[mapaStats.jugador.id] = { kills: 0, deaths: 0 };
      }
      playerStatsMap[mapaStats.jugador.id].kills += mapaStats.asesinatos;
      playerStatsMap[mapaStats.jugador.id].deaths += mapaStats.muertes;
    
  });

  this.playersStats = Object.keys(playerStatsMap).map(playerId => ({
    playerId,
    kills: playerStatsMap[playerId].kills,
    deaths: playerStatsMap[playerId].deaths,
    kd: playerStatsMap[playerId].kills / playerStatsMap[playerId].deaths
  }));
}

statsEquipos(): void {
  const equipoStatsMap: { [key: string]: { kills: number, deaths: number } } = {};
  this.stats.forEach(mapaStats => {
    const equipoId = mapaStats.jugador.equipoActual.id;
  
    if (!equipoStatsMap[equipoId]) {
      equipoStatsMap[equipoId] = { kills: 0, deaths: 0 };
    }
    equipoStatsMap[equipoId].kills += mapaStats.asesinatos;
    equipoStatsMap[equipoId].deaths += mapaStats.muertes;
  });
  
  this.equiposStats = Object.keys(equipoStatsMap).map(equipoId => ({
    equipoId,
    kills: equipoStatsMap[equipoId].kills,
    deaths: equipoStatsMap[equipoId].deaths,
    kd: equipoStatsMap[equipoId].kills / equipoStatsMap[equipoId].deaths
  }));
}
getPlayerName(playerId: string): string {
  const player = this.stats.find(stat => stat.jugador.id.toString() === playerId)?.jugador;
  return player ? `${player.nombreReal} (${player.mote})` : 'Unknown Player';
}

getTeamName(equipoId: string): string {
  const equipo = this.equipos.find(e => e.idEquipo.id.toString() === equipoId)?.idEquipo;
  return equipo ? equipo.nombre : 'Unknown Team';
}

}
