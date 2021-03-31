import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntityService } from '../services/entity/entity.service';

@Component({
  selector: 'app-entities',
  template: `
    <section class="page">
      <div class="section-body">
        <app-datatable [name]="'entitiesPageTitle' | translate"></app-datatable>
      </div>
    </section>
  `,
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit, OnDestroy {

  internalSubs: Subscription = new Subscription();

  constructor(
    private readonly entityService: EntityService
  ) { }

  ngOnInit(): void {
    this.getEntites();
  }

  getEntites(): void {
    this.internalSubs.add(
      this.entityService.getEntites()
        .subscribe(res => console.log(res))
    );
  }

  ngOnDestroy(): void {
    this.internalSubs.unsubscribe();
  }

}
