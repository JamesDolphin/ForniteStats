import { PlayerRecord } from "./PlayerRecord";
import { MatTableDataSource } from "@angular/material";
import { PlayerGroup } from "./PlayerGroup";

export interface MatchRecord {
  playerGroups: Array<PlayerGroup>;

  matchName: string;

  isVisible: boolean;

  dataSource: any;
}
