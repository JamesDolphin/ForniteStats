import { PlayerRecord } from './PlayerRecord';
import { MatTableDataSource } from '@angular/material';

export interface MatchRecord {

  playerRecords: Array<PlayerRecord>;

  matchName: string;

  isVisible: boolean;

  dataSource: any;
}
