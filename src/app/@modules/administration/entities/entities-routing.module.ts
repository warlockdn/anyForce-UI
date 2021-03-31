import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntitiesComponent } from './entities.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: EntitiesComponent },
      {
        path: 'fields',
        loadChildren: () => import('./../field-sets/field-sets.module').then(m => m.FieldSetsModule)
      },
      {
        path: 'layout',
        loadChildren: () => import('./../entities-layout/entities-layout.module').then(m => m.EntitiesLayoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
