import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatchRecord } from "../models/MatchRecord";
import { PlayerRecord } from "../models/PlayerRecord";
import { PlayerDataService } from "../services/playerData.service";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-player-details",
  templateUrl: "./player-details-component.html",
  styleUrls: ["./player-details-component.scss"]
})
export class PlayerDetailsComponent implements OnInit {
  public detailPlayers: Array<PlayerRecord> = [];

  public detailPlayerMatches: Array<MatchRecord> = [];

  public averageElims = 0;
  public averagePlacement = 0;
  public averagePoints = 0;
  public totalPoints = 0;
  public loading = true;

  constructor(public playerDataService: PlayerDataService) {}

  ngOnInit() {
    this.loading = true;
    for (const player of this.playerDataService.activeGroup.playerRecords) {
      const playerRecords: Array<PlayerRecord> = [];

      for (const match of this.playerDataService.matchData) {
        for (const group of match.playerGroups) {
          const playerRecord = group.playerRecords.find(x => x.name === player.name);

          if (playerRecord != null) {
            playerRecords.push(playerRecord);
          }
        }
      }

      this.detailPlayers.push(this.generateAverages(playerRecords));
    }

    this.loading = false;

    console.log(this.detailPlayers);
  }

  generateAverages(playerRecords: Array<PlayerRecord>) {
    const averagedPlayer = new Object() as PlayerRecord;

    averagedPlayer.name = playerRecords[0].name;

    averagedPlayer.eliminations = playerRecords.map(player => player.eliminations).reduce((prev, next) => prev + next);

    averagedPlayer.score = playerRecords.map(player => player.score).reduce((prev, next) => prev + next);

    averagedPlayer.averageScore = averagedPlayer.score / playerRecords.length;

    averagedPlayer.averageScore = Math.round(averagedPlayer.averageScore * 10) / 10;

    averagedPlayer.averagePlacement = playerRecords.map(player => player.placement).reduce((prev, next) => prev + next) / playerRecords.length;

    averagedPlayer.averagePlacement = Math.round(averagedPlayer.averagePlacement * 10) / 10;

    averagedPlayer.matchCount = playerRecords.length;

    return averagedPlayer;
  }
}
