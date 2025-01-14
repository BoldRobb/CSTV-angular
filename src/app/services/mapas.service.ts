import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapaDTO } from '../models/DTO/mapaDTO';
import { MapaModel } from '../models/mapa-model';
import { Observable } from 'rxjs';
import { MapaStatsModel } from '../models/mapa-stats-model';
@Injectable({
  providedIn: 'root'
})
export class MapasService {
  private apiUrl = 'http://localhost:8080/api/mapas';
  private apiUrlStats = 'http://localhost:8080/api/mapas-stats'
  constructor(private http: HttpClient) { }

  getAllMapas(): Observable<MapaModel[]> {
    return this.http.get<MapaModel[]>(this.apiUrl);
  }

  getMapaById(id: number): Observable<MapaModel> {
    return this.http.get<MapaModel>(`${this.apiUrl}/${id}`);
  }

  createMapa(mapaDTO: MapaDTO): Observable<MapaModel> {
    return this.http.post<MapaModel>(this.apiUrl, mapaDTO);
  }

  updateMapa(id: number, mapaDTO: MapaDTO): Observable<MapaModel> {
    return this.http.put<MapaModel>(`${this.apiUrl}/${id}`, mapaDTO);
  }

  deleteMapa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMapasByPartidoId(idPartido: number): Observable<MapaModel[]> {
    return this.http.get<MapaModel[]>(`${this.apiUrl}/partido/${idPartido}`);
  }

  createListMapas(mapasDTO: MapaDTO[]): Observable<MapaModel[]> {
    return this.http.post<MapaModel[]>(`${this.apiUrl}/list`, mapasDTO);
  }

  getMapasStatsByPartidoId(idPartido: number): Observable<MapaStatsModel[]> {
    return this.http.get<MapaStatsModel[]>(`${this.apiUrlStats}/partido/${idPartido}`);
  }

  createMapaStats(mapaStats: MapaStatsModel): Observable<MapaStatsModel> {
    return this.http.post<MapaStatsModel>(this.apiUrlStats, mapaStats);
  }

  updateMapaStats(id: number, mapaStats: MapaStatsModel): Observable<MapaStatsModel> {
    return this.http.put<MapaStatsModel>(`${this.apiUrlStats}/${id}`, mapaStats);
  }

  deleteMapaStats(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlStats}/${id}`);
  }

  getMapaStatsById(id: number): Observable<MapaStatsModel> {
    return this.http.get<MapaStatsModel>(`${this.apiUrlStats}/${id}`);
  }

  getMapaStatsByJugadorId(idMapa: number): Observable<MapaStatsModel[]> {
    return this.http.get<MapaStatsModel[]>(`${this.apiUrlStats}/jugador/${idMapa}`);
  }


}
