import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JugadorService } from '../../services/jugador.service';
import { EquipoService } from '../../services/equipo.service';
import { JugadorModel } from '../../models/jugador-model';
import { EquipoModel } from '../../models/equipo-model';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../components/global/alert/alert.component';
import { COUNTRIES } from '../../../global/countries';
import { jugadorDTO } from '../../models/DTO/jugadorDTO';
import { JugadorTeamlistModel } from '../../models/jugador-teamlist-model';
import { JugadorTeamlistDTO } from '../../models/DTO/jugadorTeamlistDTO';

@Component({
  selector: 'app-jugador-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent, FormsModule],
  templateUrl: './jugador-form.component.html',
  styleUrl: './jugador-form.component.css'
})
export class JugadorFormComponent implements OnInit {
  jugadorForm: FormGroup;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  countries = COUNTRIES;
  showForm: boolean = false;
  isEditing: boolean = false;
  searchQuery: string = '';
  searchResults: JugadorModel[] = [];
  equipos: JugadorTeamlistModel[] = [];
  equiposFiltrados: EquipoModel[] = [];
  searchEquipoResults: EquipoModel[] = [];
  currentJugador: JugadorModel | undefined;
  constructor(private fb: FormBuilder, private jugadorService: JugadorService, private equipoService: EquipoService) {
    this.jugadorForm = this.fb.group({
      nombreReal: ['', Validators.required],
      mote: ['', Validators.required],
      estatus: ['', Validators.required],
      foto: ['', Validators.required],
      equipoActual: ['', Validators.required],
      country: ['', Validators.required],
      searchQuery: [''],
      searchEquipoQuery: [''],
      fechaInicio: [''],
      fechaFinal: ['']
    });
  }

  ngOnInit(): void {}


  showAddForm(): void {
    this.isEditing = false;
    this.showForm = true;
    this.jugadorForm.reset();
  }

  showEditForm(): void {
    this.isEditing = true;
    this.showForm = false;
  }
  searchJugadores(): void {
    const searchQuery = this.jugadorForm.get('searchQuery')?.value;
    if (searchQuery.length > 1) {
      this.jugadorService.getPlayerByNombre(searchQuery).subscribe((results) => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  selectJugador(jugador: JugadorModel): void {
    this.currentJugador = jugador;
    this.jugadorForm.patchValue(jugador);
    this.jugadorForm.get('equipoActual')?.setValue(jugador.equipoActual?.nombre);
    this.showForm = true;
    this.loadEquipos(jugador.id);
  }
  onEquipoInput(): void {
  
      const searchEquipoQuery = this.jugadorForm.get('equipoActual')?.value;
      if (searchEquipoQuery.length > 1) {
        this.equipoService.getEquiposNombre(searchEquipoQuery).subscribe((results) => {
          this.equiposFiltrados = results;
        });
      } else {
        this.equiposFiltrados = [];

  }
}
  loadEquipos(jugadorId: number): void {
    this.jugadorService.getPlayerTeamlist(jugadorId).subscribe((equipos) => {
      this.equipos = equipos;
    });
  }

  searchEquipos(): void {
    const searchEquipoQuery = this.jugadorForm.get('searchEquipoQuery')?.value;
    if (searchEquipoQuery.length > 1) {
      this.equipoService.getEquiposNombre(searchEquipoQuery).subscribe((results) => {
        this.searchEquipoResults = results;
      });
    } else {
      this.searchEquipoResults = [];
    }
  }


  addEquipo(equipo: EquipoModel): void {
    if (this.currentJugador) {
      const fechaInicio = this.jugadorForm.get('fechaInicio')?.value;
      const fechaFinal = this.jugadorForm.get('fechaFinal')?.value;
      const jugadorTeamlistDTO = new JugadorTeamlistDTO(this.currentJugador.id, equipo.id, fechaInicio, fechaFinal);
      this.jugadorService.addEquipoToPlayer(jugadorTeamlistDTO).subscribe(() => {
        this.loadEquipos(this.currentJugador!.id);
        this.jugadorForm.get('searchEquipoQuery')?.reset();
        this.jugadorForm.get('fechaInicio')?.reset();
        this.jugadorForm.get('fechaFinal')?.reset();
        this.searchEquipoResults = [];
      });
    }
  }

  removeEquipo(equipoId: number): void {
    if (this.currentJugador) {
      this.jugadorService.deleteEquipoToPlayer(this.currentJugador.id, equipoId).subscribe(() => {
        this.loadEquipos(this.currentJugador!.id);
      });
    }
  }

  deleteJugador(): void {
    if (this.currentJugador) {
      this.jugadorService.deletePlayer(this.currentJugador.id).subscribe(() => {
        this.showAlert('Jugador eliminado con éxito', 'success');
        this.showForm = false;
        this.isEditing = false;
        this.currentJugador = undefined;
        this.jugadorForm.reset();
        this.searchResults = [];
      }, (error) => {
        this.showAlert('Error al agregar el jugador', 'error');
      });
    }
  }

  onSubmit(): void {
    if (this.jugadorForm.valid) {
      const jugador: jugadorDTO = new jugadorDTO(
        this.jugadorForm.get('nombreReal')?.value,
        this.jugadorForm.get('mote')?.value,
        this.jugadorForm.get('estatus')?.value,
        this.jugadorForm.get('foto')?.value,
        this.jugadorForm.get('equipoActual')?.value,
        this.jugadorForm.get('country')?.value
      );
      if (this.isEditing) {
        // Lógica para actualizar el jugador
        if (this.currentJugador) {
          this.jugadorService.updatePlayer(this.currentJugador.id, jugador).subscribe(
            (response) => {
              this.showAlert('Jugador agregado con éxito', 'success');
            },
            (error) => {
              this.showAlert('Error al agregar el jugador', 'error');
            }
          );
        }
      } else {
        // Lógica para agregar un nuevo jugador
        this.jugadorService.createPlayer(jugador).subscribe(
          (response) => {
            this.showAlert('Jugador agregado con éxito', 'success');
          },
          (error) => {
            this.showAlert('Error al agregar el jugador', 'error');
          }
        );
      }
    }
  }
  
  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }
}