import { Component } from '@angular/core';
import { TopicoModel } from '../../../models/topico-model';
import { OnInit } from '@angular/core';
import { ForoServiceService } from '../../../services/foro-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.css'
})

  export class RecentActivityComponent implements OnInit {
    topicos: TopicoModel[] = [];

    constructor(private foroService: ForoServiceService) {}

    ngOnInit(): void {
      this.foroService.getTopicosLatest().subscribe((data: TopicoModel[]) => {
        this.topicos = data.slice(0, 15);
      });
    }
  }

