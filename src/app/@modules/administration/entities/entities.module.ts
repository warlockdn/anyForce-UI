import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesComponent } from './entities.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatatableModule } from './../../../@feature/modules/datatable/datatable.module';
import { EntityService } from '../services/entity/entity.service';


@NgModule({
  declarations: [EntitiesComponent],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    TranslateModule,
    NzPageHeaderModule,
    DatatableModule,
    HttpClientModule
  ],
  providers: [
    EntityService
  ]
})
export class EntitiesModule { }
