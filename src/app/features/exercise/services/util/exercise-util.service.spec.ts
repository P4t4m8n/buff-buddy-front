import { TestBed } from '@angular/core/testing';

import { ExerciseUtilService } from './exercise-util.service';

describe('ExerciseUtilService', () => {
  let service: ExerciseUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
