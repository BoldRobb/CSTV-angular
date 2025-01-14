import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartidoModel } from '../models/partido-model';
import { PartidoDTO } from '../models/DTO/partidoDTO';
import { BanlistModel } from '../models/banlist-model';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private apiUrl = 'http://localhost:8080/api/partidos'; // URL de tu backend
  private apiUrlBan = 'http://localhost:8080/api/banlist'; // URL de tu backend
  constructor(private http: HttpClient) { }
  getAllPartidos(): Observable<PartidoModel[]> {
    return this.http.get<PartidoModel[]>(this.apiUrl);
  }

  getPartidoById(id: number): Observable<PartidoModel> {
    return this.http.get<PartidoModel>(`${this.apiUrl}/${id}`);
  }

  createPartido(partidoDTO: PartidoDTO): Observable<PartidoModel> {
    return this.http.post<PartidoModel>(this.apiUrl, partidoDTO);
  }

  updatePartido(id: number, partidoDTO: PartidoDTO): Observable<PartidoModel> {
    return this.http.put<PartidoModel>(`${this.apiUrl}/${id}`, partidoDTO);
  }

  deletePartido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPartidoByTorneoId(torneoId: number): Observable<PartidoModel[]> {
    return this.http.get<PartidoModel[]>(`${this.apiUrl}/torneo/${torneoId}`);
  }

  getPartidoByEquipoId(equipoId: number): Observable<PartidoModel[]> {
    return this.http.get<PartidoModel[]>(`${this.apiUrl}/equipo/${equipoId}`);
  }

  createPartidos(partidoDTOList: PartidoDTO[]): Observable<PartidoModel[]> {
    return this.http.post<PartidoModel[]>(`${this.apiUrl}/list`, partidoDTOList);
  }
  getBanlistPartido(id: number): Observable<BanlistModel[]> {
    return this.http.get<BanlistModel[]>(`${this.apiUrlBan}/`+id);
  }
}
