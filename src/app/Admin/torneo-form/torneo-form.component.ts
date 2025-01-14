
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TorneoService } from '../../services/torneo.service';
import { TorneoModel } from '../../models/torneo-model';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../components/global/alert/alert.component';
import { COUNTRIES } from '../../../global/countries';
import { TorneoEquiposModel } from '../../models/torneo-equipos-model';
import { EquipoService } from '../../services/equipo.service';
import { EquipoModel } from '../../models/equipo-model';
import { TorneoEquiposDTO } from '../../models/DTO/torneoEquipoDTO';

@Component({
  selector: 'app-torneo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent, FormsModule],
  templateUrl: './torneo-form.component.html',
  styleUrl: './torneo-form.component.css'
})
export class TorneoFormComponent implements OnInit {
  torneoForm: FormGroup;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  countries = COUNTRIES;
  showForm: boolean = false;
  isEditing: boolean = false;
  searchQuery: string = '';
  searchResults: TorneoModel[] = [];
  equipos: EquipoModel[] = [];
  searchEquipoQuery: string = '';
  searchEquipoResults: EquipoModel[] = [];
  currentTorneo: TorneoModel | undefined;

  constructor(private fb: FormBuilder, private torneoService: TorneoService, private equipoService: EquipoService) {
    this.torneoForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      logo: ['', Validators.required],
      tipoBracket: ['', Validators.required],
      prizepool: ['', Validators.required],
      equipos_cant: ['', Validators.required],
      localizacion: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {}

  showAddForm(): void {
    this.isEditing = false;
    this.showForm = true;
    this.torneoForm.reset();
  }

  showEditForm(): void {
    this.isEditing = true;
    this.showForm = false;
  }

  searchTorneos(): void {
    if (this.searchQuery.length > 1) {
      this.torneoService.getTorneosByNombre(this.searchQuery).subscribe((results) => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  selectTorneo(torneo: TorneoModel): void {
    this.currentTorneo = torneo;
    this.torneoForm.patchValue(torneo);
    this.showForm = true;
    this.equipos = [];
    this.loadEquipos(torneo.id);
  }
  loadEquipos(torneoId: number): void {
    this.torneoService.getEquiposTorneo(torneoId).subscribe((equipos) => {
      equipos.forEach((equipo) => {
        this.equipos.push(equipo.idEquipo);
      });
    });
  }

  searchEquipos(): void {
    if (this.searchEquipoQuery.length > 1) {
      this.equipoService.getEquiposNombre(this.searchEquipoQuery).subscribe((results) => {
        this.searchEquipoResults = results;
      });
    } else {
      this.searchEquipoResults = [];
    }
  }

  addEquipo(equipo: EquipoModel): void {
    if (this.currentTorneo) {
      const torneoEquipo: TorneoEquiposDTO = {
        idTorneo: this.currentTorneo.id,
        idEquipo: equipo.id
      }
      this.torneoService.addEquipoTorneo(torneoEquipo).subscribe(() => {
        this.equipos = [];
        this.loadEquipos(this.currentTorneo!.id);
        this.searchEquipoQuery = '';
        this.searchEquipoResults = [];
      });
    }
  }

  removeEquipo(equipoId: number): void {
    if (this.currentTorneo) {
      this.torneoService.removeEquipoTorneo(this.currentTorneo.id, equipoId).subscribe(() => {
        this.equipos = [];
        this.loadEquipos(this.currentTorneo!.id);

      });
    }
  }
  deleteTorneo(): void {
    if (this.currentTorneo) {
      this.torneoService.deleteTorneo(this.currentTorneo.id).subscribe(() => {
        this.showAlert('Torneo eliminado con éxito', 'success');
        this.showForm = false;
        this.isEditing = false;
        this.currentTorneo = undefined;
        this.torneoForm.reset();
        this.searchResults = [];
      }, (error) => {
        this.showAlert('Error al eliminar el torneo', 'error');
      });
    }
  }
  onSubmit(): void {
    console.log(this.torneoForm.value);
    console.log(this.torneoForm.valid);
    console.log(this.torneoForm.errors);
    console.log(this.isEditing);
    if (this.torneoForm.valid) {
      const torneo: TorneoModel = this.torneoForm.value;
      torneo.tipo = 'ONLINE';
      if (this.isEditing) {
        // Lógica para actualizar el torneo
        if (this.currentTorneo) {
          this.torneoService.updateTorneo(this.currentTorneo.id, torneo).subscribe(
            (response) => {
              this.showAlert('Torneo agregado con éxito', 'success'); 

            },
            (error) => {
              this.showAlert('Error al agregar el torneo', 'error');
            }
          );
        }
      } else {
        console.log(torneo);
        // Lógica para agregar un nuevo torneo
        this.torneoService.addTorneo(torneo).subscribe(
          (response) => {

            this.showAlert('Torneo agregado con éxito', 'success'); 
          },
          (error) => {
            this.showAlert('Error al agregar el torneo', 'error');
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