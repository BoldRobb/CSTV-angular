import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipoModel } from '../../models/equipo-model';
import { EquipoService } from '../../services/equipo.service';
import { AlertComponent } from '../../components/global/alert/alert.component';
import { CommonModule } from '@angular/common';
import { JugadorModel } from '../../models/jugador-model';
import { JugadorService } from '../../services/jugador.service';
import { jugadorDTO } from '../../models/DTO/jugadorDTO';
import { EquipoJugadorDTO } from '../../models/DTO/equipoJugadorDTO';

@Component({
  selector: 'app-equipo-form',
  standalone: true,
  templateUrl: './equipo-form.component.html',
  styleUrls: ['./equipo-form.component.css'],
  imports: [ReactiveFormsModule, AlertComponent, CommonModule, FormsModule],

})
export class EquipoFormComponent implements OnInit {
  equipoForm: FormGroup;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  teamId!: number;
  showForm: boolean = false;
  isEditing: boolean = false;
  searchQuery: string = '';
  searchResults: EquipoModel[] = [];
  jugadores: JugadorModel[] = [];
  searchJugadorQuery: string = '';
  searchJugadorResults: JugadorModel[] = [];
  currentEquipo: EquipoModel | undefined;
  constructor(private fb: FormBuilder, private equipoService: EquipoService, private jugadorService: JugadorService) {
    this.equipoForm = this.fb.group({
      nombre: ['', Validators.required],
      rankingActual: ['' ],
      rankingMaximo: ['' ],
      twitter: [''],
      instagram: [''],
      foto: [''],
      searchQuery: [''],
      searchJugadorQuery: ['']
    });
  }

  ngOnInit(): void {}

  showAddForm(): void {
    this.jugadores = [];
    this.isEditing = false;
    this.showForm = true;
    this.equipoForm.reset();
  }

  showEditForm(): void {
    this.isEditing = true;
    this.showForm = false;
  }

  searchEquipos(): void {
    const searchQuery = this.equipoForm.get('searchQuery')?.value;
    if (searchQuery.length > 1) {
      this.equipoService.getEquiposNombre(searchQuery).subscribe((results) => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  selectEquipo(equipo: EquipoModel): void {
    this.currentEquipo = equipo;
    this.equipoForm.patchValue(equipo);
    this.showForm = true;
    this.loadJugadores(equipo.id);
  }
  loadJugadores(equipoId: number): void {
    this.equipoService.getJugadoresEquipo(equipoId).subscribe((jugadores) => {
      this.jugadores = jugadores;
    });
  }

  searchJugadores(): void {
    const searchJugadorQuery = this.equipoForm.get('searchJugadorQuery')?.value;
    if (searchJugadorQuery.length > 2) {
      this.jugadorService.getPlayerByNombre(searchJugadorQuery).subscribe((results) => {
        this.searchJugadorResults = results;
      });
    } else {
      this.searchJugadorResults = [];
    }
  }

  addJugador(jugador: JugadorModel): void {
    if (this.currentEquipo) {
      const jugadorDTO = new EquipoJugadorDTO(this.currentEquipo.id, jugador.id);
      this.equipoService.addJugadorEquipo(jugadorDTO).subscribe(() => {
        this.loadJugadores(this.currentEquipo!.id);
        this.equipoForm.get('searchJugadorQuery')?.reset();
        this.searchJugadorResults = [];
      });
    }
  }
  deleteEquipo(): void {
    if (this.currentEquipo) {
      if (this.jugadores.length > 0) {
        this.jugadores.forEach((jugador) => {
          this.equipoService.deleteJugadorEquipo(jugador.id).subscribe(() => {
        this.loadJugadores(this.currentEquipo!.id);
          });
        });
      }
      this.equipoService.deleteEquipo(this.currentEquipo.id).subscribe(() => {
        this.showAlert('Equipo eliminado con éxito', 'success');
        this.showForm = false;
        this.isEditing = false;
        this.currentEquipo = undefined;
        this.equipoForm.reset();
        this.searchResults = [];
      }, (error) => {
        this.showAlert('Error al eliminar el equipo', 'error');
      });
    }
  }
  removeJugador(jugadorId: number): void {
    console.log(jugadorId);
    if (this.currentEquipo) {
      this.equipoService.deleteJugadorEquipo(jugadorId).subscribe(() => {
        this.loadJugadores(this.currentEquipo!.id);
      });
    }
  }

  onSubmit(): void {
    console.log(this.equipoForm.value);
    console.log(this.equipoForm.valid);
    console.log(this.equipoForm.errors);
    if (this.equipoForm.valid) {
      const equipo: EquipoModel = this.equipoForm.value;
      if (this.isEditing) {
        if(this.currentEquipo){
        // Lógica para actualizar el equipo
        this.equipoService.updateEquipo(this.currentEquipo.id, equipo).subscribe(
          () => {
            this.showAlert('Equipo actualizado con éxito', 'success');
          },
          () => {
            this.showAlert('Error al actualizar el equipo', 'error');
          }
        );}
      } else {
        // Lógica para agregar un nuevo equipo
        this.equipoService.addEquipo(equipo).subscribe(
          (response) => {
            this.showAlert('Equipo actualizado con éxito', 'success');
            this.equipoForm.reset();
          },
          (error) => {
            this.showAlert('Error al actualizar el equipo', 'error');
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