import { TestBed } from '@angular/core/testing';

import { ReverseConnexionGuard } from './reverse-connexion.guard';

describe('ReverseConnexionGuard', () => {
  let guard: ReverseConnexionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReverseConnexionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
