import { Injectable } from '@angular/core';

import { environment } from '../../../../../../environments/environment';
import { ExerciseInfoService } from '../../services/exercise-info.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseMuscleService extends ExerciseInfoService {
  protected baseUrl = environment.apiUrl + '/exercise-muscle';
}
