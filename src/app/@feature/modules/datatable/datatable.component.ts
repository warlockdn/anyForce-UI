import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridColumn } from 'ag-grid-angular';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Subscription } from 'rxjs';
import { ColumnFilter } from 'src/app/models/datatable';
import { ColumnFilterComponent } from './column-filter/column-filter.component';
import { DataFilterComponent } from './data-filter/data-filter.component';

@Component({
  selector: 'app-datatable',
  template: `

    <!-- Datatable Toolbar -->
    <div class="datagrid-toolbar">
      <nz-page-header [nzTitle]="name"></nz-page-header>
      <div class="actions">
        <button nz-button nzType="text" [title]="'datatableColumnFilterText' | translate" (click)="openColumnToggle()" #columnToggleRef>
          <i nz-icon nzType="sliders"></i>
        </button>
        <button nz-button nzType="text" [title]="'datatableFilterText' | translate" (click)="openDataFilterDrawer()">
          <i nz-icon nzType="filter"></i>
        </button>
      </div>
    </div>

    <!-- Datatable -->
    <ag-grid-angular
      class="ag-theme-alpine datagrid-table"
      [rowData]="[]"
      [columnDefs]="columnDefs">
    </ag-grid-angular>

  `,
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, OnDestroy {

  /** Contains all internal subscription. */
  internalSubs: Subscription = new Subscription();

  /** Contains the table title */
  @Input()
  name!: string;

  private overlayRef: OverlayRef | undefined;

  @ViewChild('columnToggleRef') columnToggleRef!: NzButtonComponent;

  /** Column Definition */
  columnDefs: AgGridColumn[] = [];
  rowsData = [];

  constructor(
    private readonly drawerService: NzDrawerService,
    private readonly overlay: Overlay
  ) { }

  ngOnInit(): void {
  }

  /** Opens Datatable Filter Drawer */
  openDataFilterDrawer(): void {
    const dataFilterDrawer = this.drawerService.create<DataFilterComponent, { data: ColumnFilter }>({
      nzTitle: 'Filter Table Data',
      nzContent: DataFilterComponent,
      nzContentParams: {
        data: {
          name: 'Entities Manager'
        }
      },
      nzWidth: 500,
    });

    dataFilterDrawer.afterClose.subscribe(data => {
      console.log(data);
    });

  }

  /**
   * Open Column Visibility Toggle
   * Creates a Overlay instance and attaches ColumnFilterComponent
   * Then is completely dependent on $onClose subject for selected values.
   */
  openColumnToggle(): void {

    const columnToggleOverlay = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'column-toggle-overlay',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.columnToggleRef.nzIconDirectiveElement)
        .withPositions([{
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        }])
    });
    const columnToggleOverlayComponent = new ComponentPortal(ColumnFilterComponent);
    const componentRef = columnToggleOverlay.attach(columnToggleOverlayComponent);

    // Pass Data into component
    componentRef.instance.columnData = 'passing data';

    this.columnToggleHandler(columnToggleOverlay, componentRef);
    this.overlayRef = columnToggleOverlay;
  }

  columnToggleHandler(columnToggleOverlay: OverlayRef, componentRef: ComponentRef<ColumnFilterComponent>): void {
    this.internalSubs.add(
      columnToggleOverlay.backdropClick().subscribe(() => {
        columnToggleOverlay.detach();
      })
    );
    this.internalSubs.add(
      componentRef.instance.onClose$
        .subscribe(response => this.columnVisibilityToggleHandler(response))
    );
  }

  columnVisibilityToggleHandler(response: any): void {
    console.log(response);
    this.overlayRef?.detach();
  }

  ngOnDestroy(): void {
    this.internalSubs.unsubscribe();
    this.overlayRef?.detach();
  }

}
