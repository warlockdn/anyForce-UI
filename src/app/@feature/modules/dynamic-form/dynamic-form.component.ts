import { Compiler, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

/**
 * Dynamic Forms would mostly go hand in hand with Dynamic Layouts in client end.
 * Form layout needs to be such that it can easily use layout related components.
 */

@Component({
  selector: 'app-dynamic-form',
  template: `
    <ng-container #anchor></ng-container>
  `,
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef | undefined;

  constructor(
    private compiler: Compiler,
    private injector: Injector
  ) { }

  ngOnInit(): void {
  }

  async loadComponent(): Promise<void> {
  }

}
