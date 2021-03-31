import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { DatatableComponent } from './datatable.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { DataFilterComponent } from './data-filter/data-filter.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';


@NgModule({
  declarations: [
    DatatableComponent,
    ColumnFilterComponent,
    DataFilterComponent
  ],
  imports: [
    CommonModule,
    NzDrawerModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzCheckboxModule,
    TranslateModule,
    OverlayModule,
    NzPageHeaderModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    DatatableComponent
  ]
})
export class DatatableModule { }
