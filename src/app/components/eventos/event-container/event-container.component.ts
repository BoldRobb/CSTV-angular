import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TorneoService } from '../../../services/torneo.service';
import { TorneoModel } from '../../../models/torneo-model';

@Component({
  selector: 'app-event-container',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-container.component.html',
  styleUrl: './event-container.component.css'
})
export class EventContainerComponent {
  @Input()id?: number;
  torneo!: TorneoModel;
  constructor(private torneoService: TorneoService) { }

  ngOnInit() { 
    if (this.id !== undefined) {
      this.torneoService.getTorneo(this.id).subscribe((data) => {
        this.torneo = data;
      });
    }
  }
}
