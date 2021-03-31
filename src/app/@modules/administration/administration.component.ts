import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  template: `
    <ul nz-menu nzMode="horizontal">
      <li nz-menu-item routerLinkActive="ant-menu-item-selected">
        <i nz-icon nzType="appstore"></i>
        <a routerLink="./dashboard">{{ 'dashboardTitle' | translate }}</a>
      </li>
      <li nz-submenu [nzTitle]="'entitiesTitle' | translate" nzIcon="build" routerLinkActive="ant-menu-item-selected">
        <ul>
          <li nz-menu-item>
            <a [routerLink]="['./entities']">{{ 'entitiesPageTitle' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a [routerLink]="['./entities', 'fields']">{{ 'fieldSetsTitle' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a [routerLink]="['./entities', 'layout']">{{ 'layoutTitle' | translate }}</a>
          </li>
        </ul>
      </li>
      <li nz-submenu [nzTitle]="'usersTitle' | translate" nzIcon="usergroup-add" routerLinkActive="ant-menu-item-selected">
        <ul>
          <li nz-menu-item>
            <a [routerLink]="['./users']">{{ 'usersPageTitle' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a [routerLink]="['./users/roles']">{{ 'rolesTitle' | translate }}</a>
          </li>
          <li nz-menu-item>
            <a [routerLink]="['./users/permissions']">{{ 'permissionsTitle' | translate }}</a>
          </li>
        </ul>
      </li>
      <li nz-menu-item routerLinkActive="ant-menu-item-selected">
        <i nz-icon nzType="sisternode"></i>
        <a routerLink="./automation">{{ 'processTitle' | translate }}</a>
      </li>
      <li nz-submenu [nzTitle]="'settingsTitle' | translate" nzIcon="setting" routerLinkActive="ant-menu-item-selected">
        <ul>
          <li nz-menu-group nzTitle="Item 1">
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="Item 2">
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>

    <div class="sub-section">
      <router-outlet></router-outlet>
    </div>

  `,
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
