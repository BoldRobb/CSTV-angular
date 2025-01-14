import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../components/global/alert/alert.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlertComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  alertMessage!: string;
  alertType!: 'success' | 'error';

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.usernameValidator]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const usernamePattern = /^[a-zA-Z0-9_]{6,}$/;
    if (!usernamePattern.test(value)) {
      return { invalidUsername: true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.usuarioService.login(username, password).subscribe(
        response => {
          this.authService.login(response);
          this.authService.saveToken(response.token);
          this.router.navigate(['/']); // Ejemplo de redirección
        },
        error => {
          console.error('Login failed', error);
          this.showAlert(error.error, 'error');
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

  navigateToSignup(): void {
    this.router.navigate(['/register']);
  }
}