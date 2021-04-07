import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRolesRoutingModule } from './user-roles-routing.module';
import { UserRolesComponent } from './user-roles.component';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserRolesActionsComponent } from './user-roles-actions/user-roles-actions.component';


@NgModule({
  declarations: [UserRolesComponent, UserRolesActionsComponent],
  imports: [
    CommonModule,
    UserRolesRoutingModule,
    TranslateModule,
    AgGridModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule
  ]
})
export class UserRolesModule { }
