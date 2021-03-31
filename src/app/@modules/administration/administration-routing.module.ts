import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [{
      path: '',
      redirectTo: '/administration/dashboard',
      pathMatch: 'full'
    }, {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
      path: 'automation',
      loadChildren: () => import('./automation/automation.module').then(m => m.AutomationModule)
    }, {
      path: 'entities',
      loadChildren: () => import('./entities/entities.module').then(m => m.EntitiesModule)
    }, {
      path: 'users',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }, {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
