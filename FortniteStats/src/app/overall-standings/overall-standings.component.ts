import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from '../services/playerData.service';
import { PlayerRecord } from '../models/PlayerRecord';
import { PlayerDetailsComponent } from '../player-details/player-details-component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ExportType } from 'src/app/models/enums';

@Component({
  selector: 'app-overall-standings',
  templateUrl: './overall-standings.component.html',
  styleUrls: ['./overall-standings.component.scss']
})
export class OverallStandingsComponent implements OnInit {
  constructor(
    public playerDataService: PlayerDataService,
    public dialog: MatDialog,
    public dialModRef: MatDialogRef<any>
  ) {}

  public playerList: Array<PlayerRecord> = [];

  public loading = true;

  public exportEnum = ExportType;

  public displayedColumns: string[] = [
    'rank',
    'name',
    'placement',
    'eliminations',
    'score',
    'settings'
  ];

  ngOnInit() {
    this.loading = true;
    for (const match of this.playerDataService.matchData) {
      for (const player of match.playerRecords) {
        if (this.playerList.find(x => x.name === player.name) == null) {
          const newPlayer = new Object() as PlayerRecord;
          newPlayer.name = player.name;
          newPlayer.eliminations = 0;
          newPlayer.matchCount = 0;
          newPlayer.placement = 0;
          newPlayer.score = 0;

          this.playerList.push(newPlayer);
        }

        const existingPlayer = this.playerList.find(
          x => x.name === player.name
        );

        existingPlayer.matchCount = existingPlayer.matchCount + 1;
        existingPlayer.eliminations =
        existingPlayer.eliminations + player.eliminations;
        existingPlayer.score = existingPlayer.score + player.score;
        existingPlayer.placement = existingPlayer.placement + player.placement;
        existingPlayer.averagePlacement = existingPlayer.placement / existingPlayer.matchCount;
        existingPlayer.averagePlacement = Math.round( existingPlayer.averagePlacement * 10 ) / 10;
      }
    }

    this.playerList.sort((a, b) => b.score - a.score);

    for (let i = 1; i <= this.playerList.length; i++) {
      this.playerList[i - 1].rank = i;
    }

    this.loading = false;
  }

  goToPlayerDetail(player: PlayerRecord) {
    this.playerDataService.activePlayer = player;

    const dialogRef = this.dialog.open(PlayerDetailsComponent, {
      panelClass: 'custom-dialog-container'
    });
  }
}
