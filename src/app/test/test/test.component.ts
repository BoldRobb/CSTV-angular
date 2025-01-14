import { Component, OnInit } from '@angular/core';
import { GeminiAiService } from '../../gemini/gemini-ai.service';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

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

 async TestGeminiPro(): Promise<void> {

    const prompt = 'Regresame true o false si este mensaje es dañino: hola j0vencit0s los de Astralis ptos';
    const result =  this.model.generateContent(prompt);
    const response =  (await result).response;
  }
  constructor(private geminiService: GeminiAiService) {}

  ngOnInit(): void {
    this.TestGeminiPro();
  }



}
