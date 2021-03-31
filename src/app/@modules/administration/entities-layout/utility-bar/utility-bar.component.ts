import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Structure } from './../../../../models/structure.model';

@Component({
  selector: 'app-utility-bar',
  template: `
    <div class="utility-toolbar">
      <button nz-button nzSize="small" nzType="text" [title]="'toggleRow' | translate" *ngIf="['row', 'section', 'column'].includes(model.type)" (click)="toggleRowView($event)">
        <i nz-icon nzType="caret-down" nzTheme="outline"></i>
      </button>
      <button nz-button nzSize="small" nzType="text" [title]="'edit' | translate" (click)="editModel()">
        <i nz-icon nzType="edit" nzTheme="outline"></i>
      </button>
      <!-- <nz-button-group class="size-group" *ngIf="model?.inputType === 'column'">
        <button nz-button nzSize="small" nzType="text" [title]="'shrink' | translate" (click)="shrinkModel()">
          <i nz-icon nzType="shrink" nzTheme="outline"></i>
        </button>
        <button nz-button nzSize="small" nzType="text" [title]="'expand' | translate" (click)="expandModel()">
          <i nz-icon nzType="arrows-alt" nzTheme="outline"></i>
        </button>
      </nz-button-group> -->
      <button nz-button nzSize="small" nzType="text" [title]="'delete' | translate" (click)="deleteModel()">
        <i nz-icon nzType="delete" nzTheme="outline"></i>
      </button>
    </div>
  `,
  styleUrls: ['./utility-bar.component.scss']
})
export class UtilityBarComponent implements OnInit {

  @Input()
  model: any;

  @Output()
  delete: EventEmitter<any> = new EventEmitter();

  @Output()
  selectedModel: EventEmitter<Structure> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  shrinkModel(): void {
    if (this.model?.width === 6) {
      return;
    }
    this.model.width = (this.model.width || 9) - 3;
  }

  expandModel(): void {
    if (this.model?.width === 24) {
      return;
    }
    this.model.width = (this.model.width || 6) + 3;
  }

  deleteModel(): void {
    this.delete.emit(this.model);
  }

  toggleRowView(event: MouseEvent): void {
    const titleElement = (event.currentTarget as HTMLElement).closest('.title');
    if (titleElement) {
      if ((titleElement.nextElementSibling as HTMLElement)?.classList.contains('hidden')) {
        (event.currentTarget as HTMLElement).classList.remove('toggled');
        (titleElement.nextElementSibling as HTMLElement)?.classList.remove('hidden');
      } else {
        (event.currentTarget as HTMLElement).classList.add('toggled');
        (titleElement.nextElementSibling as HTMLElement)?.classList.add('hidden');
      }
    }
  }

  editModel(): void {
    this.selectedModel.emit(this.model);
  }

}
