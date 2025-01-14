import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RecentActivityComponent } from '../recent-activity/recent-activity.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ForoModel } from '../../../models/foro-model';
import { TopicoModel } from '../../../models/topico-model';
import { ForoServiceService } from '../../../services/foro-service.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UsuarioModel } from '../../../models/usuario-model';
import { UsuarioService } from '../../../services/usuario-service.service';
import { AlertComponent } from '../../global/alert/alert.component';
import { TopicoDTO } from '../../../models/DTO/topicoDTO';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-forum-topics',
  standalone: true,
  imports: [RecentActivityComponent, CommonModule, RouterModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './forum-topics.component.html',
  styleUrl: './forum-topics.component.css'
})
export class ForumTopicsComponent {
newTopicForm!: FormGroup;
id?: number;
foro?: ForoModel;
topicos?: TopicoModel[];
isLoggedIn=false;
pageNotFound = false;
currentUser?: UsuarioModel;
currentId?: number;
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

async TestGeminiPro(mesanje: string): Promise<boolean> {

  const prompt = 'Regresame true o false si este mensaje es dañino: ' + mesanje;
  const result =  this.model.generateContent(prompt);
  const response =  (await result).response;
  const isHarmful = response.text().toLowerCase().includes('true');
  return isHarmful;
};
constructor(private route: ActivatedRoute,
   private foroService: ForoServiceService,
    private fb: FormBuilder,
     private authService: AuthService,
     private userService: UsuarioService
    ) { }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = +params['id'];
    if (isNaN(this.id)) {
      this.pageNotFound = true;
    } else {
      this.getForo();
      this.getTopics();
    }
  });

  this.newTopicForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  this.authService.isLoggedIn().subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
    if (isLoggedIn) {
      this.newTopicForm.enable();
    } else {
      this.newTopicForm.disable();
    }
  });
  this.authService.getUserIdObservable().subscribe(userId => {
    if (userId !== null) {
      this.currentId = userId;
    } else {
      console.error('User ID is null');
    }
  });

}

  getForo(): void {
    if (this.id !== undefined) {
      this.foroService.getForo(this.id).subscribe(
        data => {
          this.foro = data;
        },
        error => {
          console.error(error);
          this.pageNotFound = true;
        },
      );
    } else {
      console.error('ID is undefined');
    }
  }
  getTopics(): void {
    if (this.id !== undefined) {
      this.foroService.getTopicosForo(this.id).subscribe(
        data => {
          this.topicos = data.map(topic => {
            return topic;
          });
        },
        error => {
          console.error(error);
        },
      );
    } else {
      console.error('ID is undefined');
    }
  }

  formatDate(date: any): string {
    const validDate = new Date(date);
    const day = String(validDate.getDate()).padStart(2, '0');
    const month = String(validDate.getMonth() + 1).padStart(2, '0');
    const year = validDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  async onSubmit(): Promise<void> {

    if (this.newTopicForm.valid) {
      const { title, description } = this.newTopicForm.value;
      const content = `${title} ${description}`;
      if(title.length > 100 ){
        return this.showAlert('Error creating topic, title is longer than 100 characters', 'error');}
      if(description.length > 255 ){
        return this.showAlert('Error creating topic, description is longer than 255 characters', 'error');}
      const isHarmful = await this.TestGeminiPro(content);
      if(!(await isHarmful) ){
      const newTopic = this.newTopicForm.value;
      const topic = new TopicoDTO(
        0,
        this.currentId!,
        this.foro?.id!,
        newTopic.title,
        newTopic.description,
        new Date(),
        new Date()
      );
      this.foroService.createTopico(topic).subscribe(
        response => {
          this.getTopics();
          this.newTopicForm.reset();
          this.showAlert('Topic created successfully', 'success');
        },
        error => {
          console.error(error);
          this.showAlert('Error creating topic', 'error');
        }
      );
        } else {
      this.showAlert('Error creating topic, harmful content detected', 'error');
        }
  }
  }

  getActualUser(): UsuarioModel{  
    if (this.currentId !== undefined) {
      this.userService.getUsuario(this.currentId).subscribe(
        user => {
          this.currentUser = user;
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Current ID is undefined');
    }
    return this.currentUser!;

  }
  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }
}
