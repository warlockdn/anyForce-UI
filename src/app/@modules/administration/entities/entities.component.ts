import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AgGridColumn } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { defaultColDef, EntitiesGridColumns } from './../../../@constants/administration.constants';
import { ColumnFilterComponent } from './../../../@feature/modules/datatable/column-filter/column-filter.component';
import { DataFilterComponent } from './../../../@feature/modules/datatable/data-filter/data-filter.component';
import { DataStoreService } from './../../../@shared/services/data-store.service';
import { Action, ColumnFilter } from './../../../models/datatable';
import { Entity } from './../../../models/entity';
import { EntityService } from '../services/entity/entity.service';
import { EntitiesActionComponent } from './entities-action/entities-action.component';
import { ManageEntityComponent } from './manage-entity/manage-entity.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-entities',
  template: `
    <section class="page">
      <div class="section-body">

        <div class="datagrid-toolbar">
          <nz-page-header [nzTitle]="'entitiesPageTitle' | translate"></nz-page-header>
          <div class="actions">
            <button nz-button nzType="text" nzType="primary" [title]="'addNewEntity' | translate" (click)="manageEntity('add')">
              <i nz-icon nzType="plus"></i> {{'addNewEntity' | translate}}
            </button>
            <button nz-button nzType="text" [title]="'datatableColumnFilterText' | translate" (click)="openColumnToggle()" #columnToggleRef>
              <i nz-icon nzType="sliders"></i>
            </button>
            <button nz-button nzType="text" [title]="'datatableFilterText' | translate" (click)="openDataFilterDrawer()">
              <i nz-icon nzType="filter"></i>
            </button>
          </div>
        </div>

        <ag-grid-angular
          #entitiesGrid
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

      </div>
    </section>
  `,
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit, OnDestroy {

  readonly loadingDataTemplate = this.translate.instant('loadingEntities');
  readonly noRowsTemplate = this.translate.instant('noEntitiesTemplate');

  internalSubs: Subscription = new Subscription();

  private overlayRef: OverlayRef | undefined;

  @ViewChild('columnToggleRef') columnToggleRef!: NzButtonComponent;

  /** Column Definition */
  columnDefs: AgGridColumn[] = [];

  // Grid Properties
  gridApi!: GridApi;
  columnApi!: ColumnApi;
  columnTypes!: { [value: string]: ColDef };
  defaultColDef = defaultColDef;
  frameworkComponents = {
    actionsRendered: EntitiesActionComponent
  };

  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly modalService: NzModalService,
    private readonly notificationService: NzNotificationService,
    private readonly entityService: EntityService,
    private readonly drawerService: NzDrawerService,
    private readonly overlay: Overlay,
    private readonly dataStore: DataStoreService
  ) { }

  ngOnInit(): void {
    this.getEntites();
    this.setColumnTypes();
  }

  setColumnTypes(): void {
    this.columnTypes = {
      // label: {
      //   cellRenderer: params => {
      //     return `<span title="${params.data?.description || ''}">${params.value}</span>`;
      //   }
      // },
      fieldCount: {
        cellRenderer: params => Array.isArray(params.value) ? params.value.length : '0'
      },
      date: {
        cellRenderer: params => params.value ? new Date(params.value).toLocaleString() : ''
      },
      action: {
        cellRendererFramework: EntitiesActionComponent,
        cellRendererParams: {
          actionDispatcher: (params: Action) => {
            this.actionDispatchHandler(params);
          }
        },
        cellClass: 'text-center'
      }
    };
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    this.columnApi = event.columnApi;
    this.gridApi.showLoadingOverlay();
    this.watchEntities();
  }

  getEntites(): void {
    this.internalSubs.add(
      this.entityService.loadEntities().subscribe()
    );
  }

  watchEntities(): void {
    this.dataStore.entities$.subscribe(entities => {
      const columns: ColDef[] = Object.keys(EntitiesGridColumns).map((column: string) => {
        return {
          headerName: (EntitiesGridColumns as any)[column],
          type: this.getColumnType((EntitiesGridColumns as any)[column]),
          field: column,
          tooltipField: 'description'
        };
      });

      // Action Column
      columns.push({
        headerName: '',
        type: 'action',
        field: 'action'
      });

      this.gridApi.setColumnDefs(columns);
      this.gridApi.setRowData(entities);
      setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
        this.gridApi.hideOverlay();
      }, 0);
    });
  }

  getColumnType(columnName: string): string {
    if ([EntitiesGridColumns.createdDate, EntitiesGridColumns.updatedDate].includes(columnName as any)) {
      return 'date';
    } else if (columnName === EntitiesGridColumns.fields) {
      return 'fieldCount';
    } else {
      return '';
    }
  }

  /**
   * Adds new Entity by Opening a popup and lets you fill the form.
   */
  manageEntity(type: 'add' | 'edit', entity?: Entity): void {
    const manageEntityModal = this.modalService.create({
      nzTitle: `${this.translate.instant(type === 'add' ? 'addEntityAction' : 'entitiesActionEdit')} ${entity?.name}`,
      nzContent: ManageEntityComponent,
      nzComponentParams: {
        entity
      },
      nzOkText: type === 'add' ? 'Add' : 'Update',
      nzOkDisabled: true,
      nzOnOk: (instance: ManageEntityComponent) => {
        return new Promise((resolve) => {
          const formValue = instance.entityForm.value;
          if (entity) {
            delete formValue.name;
            this.entityService.updateEntity(entity.name, formValue)
              .subscribe(updatedEntity => {
                if (updatedEntity) {

                  let entityToUpdate = null;
                  this.gridApi.forEachNodeAfterFilterAndSort(rowNode => {
                    const row = rowNode.data;
                    if (row.id === updatedEntity.id) {
                      entityToUpdate = row;
                    }
                  });

                  if (entityToUpdate) {
                    this.gridApi.applyTransaction({
                      update: [ Object.assign(entityToUpdate, updatedEntity) ],
                    });
                    this.notificationService.success(`Successfully updated`, 'Successfully updated Entity - ' + entity.label, {
                      nzPlacement: 'bottomRight'
                    });
                    resolve();
                  }

                }
              });
          } else {
            this.entityService.createEntity(formValue)
              .subscribe(newEntity => {
                if (newEntity) {
                  this.gridApi.addItems([newEntity]);
                  this.notificationService.success(`Successfully created`, 'Successfully created Entity - ' + newEntity.label, {
                    nzPlacement: 'bottomRight'
                  });
                  resolve();
                }
              });
          }
        });
      },
      nzMaskClosable: true
    });

    this.internalSubs.add(
      manageEntityModal.afterOpen
        .pipe(delay(200))
        .subscribe(() => {

          if (manageEntityModal.componentInstance?.entityForm.valid) {
            manageEntityModal.updateConfig({
              nzOkDisabled: false,
              nzMaskClosable: true
            });
          }

          manageEntityModal.componentInstance?.entityForm
            .valueChanges
            .subscribe(() => {
              manageEntityModal.updateConfig({
                nzOkDisabled: manageEntityModal.componentInstance?.entityForm.invalid,
                nzMaskClosable: false
              });
            });
        })
    );

  }

  /**
   * Take actions like Edit/(Navigate to Fields, Layouts)/Delete
   * @param params details of the passed arguments
   */
  actionDispatchHandler(params: Action): void {
    switch (params.type) {
      case 'edit':
        this.manageEntity('edit', params.data);
        break;
      case 'fields':
        this.router.navigate(['/administration/entities/fields', params.data.name], {
          state: {
            entity: params.data
          }
        });
        break;
      case 'layouts':
        this.router.navigate(['/administration/entities/layout', params.data.name], {
          state: {
            entity: params.data
          }
        });
        break;
      case 'delete':
        this.deleteEntity(params.data);
        break;
    }
  }

  deleteEntity(entity: Entity, confirm: boolean = false): void {
    if (!confirm) {
      this.modalService.confirm({
        nzTitle: `Delete ${entity.label}?`,
        nzContent: `Are you sure you want to delete ${entity.label} (Note: This action is irreversible).`,
        nzOkText: 'Delete',
        nzOnOk: () => {
          this.deleteEntity(entity, true);
        },
        nzOkDanger: true
      });
    } else {
      this.internalSubs.add(
        this.entityService.deleteEntity(entity).subscribe(res => {
          if (res !== undefined) {

            // Delete Entity from Grid
            this.gridApi.applyTransaction({ remove: [entity] });

            // Show success notification.
            this.notificationService.success(`Successfully deleted`, 'Successfully deleted Entity - ' + entity.label, {
              nzPlacement: 'bottomRight'
            });
          } else {
            this.notificationService.error(`Error deleting`, 'There was a error delete the selected entity. Please try again.', {
              nzPlacement: 'bottomRight'
            });
          }
        })
      );
    }
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
    this.overlayRef?.detach();
  }

  ngOnDestroy(): void {
    this.internalSubs.unsubscribe();
    this.overlayRef?.detach();
  }

}
