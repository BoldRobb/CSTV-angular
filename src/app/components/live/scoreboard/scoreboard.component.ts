import { Component } from '@angular/core';
import { ScoreboardService } from '../../../services/scoreboard.service';
import { interval, Subscription, switchMap } from 'rxjs';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  gameState: any;
  ctPlayers: any[] = [];
  tPlayers: any[] = [];
  subscription?: Subscription;

  constructor(private scoreboardService: ScoreboardService) {}

  ngOnInit() {
    // Actualizar el estado del juego cada 5 segundos
    this.subscription = interval(2000).pipe(
      switchMap(() => this.scoreboardService.getGameState())
    ).subscribe(data => {
      this.gameState = data;
      this.updateTeams();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateTeams() {
    this.ctPlayers = [];
    this.tPlayers = [];
    
    // Separar jugadores en equipos T y CT
    for (const [steamId, player] of Object.entries(this.gameState?.allplayers || {})) {
      const typedPlayer = player as Player;
      if (typedPlayer.team === 'CT') {
        this.ctPlayers.push(typedPlayer);
      } else if (typedPlayer.team === 'T') {
        this.tPlayers.push(typedPlayer);
      }
    }
  }
}
interface Player {
  name: string;
  observer_slot: number;
  team: string;
  match_stats: {
      kills: number;
      assists: number;
      deaths: number;
      mvps: number;
      score: number;
  };
}