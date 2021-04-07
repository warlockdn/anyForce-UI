import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesActionComponent } from './entities-action.component';

describe('EntitiesActionComponent', () => {
  let component: EntitiesActionComponent;
  let fixture: ComponentFixture<EntitiesActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
