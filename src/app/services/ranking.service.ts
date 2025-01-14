import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RankingModel } from '../models/ranking-model';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private apiUrl = 'http://localhost:8080/api/ranking'
  private apiUrlFecha = 'http://localhost:8080/api/ranking/fecha/'
  constructor(private http: HttpClient) { }

  getRankingToday(): Observable<RankingModel[]>{
    const hoy = new Date().toISOString().split('T')[0]; // Convierte la fecha a formato yyyy-MM-dd
    
    return this.http.get<RankingModel[]>(`${this.apiUrlFecha}${hoy}`);
  }
  addRanking(ranking: RankingModel): Observable<RankingModel> {
    return this.http.post<RankingModel>(this.apiUrl, ranking);
  }
  getRankingTeam(id: number): Observable<RankingModel[]> {
    return this.http.get<RankingModel[]>(`${this.apiUrl}/equipo/${id}`);
  }
}
