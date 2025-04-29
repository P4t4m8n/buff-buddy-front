import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../admin/exercise-info/service/base-CRUD.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends BaseCRUDService<I, IExerciseDto> {

  constructor() { }
}
