import { Component, Input } from '@angular/core';
import { JugadorModel } from '../../../models/jugador-model';
import { MapaStatsModel } from '../../../models/mapa-stats-model';
import { PartidoModel } from '../../../models/partido-model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapasService } from '../../../services/mapas.service';

@Component({
  selector: 'app-player-information',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player-information.component.html',
  styleUrl: './player-information.component.css'
})
export class PlayerInformationComponent {
@Input() player: JugadorModel | undefined;
stats: MapaStatsModel[] = [];
@Input() matches: PartidoModel[] = [];
  constructor(
    private mapaService: MapasService
  ) { }

  ngOnInit(): void {
    if(this.player){
    this.mapaService.getMapaStatsByJugadorId(this.player?.id).subscribe(
      (data) => {
        this.stats = data;
        
      });
    }
  }
  getAverageKills(): number {
    if (this.stats.length == 0) return 0;
    return this.stats.reduce((sum, stat) => sum + stat.asesinatos, 0) / this.stats.length;
  }

  getAverageDeaths(): number {
    if (this.stats.length == 0) return 0;
    return this.stats.reduce((sum, stat) => sum + stat.muertes, 0) / this.stats.length;
  }

  getAverageKD(): number {
    if (this.stats.length == 0) return 0;
    return this.stats.reduce((sum, stat) => sum + stat.kd, 0) / this.stats.length;
  }

  getAverageADR(): number {
    if (this.stats.length == 0) return 0;
    return this.stats.reduce((sum, stat) => sum + stat.adr, 0) / this.stats.length;
  }
}
