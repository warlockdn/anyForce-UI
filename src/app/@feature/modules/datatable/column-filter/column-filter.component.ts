import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-column-filter',
  template: `
    <nz-card [nzTitle]="'toggleColumnHeaderText' | translate">
      <div class="column-list">
        <label nz-checkbox nzDisabled>Checkbox</label>
        <label nz-checkbox nzDisabled>Checkbox</label>
        <label nz-checkbox>Checkbox</label>
        <label nz-checkbox>Checkbox</label>
        <label nz-checkbox>Checkbox</label>
        <label nz-checkbox>Checkbox</label>
        <label nz-checkbox>Checkbox</label>
      </div>
    </nz-card>
  `,
  styleUrls: ['./column-filter.component.scss']
})
export class ColumnFilterComponent implements OnInit, OnDestroy {

  columnData: any;

  /** Subject used for passing down the data to calling component */
  onClose$: Subject<any> = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onClose$.unsubscribe();
  }

}
