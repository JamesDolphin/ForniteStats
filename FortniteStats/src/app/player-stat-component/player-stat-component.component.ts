import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatchRecord } from '../models/matchRecord';
import { MatSort } from '@angular/material';
import { PlayerRecord } from '../models/PlayerRecord';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerDataService } from '../services/playerData.service';

@Component({
  selector: 'app-player-stat-component',
  templateUrl: './player-stat-component.component.html',
  styleUrls: ['./player-stat-component.component.scss']
})
export class PlayerStatComponent implements OnInit {
  constructor(
    public router: Router,
    public playerDataService: PlayerDataService,
    private route: ActivatedRoute
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

  ngOnInit() {
    this.matchData.dataSource.sort = this.sort;
  }

  goToPlayerDetail(player: PlayerRecord) {
    this.playerDataService.activePlayer = player;
    this.fullData = this.fullData;

    this.router.navigate(['../details'], {relativeTo: this.route});
  }
}
