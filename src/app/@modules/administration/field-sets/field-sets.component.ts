import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Entity } from 'src/app/models/entity';
import { EntityService } from '../services/entity/entity.service';

@Component({
  selector: 'app-field-sets',
  template: `
    <div class="field-manager">
      <div nz-row [nzGutter]="[hGutter, vGutter]">
        <div nz-col [nzSpan]="4">

          <!-- Search -->
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input type="text" nz-input placeholder="input search text" [(ngModel)]="searchText" />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <i nz-icon nzType="search"></i>
          </ng-template>

          <!-- Entity List -->
          <nz-list [nzBordered]="false" class="entity-list">
            <nz-list-item
              *ngFor="let entity of entities | searchlist: searchText:'name'"
              (click)="loadEntity(entity)"
              [ngClass]="isActiveEntity(entity)">
                <div class="content">
                  <nz-list-item-meta-title>
                    {{ entity.label }}
                  </nz-list-item-meta-title>
                  <nz-list-item-meta *ngIf="entity.description" [nzDescription]="entity.description">
                  </nz-list-item-meta>
                  <nz-list-item-meta class="empty" *ngIf="!entity.description" [nzDescription]="'emptyEntityList' | translate">
                  </nz-list-item-meta>
                </div>
            </nz-list-item>
          </nz-list>
        </div>
        <div nz-col [nzSpan]="20">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./field-sets.component.scss']
})
export class FieldSetsComponent implements OnInit {

  internalSubs: Subscription = new Subscription();

  readonly hGutter = 16;
  readonly vGutter = 16;

  /** List of Entities */
  entities: Entity[] = [];

  /** Selected Entity */
  selectedEntity!: Entity;

  /** Search text for filtering entities */
  searchText = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly entityService: EntityService
  ) { }

  ngOnInit(): void {
    this.internalSubs.add(
      this.entityService.loadEntities()
        .subscribe(entities => {
          this.entities = entities;
          this.watchRouteChanges();
        })
    );
  }

  watchRouteChanges(): void {
    this.internalSubs.add(
      this.route?.firstChild?.params.subscribe(params => {
        const entityName = params.entityCode;
        if (entityName) {
          const entityToBeLoaded = this.entities.find(entity => entity.name === entityName) as Entity;
          if (entityToBeLoaded) {
            this.selectedEntity = entityToBeLoaded;
          }
        }
      })
    );
  }

  isActiveEntity(entity: Entity): string {
    return this.selectedEntity?.name === entity.name ? 'selected' : '';
  }

  loadEntity(entity: Entity): void {
    this.router.navigate(['/administration/entities/fields', entity.name], {
      state: {
        entity
      }
    });
  }

}
