import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatchRecord } from '../models/MatchRecord';
import { PlayerRecord } from '../models/PlayerRecord';
import { PlayerDataService } from '../services/playerData.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details-component.html',
  styleUrls: ['./player-details-component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  public detailPlayers: Array<PlayerRecord> = [];

  public detailPlayerMatches: Array<MatchRecord> = [];

  public averageElims = 0;
  public averagePlacement = 0;
  public averagePoints = 0;
  public totalPoints = 0;

  constructor(public playerDataService: PlayerDataService) {}

  ngOnInit() {
    this.detailPlayerMatches = this.playerDataService.matchData.filter(md =>
      md.playerRecords.find(p => p.name === this.playerDataService.activePlayer.name)
    );

    for (const match of this.detailPlayerMatches) {
      for (const player of match.playerRecords) {
        if (player.name === this.playerDataService.activePlayer.name) {
          this.detailPlayers.push(player);
        }
      }
    }


    for (const playerRecord of this.detailPlayers) {
      this.averagePlacement = this.averagePlacement + playerRecord.placement;

      this.averagePoints = this.averagePoints + playerRecord.score;

      this.averageElims = this.averageElims +  playerRecord.eliminations;
    }

    this.totalPoints = this.averagePoints;

    this.averageElims = this.averageElims / this.detailPlayerMatches.length;
    this.averagePoints = this.averagePoints / this.detailPlayerMatches.length;
    this.averagePlacement = this.averagePlacement / this.detailPlayerMatches.length;
  }



}
