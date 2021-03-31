import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLayoutComponent } from './add-new-layout.component';

describe('AddNewLayoutComponent', () => {
  let component: AddNewLayoutComponent;
  let fixture: ComponentFixture<AddNewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
