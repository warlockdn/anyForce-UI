import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <section class="page">
      <div class="section-body">
        <app-datatable [name]="'usersPageTitle' | translate"></app-datatable>
      </div>
    </section>
  `,
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
