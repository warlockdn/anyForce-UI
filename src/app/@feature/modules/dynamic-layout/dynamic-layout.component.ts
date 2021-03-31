import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-layout',
  template: `
    <!-- <ng-container [ngSwitch]="conditionExpression">
      <div *ngSwitchCase="expression">output</div>
      <div *ngSwitchDefault>output2</div>
    </ng-container> -->
  `,
  styleUrls: ['./dynamic-layout.component.scss']
})
export class DynamicLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
