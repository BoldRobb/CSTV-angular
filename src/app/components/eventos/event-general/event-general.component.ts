import { Component, Input } from '@angular/core';
import { TorneoModel } from '../../../models/torneo-model';
import { TorneoService } from '../../../services/torneo.service';
import { TorneoEquiposModel } from '../../../models/torneo-equipos-model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NoticiaService } from '../../../services/noticia-service.service';
import { NoticiaModel } from '../../../models/noticia-model';
import { PartidoModel } from '../../../models/partido-model';
import { RondaModel } from '../../../models/rondaModel';

@Component({
  selector: 'app-event-general',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-general.component.html',
  styleUrl: './event-general.component.css'
})
export class EventGeneralComponent {
  @Input() torneo: TorneoModel | undefined;
  @Input() equipos: TorneoEquiposModel[] = [];
  @Input() partidos: PartidoModel[] = [];
  @Input() rondas: RondaModel[] = [];
  noticias: NoticiaModel[] = [];
  sortedEquipos: any[] = [];
  isLoading = false;
  constructor(private torneoService: TorneoService, private router: Router, private noticiaService: NoticiaService) { }
  ngOnInit(): void {
    if (this.torneo?.tipoBracket === 'Liga-SE') {
      this.sortedEquipos = this.sortEquiposByWins();
    }
    this.getEquipos();
    
    console.log(this.sortedEquipos);
  }

  getEquipos(): void {
    if (this.torneo != null) {

      this.noticiaService.getNoticiasForTorneo(this.torneo.id).subscribe(
        (data) => {
          this.noticias = data;
          
        },
        (error) => {
        }
      );
    }
  }
  formatPosition(position: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = position % 100;
    return position + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]) + " place";
  }

  formatCurrency(value: number | null | undefined): string {
    if (value == null) return '';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  getEquiposSortedByRanking(): TorneoEquiposModel[] {
    return [...this.equipos].sort((a, b) => {
      if (a?.idEquipo?.rankingActual == 0 && b?.idEquipo?.rankingActual == 0) {
        return a?.idEquipo?.nombre?.localeCompare(b?.idEquipo?.nombre || '') || 0;
      }
      if ( a.idEquipo.rankingActual === 0) return 1;
      if ( b.idEquipo.rankingActual === 0) return -1;
      return a.idEquipo.rankingActual - b.idEquipo.rankingActual;
    });
  }
  navigateToNoticia(id: number): void {
    this.router.navigate(['/news', id]);
  }
  sortEquiposByWins(): any[] {
    const equiposConResultados = this.equipos.map(equipo => ({
      nombre: equipo.idEquipo.nombre,
      logo: equipo.idEquipo.foto,
      wins: 0,
      losses: 0
    }));

    this.partidos.forEach(partido => {
      const equipoGanador = equiposConResultados.find(e => e.nombre === partido.idGanador.nombre);
      const equipoPerdedor = equiposConResultados.find(e => e.nombre === partido.idGanador.nombre);

      if (equipoGanador) {
        equipoGanador.wins += 1;
      }

      if (equipoPerdedor) {
        equipoPerdedor.losses += 1;
      }
    });

    return equiposConResultados.sort((a, b) => b.wins - a.wins);
  }
  getPartidosSortedByDate(): PartidoModel[] {
    return [...this.partidos].sort((a, b) => {
      return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
    });
  }
  getPartidosByRonda(id: number): PartidoModel[] {
    return this.partidos.filter(p => p.ronda.id === id);
  }
  redirectToTeam(id: number){
    this.router.navigate(['/team', id]);
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
  getFechasPartidos(): string[] {
    const fechas = this.partidos.map(partido => {
      const date = new Date(partido.fecha);
      return this.formatDateWithSuffix(date);
    });
    return Array.from(new Set(fechas));
  }
}
