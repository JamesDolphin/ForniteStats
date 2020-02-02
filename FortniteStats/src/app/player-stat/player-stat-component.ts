import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import { MatchRecord } from "../models/MatchRecord";
import { MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from "@angular/material";
import { PlayerRecord } from "../models/PlayerRecord";
import { Router, ActivatedRoute } from "@angular/router";
import { PlayerDataService } from "../services/playerData.service";
import { PlayerDetailsComponent } from "../player-details/player-details-component";
import { ExportType } from "src/app/models/enums";
import { PlayerGroup } from "../models/PlayerGroup";

@Component({
  selector: "app-player-stat-component",
  templateUrl: "./player-stat.component.html",
  styleUrls: ["./player-stat-component.scss"]
})
export class PlayerStatComponent implements OnInit {
  constructor(public playerDataService: PlayerDataService, private dialog: MatDialog, public dialModRef: MatDialogRef<any>) {}

  @Input() matchData: MatchRecord;
  @Input() fullData: Array<MatchRecord>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public displayedColumns: string[] = ["groupName", "groupPlacement", "groupElims", "groupScore", "settings"];

  public matchName: string;

  public exportEnum = ExportType;

  public dataSource: MatTableDataSource<any> = null;
  public loading: boolean = true;

  ngOnInit() {
    this.loading = true;
    this.dataSource = new MatTableDataSource(this.matchData.playerGroups.sort((a, b) => b.groupScore - a.groupScore));
    //this.dataSource = new MatTableDataSource(this.matchData.playerGroups);

    this.dataSource.sort = this.sort;

    this.matchName = this.matchData.matchName;

    this.loading = false;
  }

  goToGroupDetail(group: PlayerGroup) {
    this.playerDataService.activeGroup = group;

    const dialogRef = this.dialog.open(PlayerDetailsComponent, { panelClass: "custom-dialog-container" });
  }
}
