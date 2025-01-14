import { Component } from '@angular/core';
import { RecentActivityComponent } from '../recent-activity/recent-activity.component';
import { RouterModule } from '@angular/router';
import { ForoServiceService } from '../../../services/foro-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forums',
  standalone: true,
  imports: [RecentActivityComponent, RouterModule, CommonModule],
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css'
})
export class ForumsComponent {
  constructor(private foroService: ForoServiceService) {}
  foros: any = [];
  ngOnInit() {
   this.foroService.getForos().subscribe(data =>{
      this.foros = data;
   },error=>
    {
      console.error(error);
    }); 

  }
}

