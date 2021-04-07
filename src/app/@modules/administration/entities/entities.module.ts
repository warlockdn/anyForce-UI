import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesComponent } from './entities.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatatableModule } from './../../../@feature/modules/datatable/datatable.module';
import { EntityService } from '../services/entity/entity.service';
import { AgGridModule } from 'ag-grid-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { EntitiesActionComponent } from './entities-action/entities-action.component';
import { ManageEntityComponent } from './manage-entity/manage-entity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [EntitiesComponent, EntitiesActionComponent, ManageEntityComponent],
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    TranslateModule,
    NzPageHeaderModule,
    DatatableModule,
    HttpClientModule,
    NzIconModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    NzGridModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    EntityService
  ]
})
export class EntitiesModule { }
