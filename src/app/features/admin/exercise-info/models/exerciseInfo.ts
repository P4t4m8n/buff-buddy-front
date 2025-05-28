import { IEntityDTO } from '../../../../core/types/app.type';

export interface IExerciseInfoDTO extends IEntityDTO {
  name?: string;
  imgUrl?: string;
}

export interface IExerciseInfoEditDTO extends IExerciseInfoDTO {
  file?: File;
}
