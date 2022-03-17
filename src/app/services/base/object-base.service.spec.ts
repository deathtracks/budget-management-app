import { TestBed } from '@angular/core/testing';

import { ObjectBaseService } from './object-base.service';

describe('ObjectBaseServiceService', () => {
  let service: ObjectBaseService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
