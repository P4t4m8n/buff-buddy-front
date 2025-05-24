import { Injectable } from '@angular/core';
import { IWorkout } from '../models/workout.interface';
import { BaseLocalStorageService } from '../../../core/services/base-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class WorkoutDataService extends BaseLocalStorageService<IWorkout> {
  constructor() {
    super('activeWorkoutData');
  }
}
