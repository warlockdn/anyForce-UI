import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  template: `
    <p>
      date works!
    </p>
  `,
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
