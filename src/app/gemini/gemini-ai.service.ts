import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GeminiAiService {
  genAI = new GoogleGenerativeAI(environment.API_KEY);
  generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
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

    const prompt = 'tonto';
    const result =  this.model.generateContent(prompt);
    const response =  (await result).response;
  }
}