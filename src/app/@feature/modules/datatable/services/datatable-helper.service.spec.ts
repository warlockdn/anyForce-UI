import { TestBed } from '@angular/core/testing';

import { DatatableHelperService } from './datatable-helper.service';

describe('DatatableHelperService', () => {
  let service: DatatableHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatatableHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
