import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatchRecord } from '../models/MatchRecord';
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlayerRecord } from '../models/PlayerRecord';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerDataService } from '../services/playerData.service';
import { PlayerDetailsComponent } from '../player-details/player-details-component';
import { ExportType } from 'src/app/models/enums'

@Component({
  selector: 'app-player-stat-component',
  templateUrl: './player-stat.component.html',
  styleUrls: ['./player-stat-component.scss']
})
export class PlayerStatComponent implements OnInit {
  constructor(
    public playerDataService: PlayerDataService,
    private dialog: MatDialog,
    public dialModRef: MatDialogRef<any>
  ) {}

  @Input() matchData: MatchRecord;
  @Input() fullData: Array<MatchRecord>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public displayedColumns: string[] = [
    'name',
    'placement',
    'eliminations',
    'score',
    'settings'
  ];

  public matchName: string;

  public exportEnum = ExportType;

  ngOnInit() {
    this.matchData.dataSource.sort = this.sort;

    this.matchName = this.matchData.matchName;
  }

  goToPlayerDetail(player: PlayerRecord) {
    this.playerDataService.activePlayer = player;

    const dialogRef = this.dialog.open(PlayerDetailsComponent, { panelClass: 'custom-dialog-container' });
  }
}
