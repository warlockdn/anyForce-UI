import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { TextComponent } from './controls/text/text.component';
import { PicklistComponent } from './controls/picklist/picklist.component';
import { MultiPicklistComponent } from './controls/multi-picklist/multi-picklist.component';
import { SwitchBooleanComponent } from './controls/switch-boolean/switch-boolean.component';
import { DateComponent } from './controls/date/date.component';
import { DateRangeComponent } from './controls/date-range/date-range.component';
import { NumberComponent } from './controls/number/number.component';
import { DoubleComponent } from './controls/double/double.component';
import { TextareaComponent } from './controls/textarea/textarea.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DynamicFieldDirective } from './directive/dynamic-field.directive';


@NgModule({
  declarations: [
    DynamicFormComponent,
    TextComponent,
    PicklistComponent,
    MultiPicklistComponent,
    SwitchBooleanComponent,
    DateComponent,
    DateRangeComponent,
    NumberComponent,
    DoubleComponent,
    TextareaComponent,
    DynamicFieldDirective
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
  ],
  providers: [
    DynamicFieldDirective
  ]
})
export class DynamicFormModule { }
