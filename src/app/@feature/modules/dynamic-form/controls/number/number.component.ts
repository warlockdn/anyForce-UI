import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number',
  template: `
    <p>
      number works!
    </p>
  `,
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
