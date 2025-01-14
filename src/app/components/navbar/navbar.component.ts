import {Component, OnInit} from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import {LoginFormComponent} from '../../log/login-form/login-form.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TorneoService } from '../../services/torneo.service';
import { EquipoService } from '../../services/equipo.service';
import { JugadorService } from '../../services/jugador.service';
import { EquipoModel } from '../../models/equipo-model';
import { TorneoModel } from '../../models/torneo-model';
import { JugadorModel } from '../../models/jugador-model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LoginFormComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showLoginForm = false;
  isLoggedIn = false;
  username: string | null = null;
  searchResults: any[] = [];
  constructor(private router: Router, private authService: AuthService,
    private torneoService: TorneoService,
    private equipoService: EquipoService,
    private jugadorService: JugadorService
   ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.getUsernameObservable().subscribe(username => {
      this.username = username;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showLoginForm = false;
      }
    });
  }

  openLoginForm(): void {
    this.showLoginForm = true;
    
  }
  closeLoginForm(event: Event): void {
    this.showLoginForm = false;
  }
  onSearch(query: string): void {
    if (query.length > 1) {
      this.searchResults = [];
      this.torneoService.getTorneosByNombre(query).subscribe((torneos: TorneoModel[]) => {
        torneos.forEach(torneo => {
          this.searchResults.push({ type: 'Torneo', name: torneo.nombre, id: torneo.id });
        });
      });
      this.equipoService.getEquiposNombre(query).subscribe((equipos: EquipoModel[]) => {
        equipos.forEach(equipo => {
          this.searchResults.push({ type: 'Equipo', name: equipo.nombre, id: equipo.id });
        });
      });
      this.jugadorService.getPlayerByNombre(query).subscribe((jugadores: JugadorModel[]) => {
        jugadores.forEach(jugador => {
          this.searchResults.push({ type: 'Jugador', name: jugador.mote, id: jugador.id });
        });
      });
    } else {
      this.searchResults = [];
    }
  }

  navigateToResult(result: any): void {
    if (result.type === 'Torneo') {
      this.router.navigate(['/events/', result.id]);
    } else if (result.type === 'Equipo') {
      this.router.navigate(['/team/', result.id]);
    } else if (result.type === 'Jugador') {
      this.router.navigate(['/player/', result.id]);
    }
    this.searchResults = [];
    
  }
}