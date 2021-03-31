import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item>Home</nz-breadcrumb-item>
      <nz-breadcrumb-item>List</nz-breadcrumb-item>
      <nz-breadcrumb-item>App</nz-breadcrumb-item>
    </nz-breadcrumb>
  `,
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
