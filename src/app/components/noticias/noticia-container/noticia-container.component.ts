import { Component, Input, OnInit } from '@angular/core';
import { NoticiaModel } from '../../../models/noticia-model';
import { NoticiaService } from '../../../services/noticia-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-noticia-container',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './noticia-container.component.html',
  styleUrl: './noticia-container.component.css'
})
export class NoticiaContainerComponent implements OnInit {  
  @Input()id?: number;
  noticia!: NoticiaModel;
  timedif!: string;
  getDateDifference(date: Date): string {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
  constructor(private noticiaService: NoticiaService) {
   }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.noticiaService.getNoticias(this.id).subscribe(
        data => {
          this.noticia = data;         
          const fecha = new Date(this.noticia.fecha);
          this.timedif = this.getDateDifference(fecha);
          //console.log(this.noticia);
        },
        error => console.error(error),
      );
    } else {
      console.error('ID is undefined');
    }
  }
}
