import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../../../core/services/base-CRUD.service';
import { IExerciseInfoDTO, IExerciseInfoEditDTO } from '../models/exerciseInfo';

@Injectable({
  providedIn: 'root',
})
export abstract class ExerciseInfoService extends BaseCRUDService<
  IExerciseInfoDTO,
  IExerciseInfoEditDTO
> {
  override dtoToFormData(dto: IExerciseInfoEditDTO): FormData {
    const formData = new FormData();
    formData.append('name', dto.name || '');

    if (dto.file) {
      formData.append('file', dto.file);
    }
    const id = dto.id;
    if (id) {
      formData.append('id', id);
    }

    if (dto.imgUrl) {
      formData.append('imgUrl', dto.imgUrl);
    }
    return formData;
  }
}
