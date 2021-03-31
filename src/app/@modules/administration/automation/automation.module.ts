import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomationRoutingModule } from './automation-routing.module';
import { AutomationComponent } from './automation.component';


@NgModule({
  declarations: [AutomationComponent],
  imports: [
    CommonModule,
    AutomationRoutingModule
  ]
})
export class AutomationModule { }
