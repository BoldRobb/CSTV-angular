import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TorneoModel } from '../models/torneo-model';
import { Observable, switchMap } from 'rxjs';
import { TorneomainModel } from '../models/torneomain-model';
import { TorneoEquiposModel } from '../models/torneo-equipos-model';
import { RondaModel } from '../models/rondaModel';
import { TorneoEquiposDTO } from '../models/DTO/torneoEquipoDTO';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  private apiUrl = 'http://localhost:8080/api/torneos'
  private apiUrlMain = 'http://localhost:8080/api/torneoMain'
  private apiUrlEquipos = 'http://localhost:8080/api/torneo-equipos'
  private apiUrlRonda = 'http://localhost:8080/api/ronda'
  constructor(private http: HttpClient) { }
  
  addTorneo(torneo: TorneoModel): Observable<TorneoModel> {
    return this.http.post<TorneoModel>(this.apiUrl, torneo);
  }
  getTorneos(): Observable<TorneoModel[]>{
    return this.http.get<TorneoModel[]>(this.apiUrl);
  }

  getTorneoMain(): Observable<TorneoModel>{
    return this.http.get<TorneomainModel>(this.apiUrlMain).pipe(
      switchMap((torneoMain: TorneomainModel) => {
        return this.http.get<TorneoModel>(`${this.apiUrl}/${torneoMain.id}`);
      })
    );
  }
  updateTorneo(ID: Number, torneo: TorneoModel): Observable<TorneoModel>{
    return this.http.put<TorneoModel>(`${this.apiUrl}/${ID}`, torneo);
    }
  getTorneo(id: number): Observable<TorneoModel>{
    return this.http.get<TorneoModel>(`${this.apiUrl}/${id}`);
  }
  deleteTorneo(id: number): Observable<TorneoModel>{
    return this.http.delete<TorneoModel>(`${this.apiUrl}/${id}`);
  }
  getEquiposTorneo(id: number): Observable<TorneoEquiposModel[]>{
    return this.http.get<TorneoEquiposModel[]>(`${this.apiUrlEquipos}/${id}`);
  }
  getTorneosByNombre(nombre: string): Observable<TorneoModel[]>{
    return this.http.get<TorneoModel[]>(`${this.apiUrl}/nombre/${nombre}`);
  }
  addEquipoTorneo(torneoEquipo: TorneoEquiposDTO): Observable<TorneoEquiposDTO>{
    return this.http.post<TorneoEquiposDTO>(this.apiUrlEquipos, torneoEquipo);
  }
  removeEquipoTorneo(idTorneo: number, idEquipo: number): Observable<TorneoEquiposModel>{
    return this.http.delete<TorneoEquiposModel>(`${this.apiUrlEquipos}/${idTorneo}/${idEquipo}`);
  }

  getTorneosByEquipo(idEquipo: number): Observable<TorneoEquiposModel[]>{
    return this.http.get<TorneoEquiposModel[]>(`${this.apiUrlEquipos}/equipo/${idEquipo}`);
  }
  getRondas(): Observable<RondaModel[]>{
    return this.http.get<RondaModel[]>(this.apiUrlRonda);
  }
  getRondaTorneo(id: number): Observable<RondaModel[]>{
    return this.http.get<RondaModel[]>(`${this.apiUrlRonda}/torneo/${id}`);
  }
  getRondaId(id: number): Observable<RondaModel>{
    return this.http.get<RondaModel>(`${this.apiUrlRonda}/${id}`);
  }
  addRonda(ronda: RondaModel): Observable<RondaModel>{
    return this.http.post<RondaModel>(this.apiUrlRonda, ronda);
  }
  updateRonda(ID: Number, ronda: RondaModel): Observable<RondaModel>{
    return this.http.put<RondaModel>(`${this.apiUrlRonda}/${ID}`, ronda);
  }
  deleteRonda(ID: Number): Observable<RondaModel>{
    return this.http.delete<RondaModel>(`${this.apiUrlRonda}/${ID}`);
  }
}
