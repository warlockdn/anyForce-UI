import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesActionsComponent } from './user-roles-actions.component';

describe('UserRolesActionsComponent', () => {
  let component: UserRolesActionsComponent;
  let fixture: ComponentFixture<UserRolesActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRolesActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
