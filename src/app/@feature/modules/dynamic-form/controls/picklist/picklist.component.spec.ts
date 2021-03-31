import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistComponent } from './picklist.component';

describe('PicklistComponent', () => {
  let component: PicklistComponent;
  let fixture: ComponentFixture<PicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
