import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { FieldSetsRoutingModule } from './field-sets-routing.module';
import { FieldSetsComponent } from './field-sets.component';

// Icons
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { FieldManagerComponent } from './field-manager/field-manager.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FieldSetsComponent, FieldManagerComponent],
  imports: [
    CommonModule,
    FieldSetsRoutingModule,
    NzGridModule,
    NzListModule,
    NzInputModule,
    NzEmptyModule,
    TranslateModule,
    NzIconModule.forChild([
      SearchOutline
    ])
  ]
})
export class FieldSetsModule { }
