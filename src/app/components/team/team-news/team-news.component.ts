import { Component, Input } from '@angular/core';
import { NoticiaModel } from '../../../models/noticia-model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-news.component.html',
  styleUrl: './team-news.component.css'
})
export class TeamNewsComponent {
  @Input() noticias: NoticiaModel[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToNoticia(id: number): void {
    this.router.navigate(['/news', id]);
  }
}
