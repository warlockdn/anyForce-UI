import { Component, EventEmitter, Output } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Logger } from 'src/app/@core/logger.service';
import { Action } from 'src/app/models/datatable';

@Component({
  selector: 'app-entities-action',
  template: `
    <button nz-button nzType="text" [title]="'entitiesActionEdit' | translate" (click)="actionDispatcher('edit')"><i nz-icon nzType="edit"></i></button>
    <button nz-button nzType="text" [title]="'entitiesActionFields' | translate" (click)="actionDispatcher('fields')"><i nz-icon nzType="unordered-list" nzTheme="outline"></i></button>
    <button nz-button nzType="text" [title]="'entitiesActionLayouts' | translate" (click)="actionDispatcher('layouts')"><i nz-icon nzType="build" nzTheme="outline"></i></button>
    <button nz-button nzType="text" [title]="'entitiesActionLayouts' | translate" nzDanger (click)="actionDispatcher('delete')"><i nz-icon nzType="delete" nzTheme="outline"></i></button>
  `,
  styleUrls: ['./entities-action.component.scss']
})
export class EntitiesActionComponent implements AgRendererComponent {

  logger = new Logger('EntitiesActionComponent');

  params!: ICellRendererParams & { actionDispatcher(params: Action): void };

  constructor() { }

  agInit(params: ICellRendererParams): void {
    this.params = params as any;
  }

  refresh(): boolean {
    return false;
  }

  actionDispatcher(action: string): void {
    this.params.actionDispatcher({
      type: action,
      data: this.params.data
    });
  }

}
