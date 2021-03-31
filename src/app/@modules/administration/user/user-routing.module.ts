import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mn_MN } from 'ng-zorro-antd/i18n';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: UserComponent },
      {
        path: 'roles',
        loadChildren: () => import('./../user-roles/user-roles.module').then(m => m.UserRolesModule)
      }, {
        path: 'permissions',
        loadChildren: () => import('./../permissions/permissions.module').then(m => m.PermissionsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
