import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-manager',
  template: `
    <!-- Empty Section -->
    <nz-empty *ngIf="!entity" class="fit-height" [nzNotFoundContent]="'fieldManagerEmptyDesc' | translate"></nz-empty>

    {{ entity }}
  `,
  styleUrls: ['./field-manager.component.scss']
})
export class FieldManagerComponent implements OnInit {

  @Input()
  entity: any;

  constructor() { }

  ngOnInit(): void {
  }

}
