import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  template: `
    <button
      nz-button
      nzType="primary"
      nzShape="circle"
      nz-dropdown
      nzTrigger="click"
      [nzDropdownMenu]="menu"
      [title]="'usertopbutton' | translate">
        <i nz-icon nzType="user"></i>
    </button>

    <!-- User Profile Dropdown Menu -->
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-divider></li>
        <li nz-menu-item nzDisabled>disabled menu item</li>
        <li nz-submenu nzTitle="sub menu">
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
        <li nz-submenu nzDisabled nzTitle="disabled sub menu">
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </nz-dropdown-menu>

  `,
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
