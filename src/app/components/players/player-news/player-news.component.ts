import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NoticiaModel } from '../../../models/noticia-model';

@Component({
  selector: 'app-player-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './player-news.component.html',
  styleUrl: './player-news.component.css'
})
export class PlayerNewsComponent {
@Input() noticias: NoticiaModel[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToNoticia(id: number): void {
    this.router.navigate(['/news', id]);
  }
}
