import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecentActivityComponent } from '../../foros/recent-activity/recent-activity.component';
import { NoticiaPrincipalComponent } from '../noticia-principal/noticia-principal.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout-noticia',
  standalone: true,
  imports: [RouterModule, NoticiaPrincipalComponent, RecentActivityComponent, CommonModule],
  templateUrl: './layout-noticia.component.html',
  styleUrl: './layout-noticia.component.css'
})
export class LayoutNoticiaComponent {
  isOrganizer: boolean = false;
  isReportero: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  
  checkUserRole(): void {
    this.authService.getUserRolObservable().subscribe(userRole => {
      this.isOrganizer = userRole === 'organizador';
      this.isReportero = userRole === 'reportero';
      console.log(this.isOrganizer);
    }); // Método para obtener el rol del usuario
  }

  crearTorneo(): void {
    this.router.navigate(['/admin/eventsForm']);
  }
  crearJugador(): void {
    this.router.navigate(['/admin/playersForm']);
  }

  crearEquipo(): void {
    this.router.navigate(['/admin/teamsForm']);
  }
  crearNoticia(): void{
    this.router.navigate(['/admin/newsForm'])
  }

}
