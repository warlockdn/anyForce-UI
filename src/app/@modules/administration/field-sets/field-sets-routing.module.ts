import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldManagerComponent } from './field-manager/field-manager.component';
import { FieldSetsComponent } from './field-sets.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: FieldSetsComponent },
      { path: ':entityCode', component: FieldSetsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldSetsRoutingModule { }
