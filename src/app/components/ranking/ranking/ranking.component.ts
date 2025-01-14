import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RecentActivityComponent } from '../../foros/recent-activity/recent-activity.component';
import { RankingService } from '../../../services/ranking.service';
import { RankingModel } from '../../../models/ranking-model';
import { RankingContainerComponent } from '../ranking-container/ranking-container.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [RecentActivityComponent, CommonModule, RouterModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit {
  constructor(private rankingService: RankingService){}
  hoy: String = new Date().toISOString().split('T')[0]; // Convierte la fecha a formato yyyy-MM-dd
    
  ranking: RankingModel[] = [];

  ngOnInit(): void{
    this.rankingService.getRankingToday().subscribe(data => {
      this.ranking = data.sort((a, b) => a.ranking - b.ranking);
    });
  }
}
