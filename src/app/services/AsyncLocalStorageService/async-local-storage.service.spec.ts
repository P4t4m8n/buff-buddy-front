import { TestBed } from '@angular/core/testing';

import { AsyncLocalStorgeService } from './async-local-storage.service';

describe('AsyncLocalStorgeService', () => {
  let service: AsyncLocalStorgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncLocalStorgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
