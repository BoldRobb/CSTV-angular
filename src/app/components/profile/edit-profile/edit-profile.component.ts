import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../global/alert/alert.component';
import { UsuarioService } from '../../../services/usuario-service.service';
import { AuthService } from '../../../services/auth.service';
import { UsuarioModel } from '../../../models/usuario-model';
import { COUNTRIES } from '../../../../global/countries';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, AlertComponent, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  usernameForm: FormGroup;
  emailForm: FormGroup;
  personalInfoForm: FormGroup;
  passwordForm: FormGroup;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  userId!: number;
  isCurrentUser = false;
  usuario!: UsuarioModel;
  countries = COUNTRIES; // Add the countries list

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9_]+$/)]]
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.personalInfoForm = this.fb.group({
      biografia: [''],
      country: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/), Validators.required]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.authService.getUserIdObservable().subscribe(userId => {
      if (userId !== null) {
        this.userId = userId;
        this.isCurrentUser = true;
        this.loadUserData(this.userId);
      } else {
        this.isCurrentUser = false;
        this.showAlert('No tienes acceso por no estar logueado', 'error');
      }
    });
  }

  loadUserData(userId: number): void {
    this.usuarioService.getUsuario(userId).subscribe(usuario => {
      this.usuario = usuario;
      this.usernameForm.patchValue({ username: usuario.username });
      this.emailForm.patchValue({ email: usuario.correo });
      this.personalInfoForm.patchValue({ biografia: usuario.biografia, country: usuario.pais });
    });
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmitUsername(): void {
    if (this.usernameForm.valid) {
      const formValue = this.usernameForm.value;
      const updatedUser = new UsuarioModel(
        this.userId,
        this.usuario.password,
        formValue.username,
        this.usuario.correo,
        this.usuario.pais,
        'User',
        this.usuario.biografia
      );

      this.usuarioService.updateUsuario(updatedUser).subscribe(
        response => {
          this.showAlert('Username updated successfully', 'success');
        },
        error => {
          this.showAlert('Error updating username', 'error');
          console.error('Error updating username', error);
        }
      );
    }
  }

  onSubmitEmail(): void {
    if (this.emailForm.valid) {
      const formValue = this.emailForm.value;
      const updatedUser = new UsuarioModel(
        this.userId,
        this.usuario.password,
        this.usuario.username,
        formValue.email,
        this.usuario.pais,
        'User',
        this.usuario.biografia
      );

      this.usuarioService.updateUsuario(updatedUser).subscribe(
        response => {
          this.showAlert('Email updated successfully', 'success');
        },
        error => {
          this.showAlert('Error updating email', 'error');
          console.error('Error updating email', error);
        }
      );
    }
  }

  onSubmitPersonalInfo(): void {
    if (this.personalInfoForm.valid) {
      const formValue = this.personalInfoForm.value;
      const updatedUser = new UsuarioModel(
        this.userId,
        this.usuario.password,
        this.usuario.username,
        this.usuario.correo,
        formValue.country,
        'User',
        formValue.biografia
      );

      this.usuarioService.updateUsuario(updatedUser).subscribe(
        response => {
          this.showAlert('Personal information updated successfully', 'success');
        },
        error => {
          this.showAlert('Error updating personal information', 'error');
          console.error('Error updating personal information', error);
        }
      );
    }
  }

  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      const formValue = this.passwordForm.value;
      const updatedUser = new UsuarioModel(
        this.userId,
        formValue.password,
        this.usuario.username,
        this.usuario.correo,
        this.usuario.pais,
        'User',
        this.usuario.biografia
      );

      this.usuarioService.updateUsuario(updatedUser).subscribe(
        response => {
          this.showAlert('Password updated successfully', 'success');
        },
        error => {
          this.showAlert('Error updating password', 'error');
          console.error('Error updating password', error);
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