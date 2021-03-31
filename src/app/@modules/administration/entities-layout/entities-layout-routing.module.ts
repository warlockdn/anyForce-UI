import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntitiesLayoutComponent } from './entities-layout.component';
import { LayoutManagerComponent } from './layout-manager/layout-manager.component';

const routes: Routes = [
  {
    path: '',
    component: EntitiesLayoutComponent,
    children: [
      {
        path: ':entityCode',
        children: [
          {
            path: '',
            children: [
              { path: ':layoutId', component: LayoutManagerComponent }
            ]
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesLayoutRoutingModule { }
