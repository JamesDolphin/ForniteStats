import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatSortModule, MatIcon, MatIconModule, MatTooltipModule } from '@angular/material';
import { PlayerStatComponent } from './player-stat-component/player-stat-component.component';
import { PlayerDetailsComponent } from './player-details-component/player-details-component.component';

@NgModule({
   declarations: [
      AppComponent,
      HomePageComponent,
      PlayerStatComponent,
      PlayerDetailsComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatTableModule,
      MatSortModule,
      MatIconModule,
      MatTooltipModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
