import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  template: `
    <nz-result nzStatus="404" nzTitle="404" [nzSubTitle]="subTitle">
      <div nz-result-extra>
        <button nz-button nzType="primary" (click)="goBack()" [attr.title]="goBackTitle" [innerHTML]="goBackTitle"></button>
      </div>
    </nz-result>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  private internalSub: Subscription = new Subscription();

  subTitle!: string;
  goBackTitle!: string;

  constructor(
    private readonly location: Location,
    private readonly translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getTranslations();
  }

  getTranslations(): void {
    this.internalSub.add(
      this.translate.get(['notfound', 'goback'])
        .subscribe(translated => {
          this.subTitle = translated.notfound;
          this.goBackTitle = translated.goback;
        })
    );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.internalSub.unsubscribe();
  }

}
