import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBooleanComponent } from './switch-boolean.component';

describe('SwitchBooleanComponent', () => {
  let component: SwitchBooleanComponent;
  let fixture: ComponentFixture<SwitchBooleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchBooleanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
