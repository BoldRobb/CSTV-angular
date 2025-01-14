import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JugadorModel } from '../models/jugador-model';
import { Observable } from 'rxjs';
import { jugadorDTO } from '../models/DTO/jugadorDTO';
import { JugadorTeamlistModel } from '../models/jugador-teamlist-model';
import { JugadorTeamlistDTO } from '../models/DTO/jugadorTeamlistDTO';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private apiUrl = 'http://localhost:8080/api/jugadores'; 
  private apiUrlTrofeos = 'http://localhost:8080/api/jugador-trofeos';
  private apiUrlTeamlist = 'http://localhost:8080/api/jugador-teamlist';

  constructor(private http: HttpClient) { }

  getPlayerList(): Observable<JugadorModel[]> {
    return this.http.get<JugadorModel[]>(this.apiUrl);
  }
  getPlayer(id: number): Observable<JugadorModel> {
    return this.http.get<JugadorModel>(this.apiUrl + '/' + id);
  }
  createPlayer(player: jugadorDTO): Observable<JugadorModel> {
    return this.http.post<JugadorModel>(this.apiUrl, player);
  }
  updatePlayer(id:number,player: jugadorDTO): Observable<JugadorModel> {
    return this.http.put<JugadorModel>(this.apiUrl + '/' + id, player);
  }
  deletePlayer(id: number): Observable<JugadorModel> {
    return this.http.delete<JugadorModel>(this.apiUrl + '/' + id);
  }
  getPlayerByNombre(nombre: string): Observable<JugadorModel[]> {
    return this.http.get<JugadorModel[]>(this.apiUrl + '/nombre/' + nombre);
  }
  getPlayerTrofeos(id: number): Observable<JugadorModel[]> {
    return this.http.get<JugadorModel[]>(this.apiUrlTrofeos + '/' + id);
  }
  getPlayerTeamlist(id: number): Observable<JugadorTeamlistModel[]> {
    return this.http.get<JugadorTeamlistModel[]>(this.apiUrlTeamlist + '/' + id);
  }
  addEquipoToPlayer(Teamlist: JugadorTeamlistDTO): Observable<JugadorTeamlistDTO> {
    return this.http.post<JugadorTeamlistDTO>(this.apiUrlTeamlist, Teamlist);
  }  
  deleteEquipoToPlayer(idJugador: number, idEquipo: number): Observable<JugadorTeamlistDTO> {
    return this.http.delete<JugadorTeamlistDTO>(this.apiUrlTeamlist + '/' + idJugador + '/' + idEquipo);
  }

  
}
