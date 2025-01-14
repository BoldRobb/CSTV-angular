import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NoticiaService } from '../../services/noticia-service.service';
import { ForoServiceService } from '../../services/foro-service.service';
import { NoticiaModel } from '../../models/noticia-model';
import { TopicoModel } from '../../models/topico-model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario-service.service';
import { UsuarioModel } from '../../models/usuario-model';
import { AlertComponent } from '../global/alert/alert.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ RouterModule, CommonModule, AlertComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  usuario?: UsuarioModel;
  noticias: NoticiaModel[] = [];
  topicos: TopicoModel[] = [];
  isLoggedIn = false;
  isCurrentUser = false;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  isLoading = true;
  pageNotFound=false;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private noticiaService: NoticiaService,
    private foroService: ForoServiceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      if (isNaN(userId)) {
        this.pageNotFound = true;
        this.isLoading = false;
      } else {
        this.loadUserContent(userId);
      }
    });

    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        this.isCurrentUser = currentUser && currentUser.id === this.usuario?.id;
      }
    });
  }

  loadUserContent(userId: number): void {
    this.usuarioService.getUsuario(userId).subscribe(usuario => {
      this.usuario = usuario;
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      this.isCurrentUser = currentUser && currentUser.id === usuario.id;
      this.isLoading = false;
    },
    error => {
      console.error('User not found', error);
        this.pageNotFound = true;
        this.isLoading = false;
    });

    this.noticiaService.getNoticiasByUserId(userId).subscribe(noticias => {
      this.noticias = noticias;
    });

    this.foroService.getTopicosByUserId(userId).subscribe(topicos => {
      this.topicos = topicos;
    });
  }

  logout(): void {
    this.authService.logout();
    this.showAlert('Has salido de la cuenta', 'success');
  }
  editProfile(): void {
    this.router.navigate(['/editProfile']);
  }
  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }
}