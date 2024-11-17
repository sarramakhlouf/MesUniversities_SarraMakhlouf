import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { universityGuard } from './university.guard';

describe('universityGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => universityGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
