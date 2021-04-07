import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entity } from 'src/app/models/entity';
import { FieldTypeDesc } from 'src/app/models/field-types.model';
import { Field } from 'src/app/models/field.model';
import { EntityService } from '../../services/entity/entity.service';

@Component({
  selector: 'app-field-manager',
  template: `
    <div nz-row [nzGutter]="[16, 16]">
      <div nz-col [nzSpan]="4">

        <!-- Search -->
        <nz-input-group [nzSuffix]="suffixIconSearch">
          <input type="text" nz-input placeholder="input search text" [(ngModel)]="searchText" />
        </nz-input-group>
        <ng-template #suffixIconSearch>
          <i nz-icon nzType="search"></i>
        </ng-template>

        <!-- Field List -->
        <nz-list [nzBordered]="false" class="entity-list" [style.min-height]="'calc(100vh - 355px)'" [style.max-height]="'calc(100vh - 355px)'">
          <nz-list-item
            *ngFor="let field of entity?.fields | searchlist: searchText:'name'"
            (click)="selectField(field)"
            [ngClass]="isActiveField(field)">
              <div class="content">
                <nz-list-item-meta-title>
                  {{ field.label }} - {{ (fieldDescription[field.type]) | titlecase }}
                </nz-list-item-meta-title>
              </div>
          </nz-list-item>
        </nz-list>

        <div class="add-new" [style.width.%]="90" [style.margin]="'0 auto'">
          <button nz-button nzType="primary" nzBlock (click)="addNewField()">
            <i nz-icon nzType="plus" nzTheme="outline"></i> Add New
          </button>
        </div>

      </div>
      <div nz-col [nzSpan]="20">
        <nz-empty *ngIf="!selectedField" class="fit-height" [nzNotFoundContent]="'fieldEmptyDesc' | translate"></nz-empty>
        <app-field-editor
          *ngIf="selectedField"
          [type]="selectedField?.name ? 'update' : 'new'"
          [entity]="entity"
          [field]="selectedField"
          (deleteField)="deleteFieldHandler($event)"
          (fieldUpdate)="fieldUpdateHandler($event)"></app-field-editor>
      </div>
    </div>
  `,
  styleUrls: ['./field-manager.component.scss', './../field-sets.component.scss']
})
export class FieldManagerComponent implements OnInit, OnDestroy {

  internalSubs: Subscription = new Subscription();

  readonly fieldDescription = FieldTypeDesc as any;

  entity!: Entity;

  selectedField!: Field;

  searchText = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly entityService: EntityService
  ) { }

  ngOnInit(): void {
    this.internalSubs.add(
      this.route.params.subscribe(params => {

        // Reset selectedfield everytime there is a change.
        this.selectedField = null as any;

        const entityName = params.entityCode;
        if (window.history?.state?.entity) {
          this.entity = window.history.state.entity;
        } else {
          this.entityService.loadEntities()
            .subscribe(entities => {
              const entityToBeLoaded = entities.find(entity => entity.name === entityName);
              if (entityToBeLoaded) {
                this.entity = entityToBeLoaded;
              }
            });
        }
      })
    );
  }

  isActiveField(field: Field): string {
    return field?._id === this.selectedField?._id ? 'selected' : '';
  }

  addNewField(): void {
    this.selectedField = {} as any;
  }

  selectField(field: Field): void {
    this.selectedField = field;
  }

  deleteFieldHandler(field: Field): void {
    const fieldIndexToBeDeleted = this.entity.fields.findIndex(item => item.name === field.name);
    if (fieldIndexToBeDeleted !== -1) {
      this.entity.fields.splice(fieldIndexToBeDeleted, 1);
    }
  }

  fieldUpdateHandler(updatedField: Field): void {
    this.selectedField = updatedField;
    const fieldToBeUpdatedIndex = this.entity.fields.findIndex(field => field.name === updatedField.name);
    if (fieldToBeUpdatedIndex !== -1) {
      this.entity.fields[fieldToBeUpdatedIndex] = updatedField;
    } else {
      this.entity.fields.push(updatedField);
    }
  }

  ngOnDestroy(): void {
    this.internalSubs?.unsubscribe();
  }

}
