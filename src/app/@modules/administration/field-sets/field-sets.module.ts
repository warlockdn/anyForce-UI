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
import { FieldEditorComponent } from './field-editor/field-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UtilityModule } from 'src/app/@utility/utility.module';


@NgModule({
  declarations: [FieldSetsComponent, FieldManagerComponent, FieldEditorComponent],
  imports: [
    CommonModule,
    FieldSetsRoutingModule,
    NzGridModule,
    NzButtonModule,
    NzListModule,
    NzInputModule,
    NzEmptyModule,
    TranslateModule,
    NzIconModule.forChild([
      SearchOutline
    ]),
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzSpaceModule,
    NzPopconfirmModule,
    UtilityModule
  ]
})
export class FieldSetsModule { }
