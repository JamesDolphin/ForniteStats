import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerDetailsComponent } from './player-details-component/player-details-component.component';


const routes: Routes = [
  {
    path: 'details',
    component: PlayerDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
