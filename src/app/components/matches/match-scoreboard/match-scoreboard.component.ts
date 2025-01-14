import { Component, Input } from '@angular/core';
import { PartidoModel } from '../../../models/partido-model';
import { MapaModel } from '../../../models/mapa-model';
import { MapaStatsModel } from '../../../models/mapa-stats-model';
import { CommonModule } from '@angular/common';
import { JugadorModel } from '../../../models/jugador-model';

@Component({
  selector: 'app-match-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-scoreboard.component.html',
  styleUrl: './match-scoreboard.component.css'
})
export class MatchScoreboardComponent {

  @Input() match: PartidoModel | undefined;
  @Input() mapas: MapaModel[] = [];
  @Input() stats: MapaStatsModel[] = [];
  jugadores: JugadorModel[] = [];
  selectedMap: number | 'all' = 'all';
  constructor() { }

  ngOnInit(): void {
    this.jugadores = this.getPlayersFromStats();
  }
  getPlayersFromStats(): JugadorModel[] {
    const playersMap: { [key: number]: JugadorModel } = {};
    this.stats.forEach(stat => {
      playersMap[stat.jugador.id] = stat.jugador;
    });
    return Object.values(playersMap);
  }

  selectMap(mapId: number | 'all'): void {
    this.selectedMap = mapId;
  }
  getSelectedMapName(): string {
    if (this.selectedMap === 'all') {
      return 'All Maps';
    } else {
      const selectedMap = this.mapas.find(map => map.id === this.selectedMap);
      return selectedMap ? selectedMap.mapa : 'Unknown Map';
    }
  }

  getSelectedStats(jugadorId: number): { asesinatos: number, muertes: number, kd: number, adr: number } | undefined {
    if (this.selectedMap === 'all') {
      return this.getStatsForAllMaps(jugadorId);
    } else {
      const stat = this.getStatsForMap(jugadorId, this.selectedMap);
      return stat ? {
        asesinatos: stat.asesinatos,
        muertes: stat.muertes,
        kd: stat.kd,
        adr: stat.adr
      } : undefined;
    }
  }

  getStatsForMap(jugadorId: number, mapaId: number): MapaStatsModel | undefined {
    return this.stats.find(stat => stat.jugador.id === jugadorId && stat.mapa.id === mapaId);
  }

  getStatsForAllMaps(jugadorId: number): { asesinatos: number, muertes: number, kd: number, adr: number } | undefined {
    const playerStats = this.stats.filter(stat => stat.jugador.id === jugadorId);
    if (playerStats.length === 0) return undefined;

    const totalKills = playerStats.reduce((sum, stat) => sum + stat.asesinatos, 0);
    const totalDeaths = playerStats.reduce((sum, stat) => sum + stat.muertes, 0);
    const totalKD = playerStats.reduce((sum, stat) => sum + stat.kd, 0) / playerStats.length;
    const totalADR = playerStats.reduce((sum, stat) => sum + stat.adr, 0) / playerStats.length;

    return {
      asesinatos: totalKills,
      muertes: totalDeaths,
      kd: totalKD,
      adr: totalADR
    };
  }
}
