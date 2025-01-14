import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario-model';
import { UsuarioService } from '../../services/usuario-service.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../components/global/alert/alert.component';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup;
  alertMessage!: string;
  alertType!: 'success' | 'error';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      pais: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const formValue = this.usuarioForm.value;
      const nuevoUsuario = new UsuarioModel(
        0, // ID, se puede ajustar según sea necesario
        formValue.password,
        formValue.username,
        formValue.correo,
        formValue.pais,
        formValue.rol
      );
      this.usuarioService.createUsuario(nuevoUsuario).subscribe(
        response => {
          this.showAlert('Usuario guardado', 'success');
        },
        error => {
          this.showAlert('Error al guardar el usuario', 'error');
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
