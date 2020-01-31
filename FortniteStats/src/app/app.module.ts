import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule, MatIconModule, MatTooltipModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatButtonModule } from '@angular/material';
import { PlayerStatComponent } from './player-stat/player-stat-component';
import { PlayerDetailsComponent } from './player-details/player-details-component';
import { OverallStandingsComponent } from './overall-standings/overall-standings.component';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
   declarations: [
      AppComponent,
      HomePageComponent,
      PlayerStatComponent,
      PlayerDetailsComponent,
      OverallStandingsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatTableModule,
      MatSortModule,
      MatIconModule,
      MatTooltipModule,
      MatDialogModule,
      MatButtonModule,
      MatTableExporterModule
   ],
   providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
    ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
     PlayerDetailsComponent,
     OverallStandingsComponent
   ]
})
export class AppModule { }
