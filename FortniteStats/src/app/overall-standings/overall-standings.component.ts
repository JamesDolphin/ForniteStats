import { Component, OnInit } from "@angular/core";
import { PlayerDataService } from "../services/playerData.service";
import { PlayerRecord } from "../models/PlayerRecord";
import { PlayerDetailsComponent } from "../player-details/player-details-component";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ExportType } from "src/app/models/enums";
import { PlayerGroup } from "../models/PlayerGroup";

@Component({
  selector: "app-overall-standings",
  templateUrl: "./overall-standings.component.html",
  styleUrls: ["./overall-standings.component.scss"]
})
export class OverallStandingsComponent implements OnInit {
  constructor(public playerDataService: PlayerDataService, public dialog: MatDialog, public dialModRef: MatDialogRef<any>) {}

  public groupList: Array<PlayerGroup> = [];

  public loading = true;

  public exportEnum = ExportType;

  public displayedColumns: string[] = ["rank", "name", "placement", "eliminations", "score", "settings"];

  ngOnInit() {
    this.loading = true;
    for (const match of this.playerDataService.matchData) {
      for (const playerGroup of match.playerGroups) {
        if (this.groupList.find(x => x.groupName === playerGroup.groupName) == null) {
          const newGroup = new Object() as PlayerGroup;
          newGroup.groupName = playerGroup.groupName;
          newGroup.groupElims = 0;
          newGroup.groupMatchCount = 0;
          newGroup.groupPlacement = 0;
          newGroup.groupScore = 0;

          this.groupList.push(newGroup);
        }

        const existingGroup = this.groupList.find(x => x.groupName === playerGroup.groupName);

        existingGroup.groupMatchCount = existingGroup.groupMatchCount + 1;
        existingGroup.groupElims = existingGroup.groupElims + playerGroup.groupElims;
        existingGroup.groupScore = existingGroup.groupScore + playerGroup.groupScore;
        existingGroup.groupPlacement = existingGroup.groupPlacement + playerGroup.groupPlacement;
        existingGroup.groupAveragePlacement = existingGroup.groupPlacement / existingGroup.groupMatchCount;
        existingGroup.groupAveragePlacement = Math.round(existingGroup.groupAveragePlacement * 10) / 10;
      }
    }

    this.groupList.sort((a, b) => b.groupScore - a.groupScore);

    for (let i = 1; i <= this.groupList.length; i++) {
      this.groupList[i - 1].groupRank = i;
    }

    this.loading = false;
  }

  goToGroupDetail(group: PlayerGroup) {
    this.playerDataService.activeGroup = group;

    const dialogRef = this.dialog.open(PlayerDetailsComponent, {
      panelClass: "custom-dialog-container"
    });
  }
}
