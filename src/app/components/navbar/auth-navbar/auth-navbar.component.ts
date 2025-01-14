import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TorneoService } from '../../../services/torneo.service';
import { EquipoService } from '../../../services/equipo.service';
import { JugadorService } from '../../../services/jugador.service';
import { TorneoModel } from '../../../models/torneo-model';
import { EquipoModel } from '../../../models/equipo-model';
import { JugadorModel } from '../../../models/jugador-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.css'
})
export class AuthNavbarComponent implements OnInit {
  username: string | null = null;
  id: number | null = null;
  searchResults: any[] = [];
  constructor(private router: Router, 
    private authService: AuthService,
    private torneoService: TorneoService,
    private equipoService: EquipoService,
    private jugadorService: JugadorService
  ) {}

  ngOnInit(): void {
    this.authService.getUsernameObservable().subscribe(username => {
      this.username = username;
      
    });
    this.authService.getUserIdObservable().subscribe(id => {
      this.id = id;
    });
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