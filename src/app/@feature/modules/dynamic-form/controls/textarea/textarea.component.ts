import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  template: `
    <p>
      textarea works!
    </p>
  `,
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
