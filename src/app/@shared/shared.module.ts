import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzResultModule } from 'ng-zorro-antd/result';

// Icons for this module
import { UserOutline } from '@ant-design/icons-angular/icons';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppMenuComponent,
    UserPanelComponent,
    BreadcrumbsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzDropDownModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzResultModule,
    TranslateModule,
    NzIconModule.forChild([
      UserOutline
    ]),
  ],
  exports: [
    AppMenuComponent,
    UserPanelComponent,
    BreadcrumbsComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
