import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TreatmentsComponent} from './treatments.component';


const routes: Routes = [
  {path: '', component: TreatmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentsRoutingModule { }
