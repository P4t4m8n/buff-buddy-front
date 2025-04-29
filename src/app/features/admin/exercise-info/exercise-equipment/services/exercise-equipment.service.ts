import { Injectable } from '@angular/core';
import { IExerciseInfo, IExerciseInfoDTO } from '../../models/exerciseInfo';
import { BaseCRUDService } from '../../service/base-CRUD.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciseEquipmentService extends BaseCRUDService<
  IExerciseInfo,
  IExerciseInfoDTO
> {
  protected baseUrl = environment.apiUrl + '/exercise-equipment';

  override dtoToFormData(dto: IExerciseInfoDTO): FormData {
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
