import { PlayerRecord } from "./PlayerRecord";

export interface PlayerGroup {
  playerRecords: Array<PlayerRecord>;
  groupPlacement: number;
  groupScore: number;
  groupElims: number;
  groupName: string;
  groupMatchCount: number;
  groupAveragePlacement: number;
  groupRank: number;
  dataSource: any;
}
