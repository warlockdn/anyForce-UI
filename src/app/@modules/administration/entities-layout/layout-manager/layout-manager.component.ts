import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Entity } from './../../../../models/entity';
import { FieldTypeDesc } from './../../../../models/field-types.model';
import { Field } from './../../../../models/field.model';
import { Layout } from './../../../../models/layout.model';
import { DragDropInterface } from './../../../../models/shared';
import { Structure } from './../../../../models/structure.model';
import { BasicLayouts } from '../services/basic-layouts';
import { Subscription } from 'rxjs';
import { share } from 'rxjs/operators';
import { EntityService } from '../../services/entity/entity.service';
import { LayoutService } from '../../services/layout/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StructureService } from '../services/structure/structure.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-layout-manager',
  templateUrl: './layout-manager.component.html',
  styleUrls: ['./layout-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutManagerComponent implements OnInit, OnDestroy {

  internalSubs: Subscription = new Subscription();

  readonly fieldTypes: any = FieldTypeDesc;

  entity!: Entity;

  layout!: Layout;

  fields: Field[] | undefined = [];

  basicItems: Array<Structure> = new BasicLayouts().generateBasicLayouts();

  targetBuilderTools: Array<Structure> = [];

  selectedModel: Structure | undefined;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly entityService: EntityService,
    private readonly layoutService: LayoutService,
    private readonly toastr: NzMessageService
  ) { }

  ngOnInit(): void {
    this.internalSubs
      .add(
        this.entityService.loadEntities()
        .pipe(share())
        .subscribe(entities => {
          this.route.paramMap.subscribe(params => {
            console.log(params);
            if (!this.entity && !this.layout) {
              const entityName = this.route.parent?.snapshot.params?.entityCode;
              const layoutId = params.get('layoutId');
              if (entityName && layoutId) {
                if (window.history?.state?.entity && window.history?.state?.layout) {
                  this.setDataFromHistory();
                } else {
                  this.setDataFromService(entities, entityName, layoutId);
                }
              }
            } else {
              const entityName = this.route.parent?.snapshot.params?.entityCode;
              const layoutId = params.get('layoutId');
              if (entityName && layoutId) {
                this.setDataFromService(entities, entityName, layoutId);
              }
            }
          });
        })
      );
  }

  /** Sets Entity & Layout data from Browser History State */
  setDataFromHistory(): void {
    this.entity = window.history.state.entity;
    this.layout = window.history.state.layout;
    this.fields = this.entity?.fields;

    const structureService = new StructureService(this.fields);
    this.targetBuilderTools = structureService.buildStructureForUI(this.layout.structure as any);

  }

  /**
   * Sets Entity & Layout data from Service
   * @param entities List of Entities
   * @param entityName Entity to be Loaded
   * @param layoutId Layout to be Loaded
   */
  setDataFromService(entities: Entity[], entityName: string, layoutId: string): void {
    const entityToBeLoadedIndex = entities.findIndex(entity => entity.name === entityName);
    if (entityToBeLoadedIndex !== -1) {
      this.layoutService.getLayout(entityName, layoutId)
        .subscribe(layout => {
          this.layout = layout;
          this.entity = entities[entityToBeLoadedIndex];
          this.fields = this.entity.fields;

          const structureService = new StructureService(this.fields);
          this.targetBuilderTools = structureService.buildStructureForUI(layout.structure as any);

          console.log(this.targetBuilderTools);

        });
    }
  }

  droppableItemClass = (item: Structure): string => {
    return item?.type === 'row' ? `ant-row ${item.type}` : `${item.type} ant-col` || '';
  }

  builderDrag(e: DragDropInterface): void { }

  /**
   * Drop event for Fields only
   * takes in the field and changes its type to "Field"
   */
  builderDrop(e: DragDropInterface): void { }

  deleteModelHandler(e: any): void {
    return;
  }

  selectedModelHandler(model: Structure): void {
    this.selectedModel = model;
  }

  buildLayoutForService(isDefault = false): void {
    const structureService = new StructureService(this.fields);
    const newLayout = structureService.buildStructureForService(this.targetBuilderTools);

    this.layoutService
      .patchLayout(this.entity?.name, this.layout?._id as any, Object.assign(this.layout, newLayout, { default: isDefault }))
      .subscribe(layout => {
        if (layout) {
          this.toastr.success('Layout saved successfully', {
            nzAnimate: true,
            nzDuration: 5000
          });
          this.layout = layout;
        }
      });
  }

  /**
   * Cancels and changes and returns to Layout Page.
   */
  goBackToLayout(): void {
    this.router.navigate(['/administration/entities/layout']);
  }

  ngOnDestroy(): void {
    this.internalSubs.unsubscribe();
  }

}

