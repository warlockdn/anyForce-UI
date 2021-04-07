import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Logger } from 'src/app/@core/logger.service';
import { LayoutType } from 'src/app/models/layout.model';

@Component({
  selector: 'app-add-new-layout',
  template: `
    <form nz-form [formGroup]="addForm" autocomplete="off">
      <nz-form-item>
        <nz-form-label nzRequired nzFor="name" nzSpan="6">Name</nz-form-label>
        <nz-form-control nzSpan="18">
          <input nz-input formControlName="name" id="name" autocomplete="off" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="label" nzSpan="6">Label</nz-form-label>
        <nz-form-control nzSpan="18">
          <input nz-input formControlName="label" id="label" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="description" nzSpan="6">Description</nz-form-label>
        <nz-form-control nzSpan="18">
          <textarea nz-input formControlName="description" id="description"></textarea>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="type" nzSpan="6">Type of Layout</nz-form-label>
        <nz-form-control nzSpan="18">
        <nz-select formControlName="type">
          <nz-option *ngFor="let type of layoutType" [nzValue]="type" [nzLabel]="type | titlecase"></nz-option>
        </nz-select>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styleUrls: ['./add-new-layout.component.scss']
})
export class AddNewLayoutComponent implements OnInit {

  layoutType = Object.values(LayoutType);

  addForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addForm = this.generateAddLayoutForm();
  }

  generateAddLayoutForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required]),
      label: new FormControl('', [Validators.required]),
      description: new FormControl(null, []),
      type: new FormControl('', [Validators.required])
    });
  }

}
