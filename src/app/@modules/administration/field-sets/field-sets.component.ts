import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-field-sets',
  template: `
    <div class="field-manager">
      <div nz-row [nzGutter]="[hGutter, vGutter]">
        <div nz-col [nzSpan]="5">

          <!-- Search -->
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input type="text" nz-input placeholder="input search text" />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <i nz-icon nzType="search"></i>
          </ng-template>

          <!-- Entity List -->
          <nz-list [nzBordered]="false" class="entity-list">
            <nz-list-item
              *ngFor="let entity of [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]"
              (click)="loadEntity(entity)"
              routerLinkActive="active">
                <div class="content">
                  <nz-list-item-meta-title>
                    Entity 0{{ entity }}
                  </nz-list-item-meta-title>
                  <nz-list-item-meta nzDescription="Ant Design, a design language for background applications">
                  </nz-list-item-meta>
                </div>
            </nz-list-item>
          </nz-list>
        </div>
        <div nz-col [nzSpan]="19">
          <app-field-manager [entity]="entity"></app-field-manager>
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

  entity: any;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.internalSubs.add(
      this.route.paramMap.subscribe(params => {
        this.entity = params.get('entityCode');
        console.log(this.entity);
      })
    );
  }

  loadEntity(route: any): void {
    this.router.navigate(['/administration/entities/fields', route]);
  }

}
