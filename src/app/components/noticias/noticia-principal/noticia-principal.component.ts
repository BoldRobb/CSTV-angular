import { Component, OnInit } from '@angular/core';
import { NoticiaModel } from '../../../models/noticia-model';
import { NoticiaService } from '../../../services/noticia-service.service';
import { NoticiaMainComponent } from '../noticia-main/noticia-main.component';
import { NoticiaContainerComponent } from '../noticia-container/noticia-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticia-principal',
  standalone: true,
  imports: [NoticiaMainComponent, NoticiaContainerComponent, CommonModule],
  templateUrl: './noticia-principal.component.html',
  styleUrl: './noticia-principal.component.css'
})
export class NoticiaPrincipalComponent implements OnInit {
  noticiasHoy: NoticiaModel[] = [];
  noticiasAyer: NoticiaModel[] = [];
  noticiasRestantes: NoticiaModel[] = [];
  isLoading = true;
  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.getNoticiasDesc().subscribe(
      noticias => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        this.noticiasHoy = noticias.filter(noticia => new Date(noticia.fecha).toDateString() === today.toDateString());
        this.noticiasAyer = noticias.filter(noticia => new Date(noticia.fecha).toDateString() === yesterday.toDateString());
        this.noticiasRestantes = noticias.filter(noticia => new Date(noticia.fecha) < yesterday);

        this.isLoading = false;
      },
      error => {
        console.error('Error loading noticias', error);
        this.isLoading = false;
      }
    );
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}
