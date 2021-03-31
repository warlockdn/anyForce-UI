import { TestBed } from '@angular/core/testing';

import { IsEditingCandeactivateGuard } from './is-editing-candeactivate.guard';

describe('IsEditingCandeactivateGuard', () => {
  let guard: IsEditingCandeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsEditingCandeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
