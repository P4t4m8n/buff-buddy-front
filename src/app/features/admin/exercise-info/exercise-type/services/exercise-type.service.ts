import { Injectable } from '@angular/core';
import {
  IExerciseInfoDTO,
  IExerciseInfoEditDTO,
} from '../../models/exerciseInfo';
import { BaseCRUDService } from '../../../../../core/services/base-CRUD.service';
import { environment } from '../../../../../../environments/environment';
import { ExerciseInfoService } from '../../services/exercise-info.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseTypeService extends ExerciseInfoService {
  protected baseUrl = environment.apiUrl + '/exercise-type';
}
