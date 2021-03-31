import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-double',
  template: `
    <p>
      double works!
    </p>
  `,
  styleUrls: ['./double.component.scss']
})
export class DoubleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
