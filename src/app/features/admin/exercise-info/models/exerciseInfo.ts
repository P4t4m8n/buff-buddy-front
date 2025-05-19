import { IEntityDTO } from '../../../../core/types/app.type';

export interface IExerciseInfo extends IEntityDTO {
  name?: string;
  imgUrl?: string;
}

export interface IExerciseInfoDTO extends IExerciseInfo {
  file?: File;
}
