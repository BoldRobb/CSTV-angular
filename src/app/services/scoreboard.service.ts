import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {
  private serverUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  getGameState(): Observable<any> {
    return this.http.get(this.serverUrl);
  }
}
