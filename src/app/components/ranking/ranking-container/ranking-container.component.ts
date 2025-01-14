import { Component, Input } from '@angular/core';
import { EquipoModel } from '../../../models/equipo-model';
import { EquipoService } from '../../../services/equipo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RankingModel } from '../../../models/ranking-model';

@Component({
  selector: 'app-ranking-container',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ranking-container.component.html',
  styleUrl: './ranking-container.component.css'
})
export class RankingContainerComponent {
  @Input()ranking: RankingModel | undefined;
  encontrado: boolean = true;
  constructor(private equipoService: EquipoService) { }

  ngOnInit() { 
    if(this.ranking == undefined){
      this.encontrado = false;
    }
  }
}
