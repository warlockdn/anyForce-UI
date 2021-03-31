import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesLayoutComponent } from './entities-layout.component';

describe('EntitiesLayoutComponent', () => {
  let component: EntitiesLayoutComponent;
  let fixture: ComponentFixture<EntitiesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitiesLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
