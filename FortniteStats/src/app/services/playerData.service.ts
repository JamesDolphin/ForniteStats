import { Injectable } from "@angular/core";
import { PlayerRecord } from "../models/PlayerRecord";
import { MatchRecord } from "../models/MatchRecord";
import { PlayerGroup } from "../models/PlayerGroup";

@Injectable({
  providedIn: "root"
})
export class PlayerDataService {
  constructor() {}

  public playerData: PlayerRecord;

  public matchData: Array<MatchRecord>;

  public activePlayer: PlayerRecord;

  public activeGroup: PlayerGroup;
}
