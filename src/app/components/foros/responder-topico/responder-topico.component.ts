import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RespuestaServiceService } from '../../../services/respuesta-service.service';
import { TopicoModel } from '../../../models/topico-model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RespuestaDTO } from '../../../models/DTO/respuestaDTO';
import { ForoServiceService } from '../../../services/foro-service.service';
import { AlertComponent } from '../../global/alert/alert.component';
@Component({
  selector: 'app-responder-topico',
  standalone: true,
  templateUrl: './responder-topico.component.html',
  styleUrls: ['./responder-topico.component.css'],
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
})
export class ResponderTopicoComponent implements OnInit {
  @Input() topico!: TopicoModel;
  @Output() respuestaAgregada = new EventEmitter<void>();
  responderForm: FormGroup;
  isLoggedIn = false;
  currentUserId?: number;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  constructor(
    private fb: FormBuilder,
    private respuestaService: RespuestaServiceService,
    private authService: AuthService,
    private foroService: ForoServiceService
  ) {
    this.responderForm = this.fb.group({
      respuesta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        this.currentUserId = currentUser.id;
      }
    });
  }

  onSubmitResponder(): void {
    if (this.responderForm.valid) {
      const formValue = this.responderForm.value;
      if(formValue.respuesta.length > 255){
        return this.showAlert('Error creating reply, content is longer than 255 characters ', 'error');
        
      } 
      const nuevaRespuesta = new RespuestaDTO(
        0,
        this.currentUserId || 0,
        this.topico.id,
        formValue.respuesta,
        new Date(),
    );

      this.respuestaService.addRespuesta(nuevaRespuesta).subscribe(
        response => {
          this.updateTopicoLatest(this.topico.id);
          this.responderForm.reset();
          this.showAlert('Reply added succesfully', 'success');
          this.respuestaAgregada.emit();
        },
        error => {
          this.showAlert('Error adding reply', 'error');
        }
      );
    }
  }

  private updateTopicoLatest(topicoId: number): void {
    let topico: TopicoModel;
    this.foroService.getTopico(topicoId).subscribe(
      response => {
        topico = response;
        topico.latest = new Date();
        this.foroService.updateTopico(topico).subscribe(
          response => {
          },
          error => {
          }
        );
      },
      error => {
      }
    );
  }
  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }
}