import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListPipe } from './pipes/search-list/search-list.pipe';



@NgModule({
  declarations: [
    SearchListPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchListPipe
  ]
})
export class UtilityModule { }
