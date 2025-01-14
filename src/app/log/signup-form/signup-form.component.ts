import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { COUNTRIES } from '../../../global/countries';
import { CommonModule } from '@angular/common';
import { UsuarioModel } from '../../models/usuario-model';
import { UsuarioService } from '../../services/usuario-service.service';
import { AlertComponent } from '../../components/global/alert/alert.component';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlertComponent]
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;
  countries = COUNTRIES;
  alertMessage!: string;
  alertType!: 'success' | 'error';
  genAI = new GoogleGenerativeAI(environment.API_KEY);
generationConfig = {
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ],
  temperature: 0.9,
  top_p: 1,
  top_k: 32,
  maxOutputTokens: 100, // limit output
};
model = this.genAI.getGenerativeModel({
  model: 'gemini-pro', // or 'gemini-pro-vision'
  ...this.generationConfig,
});
  

async TestGeminiPro(mensaje: string): Promise<boolean> {

  const prompt = 'Regresame true o false si este username es dañino: ' + mensaje;
  const result =  this.model.generateContent(prompt);
  const response =  (await result).response;
  const isHarmful = response.text().toLowerCase().includes('true');
  return isHarmful;
};

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, this.usernameValidator]],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required]
    }, { validator: [this.emailMatchValidator, this.passwordMatchValidator] });
  }

  ngOnInit(): void {}

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

  emailMatchValidator(group: FormGroup): ValidationErrors | null {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    if (email !== confirmEmail) {
      return { emailMismatch: true };
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  async onSubmit(): Promise<void> {
    const isHarmful = this.TestGeminiPro(this.signupForm.value.username);
    if (this.signupForm.valid) {
      if (!(await isHarmful)) {

      
      const nuevoUsuario: UsuarioModel = this.createUsuarioModel(this.signupForm.value);
      this.usuarioService.createUsuario(nuevoUsuario).subscribe(
        response => {
          this.showAlert('User succesfully created', 'success');
          this.signupForm.reset();
        },
        error => {
          this.showAlert('Error creating the user', 'error');
        }
      );
      }else{
        this.showAlert('Username not available due harmful content', 'error');
      }
    }
  }

  private createUsuarioModel(formValue: any): UsuarioModel {
    return new UsuarioModel(
      0,
      formValue.password,
      formValue.username,
      formValue.email,
      formValue.country,
      'User',
      ''
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