import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPicklistComponent } from './multi-picklist.component';

describe('MultiPicklistComponent', () => {
  let component: MultiPicklistComponent;
  let fixture: ComponentFixture<MultiPicklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiPicklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPicklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
