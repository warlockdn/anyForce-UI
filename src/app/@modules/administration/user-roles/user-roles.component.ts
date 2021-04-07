import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AgGridColumn } from 'ag-grid-angular';
import { GridApi, ColumnApi, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { defaultColDef } from 'src/app/@constants/administration.constants';
import { UserRolesActionsComponent } from './user-roles-actions/user-roles-actions.component';

@Component({
  selector: 'app-user-roles',
  template: `

    <div class="datagrid-toolbar">
      <nz-page-header [nzTitle]="'userRolesManagerTitle' | translate"></nz-page-header>
      <div class="actions">
        <button nz-button nzType="text" nzType="primary" [title]="'addNewEntity' | translate">
          <i nz-icon nzType="plus"></i> {{'addNewUserRole' | translate}}
        </button>
        <button nz-button nzType="text" [title]="'datatableColumnFilterText' | translate" #columnToggleRef>
          <i nz-icon nzType="sliders"></i>
        </button>
        <button nz-button nzType="text" [title]="'datatableFilterText' | translate">
          <i nz-icon nzType="filter"></i>
        </button>~
      </div>
    </div>

    <ag-grid-angular
      #userRolesGrid
      class="ag-theme-alpine datagrid-table"
      [rowData]="[]"
      [columnDefs]="columnDefs"
      [columnTypes]="columnTypes"
      [defaultColDef]="defaultColDef"
      [frameworkComponents]="frameworkComponents"
      [overlayLoadingTemplate]="loadingDataTemplate"
      [overlayNoRowsTemplate]="noRowsTemplate"
      (gridReady)="onGridReady($event)">
    </ag-grid-angular>

  `,
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  readonly loadingDataTemplate = this.translate.instant('loadingEntities');
  readonly noRowsTemplate = this.translate.instant('noEntitiesTemplate');

  internalSubs: Subscription = new Subscription();

  /** Column Definition */
  columnDefs: AgGridColumn[] = [];

  // Grid Properties
  gridApi!: GridApi;
  columnApi!: ColumnApi;
  columnTypes!: { [value: string]: ColDef };
  defaultColDef = defaultColDef;
  frameworkComponents = {
    actionsRendered: UserRolesActionsComponent
  };

  constructor(
    private readonly translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  setColumnTypes(): void {
    this.columnTypes = {
      action: {
        cellRendererFramework: UserRolesActionsComponent,
        cellRendererParams: {
        },
        cellClass: 'text-center'
      }
    };
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.columnApi = event.columnApi;
    this.gridApi.showLoadingOverlay();
  }

}
