import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatatableModule } from './../../../@feature/modules/datatable/datatable.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    DatatableModule,
    NzPageHeaderModule,
    TranslateModule
  ]
})
export class UserModule { }
