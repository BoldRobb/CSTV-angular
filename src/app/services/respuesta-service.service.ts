import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestasModel } from '../models/respuestas-model';
import { Observable } from 'rxjs';
import { RespuestaDTO } from '../models/DTO/respuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class RespuestaServiceService {

  private apiUrl = 'http://localhost:8080/api/respuestas';
  constructor(private http: HttpClient) { }

  addRespuesta(respuesta: RespuestaDTO) {
    return this.http.post(this.apiUrl, respuesta);
  }

  getRespuestas(): Observable<RespuestasModel[]> {
    return this.http.get<RespuestasModel[]>(this.apiUrl);
  }

  getRespuesta(id: number) : Observable<RespuestasModel> {
    return this.http.get<RespuestasModel>(`${this.apiUrl}/${id}`);
  }

  deleteRespuesta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateRespuesta(id: number, respuesta: any) : Observable<RespuestasModel> {
    return this.http.put<RespuestasModel>(`${this.apiUrl}/${id}`, respuesta);
  }

  getRespuestasByTopico(idTopico: number): Observable<RespuestasModel[]> {
    return this.http.get<RespuestasModel[]>(`${this.apiUrl}/topico/${idTopico}`);
  }

  getRespuestasByPadre(idPadre: number):Observable<RespuestasModel[]> {
    return this.http.get<RespuestasModel[]>(`${this.apiUrl}/padre/${idPadre}`);
  }

}
