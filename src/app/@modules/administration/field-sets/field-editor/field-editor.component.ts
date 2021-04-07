import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Entity } from 'src/app/models/entity';
import { FieldService } from '../../services/field/field.service';
import { Logger } from './../../../../@core/logger.service';
import { FieldType, FieldTypeDesc } from './../../../../models/field-types.model';
import { Field } from './../../../../models/field.model';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-field-editor',
  template: `
    <form nz-form [formGroup]="fieldForm" autocomplete="off"
      (ngSubmit)="fieldFormSubmitHandler($event)">
      <nz-form-item [nzJustify]="'end'">
        <nz-button-group>
          <button
            nz-button
            nzType="default"
            type="button"
            (click)="resetToDefault()"
            [title]="'fieldResetText' | translate"
            *ngIf="type === 'update'">
              <i nz-icon nzType="reload" nzTheme="outline"></i> Reset</button>
          <button
            *ngIf="type === 'update'"
            nz-button
            nzType="danger"
            type="button"
            nz-popconfirm
            nzPopconfirmTitle="Are you sure delete this field?"
            nzPopconfirmPlacement="bottom"
            nzOkType="danger"
            nzOkText="Delete"
            (nzOnConfirm)="deleteFieldHandler()">
              <i nz-icon nzType="delete" nzTheme="outline"></i> Delete
          </button>
          <button nz-button nzType="primary" type="submit" [disabled]="fieldForm.invalid">
            <i nz-icon nzType="save" nzTheme="outline"></i> {{ type === 'new' ? 'Save' : 'Update' }}
          </button>
        </nz-button-group>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="type" nzSpan="6">Type of Field</nz-form-label>
        <nz-form-control nzSpan="18">
        <nz-select formControlName="type" id="type">
          <nz-option *ngFor="let type of fieldTypes | keyvalue : returnZero" [nzValue]="type.value" [nzLabel]="fieldTypesDesc[type.value] | titlecase"></nz-option>
        </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="field-name" nzSpan="6">Field Name</nz-form-label>
        <nz-form-control nzSpan="18">
          <input nz-input formControlName="name" id="field-name" autocomplete="off" [readonly]="type === 'update'" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired nzFor="label" nzSpan="6">Label</nz-form-label>
        <nz-form-control nzSpan="18">
          <input nz-input formControlName="label" id="label" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzFor="placeholder" nzSpan="6">Placeholder</nz-form-label>
        <nz-form-control nzSpan="18">
          <input nz-input formControlName="placeholder" id="placeholder" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzFor="helptext" nzSpan="6">Help Text</nz-form-label>
        <nz-form-control nzSpan="18">
          <textarea nz-input formControlName="helptext" id="helptext"></textarea>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzFor="required" nzSpan="6">Is Required</nz-form-label>
        <nz-form-control nzSpan="18">
          <nz-switch formControlName="required"></nz-switch>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzFor="iseditable" nzSpan="6">Is Editable</nz-form-label>
        <nz-form-control nzSpan="18">
          <nz-switch formControlName="iseditable" id="iseditable"></nz-switch>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item *ngIf="toggleSections.min || toggleSections.max">
        <nz-form-label nzFor="min" nzSpan="6">Min ~ Max</nz-form-label>
        <nz-form-control nzSpan="18">
          <nz-input-group>
            <nz-input-number formControlName="min" id="min" *ngIf="toggleSections.min"></nz-input-number>
            <nz-input-number formControlName="max" id="max" *ngIf="toggleSections.max"></nz-input-number>
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item *ngIf="toggleSections.minDate || toggleSections.maxDate">
        <nz-form-label nzFor="minDate" nzSpan="6">Min ~ Max Date</nz-form-label>
        <nz-form-control nzSpan="18">
          <nz-input-group>
            <nz-date-picker formControlName="minDate" *ngIf="toggleSections.minDate"></nz-date-picker>
            <nz-date-picker formControlName="maxDate" *ngIf="toggleSections.maxDate"></nz-date-picker>
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item *ngIf="toggleSections.fileExtensions">
        <nz-form-label nzFor="fileExtensions" nzSpan="6" nzTooltipTitle="Should be combination of numbers & alphabets (no special character) - Per Line" nzRequired>File Extensions</nz-form-label>
        <nz-form-control nzSpan="18" nzErrorTip="Should be combination of numbers & alphabets (no special character) - Per Line">
          <textarea nz-input rows="6" formControlName="fileExtensions" id="fileExtensions" [placeholder]="'fieldFileExtensionsHelpText' | translate"></textarea>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item *ngIf="toggleSections.picklistoptions">
        <nz-form-label nzFor="multiple" nzSpan="6">Multiple Selection</nz-form-label>
        <nz-form-control nzSpan="18" formGroupName="picklistoptions">
          <nz-switch formControlName="multiple" id="multiple"></nz-switch>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item *ngIf="toggleSections.picklistoptions">
        <nz-form-label nzFor="options" nzSpan="6" nzRequired>Picklist Options</nz-form-label>
        <nz-form-control nzSpan="18" formGroupName="picklistoptions">
          <textarea nz-input rows="5" formControlName="options" id="options" [placeholder]="'fieldPickListOptionsHelpText' | translate"></textarea>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item [nzJustify]="'end'">
        <nz-button-group>
          <button
            nz-button
            nzType="default"
            type="button"
            (click)="resetToDefault()"
            [title]="'fieldResetText' | translate"
            *ngIf="type === 'update'">
              <i nz-icon nzType="reload" nzTheme="outline"></i> Reset</button>
          <button
            *ngIf="type === 'update'"
            nz-button
            nzType="danger"
            type="button"
            nz-popconfirm
            nzPopconfirmTitle="Are you sure delete this field?"
            nzPopconfirmPlacement="bottom"
            nzOkType="danger"
            nzOkText="Delete"
            (nzOnConfirm)="deleteFieldHandler()">
              <i nz-icon nzType="delete" nzTheme="outline"></i> Delete
          </button>
          <button nz-button nzType="primary" type="submit" [disabled]="fieldForm.invalid">
            <i nz-icon nzType="save" nzTheme="outline"></i> {{ type === 'new' ? 'Save' : 'Update' }}
          </button>
        </nz-button-group>
      </nz-form-item>
    </form>
  `,
  styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent implements OnInit, OnChanges, OnDestroy {

  logger = new Logger('FieldEditorComponent');

  readonly fieldTypes = FieldType;
  readonly fieldTypesDesc = FieldTypeDesc;

  private internalSubs: Subscription = new Subscription();

  @Input()
  type!: 'new' | 'update';

  @Input()
  entity!: Entity;

  @Input()
  field!: Field;

  @Output()
  deleteField: EventEmitter<Field> = new EventEmitter();

  /** Internal field data to keep a {{field}} copy. */
  private fieldInternal!: Field;

  @Output()
  fieldUpdate: EventEmitter<Field> = new EventEmitter();

  fieldForm: FormGroup = this.generateFieldForm();

  /** Takes care of all the toggling of section in the Field Form */
  toggleSections: { [propName: string]: boolean } = {
    minDate: false,
    maxDate: false,
    min: false,
    max: false,
    picklistoptions: false,
    fileExtensions: false
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly fieldService: FieldService,
    private readonly notificationService: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.watchFormChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.field?.currentValue) {
      const field = changes.field.currentValue;
      if (Object.keys(field).length === 0) {
        this.fieldForm.get('picklistoptions')?.disable({ onlySelf: true });
        this.fieldForm.reset({
          iseditable: true
        });
        this.fieldInternal = null as any;
      } else {
        this.fieldForm.get('picklistoptions')?.disable({ onlySelf: true });
        this.fieldForm.reset(field);
        this.fieldInternal = changes.field.currentValue;
      }
    }
  }

  returnZero(): number {
    return 0;
  }

  generateFieldForm(): FormGroup {
    return this.fb.group({
      type: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      label: new FormControl(null, [Validators.min(3), Validators.max(30), Validators.required]),
      placeholder: new FormControl(null, [Validators.min(3), Validators.max(30)]),
      helptext: new FormControl(null, [Validators.min(10), Validators.max(160)]),
      masktext: new FormControl(null, [Validators.min(3), Validators.max(20)]),
      required: new FormControl(false),
      iseditable: new FormControl({ value: true }),
      min: new FormControl({ value: 0, disabled: true }),
      max: new FormControl({ value: 0, disabled: true }),
      minDate: new FormControl({ value: null, disabled: true }),
      maxDate: new FormControl({ value: null, disabled: true }),
      fileExtensions: new FormControl({ value: null, disabled: true }, Validators.pattern('')),
      picklistoptions: new FormGroup({
        multiple: new FormControl(false),
        options: new FormControl(null)
      })
    });
  }

  resetToDefault(): void {
    this.fieldForm.reset(this.fieldInternal);
  }

  deleteFieldHandler(): void {
    this.fieldService.deleteField(this.entity.name, this.field.name)
      .subscribe(res => {
        if (!res) {
          this.notificationService.success(`${this.field.name} - Deleted`, `${this.field.name} deleted successfully`);
        } else {
          this.notificationService.error(`${this.field.name} - Error`, `${this.field.name} - Error deleting field. Please try again.`);
        }
      }, () => {
        this.notificationService.error(`${this.field.name} - Error`, `${this.field.name} - Error deleting field. Please try again.`);
      });
    this.deleteField.emit(this.field);
  }

  watchFormChanges(): void {
    this.watchGeneralFormValidations();
    this.watchPicklist();
    this.watchFieldType();
    this.watchFileExtensions();
  }

  watchGeneralFormValidations(): void {
    this.fieldForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {

        this.logger.info('Field Form ', value);

        const formValue: Field = value as any;
        if (formValue?.min && formValue?.max) {
          this.checkForMinMaxValidation(formValue);
        }
        if (formValue?.minDate && formValue?.maxDate) {
          this.checkForMinMaxDateValidation(formValue);
        }

      });
  }

  watchFieldType(): void {
    this.internalSubs.add(
      this.fieldForm.get('type')?.valueChanges.subscribe(type => {
        if ([this.fieldTypes.date, this.fieldTypes.daterange].includes(type)) {
          this.toggleSectionHandler(['minDate', 'maxDate']);
        } else if (type === this.fieldTypes.file) {
          this.toggleSectionHandler(['fileExtensions']);
        } else if (type === this.fieldTypes.number) {
          this.toggleSectionHandler(['min', 'max']);
        } else if (type === this.fieldTypes.picklist) {
          this.toggleSectionHandler(['picklistoptions']);
        } else {
          this.toggleSectionHandler([]);
        }
      })
    );
  }

  /**
   * Validation for Min/Max numbers
   * @param formValue Field Form value
   */
  checkForMinMaxValidation(formValue: Field): void {
    const min = this.fieldForm.get('min');
    const max = this.fieldForm.get('max');

    const type: FieldType = this.fieldForm.get('type')?.value;
    const minValue = (type === FieldType.number ? RegExp('^[0-9]*$') : RegExp('^[0-9]*\.[0-9]{3}$')).test(min?.value);
    const maxValue = (type === FieldType.number ? RegExp('^[0-9]*$') : RegExp('^[0-9]*\.[0-9]{3}$')).test(max?.value);

    if (formValue.min > formValue.max || !minValue) {
      min?.setErrors({
        minGreater: true
      });
    } else {
      min?.setErrors(null);
    }
    if (formValue.max < formValue.min || !maxValue) {
      max?.setErrors({
        maxGreater: true
      });
    } else {
      max?.setErrors(null);
    }
  }

  /**
   * Validation for Min/Max Date
   * @param formValue Field Form value..
   */
  checkForMinMaxDateValidation(formValue: Field): void {
    const minDate = this.fieldForm.get('minDate');
    if (differenceInDays(formValue.maxDate, formValue.minDate) < 1) {
      minDate?.setErrors({
        dateLesserThanMinDate: true
      });
    } else {
      minDate?.setErrors(null);
    }
  }

  toggleSectionHandler(items: Array<string>): void {

    // all Toggle to false
    Object.keys(this.toggleSections)
      .forEach(item => {
        this.toggleSections[item] = false;
        this.fieldForm.get(item)?.reset();
        this.fieldForm.get(item)?.setValidators(null);
        this.fieldForm.get(item)?.disable({ onlySelf: true });
        this.fieldForm.get(item)?.updateValueAndValidity({ onlySelf: true });
      });

    // Toggle to true - selective
    if (items.length === 0) {
      return;
    }

    if (items.includes('picklistoptions')) {
      this.toggleSections.picklistoptions = true;
      this.fieldForm.get('picklistoptions')?.get('options')?.setValidators([Validators.required]);
      this.fieldForm.get('picklistoptions')?.get('options')?.updateValueAndValidity();
    } else {
      this.fieldForm.get('picklistoptions')?.get('options')?.clearValidators();
      this.fieldForm.get('picklistoptions')?.get('options')?.updateValueAndValidity();

      Object.keys(this.toggleSections)
        .filter(item => items.includes(item))
        .forEach(item => {
          this.toggleSections[item] = true;

          if (['min', 'max'].includes(item)) {
            const type = this.fieldForm.get('type')?.value;
            if (type === FieldType.number) {
              this.fieldForm.get(item)?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
            } else {
              this.fieldForm.get(item)?.setValidators([Validators.required, Validators.pattern('^[0-9]*\.[0-9]{3}$')]);
            }
          } else {
            this.fieldForm.get(item)?.setValidators([Validators.required]);
          }

          this.fieldForm.get(item)?.enable({ onlySelf: true });
          this.fieldForm.get(item)?.updateValueAndValidity({ onlySelf: true });
        });

    }

  }

  watchPicklist(): void {

  }

  watchFileExtensions(): void {
    this.internalSubs.add(
      this.fieldForm.get('fileExtensions')
        ?.valueChanges
        .pipe(
          debounceTime(500)
        )
        .subscribe(value => {
          if (!value) {
            return;
          }
          const splitValue: string[] = (value as string).split('\n');
          let isValid = true;

          splitValue.forEach(item => {
            if (!RegExp(/^[A-Za-z0-9 ]+$/).test(item)) {
              isValid = false;
            }
          });

          if (!isValid) {
            this.fieldForm.get('fileExtensions')?.setErrors({
              invalidFormat: true
            });
          } else {
            this.fieldForm.get('fileExtensions')?.setErrors(null);
          }

          console.log(splitValue);
        })
    );
  }

  fieldFormSubmitHandler(event: Event): void {

    event.preventDefault();

    if (this.fieldForm.invalid) {
      return;
    }

    this.logger.info(this.fieldForm.value);

    if (this.type === 'new') {
      this.internalSubs.add(
        this.fieldService
          .createField(this.entity.name, this.fieldForm.value)
          .subscribe(fields => {
            if (Array.isArray(fields) && fields.length > 0) {
              const createdField = fields.find(field => field.name === this.fieldForm.value.name);
              this.notificationService.success(`${createdField?.name} - Create successful`, `${createdField?.name} created successfully`);
              this.fieldUpdate.emit(createdField);
            } else {
              this.notificationService.error(`${this.fieldForm.value.name} - Create failed`, `Create failed`);
            }
          }, (error) => {
            this.notificationService.error(`${this.fieldForm.value.name} - Create failed`, `Error - ${error?.message}`);
          })
      );
    } else {
      this.internalSubs.add(
        this.fieldService
          .updateField(this.entity.name, this.field.name, this.fieldForm.value)
          .subscribe(field => {
            if (field) {
              this.notificationService.success(`${field.name} - Update successful`, `${field.name} updated successfully`);
              this.fieldUpdate.emit(field);
            } else {
              this.notificationService.error(`${this.field.name} - Update failed`, `Update failed`);
            }
          }, (error) => {
            this.notificationService.error(`${this.field.name} - Update failed`, `Error - ${error?.message}`);
          })
      );
    }


  }

  ngOnDestroy(): void {
    this.internalSubs.unsubscribe();
  }

}
