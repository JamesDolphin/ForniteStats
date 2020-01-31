import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatchRecord } from '../models/MatchRecord';
import { PlayerRecord } from '../models/PlayerRecord';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { PlayerDataService } from '../services/playerData.service';
import { OverallStandingsComponent } from '../overall-standings/overall-standings.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(
    public playerDataService: PlayerDataService,
    private dialog: MatDialog,
    public dialModRef: MatDialogRef<any>
  ) { }
  public matches: Array<MatchRecord> = [];

  public loading = true;

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  fileChangeListener($event: any): void {
    this.loading = true;

    this.playerDataService.matchData = [];

    const files = $event.srcElement.files;

    for (const file of files) {
      if (this.isCSVFile(file)) {
        const match = new Object() as MatchRecord;

        match.isVisible = true;

        match.matchName = (file.name as string).replace('.csv', '');
        const input = $event.target;
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = () => {
          const matchData = reader.result;
          const matchDataArray = (matchData as string).split(/\r\n|\n/);

          const headersRow = this.getHeaderArray(matchDataArray);

          match.playerRecords = this.getDataRecordsArrayFromCSVFile(
            matchDataArray,
            headersRow.length
          );

          match.playerRecords.sort((a, b) => b.score - a.score);

          match.dataSource = new MatTableDataSource(match.playerRecords);

          this.playerDataService.matchData.push(match);
        };

        reader.onerror = () => {
          alert('Unable to read ' + file.name);
        };
      } else {
        this.matches = [];
        alert('Please import valid .csv file.');
        this.fileReset();
        break;
      }
    }

    this.loading = false;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const playerData = [];

    for (let i = 0; i < csvRecordsArray.length; i++) {
      const data = (csvRecordsArray[i] as string).split(',');

      const player = new Object() as PlayerRecord;

      if (data.length === headerLength) {
        player.name = data[0].trim();
        player.placement = Number(data[1].trim());
        player.eliminations = Number(data[2].trim());

        player.score = this.calculatePlayerScore(
          player.placement,
          player.eliminations
        );

        if (player.placement !== 999) {
          playerData.push(player);
        }
      }
    }

    return playerData;
  }

  calculatePlayerScore(placement: number, eliminations: number) {
    let elimPoints = 0;
    let placementPoints = 0;

    if (eliminations < 3) {
      elimPoints = 0;
    }

    if (eliminations >= 3 && eliminations <= 4) {
      elimPoints = 1;
    }

    if (eliminations >= 5 && eliminations <= 6) {
      elimPoints = 2;
    }

    if (eliminations >= 7) {
      elimPoints = 3;
    }

    if (placement >= 4 && placement <= 10) {
      placementPoints = 1;
    }

    if (placement >= 2 && placement <= 3) {
      placementPoints = 2;
    }

    if (placement === 1) {
      placementPoints = 3;
    }

    return elimPoints + placementPoints;
  }

  // CHECK IF FILE IS A VALID CSV FILE
  isCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    const headers = (csvRecordsArr[0] as string).split(',');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = '';
  }

  openOverallStandings() {
    const dialogRef = this.dialog.open(OverallStandingsComponent, {
      panelClass: 'custom-dialog-container'
    });
  }
}
