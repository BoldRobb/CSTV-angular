import { Component, Input } from '@angular/core';
import { JugadorTeamlistModel } from '../../../models/jugador-teamlist-model';
import { BaseChartDirective  } from 'ng2-charts';
import { ChartConfiguration, ChartDataset, ChartOptions, ChartType, Color, Legend, Point } from 'chart.js';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-player-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-teams.component.html',
  styleUrl: './player-teams.component.css'
})
export class PlayerTeamsComponent {
@Input() teamHistory: JugadorTeamlistModel[] = [];
 // Variables de resumen
 totalTeams: number = 0;
 daysInCurrentTeam: number = 0;
 totalDaysInTeams: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.calculateSummary();
  }
  calculateSummary() {
    const currentDate = new Date();
    this.totalTeams = this.teamHistory.length;

    this.daysInCurrentTeam = this.teamHistory.reduce((total, item) => {
      if (!item.fechaFinal) {
        const diff = Math.floor((currentDate.getTime() - new Date(item.fechaInicio).getTime()) / (1000 * 60 * 60 * 24));
        return total + diff;
      }
      return total;
    }, 0);

    this.totalDaysInTeams = this.teamHistory.reduce((total, item) => {
      const endDate = item.fechaFinal ? new Date(item.fechaFinal) : currentDate;
      const diff = Math.floor((endDate.getTime() - new Date(item.fechaInicio).getTime()) / (1000 * 60 * 60 * 24));
      return total + diff;
    }, 0);
  }
}
