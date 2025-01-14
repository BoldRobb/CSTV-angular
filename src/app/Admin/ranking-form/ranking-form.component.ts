import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RankingService } from '../../services/ranking.service';
import { EquipoService } from '../../services/equipo.service';
import { RankingModel } from '../../models/ranking-model';
import { EquipoModel } from '../../models/equipo-model';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../../components/global/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, AlertComponent, CommonModule],
  templateUrl: './ranking-form.component.html',
  styleUrl: './ranking-form.component.css'
})
export class RankingFormComponent implements OnInit {
  rankingForm: FormGroup;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  equiposFiltrados: EquipoModel[] = [];

  constructor(private fb: FormBuilder, private rankingService: RankingService, private equipoService: EquipoService) {
    this.rankingForm = this.fb.group({
      equipo: ['', Validators.required],
      ranking: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      puntos: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onEquipoInput(): void {
    const equipoInput = this.rankingForm.get('equipo')?.value;
    if (equipoInput) {
      this.equipoService.getEquiposNombre(equipoInput).subscribe(
        (equipos: EquipoModel[]) => {
          this.equiposFiltrados = equipos;
        },
        error => {
          console.error('Error al buscar equipos', error);
        }
      );
    } else {
      this.equiposFiltrados = [];
    }
  }

  onSubmit(): void {
    if (this.rankingForm.valid) {
      const formValue = this.rankingForm.value;
      const equipo = this.equiposFiltrados.find(e => e.nombre === formValue.equipo);
      if (!equipo) {
        this.showAlert('Equipo no encontrado', 'error');
        return;
      }
      const nuevoRanking = new  RankingModel(0, equipo, formValue.ranking, new Date(formValue.fechaInicio), new Date(formValue.fechaFin), formValue.puntos);
      this.rankingService.addRanking(nuevoRanking).subscribe(
        response => {
          this.showAlert('Ranking guardado', 'success');
        },
        error => {
          this.showAlert('Error al guardar el ranking', 'error');
        }
      );
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