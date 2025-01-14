import { Component, Input } from '@angular/core';
import { TorneoModel } from '../../../models/torneo-model';
import { CommonModule } from '@angular/common';
import { TorneoService } from '../../../services/torneo.service';
import { PartidoService } from '../../../services/partido.service';
import { PartidoModel } from '../../../models/partido-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-matches.component.html',
  styleUrl: './event-matches.component.css'
})
export class EventMatchesComponent {
  @Input() torneo: TorneoModel | undefined;
  @Input()partidos: PartidoModel[] = [];
  isLoading = false;
  constructor(private torneoService: TorneoService, private partidoService: PartidoService,
    private router: Router
   ) { }
  ngOnInit(): void {
    this.sortPartidosByFecha();
  }

  getPartidos(): void {
    if (this.torneo != null) {
      this.partidoService.getPartidoByTorneoId(this.torneo.id).subscribe(
        (data) => {
          this.partidos = data;
          this.isLoading = false;
          
        },
        (error) => {
          ;
        }
      );
    }
  }

  sortPartidosByFecha(): void {
    this.partidos.sort((a, b) => {
      const dateA = new Date(a.fecha).getTime();
      const dateB = new Date(b.fecha).getTime();
      return dateA - dateB;
    });
  }

  getFechasPartidos(): string[] {
    const fechas = this.partidos.map(partido => {
      const date = new Date(partido.fecha);
      return this.formatDateWithSuffix(date);
    });
    return Array.from(new Set(fechas));
  }

  getPartidosByFecha(fecha: string): PartidoModel[] {
    return this.partidos.filter(partido => {
      const date = new Date(partido.fecha);
      return this.formatDateWithSuffix(date) === fecha;
    });
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
  verPartido(id: number): void {
    this.router.navigate(['/match/', id]);
  }
}
