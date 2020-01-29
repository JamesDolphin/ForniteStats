import { Component, OnInit, Input } from '@angular/core';
import { MatchRecord } from '../models/matchRecord';
import { PlayerRecord } from '../models/PlayerRecord';
import { PlayerDataService } from '../services/playerData.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details-component.html',
  styleUrls: ['./player-details-component.css']
})
export class PlayerDetailsComponent implements OnInit {

  public playerData: PlayerRecord;

  public matchData: Array<MatchRecord>;

  constructor(public playerDataService: PlayerDataService) { }

  @Input() fullData: Array<MatchRecord>;
  @Input() player: PlayerRecord;

  ngOnInit() {
    console.log(this.playerDataService.playerData);

    this.playerData =  this.playerDataService.playerData;

    this.matchData = this.playerDataService.matchData;

    console.log(this.playerData);


    this.playerDataService.playerData = null;

    this.playerDataService.matchData = null;
  }

}
