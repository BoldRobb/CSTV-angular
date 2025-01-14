import { Component, Input } from '@angular/core';
import { EquipoModel } from '../../../models/equipo-model';
import { RankingModel } from '../../../models/ranking-model';
import { CommonModule } from '@angular/common';
import { BaseChartDirective  } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType, Color, Legend } from 'chart.js';
import { JugadorModel } from '../../../models/jugador-model';
 
@Component({
  selector: 'app-team-information',
  standalone: true,
  imports: [CommonModule, BaseChartDirective ],
  templateUrl: './team-information.component.html',
  styleUrl: './team-information.component.css'
})
export class TeamInformationComponent {
  @Input() equipo: EquipoModel | undefined;
  @Input() ranking: RankingModel[] = [];
  @Input() jugadores: JugadorModel[] = [];
  rankingData: number[] = this.ranking.map(r => r.ranking);
  rankingDates: string[] = this.ranking.map(r => r.fechaInicio.toISOString().split('T')[0]);
  public lineChartData: any
    

  public lineChartOptions: ChartOptions = {
    responsive: true,
    borderColor: 'white',
    
    scales: {
      x: {
        
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: '#fff',
          font: {
            size: 20
          }
        },
        ticks: {
          color: '#fff',
          font: {
            size: 16
          }
        }
      },
      y: {
        reverse: true,
        display: true,
        ticks: {
          callback: (value) => {
            return this.rankingData.includes(value as number) ? value : '';
          },
          color: '#fff',
          font: {
            size: 16
          }
        },
        title: {
          display: true,
          text: 'Ranking',
          color: '#fff',
          font: {
            size: 20
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  public lineChartType: ChartType = 'line';
  constructor() { }

  ngOnInit(): void {
    this.getChart();
    console.log(this.rankingData);
  }

  getChart() : void {
    
    this.rankingData = this.ranking.map(r => r.ranking).reverse();
    this.rankingDates = this.ranking.map(r => new Date(r.fechaInicio).toISOString().split('T')[0]).reverse();

    this.lineChartData = {
      datasets: [
        {
          
          data: this.rankingData,
          label: 'Ranking',
          backgroundColor: '#ffffff',
          borderWidth: 2,
          borderColor: '#fff',
          pointBackgroundColor: '#212C39',
          pointHoverBorderColor: '#212C39',
          pointBorderColor: '#212C39',
          pointHoverBackgroundColor: '#212C39',
          pointBorderWidth: 4,
        }
      ], labels: this.rankingDates,
      
    }
  }
  getPeakRanking(): number {
    return Math.min(...this.ranking.map(r => r.ranking));
  }
}
