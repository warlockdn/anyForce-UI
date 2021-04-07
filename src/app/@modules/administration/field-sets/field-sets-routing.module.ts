import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldManagerComponent } from './field-manager/field-manager.component';
import { FieldSetsComponent } from './field-sets.component';

const routes: Routes = [
  {
    path: '',
    component: FieldSetsComponent,
    children: [
      {
        path: ':entityCode',
        component: FieldManagerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldSetsRoutingModule { }
