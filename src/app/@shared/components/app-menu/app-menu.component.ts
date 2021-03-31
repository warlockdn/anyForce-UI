import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <ul nz-menu nzMode="horizontal" nzTheme="dark">
      <li nz-menu-item>Home</li>
      <li nz-menu-item>Home</li>
      <li nz-menu-item>Home</li>

      <!-- Place for extra tabs opened. Needs to go here as scroll -->

    </ul>
  `,
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
