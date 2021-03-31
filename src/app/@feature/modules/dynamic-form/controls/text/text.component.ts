import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  template: `
    <p>
      text works!
    </p>
  `,
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
