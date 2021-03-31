import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSetsComponent } from './field-sets.component';

describe('FieldSetsComponent', () => {
  let component: FieldSetsComponent;
  let fixture: ComponentFixture<FieldSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
