import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Entity } from 'src/app/models/entity';

@Component({
  selector: 'app-manage-entity',
  template: `
    <form nz-form [formGroup]="entityForm" autocomplete="off">
      <nz-form-item>
        <nz-form-label nzRequired nzFor="entity-name" nzSpan="6">Entity Name</nz-form-label>
        <nz-form-control nzSpan="18">
          <input nz-input formControlName="name" id="entity-name" autocomplete="off" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="label" nzSpan="6">Label</nz-form-label>
        <nz-form-control nzSpan="18">
          <input nz-input formControlName="label" id="label" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="pluralLabel" nzSpan="6">Plural Label</nz-form-label>
        <nz-form-control nzSpan="18">
          <input nz-input formControlName="pluralLabel" id="pluralLabel" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="description" nzSpan="6">Description</nz-form-label>
        <nz-form-control nzSpan="18">
          <textarea nz-input formControlName="description" id="description"></textarea>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="allowSearch" nzSpan="6">Allow Search</nz-form-label>
        <nz-form-control nzSpan="18">
          <nz-switch formControlName="allowSearch"></nz-switch>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styleUrls: ['./manage-entity.component.scss']
})
export class ManageEntityComponent implements OnInit {

  entity!: Entity;

  entityForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.entityForm = this.generateEntityForm();
    if (this.entity) {
      this.entityForm.patchValue(this.entity);
    }
  }

  generateEntityForm(): FormGroup {
    return this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.min(3), Validators.max(20)]),
      label: new FormControl(null, [Validators.required, Validators.min(3), Validators.max(30)]),
      pluralLabel: new FormControl(null, [Validators.min(3), Validators.max(30)]),
      description: new FormControl(null, [Validators.min(10), Validators.max(250)]),
      allowSearch: new FormControl(false)
    });
  }

}
