import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import { Entity } from './../../../models/entity';
import { Layout } from './../../../models/layout.model';
import { EntityService } from '../services/entity/entity.service';
import { LayoutService } from '../services/layout/layout.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { AddNewLayoutComponent } from './add-new-layout/add-new-layout.component';
import { Logger } from 'src/app/@core/logger.service';

@Component({
  selector: 'app-entities-layout',
  template: `
    <div class="field-manager">
      <div nz-row [nzGutter]="[hGutter, vGutter]">
        <div nz-col [nzSpan]="4" class="border-right">

          <!-- Search -->
          <div class="toolbar">
            <button nz-button nzSize="default" nzType="default"
              *ngIf="selectedEntity" (click)="backToEntities()" [title]="'backToEntities' | translate">
                <i nz-icon nzType="left" nzTheme="outline"></i>
            </button>
            <nz-input-group [nzSuffix]="suffixIconSearch">
              <input type="text" nz-input placeholder="input search text" [(ngModel)]="searchText" />
            </nz-input-group>
            <ng-template #suffixIconSearch>
              <i nz-icon nzType="search"></i>
            </ng-template>
          </div>

          <!-- Entity List -->
          <ng-container *ngIf="!selectedEntity">
            <nz-list [nzBordered]="false" class="entity-list" *ngIf="entities.length > 0; else skeletonLoading">
              <nz-list-item
                *ngFor="let entity of entities | searchlist: searchText:'name'"
                (click)="loadLayouts(entity)"
                routerLinkActive="active">
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

            <div class="add-new">
              <button nz-button nzType="primary" nzBlock (click)="addNewEntity()">
                <i nz-icon nzType="plus" nzTheme="outline"></i> Add New
              </button>
            </div>

          </ng-container>

          <div *ngIf="selectedEntity && layouts.length > 0">
            <nz-list [nzBordered]="false" class="entity-list">
              <nz-list-item
                  *ngFor="let layout of layouts | searchlist: searchText:'name'"
                  (click)="loadLayout(layout)">
                    <nz-list-item-meta-title>
                      {{ layout.label }} <i nz-icon nzType="check-circle" nzTheme="outline" *ngIf="layout.default"></i>
                    </nz-list-item-meta-title>
                    <nz-list-item-meta *ngIf="layout.description" [nzDescription]="layout.description">
                    </nz-list-item-meta>
                    <nz-list-item-meta class="empty" *ngIf="!layout.description" [nzDescription]="'emptyEntityList' | translate">
                    </nz-list-item-meta>
              </nz-list-item>
            </nz-list>

            <div class="add-new">
              <button nz-button nzType="primary" nzBlock (click)="addNewLayout()">
                <i nz-icon nzType="plus" nzTheme="outline"></i> Add New
              </button>
            </div>
          </div>

        </div>
        <div nz-col [nzSpan]="20">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>

    <ng-template #skeletonLoading>
      <div class="entity-list" [style.padding.px]="10">
        <div *ngFor="let item of [1, 2]" [style.margin-top.px]="20">
          <nz-skeleton-element nzType="input" [nzActive]="true" [nzSize]="'small'" [style.width.px]="150"></nz-skeleton-element>
          <nz-skeleton-element nzType="input" [nzActive]="true" [nzSize]="'small'" [style.width.%]="100" [style.padding-top.px]="10"></nz-skeleton-element>
          <nz-skeleton-element nzType="input" [nzActive]="true" [nzSize]="'small'" [style.width.%]="100" [style.padding-top.px]="10"></nz-skeleton-element>
        </div>
      </div>
    </ng-template>

  `,
  styleUrls: ['./entities-layout.component.scss']
})
export class EntitiesLayoutComponent implements OnInit, OnDestroy {

  logger = new Logger('EntitiesLayoutComponent');

  internalSubs: Subscription = new Subscription();

  readonly hGutter = 16;
  readonly vGutter = 16;

  /** List of Entities */
  entities: Entity[] = [];

  /** Selected Entity */
  selectedEntity!: Entity;

  /** List of Layouts for Selected Entity */
  layouts: Layout[] = [];

  /** Selected Layout for a Entity */
  selectedLayout!: Layout;

  /** Search text for searching entities and layouts list. */
  searchText = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly entityService: EntityService,
    private readonly layoutService: LayoutService,
    private readonly modalService: NzModalService,
    private readonly translateService: TranslateService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.loadEntities();
  }

  watchRoute(): void {
    this.internalSubs.add(
      this.route.firstChild?.paramMap.subscribe(params => {
        if (params.get('entityCode')) {
          const selectedEntity = this.entities.find(entity => entity.name === params.get('entityCode'));
          if (selectedEntity && !this.selectedEntity) {
            this.selectedEntity = selectedEntity;
            this.loadLayouts(selectedEntity);
          }
        }
      })
    );
  }

  loadEntities(): void {
    this.internalSubs
      .add(
        this.entityService.loadEntities()
        .pipe(share())
        .subscribe(entities => {
          this.entities = entities;
          this.watchRoute();
        })
      );
  }

  backToEntities(): void {
    (this.selectedEntity as any) = null;
    (this.selectedLayout as any) = null;
    this.layouts = [];
    this.router.navigate(['/administration/entities/layout']);
    this.searchText = '';
  }

  loadLayouts(entity: Entity): void {
    this.selectedEntity = entity;
    this.searchText = '';
    this.layoutService.getLayouts(entity.name)
      .subscribe(layouts => {
        this.layouts = layouts;
      });
  }

  loadLayout(layout: Layout): void {
    this.selectedLayout = layout;
    this.searchText = '';
    this.router.navigate(['/administration/entities/layout', this.selectedEntity?.name, layout?._id], {
      state: {
        entity: this.selectedEntity,
        layout
      }
    });
  }

  addNewEntity(): void {
    this.router.navigate(['/administration/entities']);
  }

  addNewLayout(): void {
    const addNewLayout = this.modalService.create({
      nzTitle: this.translateService.instant('addNewLayout'),
      nzViewContainerRef: this.viewContainerRef,
      nzContent: AddNewLayoutComponent,
      nzOnOk: (instance: AddNewLayoutComponent) => {
        return new Promise((resolve) => {
          const newLayout = instance.addForm.value;
          this.createLayout(newLayout).subscribe(layout => {
            this.layouts.push(layout);
            resolve();
          });
        });
      },
      nzOkText: 'Add',
      nzOkDisabled: true,
      nzCancelText: 'Cancel',
      nzMaskClosable: true
    });

    this.internalSubs.add(
      addNewLayout.afterOpen
        .subscribe(_ => {
          addNewLayout.componentInstance?.addForm
            .valueChanges
            .pipe(
              delay(100)
            )
            .subscribe(() => {

              // Updating the modal submit option to set according to the form state.
              addNewLayout.updateConfig({
                nzOkDisabled: addNewLayout.componentInstance?.addForm.invalid,
                nzMaskClosable: false
              });

            });
        })
    );

  }

  createLayout(layout: any): Observable<Layout> {
    return new Observable(observer => {
      this.layoutService.saveLayout(this.selectedEntity.name, layout)
        .subscribe(res => {
          observer.next(res);
          observer.complete();
        });
    });
  }

  ngOnDestroy(): void {
    this.internalSubs.unsubscribe();
  }

}
