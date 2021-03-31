import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';

// Icons
import { UserAddOutline } from '@ant-design/icons-angular/icons';

@NgModule({
  declarations: [AdministrationComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    NzMenuModule,
    TranslateModule,
    NzIconModule.forChild([
      UserAddOutline
    ])
  ]
})
export class AdministrationModule { }
