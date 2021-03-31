import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { EntitiesLayoutRoutingModule } from './entities-layout-routing.module';
import { EntitiesLayoutComponent } from './entities-layout.component';
import { PropertiesPanelComponent } from './properties-panel/properties-panel.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { SearchOutline } from '@ant-design/icons-angular/icons';
import { LayoutManagerComponent } from './layout-manager/layout-manager.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { UtilityBarComponent } from './utility-bar/utility-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EllipsisModule } from 'ngx-ellipsis';
import { AddNewLayoutComponent } from './add-new-layout/add-new-layout.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [
    EntitiesLayoutComponent,
    SidebarComponent,
    LayoutManagerComponent,
    PropertiesPanelComponent,
    UtilityBarComponent,
    AddNewLayoutComponent
  ],
  imports: [
    CommonModule,
    EntitiesLayoutRoutingModule,
    FormsModule,
    NzSkeletonModule,
    NzGridModule,
    NzListModule,
    NzInputModule,
    NzEmptyModule,
    TranslateModule,
    NzSpinModule,
    NzTabsModule,
    NzCardModule,
    DragDropModule,
    NgxDnDModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDropDownModule,
    NzIconModule.forChild([
      SearchOutline
    ])
  ]
})
export class EntitiesLayoutModule { }
