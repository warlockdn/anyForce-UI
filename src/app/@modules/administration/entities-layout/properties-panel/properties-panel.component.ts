import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { Structure, StructureTypesTitle } from 'src/app/models/structure.model';

@Component({
  selector: 'app-properties-panel',
  template: `
    <nz-empty *ngIf="!model" class="fit-height" [nzNotFoundContent]="'propertyLayoutEmpty' | translate" [ngStyle]="{'margin-left.px': !model ? 0 : 'auto'}"></nz-empty>

    <div *ngIf="model">
      <h5>{{structureTypesTitle[model.type]}}</h5>

      <form nz-form nzLayout="vertical">
        <nz-form-item *ngIf="model.meta && model?.meta?.title !== undefined">
          <nz-form-label>Title</nz-form-label>
          <nz-form-control>
            <input nz-input [(ngModel)]="model.meta.title" [ngModelOptions]="{standalone: true}" placeholder="" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item *ngIf="model.meta && model?.meta?.desc !== undefined">
          <nz-form-label>Description</nz-form-label>
          <nz-form-control>
            <textarea nz-input [(ngModel)]="model.meta.desc" [ngModelOptions]="{standalone: true}" rows="2" placeholder=""></textarea>
          </nz-form-control>
        </nz-form-item>
      </form>

    </div>

  `,
  styleUrls: ['./properties-panel.component.scss']
})
export class PropertiesPanelComponent implements OnInit {

  readonly structureTypesTitle = StructureTypesTitle;

  @Input()
  model: Structure | undefined;

  // private wasInside = false;
  // @HostListener('document:click', ['$event'])
  // clickout(): void {
  //   if (this.model) {
  //     this.model = undefined;
  //   }
  // }

  // @HostListener('click')
  // clickInside(event: MouseEvent): void {
  //   event.stopPropagation();
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
