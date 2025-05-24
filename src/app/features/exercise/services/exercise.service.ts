import { inject, Injectable, WritableSignal } from '@angular/core';
import { IExercise, IExerciseDto } from '../types/exercise.type';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IPaginationDTO } from '../../../core/components/pagination/pagination-dto';
import { buildQueryParams } from '../../../core/functions/buildQueryParams';
import { ICRUDService } from '../../../core/interfaces/icrudservice';
import { BaseCRUDService } from '../../../core/services/base-CRUD.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService extends BaseCRUDService<IExercise, IExerciseDto> {
  protected baseUrl = environment.apiUrl + '/exercise';

  override dtoToFormData(dto: IExerciseDto): FormData {
    const formData = new FormData();
    formData.append('name', dto.name || '');

    if (dto.youtubeUrl) {
      formData.append('file', dto.youtubeUrl);
    }
    const id = dto.id;
    if (id) {
      formData.append('id', id);
    }

    if (dto.exerciseTypeId) {
      formData.append('exerciseTypeId', dto.exerciseTypeId);
    }
    if (dto.exerciseEquipmentId) {
      formData.append('exerciseEquipmentId', dto.exerciseEquipmentId);
    }
    if (dto.exerciseMuscleId) {
      formData.append('exerciseMuscleId', dto.exerciseMuscleId);
    }
    return formData;
  }
}
