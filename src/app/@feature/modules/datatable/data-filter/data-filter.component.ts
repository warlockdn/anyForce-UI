import { Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ColumnFilter } from 'src/app/models/datatable';

@Component({
  selector: 'app-data-filter',
  template: `
    <div class="column-filter">
      <div class="column-body">
        Table filters here..
      </div>
      <div class="column-footer">
        <button nz-button nzType="text" (click)="closeDrawer()">Cancel</button>
        <button nz-button nzType="primary">Filter Datatable</button>
      </div>
    </div>
  `,
  styleUrls: ['./data-filter.component.scss']
})
export class DataFilterComponent implements OnInit {

  filterData: ColumnFilter | undefined;

  constructor(
    private drawerRef: NzDrawerRef<{ data: ColumnFilter }>
  ) { }

  ngOnInit(): void {
    this.filterData = this.drawerRef.getContentComponent()?.data;
  }

  closeDrawer(): void {
    this.drawerRef.close();
  }

}
