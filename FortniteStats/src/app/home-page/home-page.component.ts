import { Component } from "@angular/core";
import { ViewChild } from "@angular/core";
import { MatchRecord } from "../models/MatchRecord";
import { PlayerRecord } from "../models/PlayerRecord";
import { MatTableDataSource, MatDialog, MatDialogRef } from "@angular/material";
import { PlayerDataService } from "../services/playerData.service";
import { OverallStandingsComponent } from "../overall-standings/overall-standings.component";
import { PlayerGroup } from "../models/PlayerGroup";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent {
  constructor(public playerDataService: PlayerDataService, private dialog: MatDialog, public dialModRef: MatDialogRef<any>) {}
  public matches: Array<MatchRecord> = [];

  public loading = true;

  @ViewChild("fileImportInput", { static: false }) fileImportInput: any;

  fileChangeListener($event: any): void {
    this.loading = true;

    this.playerDataService.matchData = [];

    const files = $event.srcElement.files;

    for (const file of files) {
      if (this.isCSVFile(file)) {
        const match = new Object() as MatchRecord;

        match.isVisible = true;

        match.matchName = (file.name as string).replace(".csv", "");
        const input = $event.target;
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
          const matchData = reader.result;
          const matchDataArray = (matchData as string).split(/\r\n|\n/);

          const headersRow = this.getHeaderArray(matchDataArray);

          match.playerGroups = this.getDataRecordsArrayFromCSVFile(matchDataArray, headersRow.length);

          this.generateGroupStats(match.playerGroups);

          match.playerGroups.sort((a, b) => b.groupScore - a.groupScore);

          match.dataSource = new MatTableDataSource(match.playerGroups);

          this.playerDataService.matchData.push(match);
        };

        reader.onerror = () => {
          alert("Unable to read " + file.name);
        };
      } else {
        this.matches = [];
        alert("Please import valid .csv file.");
        this.fileReset();
        break;
      }
    }

    this.loading = false;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const playerData = [];

    const playerGroups: Array<PlayerGroup> = [];

    for (let i = 0; i < csvRecordsArray.length; i++) {
      const data = (csvRecordsArray[i] as string).split(",");

      const player = new Object() as PlayerRecord;

      if (data.length === headerLength) {
        player.name = data[0].trim();
        player.placement = Number(data[1].trim());
        player.eliminations = Number(data[2].trim());

        if (player.placement === 999) {
          continue;
        }

        if (playerGroups.find(x => x.groupPlacement === player.placement)) {
          playerGroups.find(x => x.groupPlacement === player.placement).playerRecords.push(player);
        } else {
          const newGroup = new Object() as PlayerGroup;
          newGroup.playerRecords = [];
          newGroup.groupPlacement = player.placement;
          newGroup.playerRecords.push(player);
          playerGroups.push(newGroup);
        }

        if (player.placement !== 999) {
          playerData.push(player);
        }
      }
    }

    return playerGroups;
  }

  generateGroupStats(groups: Array<PlayerGroup>) {
    const groupSize = Math.max.apply(
      Math,
      groups.map(function(o) {
        return o.playerRecords.length;
      })
    );

    if (groupSize === 3) {
      for (const group of groups) {
        group.groupPlacement = Math.min.apply(
          Math,
          group.playerRecords.map(function(o) {
            return o.placement;
          })
        );

        group.groupElims = group.playerRecords.map(player => player.eliminations).reduce((prev, next) => prev + next);

        group.groupScore = this.generateTrioGroupStats(group);

        group.groupName = this.generateGroupName(group);
      }
    }

    if (groupSize === 1) {
      for (const group of groups) {
        group.groupPlacement = Math.min.apply(
          Math,
          group.playerRecords.map(function(o) {
            return o.placement;
          })
        );

        group.groupScore = this.generateSoloGroupStats(group.playerRecords[0]);

        group.groupElims = group.playerRecords.map(player => player.eliminations).reduce((prev, next) => prev + next);

        group.groupName = this.generateGroupName(group);
      }
    }

    return groups;
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(",");
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
  }

  openOverallStandings() {
    const dialogRef = this.dialog.open(OverallStandingsComponent, {
      panelClass: "custom-dialog-container"
    });
  }

  generateTrioGroupStats(group: PlayerGroup) {
    let placementPoints = 0;

    if (group.groupPlacement >= 9 && group.groupPlacement <= 12) {
      placementPoints = 3;
    }

    if (group.groupPlacement >= 5 && group.groupPlacement <= 8) {
      placementPoints = 6;
    }

    if (group.groupPlacement >= 3 && group.groupPlacement <= 4) {
      placementPoints = 9;
    }

    if (group.groupPlacement === 2) {
      placementPoints = 12;
    }

    if (group.groupPlacement === 1) {
      placementPoints = 15;
    }

    return group.groupElims + placementPoints;
  }

  generateSoloGroupStats(player: PlayerRecord) {
    let placementPoints = 0;

    if (player.placement >= 16 && player.placement <= 25) {
      placementPoints = 3;
    }

    if (player.placement >= 6 && player.placement <= 15) {
      placementPoints = 5;
    }

    if (player.placement >= 2 && player.placement <= 5) {
      placementPoints = 7;
    }

    if (player.placement === 1) {
      placementPoints = 10;
    }

    return player.eliminations + placementPoints;
  }

  generateGroupName(group: PlayerGroup) {
    if (group.playerRecords.length > 1) {
      group.playerRecords.forEach(player => {
        if (group.groupName == null) {
          group.groupName = player.name;
        } else {
          group.groupName = group.groupName + ` + ${player.name}`;
        }
      });
    } else {
      group.groupName = group.playerRecords[0].name;
    }

    return group.groupName;
  }
}
