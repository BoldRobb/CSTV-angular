import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../../services/noticia-service.service';
import { NoticiaModel } from '../../../models/noticia-model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-noticia-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticia-main.component.html',
  styleUrl: './noticia-main.component.css'
})

export class NoticiaMainComponent implements OnInit {
  noticia!: NoticiaModel;
  isLoading = true;
  constructor(private noticiaService: NoticiaService) { }

  ngOnInit(): void {
    
    this.noticiaService.getNoticiaMain().subscribe(
      data => {
        this.noticia = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading main noticia', error);
        this.isLoading = false;
      }
    );
  
  }
}
